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
      ai: '약 1만원부터',
      savings: '94% 절감',
      highlight: true,
    },
  ]

  return (
    <section className="bg-[#0f1011] py-20 sm:py-24 border-b border-[#23252a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            비용 비교
          </Badge>
          <h2 className="text-4xl font-bold text-[#f7f8f8] tracking-[-0.022em] sm:text-5xl mb-4">
            기존 촬영 vs
            <br />
            <span className="bg-gradient-to-r from-[#7170ff] to-[#828fff] bg-clip-text text-transparent">Selloframe</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#8a8f98]">
            얼마나 절약할 수 있는지 직접 확인해보세요
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border border-[#23252a]">
            <CardContent className="p-0">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 bg-gradient-to-r from-[#5e6ad2] to-[#7170ff] p-6 text-white">
                <div className="col-span-1 text-[13px] font-semibold">항목</div>
                <div className="text-center text-[13px] font-semibold">기존 방식</div>
                <div className="text-center text-[13px] font-semibold">
                  Selloframe
                </div>
                <div className="text-center text-[13px] font-semibold">절감액</div>
              </div>

              {/* Rows */}
              {comparisons.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 border-b border-[#23252a] p-6 ${
                    row.highlight ? 'bg-[#18182f] font-semibold' : 'bg-[#141516]'
                  }`}
                >
                  <div className="col-span-1 text-[13px] text-[#f7f8f8]">{row.item}</div>
                  <div className="text-center text-[13px] text-[#8a8f98]">
                    {row.traditional}
                  </div>
                  <div className="text-center text-[13px] font-medium text-[#828fff]">
                    {row.ai}
                  </div>
                  <div className="text-center text-[13px] font-semibold text-[#6fcf97]">
                    {row.savings}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Highlight Box */}
          <div className="mt-12">
            <Card className="border-2 border-[#5e6ad2] bg-gradient-to-r from-[#5e6ad2] to-[#7170ff]">
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
          <div className="mt-8 text-center text-[13px] text-[#8a8f98]">
            <p>* 실제 절약액은 사용량에 따라 다를 수 있습니다</p>
          </div>
        </div>
      </div>
    </section>
  )
}
