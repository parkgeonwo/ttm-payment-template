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
import TestimonialsSection from '@/components/landing/TestimonialsSection'
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
    <div className="min-h-screen bg-white">
      <Header user={user} onLogout={handleLogout} />
      <main>
        <HeroSection />
        <PainPointSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingComparisonSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-[#18181b] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">ProductStudio AI</h3>
              <p className="text-sm text-gray-400">
                AI 기반 상품 이미지 생성 플랫폼
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">빠른 링크</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/pricing" className="hover:text-white">
                    가격
                  </a>
                </li>
                <li>
                  <a href="/components" className="hover:text-white">
                    컴포넌트
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    고객 후기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    도움말
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">회사</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    회사소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    개인정보처리방침
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    제휴문의
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">연락처</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@productstudio.ai</li>
                <li>카카오톡 상담: 평일 9-6시</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2025 ProductStudio AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
