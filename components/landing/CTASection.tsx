import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="info" size="lg" className="mb-6 bg-white text-purple-600">
          🎉 특별 혜택
        </Badge>

        <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
          이제 선택하세요
          <br />
          <span className="text-purple-100">
            매달 50만원 쓸 것인가,
            <br />
            5만원으로 해결할 것인가?
          </span>
        </h2>

        <p className="mt-6 text-xl text-purple-100">
          지금 시작하면 10장 무료 + 첫 달 50% 할인
        </p>

        <div className="mt-10">
          <Link href="/pricing">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-12 py-6 shadow-2xl"
            >
              지금 무료로 시작하기 →
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-purple-100">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>신용카드 등록 불필요</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>10장 무료 체험</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>언제든 해지 가능</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>7일 환불 보장</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>안전한 결제</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>24시간 고객지원</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.9/5.0 평점</span>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-6 py-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-white font-medium">
            이미 1,247명의 셀러가 사용 중
          </span>
        </div>
      </div>
    </section>
  )
}
