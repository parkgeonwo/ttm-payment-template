import Card, { CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function SolutionSection() {
  const steps = [
    {
      number: '1',
      title: '상품만 업로드',
      description: '휴대폰으로 찍은 사진도 OK\n배경이 지저분해도 괜찮아요',
      icon: '📤',
    },
    {
      number: '2',
      title: '원하는 스타일 선택',
      description: '100가지 AI 모델\n무제한 배경 시나리오\n원하는 분위기를 골라보세요',
      icon: '🎨',
    },
    {
      number: '3',
      title: '30초 후 완성!',
      description: '전문가급 퀄리티\n바로 다운로드해서 사용하세요',
      icon: '✨',
    },
  ]

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            How it works
          </Badge>
          <h2 className="text-4xl font-bold text-[#18181b] sm:text-5xl mb-4">
            이제 AI가 당신의
            <br />
            <span className="text-purple-600">전속 포토그래퍼</span>입니다
          </h2>
          <p className="mt-4 text-lg text-[#71717a]">
            단 3단계로 전문가급 상품 이미지를 완성하세요
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card hoverable padding="lg" className="h-full">
                <CardContent>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-bold text-white shadow-lg">
                      {step.number}
                    </div>
                    <div className="text-5xl">{step.icon}</div>
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[#18181b]">
                    {step.title}
                  </h3>
                  <p className="whitespace-pre-line text-base leading-relaxed text-[#71717a]">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow between cards */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <div className="text-3xl text-purple-300">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Demo */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-8 sm:p-12">
          <div className="text-center">
            <p className="text-lg font-medium text-purple-900 mb-4">
              지금 바로 체험해보세요
            </p>
            <div className="flex justify-center gap-4">
              <div className="rounded-lg bg-white p-3 shadow-md">
                <div className="h-32 w-24 rounded bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">📦</span>
                </div>
                <p className="mt-2 text-xs text-[#71717a]">원본</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-lg">
                <div className="h-32 w-24 rounded bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <p className="mt-2 text-xs font-medium text-purple-600">
                  30초 완성
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
