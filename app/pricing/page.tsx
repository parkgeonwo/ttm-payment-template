'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import Header from '@/components/Header'
import PricingPlans from '@/components/PricingPlans'

export default function PricingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090a]">
        <div className="text-[15px] text-[#f7f8f8]">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#08090a]">
      <Header user={user} onLogout={handleLogout} />
      <main>
        <PricingPlans />
      </main>
    </div>
  )
}
