'use client'

import { useState } from 'react'
import Card, { CardContent } from '@/components/ui/Card'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'AI가 만든 이미지도 상업적으로 사용할 수 있나요?',
      answer:
        '네, 생성하신 모든 이미지는 100% 상업적 이용이 가능합니다. 저작권 걱정 없이 쇼핑몰, SNS, 광고 등 어디든 자유롭게 사용하세요.',
    },
    {
      question: '결과물이 마음에 안 들면 환불 가능한가요?',
      answer:
        '첫 결제 후 7일 이내 전액 환불 가능합니다. 또한 크레딧을 사용하지 않았다면 언제든 환불해드립니다.',
    },
    {
      question: '내 상품에 맞는 AI 모델이 있을까요?',
      answer:
        '100종 이상의 다양한 AI 모델을 제공합니다. 성별, 연령, 체형, 피부톤 등 원하는 조건으로 필터링하여 브랜드에 딱 맞는 모델을 찾으실 수 있습니다.',
    },
    {
      question: '한 번에 몇 장까지 생성할 수 있나요?',
      answer:
        '프로 플랜 이상에서는 배치 처리로 한 번에 50-100장까지 동시에 생성 가능합니다. 대량 작업도 몇 분이면 완료됩니다.',
    },
    {
      question: '기술적인 지식이 없어도 사용할 수 있나요?',
      answer:
        '물론입니다! 클릭 3번이면 완성되는 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다. 온보딩 튜토리얼도 제공됩니다.',
    },
    {
      question: '생성된 이미지 품질은 어떤가요?',
      answer:
        '최대 4K 해상도로 생성되며, 프로 사진작가가 찍은 것과 구분이 어려울 정도의 퀄리티를 자랑합니다. 직접 무료 체험으로 확인해보세요.',
    },
  ]

  return (
    <section className="bg-[#08090a] py-20 sm:py-24 border-b border-[#23252a]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#f7f8f8] tracking-[-0.022em] sm:text-5xl mb-4">
            자주 묻는 질문
          </h2>
          <p className="mt-4 text-[15px] text-[#8a8f98]">
            궁금한 점이 있으신가요? 여기서 답을 찾아보세요
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all"
              hoverable
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-[#f7f8f8] mb-2">
                      Q. {faq.question}
                    </h3>
                    {openIndex === index && (
                      <p className="mt-3 text-[13px] leading-relaxed text-[#8a8f98]">
                        A. {faq.answer}
                      </p>
                    )}
                  </div>
                  <div className="text-2xl text-[#828fff] transition-transform">
                    {openIndex === index ? '−' : '+'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#8a8f98] mb-4 text-[13px]">더 궁금한 점이 있으신가요?</p>
          <a
            href="mailto:support@selloframe.com"
            className="text-[#828fff] text-[13px] font-medium hover:underline"
          >
            support@selloframe.com
          </a>
          <span className="mx-2 text-[#34343a]">|</span>
          <span className="text-[#8a8f98] text-[13px]">카카오톡 상담: 평일 9-6시</span>
        </div>
      </div>
    </section>
  )
}
