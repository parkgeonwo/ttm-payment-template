import Card, { CardContent } from '@/components/ui/Card'

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: '하루 종일 걸리던 이미지 작업이 이제 점심시간에 끝나요!',
      author: '김지은',
      role: '의류 스마트스토어 운영 3년차',
      avatar: '👩‍💼',
    },
    {
      rating: 5,
      text: '월 50만원 촬영비가 5만원으로. 마진이 확 늘었어요 👍',
      author: '박민수',
      role: '액세서리 쿠팡 셀러',
      avatar: '👨‍💻',
    },
    {
      rating: 5,
      text: 'AI라고 믿을 수 없을 정도로 퀄리티가 진짜 좋아요',
      author: '이서연',
      role: '홈데코 브랜드 대표',
      avatar: '👩‍🎨',
    },
    {
      rating: 5,
      text: '이미지 바꾸고 전환율이 30% 넘게 올랐습니다!',
      author: '최동욱',
      role: '스포츠용품 판매',
      avatar: '👨‍🏫',
    },
  ]

  return (
    <section className="bg-[#08090a] py-20 sm:py-24 border-b border-[#23252a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#f7f8f8] tracking-[-0.022em] sm:text-5xl mb-4">
            이미 수백 명의 셀러가
            <br />
            <span className="bg-gradient-to-r from-[#7170ff] to-[#828fff] bg-clip-text text-transparent">사용 중입니다</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-2xl text-[#f2c94c]">
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-[15px] font-medium text-[#f7f8f8]">
              4.9/5.0 평균 평점
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} hoverable padding="lg" className="h-full">
              <CardContent>
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#f2c94c]">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-[13px] leading-relaxed text-[#d0d6e0]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#18182f] to-[#232342] text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#f7f8f8]">
                      {testimonial.author}
                    </p>
                    <p className="text-[11px] text-[#8a8f98]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#141516] border border-[#23252a] px-6 py-3">
            <span className="text-2xl">🎉</span>
            <span className="text-[13px] font-medium text-[#f7f8f8]">
              매일 30명 이상의 새로운 셀러가 가입하고 있어요
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
