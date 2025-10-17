import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#08090a]">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-[#0f1011]/80 backdrop-blur-lg border-b border-[#23252a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-[17px] font-semibold text-[#f7f8f8] tracking-[-0.022em]">
                Selloframe
              </h1>
            </Link>
            <Link
              href="/"
              className="text-[13px] font-medium text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
            >
              홈으로
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-invert prose-sm max-w-none">
          <h1 className="text-4xl font-bold text-[#f7f8f8] tracking-[-0.022em] mb-4">
            Selloframe 서비스 이용약관
          </h1>
          <p className="text-[15px] text-[#8a8f98] mb-12">
            시행일자: 2025년 10월 18일
          </p>

          <div className="text-[15px] text-[#d0d6e0] leading-relaxed space-y-8">
            <p>
              본 이용약관(이하 &ldquo;약관&rdquo;)은 Selloframe(이하 &ldquo;서비스&rdquo;)을 운영하는 대표자 박건우(이하 &ldquo;회사&rdquo;)가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제1조 (목적)
              </h2>
              <p>
                본 약관은 회사가 제공하는 AI 기반 쇼핑몰 이미지 생성 서비스인 Selloframe의 이용조건 및 절차, 회사와 회원 간의 권리와 의무, 책임사항 등을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제2조 (용어의 정의)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong className="text-[#f7f8f8]">&ldquo;서비스&rdquo;</strong>란 회사가 제공하는 AI 기반 상품 이미지 생성 플랫폼 Selloframe 및 관련 제반 서비스를 의미합니다.</li>
                <li><strong className="text-[#f7f8f8]">&ldquo;회원&rdquo;</strong>이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 의미합니다.</li>
                <li><strong className="text-[#f7f8f8]">&ldquo;크레딧&rdquo;</strong>이란 서비스 내에서 이미지 생성 등의 기능을 이용하기 위해 필요한 가상의 결제 단위를 의미합니다.</li>
                <li><strong className="text-[#f7f8f8]">&ldquo;AI 생성 이미지&rdquo;</strong>란 회원이 업로드한 원본 이미지와 입력한 조건을 기반으로 AI가 생성한 결과물을 의미합니다.</li>
                <li><strong className="text-[#f7f8f8]">&ldquo;구독 플랜&rdquo;</strong>이란 정기 결제를 통해 매월 일정량의 크레딧과 서비스 기능을 제공받는 상품을 의미합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제3조 (약관의 효력 및 변경)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
                <li>회사가 약관을 변경할 경우 적용일자 및 변경사유를 명시하여 그 적용일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.</li>
                <li>회원이 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제4조 (회원가입)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회원가입은 이용자가 본 약관에 동의하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 가입신청을 하고, 회사가 이를 승낙함으로써 체결됩니다.</li>
                <li>회사는 다음 각 호에 해당하는 경우 회원가입을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>타인의 명의를 도용한 경우</li>
                    <li>허위 정보를 기재한 경우</li>
                    <li>만 14세 미만인 경우</li>
                    <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                  </ul>
                </li>
                <li>회원은 가입 시 기재한 정보가 변경된 경우 즉시 수정해야 하며, 이를 게을리하여 발생한 불이익에 대해 회사는 책임지지 않습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제5조 (서비스의 제공)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 다음과 같은 서비스를 제공합니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>AI 기반 상품 이미지 생성 서비스</li>
                    <li>AI 가상 모델 합성 서비스</li>
                    <li>배경 생성 및 변경 서비스</li>
                    <li>이미지 편집 및 보정 서비스</li>
                    <li>배치 처리 및 일괄 생성 서비스</li>
                    <li>쇼핑몰 플랫폼 연동 서비스</li>
                    <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
                  </ul>
                </li>
                <li>회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있으며, 중요한 변경사항은 사전에 공지합니다.</li>
                <li>서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 시스템 점검, 서버 증설, 네트워크 장애 등의 사유로 서비스가 일시 중단될 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제6조 (크레딧 및 결제)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회원은 크레딧을 구매하거나 구독 플랜에 가입하여 서비스를 이용할 수 있습니다.</li>
                <li>크레딧은 다음과 같이 소진됩니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>이미지 생성 1회당 1 크레딧 (플랜에 따라 상이할 수 있음)</li>
                    <li>배치 처리 시 생성된 이미지 수만큼 크레딧 차감</li>
                  </ul>
                </li>
                <li>구독 플랜의 미사용 크레딧은 익월로 이월되며, 최대 3개월까지 누적 가능합니다.</li>
                <li>구독 플랜을 해지하거나 결제가 실패할 경우, 해당 월의 미사용 크레딧은 소멸됩니다.</li>
                <li>구매한 추가 크레딧의 유효기간은 구매일로부터 1년입니다.</li>
                <li>결제는 Creem 결제대행 서비스를 통해 처리되며, 신용카드, 계좌이체, 간편결제 등의 방법을 이용할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제7조 (환불 정책)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회원은 다음의 경우 결제일로부터 7일 이내에 전액 환불을 요청할 수 있습니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>서비스를 이용하지 않은 경우</li>
                    <li>크레딧을 소진하지 않은 경우</li>
                  </ul>
                </li>
                <li>크레딧을 일부라도 사용한 경우, 사용한 크레딧에 해당하는 금액을 제외한 잔액을 환불합니다.</li>
                <li>구독 플랜의 경우 중도 해지 시 일할 계산하여 환불하지 않으며, 현재 결제 주기가 종료될 때까지 서비스를 이용할 수 있습니다.</li>
                <li>회원의 귀책사유로 인한 환불 시 환불 수수료가 부과될 수 있습니다.</li>
                <li>환불은 원칙적으로 결제한 수단과 동일한 방법으로 처리됩니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제8조 (저작권 및 지적재산권)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사가 제공하는 서비스, 소프트웨어, 디자인, 로고, AI 모델 등에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.</li>
                <li><strong className="text-[#828fff]">회원이 서비스를 통해 생성한 AI 이미지에 대한 저작권 및 상업적 이용 권리는 회원에게 귀속됩니다.</strong></li>
                <li>단, 회원은 다음 사항을 준수해야 합니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>타인의 저작권을 침해하는 원본 이미지를 업로드하지 않을 것</li>
                    <li>불법적이거나 유해한 콘텐츠 생성에 서비스를 이용하지 않을 것</li>
                    <li>생성된 이미지가 특정인의 초상권을 침해하지 않도록 주의할 것</li>
                  </ul>
                </li>
                <li>회사는 서비스 개선, 마케팅, 연구 목적으로 회원이 생성한 이미지를 익명화하여 활용할 수 있습니다. 단, 회원의 명시적 동의 없이 대외적으로 공개하지 않습니다.</li>
                <li>회원은 서비스를 통해 생성한 이미지를 온라인 쇼핑몰, SNS, 광고 등 상업적 용도로 자유롭게 사용할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제9조 (회원의 의무)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회원은 다음 행위를 하여서는 안 됩니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>타인의 정보 도용</li>
                    <li>회사가 게시한 정보의 변경</li>
                    <li>회사가 정한 정보 이외의 정보 송신 또는 게시</li>
                    <li>회사와 기타 제3자의 저작권 등 지적재산권 침해</li>
                    <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>외설적이거나 폭력적인 메시지, 화상, 음성 등을 공개 또는 게시하는 행위</li>
                    <li>서비스를 역공학, 디컴파일, 디스어셈블하거나 기타 방법으로 소스코드를 추출하려는 행위</li>
                    <li>자동화된 수단을 통해 서비스에 접근하거나 대량으로 데이터를 수집하는 행위</li>
                    <li>불법적인 목적으로 서비스를 이용하는 행위</li>
                  </ul>
                </li>
                <li>회원은 관계 법령, 본 약관, 이용안내 및 서비스와 관련하여 공지한 주의사항 등을 준수해야 합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제10조 (서비스 이용 제한)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 회원이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.</li>
                <li>회사는 다음의 경우 사전 통지 없이 즉시 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-[#8a8f98]">
                    <li>불법 콘텐츠 생성</li>
                    <li>타인의 권리 침해</li>
                    <li>서비스 약관 중대한 위반</li>
                    <li>부정 결제</li>
                  </ul>
                </li>
                <li>이용 제한으로 인해 발생한 불이익에 대해 회사는 책임을 지지 않습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제11조 (면책조항)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
                <li>회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임지지 않습니다.</li>
                <li>회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임지지 않습니다.</li>
                <li>회사는 AI가 생성한 이미지의 정확성, 완전성, 적합성에 대해 보증하지 않으며, 생성된 이미지 사용으로 인한 분쟁에 대해 책임지지 않습니다.</li>
                <li>회사는 회원이 생성한 이미지가 제3자의 저작권, 초상권, 상표권 등을 침해하는지 여부를 확인할 의무가 없으며, 이로 인한 법적 책임은 회원이 부담합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제12조 (손해배상)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사가 고의 또는 중과실로 회원에게 손해를 입힌 경우, 회사는 그 손해를 배상할 책임이 있습니다.</li>
                <li>회원이 본 약관을 위반하여 회사에 손해를 입힌 경우, 회원은 회사에 그 손해를 배상할 책임이 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제13조 (분쟁 해결)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사와 회원 간 발생한 분쟁에 관한 소송은 민사소송법에 따른 관할 법원으로 합니다.</li>
                <li>회사와 회원 간 제기된 소송에는 대한민국 법을 적용합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제14조 (개인정보 보호)
              </h2>
              <p>
                회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 별도의 &ldquo;개인정보 처리방침&rdquo;에 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제15조 (통지)
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사가 회원에게 통지하는 경우 본 약관에 별도 규정이 없는 한 서비스 내 공지사항, 이메일 등으로 통지할 수 있습니다.</li>
                <li>회사는 불특정다수 회원에 대한 통지의 경우 서비스 공지사항에 게시함으로써 개별 통지에 갈음할 수 있습니다.</li>
              </ol>
            </section>

            <section className="mt-16 pt-8 border-t border-[#23252a]">
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mb-4">
                부칙
              </h2>
              <p className="mb-8">
                <strong className="text-[#f7f8f8]">시행일:</strong> 본 약관은 2025년 10월 18일부터 시행합니다.
              </p>
              <div className="text-[#8a8f98]">
                <p><strong className="text-[#f7f8f8]">대표자:</strong> 박건우</p>
                <p><strong className="text-[#f7f8f8]">이메일:</strong> itstime2make@gmail.com</p>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1011] border-t border-[#23252a] py-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[13px] text-[#62666d]">
            © 2025 Selloframe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
