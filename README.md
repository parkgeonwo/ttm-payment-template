# Payment Service with Creem Integration

Next.js 15 + Supabase + Creem 결제 시스템을 통합한 프로젝트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 15.5.5, React 19.1.0, Tailwind CSS
- **Auth & DB**: Supabase
- **Payment**: Creem
- **State Management**: TanStack Query (React Query)
- **Notifications**: Sonner
- **Language**: TypeScript

## 📁 프로젝트 구조

```
├── app/
│   ├── api/webhooks/creem/     # Creem 웹훅 엔드포인트
│   ├── dashboard/              # 대시보드 페이지
│   ├── login/                  # 로그인 페이지
│   └── auth/                   # 인증 콜백
├── components/
│   ├── Header.tsx              # 헤더
│   └── PricingPlans.tsx        # 요금제 (Creem 연동)
├── hooks/
│   ├── creem-hook.ts           # Creem React Hooks
│   └── user-hook.ts            # User React Hooks
├── lib/supabase/
│   ├── client.ts               # 브라우저 클라이언트
│   ├── server.ts               # 서버 클라이언트
│   └── admin.ts                # Admin 클라이언트
├── providers/
│   └── query-provider.tsx      # React Query Provider
├── services/
│   ├── creem.ts                # Creem API 통신
│   └── user.ts                 # 사용자 서비스
├── types/
│   ├── creem.ts                # Creem 타입
│   └── user.ts                 # User 타입
└── supabase/migrations/        # DB 마이그레이션
```

## ⚙️ 설정

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Creem Payment
CREEM_API_KEY=your_creem_api_key
CREEM_BASE_URL=https://api.creem.io
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
```

### 2. 데이터베이스 마이그레이션

Supabase SQL Editor에서 `supabase/migrations/001_add_payment_fields.sql` 파일을 실행하세요:

```sql
-- profiles 테이블에 customer_id, subscription 컬럼 추가
-- 인덱스 생성
-- RLS 정책 설정
```

### 3. Creem 설정

1. [Creem 대시보드](https://creem.io)에서 계정 생성
2. 상품(Product) 생성 및 Product ID 확보
3. `components/PricingPlans.tsx`에서 `productId` 업데이트
4. 웹훅 URL 설정: `https://your-domain.com/api/webhooks/creem`

### 4. 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 💳 결제 플로우

### 1. 사용자 플랜 선택
- 사용자가 요금제 "선택하기" 버튼 클릭
- 로그인 확인 (미로그인 시 로그인 페이지로 리다이렉트)

### 2. Checkout 생성
- `services/creem.ts:createCheckout()` 호출
- Creem API에 결제 세션 생성 요청

### 3. Creem 결제 페이지
- 사용자를 Creem 호스팅 결제 페이지로 리다이렉트
- 카드 정보 입력 및 결제 처리

### 4. 웹훅 처리
- Creem이 `app/api/webhooks/creem/route.ts`로 웹훅 전송
- 서명 검증 (HMAC-SHA256)
- 이벤트 타입별 처리:
  - `checkout.completed`: 구독 정보 저장, Customer ID 저장
  - `subscription.paid`: 구독 정보 업데이트
  - `subscription.canceled`: 구독 취소 처리

### 5. 대시보드 표시
- 사용자가 대시보드에서 구독 정보 확인
- Customer Portal 링크로 구독 관리

## 🔐 보안

- ✅ 웹훅 서명 검증 (HMAC-SHA256)
- ✅ RLS (Row Level Security) 정책
- ✅ Admin 클라이언트는 서버에서만 사용
- ✅ 환경 변수로 API 키 관리
- ✅ 카드 정보는 Creem이 처리 (PCI-DSS 준수)

## 📊 주요 기능

- ✅ **인증**: Supabase 인증 (로그인/로그아웃)
- ✅ **요금제 표시**: 3개 플랜 (Basic, Pro, Enterprise)
- ✅ **결제**: Creem Checkout 생성 및 리다이렉트
- ✅ **웹훅**: 결제 완료, 구독 갱신, 취소 처리
- ✅ **구독 관리**: Customer Portal 연동
- ✅ **대시보드**: 계정 정보 및 구독 정보 표시

## 🔧 개발 참고사항

### Product ID 설정
`components/PricingPlans.tsx`에서 실제 Creem Product ID로 변경:

```typescript
const plans: PricingPlan[] = [
  {
    id: 'basic',
    productId: 'prod_your_actual_basic_id', // 실제 ID로 변경
    // ...
  },
  // ...
]
```

### 웹훅 테스트
로컬 개발 시 [ngrok](https://ngrok.com) 사용:

```bash
ngrok http 3000
# 생성된 URL을 Creem 웹훅 설정에 추가
# https://xyz.ngrok.io/api/webhooks/creem
```

## 📝 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Creem API 문서](https://docs.creem.io)
- [TanStack Query 문서](https://tanstack.com/query/latest)

## 🎯 다음 단계

- [ ] 월간/연간 플랜 토글
- [ ] 할인 코드 기능
- [ ] 구독 업그레이드/다운그레이드
- [ ] 이메일 알림
- [ ] 어드민 대시보드
