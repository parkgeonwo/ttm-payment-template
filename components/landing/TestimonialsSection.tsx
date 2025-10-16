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
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#18181b] sm:text-5xl mb-4">
            이미 수백 명의 셀러가
            <br />
            <span className="text-purple-600">사용 중입니다</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-2xl text-yellow-500">
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-lg font-medium text-[#18181b]">
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
                    <span key={i} className="text-yellow-500">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-base leading-relaxed text-[#18181b]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#18181b]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[#71717a]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3">
            <span className="text-2xl">🎉</span>
            <span className="font-medium text-purple-900">
              매일 30명 이상의 새로운 셀러가 가입하고 있어요
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
