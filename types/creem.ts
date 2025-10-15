export interface CreemCheckoutOptions {
  productId: string
  userId: string
  email: string
  units?: number
  successUrl: string
  cancelUrl?: string
  discountCode?: string
  metadata?: Record<string, string>
}

export interface CreemCheckoutResponse {
  url: string
  checkout_id: string
}

export interface CreemCustomer {
  id: string
  email: string
  name?: string
  created_at: string
}

export interface CreemProduct {
  id: string
  name: string
  price: number
  interval?: 'month' | 'year'
  interval_count?: number
}

export interface CreemSubscription {
  id: string
  status: 'active' | 'past_due' | 'canceled' | 'trialing'
  customer_id: string
  product_id: string
  amount: number
  current_period_start: string
  current_period_end: string
  canceled_at?: string
  trial_end?: string
  metadata?: Record<string, string>
}

export interface CreemWebhookEvent {
  eventType: string
  object: {
    subscription?: CreemSubscription
    customer?: CreemCustomer
    product?: CreemProduct
    order?: {
      id: string
      amount: number
      metadata?: Record<string, string>
    }
    metadata?: Record<string, string>
  }
}

export type CreemEventType =
  | 'checkout.completed'
  | 'subscription.created'
  | 'subscription.paid'
  | 'subscription.past_due'
  | 'subscription.canceled'
  | 'subscription.updated'
