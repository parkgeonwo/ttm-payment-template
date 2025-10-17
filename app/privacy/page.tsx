import Link from 'next/link'

export default function PrivacyPage() {
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
            Selloframe 개인정보 처리방침
          </h1>
          <p className="text-[15px] text-[#8a8f98] mb-12">
            시행일자: 2025년 10월 18일
          </p>

          <div className="text-[15px] text-[#d0d6e0] leading-relaxed space-y-8">
            <p>
              Selloframe을 운영하는 대표자 박건우(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제1조 (개인정보의 수집 목적 및 항목)
              </h2>

              <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mt-8 mb-3">
                1. 수집 목적
              </h3>
              <p className="mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(1) 회원 가입 및 관리</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>회원 가입 의사 확인</li>
                    <li>회원제 서비스 제공에 따른 본인 식별·인증</li>
                    <li>회원자격 유지·관리</li>
                    <li>서비스 부정이용 방지</li>
                    <li>각종 고지·통지</li>
                    <li>고충처리</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(2) 서비스 제공</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>AI 이미지 생성 서비스 제공</li>
                    <li>맞춤형 서비스 제공</li>
                    <li>본인인증</li>
                    <li>콘텐츠 제공</li>
                    <li>청구서 발송</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(3) 결제 및 정산</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>유료 서비스 이용에 따른 요금 결제</li>
                    <li>구매 및 요금 결제</li>
                    <li>환불 처리</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(4) 마케팅 및 광고 활용</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                    <li>이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                    <li>서비스의 유효성 확인</li>
                    <li>접속빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mt-8 mb-3">
                2. 수집하는 개인정보 항목
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(1) 필수 수집 항목</h4>

                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-[#d0d6e0] mb-1">회원가입 시</p>
                      <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                        <li>이메일 주소</li>
                        <li>비밀번호 (암호화 저장)</li>
                        <li>이름 또는 닉네임</li>
                        <li>휴대전화번호 (본인인증 시)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-[#d0d6e0] mb-1">소셜 로그인 이용 시</p>
                      <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                        <li>소셜 계정 정보 (구글, 카카오, 네이버 등)</li>
                        <li>이메일 주소</li>
                        <li>프로필 정보 (이름, 프로필 사진)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-[#d0d6e0] mb-1">유료 서비스 이용 시</p>
                      <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                        <li>신용카드 정보 (카드번호, 유효기간 등) - Creem 결제대행사를 통해 처리</li>
                        <li>은행 계좌 정보 (환불 처리 시)</li>
                        <li>청구지 주소</li>
                        <li>구매 내역</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-[#d0d6e0] mb-1">사업자 회원 가입 시</p>
                      <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                        <li>사업자등록번호</li>
                        <li>상호명</li>
                        <li>대표자명</li>
                        <li>사업장 주소</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(2) 선택 수집 항목</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>회사명</li>
                    <li>업종</li>
                    <li>웹사이트 URL</li>
                    <li>마케팅 수신 동의 여부</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[17px] font-semibold text-[#f7f8f8] mb-2">(3) 자동 수집 항목</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>서비스 이용 기록</li>
                    <li>접속 로그</li>
                    <li>쿠키</li>
                    <li>접속 IP 정보</li>
                    <li>디바이스 정보 (OS, 브라우저 종류 등)</li>
                    <li>생성한 이미지 메타데이터 (해상도, 생성 시간 등)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제2조 (개인정보의 수집 방법)
              </h2>
              <p className="mb-3">회사는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>홈페이지 회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
                <li>소셜 로그인 (구글, 카카오, 네이버 등)을 통한 제공</li>
                <li>제휴사로부터의 제공</li>
                <li>생성정보 수집 툴을 통한 자동 수집</li>
                <li>이메일을 통한 상담 과정</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제3조 (개인정보의 처리 및 보유 기간)
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">1. 회원 정보</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li><strong className="text-[#d0d6e0]">보유 기간</strong>: 회원 탈퇴 시까지</li>
                    <li><strong className="text-[#d0d6e0]">탈퇴 후</strong>: 즉시 삭제 (단, 관련 법령에 따라 보존해야 하는 경우 예외)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">2. 결제 정보</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li><strong className="text-[#d0d6e0]">표시·광고에 관한 기록</strong>: 6개월 (전자상거래법)</li>
                    <li><strong className="text-[#d0d6e0]">계약 또는 청약철회 등에 관한 기록</strong>: 5년 (전자상거래법)</li>
                    <li><strong className="text-[#d0d6e0]">대금결제 및 재화 등의 공급에 관한 기록</strong>: 5년 (전자상거래법)</li>
                    <li><strong className="text-[#d0d6e0]">소비자의 불만 또는 분쟁처리에 관한 기록</strong>: 3년 (전자상거래법)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">3. 서비스 이용 기록</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li><strong className="text-[#d0d6e0]">통신비밀보호법</strong>: 3개월</li>
                    <li><strong className="text-[#d0d6e0]">방문 기록</strong>: 3개월</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">4. 생성 이미지 원본 및 결과물</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li><strong className="text-[#d0d6e0]">보유 기간</strong>: 회원이 삭제 요청 시까지 또는 서비스 종료 시까지</li>
                    <li><strong className="text-[#d0d6e0]">백업 데이터</strong>: 삭제 요청 후 30일 이내 완전 삭제</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제4조 (개인정보의 제3자 제공)
              </h2>
              <p className="mb-4">
                회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em]">1. 이용자의 동의가 있는 경우</h3>

                <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em]">2. 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</h3>

                <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em]">3. 서비스 제공을 위해 필요한 경우</h3>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border border-[#23252a]">
                  <thead>
                    <tr className="bg-[#141516]">
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">제공받는 자</th>
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">제공 목적</th>
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">제공 항목</th>
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">보유 및 이용기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">Creem (결제대행사)</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">결제 처리</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">신용카드 정보, 구매자 정보</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">거래 종료 후 5년</td>
                    </tr>
                    <tr className="bg-[#141516]/50">
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">Supabase</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">데이터 저장 및 처리</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">서비스 이용 정보, 생성 이미지</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">회원 탈퇴 또는 계약 종료 시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제5조 (개인정보 처리의 위탁)
              </h2>
              <p className="mb-4">
                회사는 서비스 향상을 위해 개인정보 처리 업무를 외부 전문업체에 위탁할 수 있으며, 위탁 시 관련 법령에 따라 안전하게 관리됩니다.
              </p>

              <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mt-6 mb-3">현재 위탁 현황</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#23252a]">
                  <thead>
                    <tr className="bg-[#141516]">
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">수탁업체</th>
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">위탁 업무 내용</th>
                      <th className="border border-[#23252a] px-4 py-2 text-[13px] font-semibold text-[#f7f8f8]">개인정보의 보유 및 이용기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">Supabase</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">클라우드 서버 운영 및 데이터 저장</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">위탁계약 종료 시까지</td>
                    </tr>
                    <tr className="bg-[#141516]/50">
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">Creem</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">결제 및 정산 처리</td>
                      <td className="border border-[#23252a] px-4 py-2 text-[13px]">위탁계약 종료 시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-[13px] text-[#8a8f98]">
                위탁업체가 변경될 경우, 변경 내용을 본 개인정보 처리방침에 공개합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제6조 (정보주체의 권리·의무 및 행사방법)
              </h2>
              <p className="mb-4">이용자는 개인정보 주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">1. 개인정보 열람 요구</h3>
                  <p className="text-[#8a8f98]">회원은 언제든지 본인의 개인정보를 조회하거나 열람할 수 있습니다.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">2. 개인정보 정정·삭제 요구</h3>
                  <p className="text-[#8a8f98]">회원은 잘못된 개인정보에 대해 정정 또는 삭제를 요구할 수 있습니다.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">3. 개인정보 처리정지 요구</h3>
                  <p className="text-[#8a8f98]">회원은 개인정보의 처리 정지를 요구할 수 있습니다.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">4. 권리 행사 방법</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>웹사이트 내 &lsquo;마이페이지&rsquo;를 통한 직접 처리</li>
                    <li>이메일을 통한 요청</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-[#828fff]">
                회사는 요청을 받은 날로부터 10일 이내에 조치 결과를 통지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제7조 (개인정보의 파기)
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">1. 파기 절차</h3>
                  <p className="text-[#8a8f98]">
                    이용자의 개인정보는 목적 달성 후 즉시 파기됩니다. 단, 관련 법령에 따라 보존해야 하는 경우 별도의 데이터베이스(DB)로 옮겨져 법정 기간 동안 보관됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">2. 파기 방법</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li><strong className="text-[#d0d6e0]">전자적 파일</strong>: 복구 불가능한 방법으로 영구 삭제</li>
                    <li><strong className="text-[#d0d6e0]">종이 문서</strong>: 분쇄기로 분쇄하거나 소각</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">3. 파기 시점</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>회원 탈퇴 시: 즉시 파기 (법령에 따른 보존 제외)</li>
                    <li>보유 기간 만료 시: 만료일로부터 5일 이내</li>
                    <li>개인정보 처리 목적 달성 시: 목적 달성 즉시</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제8조 (개인정보의 안전성 확보조치)
              </h2>
              <p className="mb-4">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">1. 관리적 조치</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>개인정보 취급 직원의 최소화 및 교육</li>
                    <li>내부관리계획 수립 및 시행</li>
                    <li>정기적인 자체 감사 실시</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">2. 기술적 조치</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>개인정보 암호화 (비밀번호, 결제정보 등)</li>
                    <li>해킹 등에 대비한 보안프로그램 설치 및 주기적 갱신</li>
                    <li>접근통제 시스템 설치</li>
                    <li>접속기록의 보관 및 위변조 방지</li>
                    <li>백업 시스템 운영</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">3. 물리적 조치</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>개인정보 보관 장소에 대한 접근 통제</li>
                    <li>문서보안을 위한 잠금장치 사용</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부)
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">1. 쿠키(Cookie)의 사용</h3>
                  <p className="text-[#8a8f98]">
                    회사는 개인화되고 맞춤화된 서비스를 제공하기 위해 이용자의 정보를 저장하고 수시로 불러오는 &lsquo;쿠키(cookie)&rsquo;를 사용합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-2">2. 쿠키의 설치·운영 및 거부</h3>
                  <p className="mb-2"><strong className="text-[#d0d6e0]">설정 방법 (예시)</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#8a8f98]">
                    <li>Internet Explorer: 도구 &gt; 인터넷 옵션 &gt; 개인정보 &gt; 설정</li>
                    <li>Chrome: 설정 &gt; 고급 설정 표시 &gt; 개인정보 &gt; 콘텐츠 설정 &gt; 쿠키</li>
                  </ul>
                  <p className="mt-2 text-[#8a8f98]">
                    쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제10조 (개인정보 보호책임자)
              </h2>
              <p className="mb-4">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>

              <div className="bg-[#141516] border border-[#23252a] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#f7f8f8] tracking-[-0.022em] mb-4">개인정보 보호책임자</h3>
                <ul className="space-y-2">
                  <li><strong className="text-[#d0d6e0]">성명:</strong> <span className="text-[#8a8f98]">박건우</span></li>
                  <li><strong className="text-[#d0d6e0]">직책:</strong> <span className="text-[#8a8f98]">대표</span></li>
                  <li><strong className="text-[#d0d6e0]">이메일:</strong> <span className="text-[#828fff]">itstime2make@gmail.com</span></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제11조 (권익침해 구제방법)
              </h2>
              <p className="mb-4">
                정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
              </p>

              <ul className="space-y-2 text-[#8a8f98]">
                <li><strong className="text-[#d0d6e0]">개인정보 침해신고센터:</strong> (국번없이) 118 / privacy.kisa.or.kr</li>
                <li><strong className="text-[#d0d6e0]">개인정보 분쟁조정위원회:</strong> (국번없이) 1833-6972 / www.kopico.go.kr</li>
                <li><strong className="text-[#d0d6e0]">대검찰청 사이버범죄수사단:</strong> (국번없이) 1301 / www.spo.go.kr</li>
                <li><strong className="text-[#d0d6e0]">경찰청 사이버안전국:</strong> (국번없이) 182 / cyberbureau.police.go.kr</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f7f8f8] tracking-[-0.022em] mt-12 mb-4">
                제12조 (개인정보 처리방침의 변경)
              </h2>
              <p>
                이 개인정보 처리방침은 2025년 10월 18일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <section className="mt-16 pt-8 border-t border-[#23252a]">
              <p className="mb-2 text-[#8a8f98]">
                <strong className="text-[#f7f8f8]">공고일자:</strong> 2025년 10월 18일
              </p>
              <p className="mb-8 text-[#8a8f98]">
                <strong className="text-[#f7f8f8]">시행일자:</strong> 2025년 10월 18일
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
