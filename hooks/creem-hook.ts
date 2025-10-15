import { useMutation } from '@tanstack/react-query'
import { createCheckout } from '@/services/creem'

export function useCreemCheckout() {
  return useMutation({
    mutationFn: createCheckout,
  })
}
