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
  description?: string
  price: number // cents 단위 (1000 = $10.00)
  currency: string // ISO 4217 (USD, KRW 등)
  billing_type: string // "recurring", "one-time"
  billing_period: string // "every-month", "every-year", etc.
  status: string
  tax_mode?: string
  tax_category?: string
  interval?: 'month' | 'year'
  interval_count?: number
}

export interface CreemSubscription {
  id: string
  status: 'active' | 'canceled' | 'unpaid' | 'paused' | 'trialing' | 'past_due'
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
    id: string
    object: string
    product?: CreemProduct
    customer?: CreemCustomer
    status: 'active' | 'canceled' | 'unpaid' | 'paused' | 'trialing' | 'past_due'
    collection_method?: string
    current_period_start_date?: string
    current_period_end_date?: string
    next_transaction_date?: string
    last_transaction_date?: string
    canceled_at?: string | null
    created_at?: string
    updated_at?: string
    metadata?: Record<string, string>
    items?: Array<{
      id: string
      product_id: string
      price_id: string
      units: number
    }>
    // Legacy support
    subscription?: CreemSubscription
    order?: {
      id: string
      amount: number
      metadata?: Record<string, string>
    }
  }
}

export type CreemEventType =
  | 'checkout.completed'
  | 'subscription.created'
  | 'subscription.paid'
  | 'subscription.active'
  | 'subscription.past_due'
  | 'subscription.canceled'
  | 'subscription.updated'
