import { useQuery } from '@tanstack/react-query'
import { getCurrentUser, getUserProfile, getUserSubscription } from '@/services/user'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  })
}

export function useUserProfile(userId?: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => (userId ? getUserProfile(userId) : null),
    enabled: !!userId,
  })
}

export function useUserSubscription(userId?: string) {
  return useQuery({
    queryKey: ['userSubscription', userId],
    queryFn: () => (userId ? getUserSubscription(userId) : null),
    enabled: !!userId,
  })
}
