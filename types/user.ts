export interface UserSubscription {
  id: string
  status: 'active' | 'past_due' | 'canceled' | 'trialing'
  product_id?: string
  product_name?: string
  amount?: number
  interval?: 'month' | 'year'
  current_period_start?: string
  current_period_end?: string
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
