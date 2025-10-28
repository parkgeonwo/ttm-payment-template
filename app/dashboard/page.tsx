'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCurrentUser, useUserSubscription } from '@/hooks/user-hook'
import { getCustomerPortalUrl } from '@/services/creem'
import { toast } from 'sonner'
import Header from '@/components/Header'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)

  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: subscription, isLoading: subscriptionLoading } =
    useUserSubscription(user?.id)

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login')
    }
  }, [user, userLoading, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleManageSubscription = async () => {
    try {
      setIsLoadingPortal(true)

      const profile = await supabase
        .from('profiles')
        .select('customer_id')
        .eq('id', user?.id)
        .single()

      if (!profile.data?.customer_id) {
        toast.error('구독 정보를 찾을 수 없습니다.')
        return
      }

      const { url } = await getCustomerPortalUrl(profile.data.customer_id)
      window.location.href = url
    } catch (error) {
      console.error('Error opening customer portal:', error)
      toast.error('구독 관리 페이지를 여는 중 오류가 발생했습니다.')
    } finally {
      setIsLoadingPortal(false)
    }
  }

  if (userLoading || subscriptionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-2 text-gray-600">계정 및 구독 정보를 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              계정 정보
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">이메일</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">사용자 ID</p>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              구독 정보
            </h2>
            {subscription ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">플랜</p>
                  <p className="text-gray-900 font-semibold">
                    {subscription.product_name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">상태</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : subscription.status === 'trialing'
                          ? 'bg-blue-100 text-blue-800'
                          : subscription.status === 'past_due' ||
                              subscription.status === 'unpaid'
                            ? 'bg-yellow-100 text-yellow-800'
                            : subscription.status === 'paused'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {subscription.status === 'active'
                      ? '활성'
                      : subscription.status === 'trialing'
                        ? '체험 중'
                        : subscription.status === 'past_due'
                          ? '결제 지연'
                          : subscription.status === 'unpaid'
                            ? '미결제'
                            : subscription.status === 'paused'
                              ? '일시정지'
                              : subscription.status === 'canceled'
                                ? '취소됨'
                                : subscription.status}
                  </span>
                </div>
                {subscription.amount && (
                  <div>
                    <p className="text-sm text-gray-600">요금</p>
                    <p className="text-gray-900">
                      {subscription.currency === 'USD'
                        ? `$${(subscription.amount / 100).toFixed(2)}`
                        : subscription.currency === 'KRW'
                          ? `₩${subscription.amount.toLocaleString()}`
                          : `${subscription.amount.toLocaleString()} ${subscription.currency}`}{' '}
                      / {subscription.interval === 'year' ? '년' : '월'}
                    </p>
                  </div>
                )}
                {subscription.current_period_end && (
                  <div>
                    <p className="text-sm text-gray-600">다음 결제일</p>
                    <p className="text-gray-900">
                      {new Date(
                        subscription.current_period_end
                      ).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                )}
                <div className="pt-4">
                  <button
                    onClick={handleManageSubscription}
                    disabled={isLoadingPortal}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingPortal ? '로딩 중...' : '구독 관리'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">활성 구독이 없습니다</p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  플랜 선택하기
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
