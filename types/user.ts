export interface UserSubscription {
  id: string
  status: 'active' | 'canceled' | 'unpaid' | 'paused' | 'trialing' | 'past_due'
  product_id?: string
  product_name?: string
  amount?: number // cents 단위 (실제 표시 시 /100 필요할 수 있음)
  currency?: string // USD, KRW 등
  interval?: 'month' | 'year'
  current_period_start?: string
  current_period_end?: string
  next_transaction_date?: string // 다음 결제 예정일
  last_transaction_date?: string // 마지막 결제일
  canceled_at?: string
  trial_end?: string
}

export interface UserProfile {
  id: string
  email?: string
  username?: string
  name?: string
  avatar_url?: string
  role?: string
  customer_id?: string
  subscription?: UserSubscription
  created_at?: string
  updated_at?: string
}
