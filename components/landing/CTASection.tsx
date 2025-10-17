import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#5e6ad2] to-[#7170ff] py-20 sm:py-32 border-b border-[#23252a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="primary" size="lg" className="mb-6 bg-white text-[#5e6ad2]">
          🎉 특별 혜택
        </Badge>

        <h2 className="text-4xl font-bold text-white tracking-[-0.022em] sm:text-5xl lg:text-6xl mb-6">
          이제 선택하세요
          <br />
          <span className="text-white/80">
            매달 50만원 쓸 것인가,
            <br />
            단돈 만원으로 해결할 것인가?
          </span>
        </h2>

        <div className="mt-10">
          <Link href="/pricing">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-base px-12 py-6 shadow-2xl !text-[#5e6ad2]"
            >
              지금 무료로 시작하기 →
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-[13px] text-white/90">
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

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-[13px] text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>안전한 결제</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>24시간 고객지원</span>
          </div>
        </div>
      </div>
    </section>
  )
}
