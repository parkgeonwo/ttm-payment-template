'use server'

import type { CreemCheckoutOptions, CreemCheckoutResponse } from '@/types/creem'

const CREEM_API_BASE_URL = process.env.CREEM_BASE_URL
const CREEM_API_KEY = process.env.CREEM_API_KEY

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': CREEM_API_KEY || '',
  }
}

export async function createCheckout(
  options: CreemCheckoutOptions
): Promise<CreemCheckoutResponse> {
  if (!CREEM_API_BASE_URL || !CREEM_API_KEY) {
    console.error('❌ Creem API credentials missing')
    throw new Error('Creem API credentials not configured')
  }

  const requestBody = {
    product_id: options.productId,
    units: options.units || 1,
    customer: {
      email: options.email,
    },
    success_url: options.successUrl,
    ...(options.discountCode && { discount_code: options.discountCode }),
    metadata: {
      userId: options.userId,
      ...options.metadata,
    },
  }

  console.log('🔵 Creating Creem checkout:', {
    url: `${CREEM_API_BASE_URL}/v1/checkouts`,
    apiKeyPrefix: CREEM_API_KEY?.substring(0, 20) + '...',
    requestBody,
  })

  const response = await fetch(`${CREEM_API_BASE_URL}/v1/checkouts`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(requestBody),
  })

  console.log('📡 Creem API response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Creem API error response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })

    let errorMessage = 'Failed to create checkout session'
    try {
      const errorJson = JSON.parse(errorText)
      errorMessage = errorJson.message || errorJson.error || errorMessage
    } catch (e) {
      errorMessage = errorText || errorMessage
    }

    throw new Error(errorMessage)
  }

  const data = await response.json()
  console.log('✅ Creem checkout created:', {
    checkout_url: data.checkout_url,
    checkout_id: data.id,
  })

  return {
    url: data.checkout_url,
    checkout_id: data.id,
  }
}

export async function getCustomerPortalUrl(
  customerId: string
): Promise<{ url: string }> {
  if (!CREEM_API_BASE_URL || !CREEM_API_KEY) {
    throw new Error('Creem API credentials not configured')
  }

  const response = await fetch(
    `${CREEM_API_BASE_URL}/v1/customers/${customerId}/portal`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/subscription`,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Failed to get customer portal URL',
    }))
    throw new Error(error.message || 'Failed to get customer portal URL')
  }

  const data = await response.json()
  return { url: data.portal_url }
}
