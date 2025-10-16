import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="mb-8 flex flex-wrap gap-3">
              <Badge variant="primary" size="md">
                ✓ 신용카드 등록 불필요
              </Badge>
              <Badge variant="primary" size="md">
                ✓ 10장 무료 체험
              </Badge>
              <Badge variant="primary" size="md">
                ✓ 언제든 해지 가능
              </Badge>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-[#18181b] sm:text-6xl lg:text-7xl">
              모델 섭외 없이도
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                쇼핑몰 이미지
              </span>
              <br />
              1분 만에 완성
            </h1>

            <p className="mt-6 text-xl leading-8 text-[#71717a]">
              AI가 만드는 전문가급 상품 이미지
              <br />
              이제 클릭 몇 번이면 충분합니다
            </p>

            <p className="mt-4 text-lg font-medium text-purple-600">
              한 달에 50만원 쓰던 상품 촬영, 이제 5만원으로 해결하세요
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button size="lg" className="text-base px-8 py-4">
                  무료로 시작하기 →
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="text-base px-8 py-4">
                2분 만에 둘러보기
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-[#71717a]">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span>4.9/5.0 평점</span>
              </div>
              <div>이미 1,247명의 셀러가 사용 중</div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-3">
                <div className="relative rounded-2xl border-2 border-[#e5e5e5] bg-white p-2 shadow-lg">
                  <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">📦</div>
                      <p className="text-sm text-[#71717a]">평범한 제품 사진</p>
                      <p className="text-xs text-[#a1a1aa] mt-1">배경 지저분</p>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <Badge variant="default" size="sm">
                      Before
                    </Badge>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="space-y-3 mt-8">
                <div className="relative rounded-2xl border-2 border-purple-500 bg-white p-2 shadow-2xl">
                  <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="text-sm text-[#18181b] font-medium">
                        AI 생성 이미지
                      </p>
                      <p className="text-xs text-[#71717a] mt-1">전문가급 퀄리티</p>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <Badge variant="primary" size="sm">
                      After: 30초 완성
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-xs text-[#71717a]">비용 절감</div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-xl bg-white p-4 shadow-xl">
              <div className="text-2xl font-bold text-purple-600">1분</div>
              <div className="text-xs text-[#71717a]">제작 시간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
