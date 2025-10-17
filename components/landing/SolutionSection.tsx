import Badge from '@/components/ui/Badge'

export default function SolutionSection() {
  const solutions = [
    {
      step: '01',
      title: '제품 사진 업로드',
      description: '촬영한 제품 이미지를 간단히 업로드하세요',
      icon: '📤',
    },
    {
      step: '02',
      title: 'AI가 자동 배경 제거',
      description: '몇 초 만에 완벽하게 배경이 제거됩니다',
      icon: '✂️',
    },
    {
      step: '03',
      title: '원하는 배경 선택',
      description: '다양한 템플릿 중 브랜드에 맞는 배경을 선택하세요',
      icon: '🎨',
    },
    {
      step: '04',
      title: '완성된 이미지 다운로드',
      description: '고화질 쇼핑몰용 이미지를 바로 사용하세요',
      icon: '⬇️',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#08090a] to-[#0f1011] border-b border-[#23252a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            How it Works
          </Badge>
          <h2 className="text-3xl font-bold tracking-[-0.022em] text-[#f7f8f8] sm:text-4xl mb-4">
            클릭 4번이면 끝
          </h2>
          <p className="text-[15px] text-[#8a8f98] max-w-2xl mx-auto">
            복잡한 편집 프로그램? 필요 없습니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative rounded-xl bg-[#141516] border border-[#23252a] p-6 text-center"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#5e6ad2] flex items-center justify-center text-[11px] font-bold text-white">
                {solution.step}
              </div>
              <div className="text-5xl mb-4 mt-2">{solution.icon}</div>
              <h3 className="text-[15px] font-medium text-[#f7f8f8] mb-2">
                {solution.title}
              </h3>
              <p className="text-[13px] text-[#8a8f98]">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[13px] text-[#8a8f98]">
            평균 소요 시간:{' '}
            <span className="text-[#828fff] font-semibold">1분 미만</span>
          </p>
        </div>
      </div>
    </section>
  )
}
