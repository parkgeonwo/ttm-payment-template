'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { UserProfile, UserSubscription } from '@/types/user'

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw error

  return user
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

export async function getUserSubscription(
  userId: string
): Promise<UserSubscription | null> {
  const profile = await getUserProfile(userId)
  return profile?.subscription || null
}

export async function updateUserSubscription(
  userId: string,
  subscriptionData: Partial<UserSubscription>
): Promise<void> {
  const supabase = createAdminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription')
    .eq('id', userId)
    .single()

  const updatedSubscription = {
    ...profile?.subscription,
    ...subscriptionData,
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription: updatedSubscription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    throw new Error(`Failed to update subscription: ${error.message}`)
  }
}

export async function updateCustomerId(
  userId: string,
  customerId: string
): Promise<void> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      customer_id: customerId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    throw new Error(`Failed to update customer ID: ${error.message}`)
  }
}
