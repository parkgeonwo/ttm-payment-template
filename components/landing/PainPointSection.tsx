import Card, { CardContent } from '@/components/ui/Card'

export default function PainPointSection() {
  const painPoints = [
    {
      emoji: '💸',
      title: '비싼 촬영 비용',
      description: '모델 + 스튜디오 + 촬영 = 최소 50만원\n한 달에 몇 번이나 찍을 수 있나요?',
    },
    {
      emoji: '⏰',
      title: '긴 작업 시간',
      description: '촬영 섭외부터 결과물까지 최소 1주일\n트렌드는 이미 지나가고...',
    },
    {
      emoji: '😓',
      title: '퀄리티 걱정',
      description: '직접 찍으면 아마추어 티 팍팍\n고객들이 클릭도 안 해요',
    },
    {
      emoji: '🔄',
      title: '수정의 어려움',
      description: '다시 찍자니 비용, 참자니 마음...\n완벽한 컷은 언제 나올까요?',
    },
  ]

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#18181b] sm:text-5xl">
            쇼핑몰 운영하면서
            <br />
            <span className="text-[#71717a]">이런 고민 하셨죠?</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {painPoints.map((point, index) => (
            <Card key={index} hoverable padding="lg">
              <CardContent>
                <div className="text-center">
                  <div className="mb-4 text-5xl">{point.emoji}</div>
                  <h3 className="mb-3 text-lg font-semibold text-[#18181b]">
                    {point.title}
                  </h3>
                  <p className="whitespace-pre-line text-sm text-[#71717a]">
                    {point.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-purple-600">
                  40%
                </div>
                <p className="text-lg font-medium text-[#18181b]">
                  상품 이미지 퀄리티 향상 시 전환율 최대 40% 증가
                </p>
                <p className="mt-2 text-sm text-[#71717a]">
                  - 2023 이커머스 연구 보고서
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
