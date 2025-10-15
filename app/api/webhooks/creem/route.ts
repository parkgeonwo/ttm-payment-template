import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { updateUserSubscription, updateCustomerId } from '@/services/user'
import type { CreemWebhookEvent, CreemSubscription } from '@/types/creem'
import type { UserSubscription } from '@/types/user'

function buildSubscriptionData(
  data: CreemWebhookEvent['object'],
  subscription?: CreemSubscription
): Partial<UserSubscription> {
  const subData = subscription || data.subscription
  const product = data.product

  if (!subData) {
    return {}
  }

  return {
    id: subData.id,
    status: subData.status,
    product_id: product?.id,
    product_name: product?.name,
    amount: subData.amount,
    interval: product?.interval,
    current_period_start: subData.current_period_start,
    current_period_end: subData.current_period_end,
    canceled_at: subData.canceled_at,
    trial_end: subData.trial_end,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('creem-signature')
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('CREEM_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    if (signature) {
      const computedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')

      if (signature !== computedSignature) {
        console.error('Invalid webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const webhookData: CreemWebhookEvent = JSON.parse(body)
    const { eventType, object: data } = webhookData

    const userId =
      data.metadata?.userId ||
      data.subscription?.metadata?.userId ||
      data.order?.metadata?.userId

    if (!userId) {
      console.error('User ID not found in webhook metadata')
      return NextResponse.json(
        { error: 'User ID not found in metadata' },
        { status: 400 }
      )
    }

    console.log(`[Webhook] Processing event: ${eventType} for user: ${userId}`)

    switch (eventType) {
      case 'checkout.completed':
        if (data.subscription) {
          await updateUserSubscription(
            userId,
            buildSubscriptionData(data, data.subscription)
          )

          if (data.customer?.id) {
            await updateCustomerId(userId, data.customer.id)
          }
        }
        break

      case 'subscription.created':
      case 'subscription.paid':
      case 'subscription.updated':
        await updateUserSubscription(userId, buildSubscriptionData(data))
        break

      case 'subscription.past_due':
        await updateUserSubscription(userId, {
          ...buildSubscriptionData(data),
          status: 'past_due',
        })
        break

      case 'subscription.canceled':
        await updateUserSubscription(userId, {
          ...buildSubscriptionData(data),
          status: 'canceled',
          canceled_at: data.subscription?.canceled_at || new Date().toISOString(),
        })
        break

      default:
        console.log(`[Webhook] Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
