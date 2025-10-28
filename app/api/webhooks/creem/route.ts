import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { updateUserSubscription, updateCustomerId } from '@/services/user'
import type { CreemWebhookEvent, CreemSubscription } from '@/types/creem'
import type { UserSubscription } from '@/types/user'

function buildSubscriptionData(
  data: CreemWebhookEvent['object'],
  subscription?: CreemSubscription
): Partial<UserSubscription> {
  const product = data.product

  console.log('[buildSubscriptionData] data:', JSON.stringify(data, null, 2))
  console.log('[buildSubscriptionData] product:', JSON.stringify(product, null, 2))

  // Creem의 실제 데이터 구조에 맞춰 필드 매핑
  // subscription 객체가 아닌 object 자체에 데이터가 있음
  if (!data.id || !product) {
    console.error('[buildSubscriptionData] Missing required data (id or product)!')
    return {}
  }

  // billing_period 변환: "every-month" → "month", "every-year" → "year"
  let interval: 'month' | 'year' = 'month'
  if (product.billing_period) {
    if (product.billing_period.includes('year')) {
      interval = 'year'
    } else if (product.billing_period.includes('month')) {
      interval = 'month'
    }
  }

  const result = {
    id: data.id, // object.id가 subscription ID
    status: data.status, // object.status
    product_id: product.id,
    product_name: product.name,
    amount: product.price, // product.price (cents 단위)
    currency: product.currency, // USD, KRW 등
    interval: interval, // product.billing_period를 변환
    current_period_start: data.current_period_start_date, // _date 접미사
    current_period_end: data.current_period_end_date, // _date 접미사
    next_transaction_date: data.next_transaction_date, // 다음 결제 예정일
    last_transaction_date: data.last_transaction_date, // 마지막 결제일
    canceled_at: data.canceled_at || undefined,
    trial_end: undefined, // Creem 데이터에 trial_end 없음
  }

  console.log('[buildSubscriptionData] Built subscription data:', JSON.stringify(result, null, 2))

  return result
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

    console.log(`[Creem Webhook] Processing event: ${eventType} for user: ${userId}`)
    console.log('[Creem Webhook] Full event data:', JSON.stringify(webhookData, null, 2))
    console.log('[Creem Webhook] data.subscription:', JSON.stringify(data.subscription, null, 2))
    console.log('[Creem Webhook] data.product:', JSON.stringify(data.product, null, 2))
    console.log('[Creem Webhook] data.customer:', JSON.stringify(data.customer, null, 2))

    switch (eventType) {
      case 'checkout.completed':
        // Legacy support: 이전 Creem API 버전
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

      case 'subscription.active':
      case 'subscription.created':
      case 'subscription.paid':
      case 'subscription.updated':
        // 구독 정보 업데이트
        await updateUserSubscription(userId, buildSubscriptionData(data))

        // customer_id 저장 (처음 한 번만)
        if (data.customer?.id) {
          await updateCustomerId(userId, data.customer.id)
        }
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
