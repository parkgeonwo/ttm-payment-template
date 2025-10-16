import Card, { CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function PricingComparisonSection() {
  const comparisons = [
    {
      item: '모델 비용',
      traditional: '20만원/1회',
      ai: '무료',
      savings: '-20만원',
    },
    {
      item: '스튜디오 대여',
      traditional: '15만원/1회',
      ai: '무료',
      savings: '-15만원',
    },
    {
      item: '촬영 시간',
      traditional: '3-4시간',
      ai: '1분',
      savings: '99% 절약',
    },
    {
      item: '수정 비용',
      traditional: '10만원/1회',
      ai: '무료 무제한',
      savings: '-10만원',
    },
    {
      item: '월 총 비용',
      traditional: '50만원 이상',
      ai: '29,000원부터',
      savings: '94% 절감',
      highlight: true,
    },
  ]

  return (
    <section className="bg-[#fafafa] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="warning" size="lg" className="mb-4">
            비용 비교
          </Badge>
          <h2 className="text-4xl font-bold text-[#18181b] sm:text-5xl mb-4">
            기존 촬영 vs
            <br />
            <span className="text-purple-600">ProductStudio AI</span>
          </h2>
          <p className="mt-4 text-lg text-[#71717a]">
            얼마나 절약할 수 있는지 직접 확인해보세요
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="col-span-1 font-semibold">항목</div>
                <div className="text-center font-semibold">기존 방식</div>
                <div className="text-center font-semibold">
                  ProductStudio AI
                </div>
                <div className="text-center font-semibold">절감액</div>
              </div>

              {/* Rows */}
              {comparisons.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 border-b border-[#e5e5e5] p-6 ${
                    row.highlight ? 'bg-purple-50 font-semibold' : 'bg-white'
                  }`}
                >
                  <div className="col-span-1 text-[#18181b]">{row.item}</div>
                  <div className="text-center text-[#71717a]">
                    {row.traditional}
                  </div>
                  <div className="text-center font-medium text-purple-600">
                    {row.ai}
                  </div>
                  <div className="text-center font-semibold text-green-600">
                    {row.savings}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Highlight Box */}
          <div className="mt-12">
            <Card className="border-2 border-purple-500 bg-gradient-to-r from-purple-600 to-pink-600">
              <CardContent className="py-12 text-center text-white">
                <div className="mb-2 text-5xl font-bold">564만원</div>
                <p className="text-xl">
                  연간 절약 가능 금액 💰
                  <br />
                  <span className="text-sm opacity-90">
                    (월 47만원 × 12개월)
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Optimized Table */}
          <div className="mt-8 text-center text-sm text-[#71717a]">
            <p>* 실제 절약액은 사용량에 따라 다를 수 있습니다</p>
          </div>
        </div>
      </div>
    </section>
  )
}
