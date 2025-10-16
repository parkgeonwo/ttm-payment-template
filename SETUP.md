# 🚀 Setup Guide

이 가이드는 템플릿을 복제한 후 처음 설정하는 과정을 단계별로 안내합니다.

## 📋 사전 준비사항

시작하기 전에 다음 계정이 필요합니다:

- **Supabase 계정** - [https://supabase.com](https://supabase.com)
- **Creem 계정** - [https://creem.io](https://creem.io)
- **Node.js 20+** 설치
- **Git** 설치

## 🔧 Step 1: 프로젝트 복제 및 설치

```bash
# 프로젝트 복제
git clone [your-repo-url]
cd nextjs-supabase-creem-template

# 의존성 설치
npm install
```

## 🗄️ Step 2: Supabase 설정

### 2.1 Supabase 프로젝트 생성

1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 입력
4. 리전 선택 (가까운 지역 권장)
5. 프로젝트 생성 완료 대기 (약 2분)

### 2.2 API 키 확보

1. 프로젝트 대시보드에서 **Settings** → **API** 이동
2. 다음 정보를 복사:
   - **Project URL** (`https://[project-id].supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ 절대 클라이언트에 노출하지 마세요)

### 2.3 데이터베이스 마이그레이션

1. Supabase 대시보드에서 **SQL Editor** 이동
2. `supabase/migrations/001_create_profiles_table.sql` 파일 내용을 복사
3. SQL Editor에 붙여넣기 후 **Run** 클릭
4. 성공 메시지 확인

이 마이그레이션은 다음을 생성합니다:
- `profiles` 테이블 (사용자 정보 + 결제 정보)
- RLS (Row Level Security) 정책
- 자동 프로필 생성 트리거

### 2.4 인증 설정

1. **Authentication** → **Providers** 이동
2. **Email** provider 활성화
3. (선택) 소셜 로그인 provider 추가 (Google, GitHub 등)
4. **Settings** → **Auth** → **Site URL** 설정
   - Production: `https://your-domain.com`
   - Development: `http://localhost:3000`
5. **Redirect URLs** 추가:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

## 💳 Step 3: Creem 설정

### 3.1 Creem 계정 생성

1. [Creem Dashboard](https://creem.io)에서 계정 생성
2. 회사 정보 입력 및 인증 완료

### 3.2 API 키 발급

1. **Settings** → **API Keys** 이동
2. **Create API Key** 클릭
3. Production과 Test 환경 각각 생성
4. API 키를 안전한 곳에 저장

### 3.3 상품(Product) 생성

1. **Products** → **Create Product** 클릭
2. Basic 플랜 생성:
   - Name: Basic Plan
   - Price: $29/month
   - Billing Period: Monthly
   - **Product ID 복사** (예: `prod_abc123...`)
3. Pro 플랜 생성:
   - Name: Pro Plan
   - Price: $39/month
   - Billing Period: Monthly
   - **Product ID 복사**
4. (선택) Enterprise 플랜 생성 또는 별도 문의 방식 유지

### 3.4 웹훅 설정

1. **Settings** → **Webhooks** 이동
2. **Add Webhook** 클릭
3. Webhook URL 입력:
   - Development: ngrok URL 사용 (아래 참고)
   - Production: `https://your-domain.com/api/webhooks/creem`
4. 이벤트 선택:
   - ✅ `checkout.completed`
   - ✅ `subscription.paid`
   - ✅ `subscription.canceled`
5. **Webhook Secret** 복사 (예: `whsec_abc123...`)

## 🔐 Step 4: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 실제 값으로 업데이트:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your-service-role-key

# Creem Payment Configuration (Production)
CREEM_API_KEY=creem_your_production_key
CREEM_BASE_URL=https://api.creem.io
CREEM_WEBHOOK_SECRET=whsec_your_webhook_secret

# For Testing (uncomment to use test mode)
# CREEM_API_KEY=creem_test_your_test_key
# CREEM_BASE_URL=https://test-api.creem.io
```

⚠️ **보안 주의사항:**
- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- Production 키는 프로덕션 환경에서만 사용하세요
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용됩니다

## 🛠️ Step 5: 코드 커스터마이징

### 5.1 Product ID 업데이트

`components/PricingPlans.tsx` 파일을 열고 Product ID 업데이트:

```typescript
const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    productId: 'prod_YOUR_ACTUAL_BASIC_ID', // ← Creem에서 복사한 ID로 교체
    // ...
  },
  {
    id: 'pro',
    name: 'Pro',
    productId: 'prod_YOUR_ACTUAL_PRO_ID', // ← Creem에서 복사한 ID로 교체
    // ...
  },
]
```

### 5.2 앱 이름 변경

`components/Header.tsx` 파일에서 앱 이름 변경:

```typescript
<h1 className="text-xl font-bold text-gray-900">Your App Name</h1>
```

### 5.3 요금제 정보 커스터마이징

`components/PricingPlans.tsx`에서 플랜 정보를 비즈니스에 맞게 수정:
- 가격
- 기능 목록
- 설명
- 플랜 이름

## 🧪 Step 6: 로컬 테스트

### 6.1 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 6.2 기능 테스트

1. **회원가입/로그인 테스트**
   - `/login` 페이지로 이동
   - 이메일로 회원가입
   - Supabase에서 이메일 확인

2. **결제 플로우 테스트**
   - 홈페이지에서 플랜 선택
   - Creem 결제 페이지로 리다이렉션 확인
   - (테스트 모드에서) 테스트 카드로 결제

3. **웹훅 테스트 (ngrok 사용)**

```bash
# ngrok 설치 (설치되지 않은 경우)
brew install ngrok  # macOS
# or download from https://ngrok.com

# ngrok 실행
ngrok http 3000

# ngrok URL을 Creem 웹훅 설정에 추가
# https://[random-id].ngrok.io/api/webhooks/creem
```

4. **대시보드 확인**
   - 결제 완료 후 `/dashboard`에서 구독 정보 표시 확인

## 🚀 Step 7: 프로덕션 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" → Git Repository 연결
3. **Environment Variables** 설정:
   - `.env.local`의 모든 변수 추가
   - Production 키 사용
4. **Deploy** 클릭
5. 배포 완료 후 도메인 확보

### 배포 후 설정

1. **Supabase**: Site URL과 Redirect URLs에 프로덕션 도메인 추가
2. **Creem**: Webhook URL을 프로덕션 URL로 업데이트
3. 프로덕션에서 전체 플로우 테스트

## ✅ 체크리스트

배포 전 최종 확인:

- [ ] Supabase 프로젝트 생성 및 마이그레이션 완료
- [ ] Supabase 인증 설정 (Site URL, Redirect URLs)
- [ ] Creem 계정 생성 및 상품 등록
- [ ] Creem 웹훅 설정
- [ ] 환경 변수 모두 설정 (`.env.local`)
- [ ] Product ID 업데이트 (`PricingPlans.tsx`)
- [ ] 로컬에서 회원가입/로그인 테스트 완료
- [ ] 로컬에서 결제 플로우 테스트 완료 (ngrok + 테스트 모드)
- [ ] 웹훅 수신 확인 (콘솔 로그 또는 Creem 대시보드)
- [ ] 프로덕션 환경 변수 설정
- [ ] 프로덕션 웹훅 URL 업데이트
- [ ] 프로덕션 배포 및 전체 플로우 테스트

## 🆘 문제 해결

### 로그인이 안 돼요
- Supabase 대시보드에서 이메일 확인 메일 발송 여부 확인
- Redirect URLs 설정 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 결제 페이지로 이동이 안 돼요
- Product ID가 올바른지 확인
- Creem API 키가 유효한지 확인
- 네트워크 탭에서 API 요청 에러 확인

### 웹훅이 동작하지 않아요
- Webhook URL이 정확한지 확인
- Webhook Secret이 올바른지 확인
- Creem 대시보드에서 웹훅 전송 로그 확인
- 서버 로그에서 에러 메시지 확인

### ngrok 사용 시 주의사항
- ngrok URL은 재시작하면 변경됩니다
- 테스트 시마다 Creem 웹훅 URL 업데이트 필요
- 또는 ngrok Pro 버전으로 고정 도메인 사용

## 📚 추가 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Creem API 문서](https://docs.creem.io)
- [TanStack Query 문서](https://tanstack.com/query/latest)

## 💬 지원

문제가 해결되지 않으면:
- GitHub Issues에 문의
- [프로젝트 문서](./README.md) 참고
- [개발 과정 문서](./docs/development-process.md) 참고 (상세한 기술 정보)
