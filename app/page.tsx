'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import HeroSection from '@/components/landing/HeroSection'
import PainPointSection from '@/components/landing/PainPointSection'
import SolutionSection from '@/components/landing/SolutionSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import PricingComparisonSection from '@/components/landing/PricingComparisonSection'
import FAQSection from '@/components/landing/FAQSection'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#08090a]">
      <Header user={user} onLogout={handleLogout} />
      <main>
        <HeroSection />
        <PainPointSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingComparisonSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1011] border-t border-[#23252a] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-[15px] font-medium text-[#f7f8f8]">Selloframe</h3>
              <p className="text-[13px] text-[#8a8f98]">
                AI 기반 상품 이미지 생성 플랫폼
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-medium text-[#d0d6e0]">빠른 링크</h4>
              <ul className="space-y-2 text-[13px] text-[#8a8f98]">
                <li>
                  <a href="/pricing" className="hover:text-[#d0d6e0] transition-colors">
                    요금제
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-medium text-[#d0d6e0]">회사</h4>
              <ul className="space-y-2 text-[13px] text-[#8a8f98]">
                <li>
                  <a href="/terms" className="hover:text-[#d0d6e0] transition-colors">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-[#d0d6e0] transition-colors">
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-medium text-[#d0d6e0]">연락처</h4>
              <ul className="space-y-2 text-[13px] text-[#8a8f98]">
                <li>ceo@82studio.xyz</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[#23252a] pt-8 text-center text-[13px] text-[#62666d]">
            © 2025 Selloframe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
