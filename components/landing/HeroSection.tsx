import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1011] to-[#08090a] py-20 sm:py-32 border-b border-[#23252a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-5xl font-bold tracking-[-0.022em] text-[#f7f8f8] sm:text-6xl lg:text-7xl">
              모델 섭외 없이도
              <br />
              <span className="bg-gradient-to-r from-[#7170ff] to-[#828fff] bg-clip-text text-transparent">
                쇼핑몰 이미지
              </span>
              <br />
              1분 만에 완성
            </h1>

            <p className="mt-6 text-xl leading-8 text-[#d0d6e0]">
              AI가 만드는 전문가급 상품 이미지
              <br />
              이제 클릭 몇 번이면 충분합니다
            </p>

            <p className="mt-4 text-lg font-medium text-[#828fff]">
              한 달에 50만원 쓰던 상품 촬영, 이제 만원으로 해결하세요
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button size="lg" className="text-base px-8 py-4 text-white">
                  무료로 시작하기 →
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="text-base px-8 py-4">
                2분 만에 둘러보기
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-3">
                <div className="relative rounded-2xl border-2 border-[#23252a] bg-[#141516] p-2">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#1c1c1f]">
                    <Image
                      src="/images/product.png"
                      alt="원본 제품 사진"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      priority
                    />
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
                <div className="relative rounded-2xl border-2 border-[#5e6ad2] bg-[#141516] p-2">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#18182f]">
                    <Image
                      src="/images/model.png"
                      alt="AI 생성 이미지"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      priority
                    />
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
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#141516] border border-[#23252a] p-4">
              <div className="text-2xl font-bold text-[#828fff]">94%</div>
              <div className="text-[11px] text-[#8a8f98]">비용 절감</div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-xl bg-[#141516] border border-[#23252a] p-4">
              <div className="text-2xl font-bold text-[#828fff]">1분</div>
              <div className="text-[11px] text-[#8a8f98]">제작 시간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
