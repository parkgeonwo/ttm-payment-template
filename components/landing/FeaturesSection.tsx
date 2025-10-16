import Card, { CardContent } from '@/components/ui/Card'

export default function FeaturesSection() {
  const features = [
    {
      icon: '🤖',
      title: 'AI 버츄얼 모델',
      description: '100종의 AI 모델 무제한 사용\n성별, 연령, 체형, 피부톤까지\n당신의 브랜드에 딱 맞는 모델을',
    },
    {
      icon: '🎨',
      title: '스마트 배경 생성',
      description: '스튜디오부터 카페, 야외까지\n어떤 분위기든 1초 만에 생성\n계절감, 시간대도 자유자재',
    },
    {
      icon: '⚡',
      title: '초고속 배치 처리',
      description: '상품 100개를 한 번에 업로드\n똑같은 스타일로 일괄 생성\n밤새 촬영할 필요 없어요',
    },
    {
      icon: '🎯',
      title: '원클릭 쇼핑몰 연동',
      description: '카페24, 스마트스토어 직접 연동\n생성한 이미지 바로 업로드\n별도 다운로드 필요 없음',
    },
    {
      icon: '🔄',
      title: '무제한 재생성',
      description: '마음에 안 들면 다시 생성\n추가 비용 걱정 없이\n완벽한 컷을 찾을 때까지',
    },
    {
      icon: '📱',
      title: '모바일 완벽 지원',
      description: '언제 어디서든 이미지 생성\n휴대폰으로 찍고 바로 업로드\n이동 중에도 작업 가능',
    },
  ]

  return (
    <section className="bg-[#fafafa] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#18181b] sm:text-5xl mb-4">
            전문가도 놀라는
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              강력한 기능들
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#71717a]">
            복잡한 설정 없이, 클릭 몇 번으로 완성됩니다
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} hoverable padding="lg">
              <CardContent>
                <div className="mb-4 text-5xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-[#18181b]">
                  {feature.title}
                </h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#71717a]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mini Gallery Preview */}
        <div className="mt-16 text-center">
          <div className="inline-flex gap-2 rounded-full bg-white px-6 py-3 shadow-md">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200"
              />
            ))}
            <div className="flex items-center pl-2 text-sm font-medium text-[#71717a]">
              +92 more
            </div>
          </div>
          <p className="mt-3 text-sm text-[#71717a]">
            100종 이상의 AI 모델을 자유롭게 사용하세요
          </p>
        </div>
      </div>
    </section>
  )
}
