export default function PainPointSection() {
  const painPoints = [
    {
      icon: '💸',
      title: '스튜디오 촬영 비용 부담',
      description:
        '한 번 촬영에 50만원씩 나가는데, 매달 신상품이 계속 늘어나고 있어요...',
    },
    {
      icon: '⏰',
      title: '시간도 돈이다',
      description:
        '모델 섭외부터 스튜디오 예약까지 준비 시간만 일주일. 빠르게 출시해야 하는데...',
    },
    {
      icon: '📉',
      title: '평범한 이미지로는 경쟁력 없음',
      description:
        '스마트폰으로 찍은 사진은 너무 티 나고, 그렇다고 전문 촬영은 부담스럽고...',
    },
    {
      icon: '🔄',
      title: '시즌마다 반복되는 고민',
      description: '여름, 겨울 시즌마다 새 이미지 필요한데 매번 촬영 예산 고민',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#08090a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-[-0.022em] text-[#f7f8f8] sm:text-4xl mb-4">
            이런 고민, 하고 계신가요?
          </h2>
          <p className="text-[15px] text-[#8a8f98] max-w-2xl mx-auto">
            매달 늘어나는 상품 촬영 비용과 시간에 지치셨나요?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="relative rounded-xl bg-[#141516] border border-[#23252a] p-6 hover:border-[#34343a] transition-all"
            >
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-[15px] font-medium text-[#f7f8f8] mb-2">
                {point.title}
              </h3>
              <p className="text-[13px] text-[#8a8f98] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
