# Next.js + Supabase + Creem Template

프로덕션 레디 인증 및 결제 시스템이 통합된 Next.js 템플릿입니다. 이 템플릿을 사용하면 몇 분 만에 SaaS 프로젝트를 시작할 수 있습니다.

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

## ⚡ Quick Start

```bash
# 1. 프로젝트 복제
git clone [your-repo-url]
cd nextjs-supabase-creem-template

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 실제 값으로 업데이트

# 4. 개발 서버 실행
npm run dev
```

**📖 자세한 설정 가이드는 [SETUP.md](./SETUP.md)를 참고하세요.**

## 🎯 주요 기능

- ✅ **인증 시스템**: Supabase Auth (이메일 인증, 소셜 로그인 지원)
- ✅ **결제 통합**: Creem을 통한 구독 결제 (카드, 계좌이체 등)
- ✅ **웹훅 처리**: 자동 구독 관리 (생성, 갱신, 취소)
- ✅ **보안**: RLS(Row Level Security), 웹훅 서명 검증
- ✅ **타입 안전성**: TypeScript 완전 지원
- ✅ **상태 관리**: TanStack Query로 효율적인 데이터 페칭
- ✅ **UI/UX**: Tailwind CSS로 구현된 반응형 디자인
- ✅ **프로덕션 레디**: 즉시 배포 가능한 구조

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

## 🛠️ 커스터마이징

이 템플릿을 프로젝트에 맞게 쉽게 커스터마이징할 수 있습니다:

### 1. 요금제 수정
`components/PricingPlans.tsx`에서 플랜 정보 수정:
- 가격, 기능, 설명 변경
- Creem Product ID 업데이트

### 2. 브랜딩
- `components/Header.tsx`: 앱 이름 변경
- `app/layout.tsx`: 메타데이터 업데이트
- `public/`: 로고 및 파비콘 교체

### 3. 페이지 추가
- `app/` 디렉토리에 새 페이지 추가
- Next.js App Router 구조 활용

### 4. 데이터베이스 확장
- `supabase/migrations/`에 새 마이그레이션 추가
- `types/`에 TypeScript 타입 정의

## 🧪 로컬 개발

### 웹훅 테스트 (ngrok)
```bash
# ngrok 설치 및 실행
ngrok http 3000

# 생성된 URL을 Creem 웹훅 설정에 추가
# https://[id].ngrok.io/api/webhooks/creem
```

### 유용한 명령어
```bash
npm run dev        # 개발 서버 (Turbopack)
npm run build      # 프로덕션 빌드
npm start          # 프로덕션 서버
npm run lint       # 코드 린팅
```

## 📝 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Creem API 문서](https://docs.creem.io)
- [TanStack Query 문서](https://tanstack.com/query/latest)

## 📁 폴더 구조 이해

```
├── app/                      # Next.js App Router
│   ├── api/webhooks/creem/  # Creem 웹훅 엔드포인트
│   ├── auth/callback/       # 인증 콜백
│   ├── dashboard/           # 사용자 대시보드
│   ├── login/               # 로그인 페이지
│   └── page.tsx             # 홈페이지 (요금제)
├── components/              # React 컴포넌트
│   ├── Header.tsx          # 네비게이션 헤더
│   └── PricingPlans.tsx    # 요금제 컴포넌트
├── hooks/                   # React Hooks
│   ├── creem-hook.ts       # Creem 관련 훅
│   └── user-hook.ts        # 사용자 관련 훅
├── lib/supabase/            # Supabase 클라이언트
│   ├── client.ts           # 브라우저 클라이언트
│   ├── server.ts           # 서버 클라이언트
│   ├── admin.ts            # 관리자 클라이언트
│   └── middleware.ts       # 미들웨어 헬퍼
├── providers/               # Context Providers
│   └── query-provider.tsx  # React Query Provider
├── services/                # 비즈니스 로직
│   ├── creem.ts            # Creem API 통신
│   └── user.ts             # 사용자 서비스
├── types/                   # TypeScript 타입 정의
│   ├── creem.ts            # Creem 타입
│   └── user.ts             # 사용자 타입
├── supabase/migrations/     # 데이터베이스 마이그레이션
└── docs/                    # 추가 문서
```

## 🚀 배포

### Vercel (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

배포 후:
1. Vercel 대시보드에서 환경 변수 설정
2. Supabase에서 프로덕션 URL을 Redirect URLs에 추가
3. Creem에서 프로덕션 웹훅 URL 설정

### 다른 플랫폼
- **Netlify**: Next.js 지원
- **Railway**: 도커 또는 Nixpacks
- **DigitalOcean App Platform**: Next.js 빌드팩

## 💡 확장 아이디어

이 템플릿을 기반으로 다음 기능들을 추가할 수 있습니다:

- 월간/연간 플랜 토글
- 할인 코드 및 프로모션
- 구독 업그레이드/다운그레이드
- 이메일 알림 (결제 완료, 갱신 등)
- 어드민 대시보드
- 사용량 기반 과금
- 팀 관리 기능
- 다중 구독 지원

## 🤝 기여

이슈나 PR은 언제나 환영합니다!

## 📄 라이선스

이 템플릿은 자유롭게 사용하실 수 있습니다. 비즈니스 프로젝트에도 자유롭게 활용하세요.
