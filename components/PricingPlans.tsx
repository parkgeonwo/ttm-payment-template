'use client'

import { useCreemCheckout } from '@/hooks/creem-hook'
import { getCurrentUser } from '@/services/user'
import { toast } from 'sonner'

interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  recommended?: boolean
  productId?: string
}

// TODO: Replace productId values with your actual Creem Product IDs from Creem Dashboard
const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    period: '월',
    description: '개인 사용자를 위한 기본 플랜',
    productId: 'prod_I7xYQ9oWZgFvpAErD4C1E', // Replace with actual Creem Product ID
    features: [
      '기본 기능 사용',
      '월 100건 처리',
      '이메일 지원',
      '7일 데이터 보관',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39,
    period: '월',
    description: '전문가를 위한 추천 플랜',
    productId: 'prod_YOUR_PRO_PRODUCT_ID', // Replace with actual Creem Product ID
    features: [
      '모든 기본 기능',
      '월 1,000건 처리',
      '우선 지원',
      '30일 데이터 보관',
      '고급 분석 도구',
      'API 접근',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 59,
    period: '월',
    description: '기업을 위한 프리미엄 플랜',
    features: [
      '모든 Pro 기능',
      '무제한 처리',
      '24/7 전담 지원',
      '무제한 데이터 보관',
      '맞춤형 통합',
      '전용 계정 관리자',
      'SLA 보장',
    ],
  },
]

export default function PricingPlans() {
  const { mutate: createCheckout, isPending } = useCreemCheckout()

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (plan.id === 'enterprise') {
      toast.info('Enterprise 플랜은 별도 문의가 필요합니다.')
      return
    }

    if (!plan.productId) {
      toast.error('상품 ID가 설정되지 않았습니다.')
      return
    }

    try {
      const user = await getCurrentUser()

      if (!user) {
        toast.error('로그인이 필요합니다.')
        window.location.href = '/login'
        return
      }

      createCheckout(
        {
          productId: plan.productId,
          userId: user.id,
          email: user.email || '',
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}?canceled=true`,
          metadata: {
            plan: `${plan.name} ${plan.period}`,
          },
        },
        {
          onSuccess: (data) => {
            window.location.href = data.url
          },
          onError: (error) => {
            console.error('Checkout error:', error)
            toast.error('결제 페이지로 이동하는 중 오류가 발생했습니다.')
          },
        }
      )
    } catch (error) {
      console.error('Error:', error)
      toast.error('오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            요금제를 선택하세요
          </h2>
          <p className="text-lg text-gray-600">
            프로젝트에 맞는 최적의 플랜을 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                plan.recommended
                  ? 'border-blue-500 ring-4 ring-blue-100'
                  : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    추천
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isPending}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPending ? '처리 중...' : '선택하기'}
                </button>

                <div className="mt-8 space-y-4">
                  <p className="text-sm font-semibold text-gray-900">
                    포함된 기능:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
