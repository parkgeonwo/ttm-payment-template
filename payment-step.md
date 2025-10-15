⏺ ---
  🎯 전체 시스템 요약

  데이터 흐름 다이어그램

  ┌──────────────┐
  │   1. 사용자   │ "Pro 플랜 구독하기" 버튼 클릭
  │   요금제 선택 │ components/landing-page/tabbed-pricing-section.tsx:145
  └──────┬───────┘
         │
         ↓
  ┌──────────────┐
  │   2. 로그인   │ getCurrentUser() 호출
  │   확인        │ services/user.ts:13
  └──────┬───────┘
         │
         ↓
  ┌──────────────┐
  │   3. Checkout │ createCheckout() Server Action
  │   생성 요청   │ services/creem.ts:27 → Creem API
  └──────┬───────┘
         │
         ↓
  ┌──────────────┐
  │   4. 리다이렉트│ window.location.href = creem_url
  │   Creem으로   │ components/landing-page/tabbed-pricing-section.tsx:182
  └──────┬───────┘
         │
         ↓
  ┌──────────────┐
  │   5. Creem    │ [외부 시스템 - Creem 호스팅]
  │   결제 처리   │ 사용자 카드 정보 입력 → 카드사 승인
  └──────┬───────┘
         │
         ├─────────────────┬────────────────┐
         │                 │                │
         ↓                 ↓                ↓
    사용자 리다이렉트   웹훅 전송        청구서 이메일
    /dashboard       POST /api/webhooks  Email 발송
         │                 │
         │                 ↓
         │         ┌──────────────┐
         │         │   6. 웹훅     │ 서명 검증 → 이벤트 처리
         │         │   수신/처리   │ app/api/webhooks/creem/route.ts:27
         │         └──────┬───────┘
         │                │
         │                ↓
         │         ┌──────────────┐
         │         │   7. DB       │ Customer ID + 구독 정보 저장
         │         │   업데이트    │ services/creem.ts:81, 103
         │         └──────┬───────┘
         │                │
         └────────────────┘
                  │
                  ↓
         ┌──────────────┐
         │   8. 대시보드 │ 구독 정보 조회 → 화면 표시
         │   화면 표시   │ app/[locale]/dashboard/subscription/page.tsx:26
         └──────┬───────┘
                  │
                  ↓
         ┌──────────────┐
         │   9. 구독     │ Customer Portal 열기
         │   관리        │ services/creem.ts:124 → Creem Portal
         └──────┬───────┘
                  │
                  ↓
         ┌──────────────┐
         │   10. 자동    │ [30일 후 Creem이 자동 실행]
         │   갱신        │ 6-7단계 반복 (웹훅 → DB 업데이트)
         └──────────────┘

  ---
  📚 파일별 역할 요약

  | 파일                                                 | 역할                  | 주요 함수/컴포넌트
                                                   |
  |----------------------------------------------------|---------------------|-------------------------------------
  -------------------------------------|
  | components/landing-page/tabbed-pricing-section.tsx | 요금제 선택 UI           | handleSubscribe()
                                            |
  | hooks/creem-hook.ts                                | Creem 결제 React Hook | useCreemCheckout()
                                         |
  | services/creem.ts                                  | Creem API 통신        | createCheckout(),
  updateUserSubscriptionServer(), getCustomerPortalUrl() |
  | services/user.ts                                   | 사용자 인증/구독 조회        | getCurrentUser(),
  getUserSubscription()                                  |
  | hooks/user-hook.ts                                 | 사용자 데이터 React Hooks | useCurrentUser(),
  useUserSubscription()                                  |
  | app/api/webhooks/creem/route.ts                    | 웹훅 수신 엔드포인트         | POST(),
  buildSubscriptionData()                                          |
  | app/[locale]/dashboard/subscription/page.tsx       | 구독 관리 페이지           | SubscriptionPage(),
  handleCustomerPortal()                               |
  | lib/supabase/admin.ts                              | Admin 권한 클라이언트      | createAdminClient()
                                              |
  | types/userType.ts                                  | 타입 정의               | UserSubscription,
  CreemCheckoutOptions                                   |

  ---
  🔐 보안 체크리스트

  - ✅ API 키는 환경 변수로 관리 (.env.local)
  - ✅ 웹훅 서명 검증 (HMAC-SHA256)
  - ✅ Admin 클라이언트는 서버에서만 사용
  - ✅ RLS 정책으로 데이터 접근 제한
  - ✅ 카드 정보는 Creem이 처리 (PCI-DSS)
  - ✅ userId 검증 (웹훅에서 메타데이터 확인)

  ---




📍 1단계: 사용자가 요금제 선택 - 완전 분해

  📁 components/landing-page/tabbed-pricing-section.tsx

  1-1. 컴포넌트 상태 관리 (44-54줄)

  const TabbedPricingSection = () => {
    const router = useRouter();
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const [billingInterval, setBillingInterval] =
      useState<BillingInterval>("month");

    const { mutate: createCheckout, isPending: checkoutLoading } =
      useCreemCheckout();

  무슨 일이 일어나나요?
  - billingInterval: 사용자가 선택한 결제 주기 (월간/연간)
    - 처음에는 "month"로 시작
    - 사용자가 탭 클릭하면 setBillingInterval("year")로 변경
  - createCheckout: TanStack Query의 mutation 함수
    - 실제로는 services/creem.ts의 createCheckout 함수를 호출
    - mutate(데이터) 형태로 사용
  - isPending: 로딩 상태
    - true면 결제 요청 진행 중
    - 버튼을 비활성화해서 중복 클릭 방지

  왜 이렇게 하나요?
  - 상태 관리: React는 상태가 바뀌면 화면을 다시 그립니다
    - billingInterval이 바뀌면 → 가격 표시가 자동으로 업데이트
  - 비동기 처리: 결제 요청은 시간이 걸립니다
    - isPending으로 "처리 중..." 상태를 표시

  ---
  1-2. 플랜 데이터 구조 (64-143줄)

  const plans: Plan[] = [
    {
      name: "Starter",
      description: "개인 개발자와 소규모 프로젝트를 위한 플랜",
      icon: <Star className="h-6 w-6" />,
      pricing: {
        month: {
          amount: 17,                              // $17/월
          productId: "prod_6aObr2bs7q1JkhxiBtGve5"  // Creem에 등록된 상품 ID
        },
        year: {
          amount: 122,                             // $122/년
          productId: "prod_1dnNdAxzn7iVtXLXLWrnXB",
          discount: 28                             // 28% 할인
        },
      },
      features: [
        { text: "프로젝트 3개", included: true },
        { text: "월 10GB 스토리지", included: true },
        { text: "고급 분석", included: false },    // X 표시
      ],
      colors: {
        firstColor: "#3B82F6",   // 카드 그라데이션 시작 색
        secondColor: "#1E40AF",  // 카드 그라데이션 끝 색
      },
    },
    // ... Pro, Enterprise 플랜도 동일한 구조
  ]

  무슨 일이 일어나나요?
  - 각 플랜의 모든 정보를 배열에 저장
  - pricing.month.productId와 pricing.year.productId가 핵심
    - 이 ID로 Creem이 "어떤 상품인지" 식별합니다
    - Creem 대시보드에서 미리 만들어둔 상품 ID입니다

  왜 이렇게 하나요?
  - 데이터 중앙 관리: 가격 변경 시 여기만 수정하면 됩니다
  - 타입 안전성: TypeScript가 오타를 막아줍니다
  - 유연성: 새 플랜 추가가 쉽습니다

  ---
  1-3. 구독 버튼 클릭 핸들러 전체 흐름 (145-194줄)

  const handleSubscribe = async (planName: string, productId?: string) => {
    // 🔍 첫 번째 검증: Enterprise 플랜 처리
    if (planName === "Enterprise") {
      router.push("/contact");  // 문의 페이지로 이동
      return;
    }

    // 🔍 두 번째 검증: Product ID 확인
    if (!productId) {
      toast.error("제품 ID가 없습니다.");
      return;
    }

    try {
      // 🔍 세 번째 검증: 로그인 여부 확인
      const user = await getCurrentUser();

      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      // ✅ 모든 검증 통과 → Creem Checkout 생성
      createCheckout(
        {
          productId: productId,
          userId: user.id,
          email: user.email || "",
          successUrl: `${window.location.origin}/dashboard?success=true`,
          metadata: {
            plan: `${planName} ${billingInterval === "month" ? "Monthly" : "Yearly"}`
          },
        },
        {
          // 성공 시 콜백
          onSuccess: (data) => {
            window.location.href = data.url;  // Creem 페이지로 이동
          },
          // 실패 시 콜백
          onError: (error) => {
            console.error("Checkout error:", error);
            toast.error("결제 페이지로 이동하는 중 오류가 발생했습니다.");
          },
        }
      );
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("결제 페이지로 이동하는 중 오류가 발생했습니다.");
    }
  };

  단계별 동작:

  1. Enterprise 필터링 (146-150줄)
    - Enterprise는 결제가 아니라 영업 문의
    - 다른 페이지로 바로 보냄
  2. Product ID 검증 (152-155줄)
    - productId가 없으면 Creem이 "뭘 결제할지" 모름
    - 절대 undefined 값이 넘어가면 안 됨
  3. 사용자 인증 확인 (158-164줄)
    - 다음 단계로 넘어가기 전에 확인
  4. Checkout 생성 요청 (167-189줄)
    - TanStack Query의 mutate 함수 호출
    - 성공/실패 콜백 지정

  왜 이렇게 많은 검증을 하나요?
  - 잘못된 요청은 서버까지 가지 않고 프론트엔드에서 차단
  - 사용자 경험 개선 (즉시 에러 메시지)
  - 서버 부하 감소


  📍 2단계: 로그인 확인 - 완전 분해

  📁 services/user.ts:13-19 - getCurrentUser 함수

  export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
  }

  무슨 일이 일어나나요?

  1. supabase.auth.getUser()
    - Supabase가 브라우저 쿠키를 확인합니다
    - 쿠키에 저장된 JWT 토큰을 읽습니다
    - 토큰이 유효하면 사용자 정보 반환
  2. 반환되는 데이터 구조:
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "user@example.com",
    user_metadata: {
      username: "철수",
      name: "홍길동"
    },
    created_at: "2025-01-15T10:30:00Z"
  }

  왜 이렇게 하나요?

  - 쿠키 기반 인증:
    - 사용자가 로그인하면 Supabase가 쿠키에 토큰 저장
    - 매 요청마다 이 토큰으로 "누구인지" 확인
    - 마치 도서관 출입증과 같습니다
  - 서버 검증:
    - 단순히 "브라우저에 토큰이 있다"가 아니라
    - Supabase 서버에 물어봐서 "이 토큰이 진짜 유효한가?" 확인
    - 만료되거나 위조된 토큰은 거부됨

  ---
  📁 lib/supabase/client.ts - Supabase 클라이언트

  import { createClient } from "@/lib/supabase/client";

  const supabase = createClient();

  내부 동작 (실제 코드는 다를 수 있음):
  export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  왜 클라이언트를 분리하나요?
  - 환경 변수 관리: URL과 키를 한 곳에서 관리
  - 재사용: 여러 파일에서 같은 설정 사용
  - 타입 안전성: TypeScript 타입 추론

  ---
  📁 hooks/user-hook.ts:91-96 - React Hook

  export function useCurrentUser() {
    return useQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
  }

  무슨 일이 일어나나요?

  1. TanStack Query 캐싱:
  첫 번째 호출:
    → Supabase API 요청 (네트워크 통신)
    → 결과를 캐시에 저장 (queryKey: ["currentUser"])

  두 번째 호출 (같은 페이지 내):
    → 캐시에서 바로 가져옴 (네트워크 X)
    → 초고속!

  2. 자동 재검증:
  // 다음 경우 자동으로 다시 가져옴:
  - 탭 전환 후 돌아왔을 때
  - 네트워크 재연결 시
  - 설정한 시간 경과 시 (staleTime)

  3. 로딩/에러 상태 자동 관리:
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return <div>안녕하세요, {user.name}님</div>;

  왜 React Query를 사용하나요?

  - 성능 최적화: 불필요한 API 호출 방지
  - 개발자 경험: 로딩/에러 처리 코드가 간단해짐
  - 동기화: 여러 컴포넌트가 같은 데이터 공유

  ---
  실제 호출 체인 (1단계에서 2단계로)

  // 1. 사용자가 "구독하기" 버튼 클릭
  <Button onClick={() => handleSubscribe("Pro", "prod_xxx")}>
    구독하기
  </Button>

  // 2. handleSubscribe 함수 실행
  const handleSubscribe = async (planName, productId) => {
    // 3. getCurrentUser 호출
    const user = await getCurrentUser();
    //     ↓
    // 4. Supabase 클라이언트 실행
    const { data } = await supabase.auth.getUser();
    //     ↓
    // 5. Supabase 서버에 HTTP 요청
    GET https://xxxxx.supabase.co/auth/v1/user
    Headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    //     ↓
    // 6. Supabase 서버 응답
    {
      "id": "user_123",
      "email": "user@example.com"
    }
    //     ↓
    // 7. user 변수에 저장
    const user = { id: "user_123", email: "user@example.com" }

    // 8. 로그인 확인
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;  // 여기서 멈춤
    }

    // 9. 다음 단계로 진행 ✅
    createCheckout({ userId: user.id, ... })
  }


⏺ ---
  📍 3단계: Creem Checkout 생성 - 완전 분해

  이 단계가 가장 복잡하고 중요합니다!

  3-1. React Hook 레이어

  📁 hooks/creem-hook.ts:5-9

  export function useCreemCheckout() {
    return useMutation({
      mutationFn: createCheckout,
    });
  }

  무슨 일이 일어나나요?

  useMutation은 TanStack Query의 "쓰기 작업" 훅입니다:

  const { mutate, isPending, isError } = useCreemCheckout();

  // 사용법:
  mutate(
    { productId: "prod_xxx", userId: "user_123", ... },  // 첫 번째 인자: 데이터
    {                                                     // 두 번째 인자: 옵션
      onSuccess: (response) => console.log("성공!", response),
      onError: (error) => console.error("실패!", error)
    }
  )

  왜 useMutation을 쓰나요? (useQuery와 차이)

  | 특징    | useQuery     | useMutation |
  |-------|--------------|-------------|
  | 용도    | 데이터 읽기       | 데이터 쓰기      |
  | 자동 실행 | ✅ 컴포넌트 마운트 시 | ❌ 수동 호출     |
  | 캐싱    | ✅            | ❌           |
  | 예시    | 유저 정보 조회     | 결제 요청, 회원가입 |

  ---
  3-2. Server Action 레이어

  📁 services/creem.ts:27-55 - createCheckout 함수 전체

  export async function createCheckout(
    options: CreemCheckoutOptions
  ): Promise<{ url: string }> {
    const response = await fetch(`${CREEM_API_BASE_URL}/v1/checkouts`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        product_id: options.productId,
        units: options.units || 1,
        customer: {
          email: options.email,
        },
        success_url: options.successUrl,
        ...(options.discountCode && { discount_code: options.discountCode }),
        metadata: {
          userId: options.userId,
          ...options.metadata,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "결제 세션 생성에 실패했습니다.");
    }

    const data = await response.json();
    return { url: data.checkout_url };
  }

  한 줄씩 분해:

  Line 27-29: 함수 시그니처

  export async function createCheckout(
    options: CreemCheckoutOptions
  ): Promise<{ url: string }> {

  - async: 이 함수는 비동기 (await 사용 가능)
  - options: 타입이 CreemCheckoutOptions (아래에서 설명)
  - Promise<{ url: string }>: 반환값은 { url: "..." } 형태

  Line 30-32: API 요청 설정

  const response = await fetch(`${CREEM_API_BASE_URL}/v1/checkouts`, {
    method: "POST",
    headers: getHeaders(),

  - CREEM_API_BASE_URL: 환경 변수 (예: https://api.creem.io)
  - method: "POST": HTTP POST 요청 (데이터 생성)
  - getHeaders(): API 키가 포함된 헤더 (아래에서 설명)

  Line 33-45: 요청 본문 (Body)

  body: JSON.stringify({
    product_id: options.productId,          // "prod_xxx"
    units: options.units || 1,              // 수량 (기본값 1)
    customer: {
      email: options.email,                 // "user@example.com"
    },
    success_url: options.successUrl,        // 결제 성공 후 돌아올 URL
    ...(options.discountCode && {
      discount_code: options.discountCode   // 할인 코드 (있으면)
    }),
    metadata: {
      userId: options.userId,               // ⭐ 중요! 웹훅에서 사용
      ...options.metadata,                  // 추가 정보 (플랜명 등)
    },
  }),

  metadata가 왜 중요한가요?
  // 3단계에서 넣은 데이터:
  metadata: {
    userId: "user_123",
    plan: "Pro Monthly"
  }

  // 6단계 웹훅에서 다시 받음:
  {
    eventType: "checkout.completed",
    object: {
      metadata: {
        userId: "user_123",  // ← 이걸로 "누구의 결제인지" 식별!
        plan: "Pro Monthly"
      }
    }
  }

  Line 48-51: 에러 처리

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "결제 세션 생성에 실패했습니다.");
  }

  - response.ok: HTTP 상태코드가 200-299면 true
  - 실패 시 (400, 500 등): Creem의 에러 메시지 파싱
  - throw: 에러를 던지면 useMutation의 onError가 잡아냄

  Line 53-54: 성공 응답 파싱

  const data = await response.json();
  return { url: data.checkout_url };

  Creem 응답 예시:
  {
    "checkout_url": "https://checkout.creem.io/session_abc123xyz",
    "session_id": "session_abc123xyz",
    "expires_at": "2025-10-02T12:00:00Z"
  }

  우리는 checkout_url만 필요하므로 { url: data.checkout_url } 반환

  ---
  3-3. 헤더 생성 함수

  📁 services/creem.ts:17-22

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      "x-api-key": CREEM_API_KEY || "",
    };
  }

  왜 함수로 만들었나요?
  - 여러 곳에서 재사용 (checkout, portal, 등)
  - API 키를 한 곳에서 관리

  실제 HTTP 요청 헤더:
  POST /v1/checkouts HTTP/1.1
  Host: api.creem.io
  Content-Type: application/json
  x-api-key: creem_sk_test_abc123def456ghi789

  ---
  3-4. 환경 변수

  📁 services/creem.ts:11-12

  const CREEM_API_BASE_URL = process.env.CREEM_BASE_URL;
  const CREEM_API_KEY = process.env.CREEM_API_KEY;

  📁 .env.local (실제 파일, Git에 올리면 안 됨!)

  CREEM_BASE_URL=https://api.creem.io
  CREEM_API_KEY=creem_sk_live_abc123def456

  왜 환경 변수를 쓰나요?

  1. 보안:
    - 코드에 직접 쓰면 GitHub에 올라감 → 해킹당함
    - .env.local은 .gitignore에 포함되어 Git에 안 올라감
  2. 환경별 설정:
  # 개발 환경
  CREEM_API_KEY=creem_sk_test_xxx

  # 프로덕션 환경
  CREEM_API_KEY=creem_sk_live_xxx
  3. 팀 협업:
    - 각자 자기 테스트 키 사용
    - 서로의 키 공유 안 해도 됨

  ---
  3-5. 타입 정의

  📁 types/userType.ts:47-55

  export interface CreemCheckoutOptions {
    productId: string;      // 필수: 상품 ID
    userId: string;         // 필수: 사용자 ID
    email: string;          // 필수: 이메일
    successUrl: string;     // 필수: 성공 후 URL
    units?: number;         // 선택: 수량 (기본값 1)
    discountCode?: string;  // 선택: 할인 코드
    metadata?: Record<string, any>;  // 선택: 추가 데이터
  }

  ? 표시의 의미:
  - units?: 선택 사항 (안 넣어도 됨)
  - productId: 필수 (안 넣으면 TypeScript 에러)

  실제 사용 예:
  // ✅ 유효
  createCheckout({
    productId: "prod_xxx",
    userId: "user_123",
    email: "user@example.com",
    successUrl: "/dashboard"
  })

  // ❌ 에러: productId 필수
  createCheckout({
    userId: "user_123",
    email: "user@example.com"
  })

  ---
  3-6. 전체 데이터 흐름 (3단계)

  // 📱 프론트엔드 (React 컴포넌트)
  createCheckout(
    {
      productId: "prod_1v9qEqdMz8X7gip4jkCHRK",
      userId: "user_123",
      email: "user@example.com",
      successUrl: "https://mysite.com/dashboard?success=true",
      metadata: { plan: "Pro Monthly" }
    },
    {
      onSuccess: (data) => {
        console.log("Creem URL:", data.url);
        // "https://checkout.creem.io/session_abc123"
      }
    }
  )

  // ↓ useMutation이 실행

  // 🖥️ Server Action (services/creem.ts)
  await fetch("https://api.creem.io/v1/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "creem_sk_live_xxx"
    },
    body: JSON.stringify({
      product_id: "prod_1v9qEqdMz8X7gip4jkCHRK",
      units: 1,
      customer: { email: "user@example.com" },
      success_url: "https://mysite.com/dashboard?success=true",
      metadata: {
        userId: "user_123",
        plan: "Pro Monthly"
      }
    })
  })

  // ↓ Creem 서버 처리

  // 🌐 Creem 응답
  {
    "checkout_url": "https://checkout.creem.io/session_abc123xyz",
    "session_id": "session_abc123xyz",
    "expires_at": "2025-10-02T12:00:00Z"
  }

  // ↓ 우리 서버가 URL만 추출

  // 📱 프론트엔드로 반환
  { url: "https://checkout.creem.io/session_abc123xyz" }

  // ↓ onSuccess 콜백 실행

  // 🌐 사용자 브라우저 이동 (4단계로 연결)
  window.location.href = "https://checkout.creem.io/session_abc123xyz"


⏺ ---
  📍 4-5단계: 리다이렉트 & 결제 - 완전 분해

  4단계: Creem 페이지로 이동

  📁 components/landing-page/tabbed-pricing-section.tsx:180-182

  onSuccess: (data) => {
    // 외부 결제 페이지로 리다이렉트 (Creem checkout URL)
    window.location.href = data.url;
  }

  window.location.href가 뭔가요?

  브라우저의 주소창을 바꾸는 JavaScript 명령어:

  // 현재 페이지
  https://mysite.com/pricing

  // 실행
  window.location.href = "https://checkout.creem.io/session_abc123";

  // 결과: 브라우저가 Creem 페이지로 완전히 이동
  // (새 페이지 로드, React 상태 모두 리셋)

  왜 router.push() 안 쓰나요?

  | router.push("/dashboard") | window.location.href = "https://creem.io" |
  |---------------------------|-------------------------------------------|
  | Next.js 내부 이동             | 외부 사이트로 이동                                |
  | React 상태 유지               | 완전히 새 페이지                                 |
  | 빠름 (SPA)                  | 느림 (전체 로드)                                |
  | 같은 도메인만 가능                | 어디든 가능                                    |

  우리 경우: Creem은 외부 사이트이므로 window.location.href 필수!

  ---
  5단계: Creem에서 결제

  이 단계는 우리 코드에 없습니다 - 완전히 Creem이 처리합니다.

  Creem Checkout 페이지 UI (예상)

  ┌──────────────────────────────────────┐
  │  🔒 Secure Checkout - Creem          │
  ├──────────────────────────────────────┤
  │                                      │
  │  Pro Monthly Plan                    │
  │  $30.00 / month                      │
  │                                      │
  │  Email: user@example.com             │
  │                                      │
  │  ┌────────────────────────────────┐  │
  │  │ Card Number                    │  │
  │  │ [1234 5678 9012 3456]         │  │
  │  └────────────────────────────────┘  │
  │                                      │
  │  ┌─────┐  ┌─────┐                   │
  │  │ MM  │  │ CVV │                   │
  │  │ [12]│  │[123]│                   │
  │  └─────┘  └─────┘                   │
  │                                      │
  │  [  Complete Payment  ]              │
  │                                      │
  │  Powered by Creem                    │
  └──────────────────────────────────────┘

  사용자가 "Complete Payment" 클릭 시

  Creem이 하는 일:

  1. 카드 유효성 검증
  - 카드 번호 형식 확인
  - 만료일 확인
  - CVV 확인
  2. 카드사와 통신
  Creem → 카드사 (Visa/Mastercard)
      "이 카드로 $30 결제 가능한가요?"

  카드사 확인:
      - 잔액 충분한가?
      - 도난 카드 아닌가?
      - 일일 한도 넘지 않았나?

  카드사 → Creem
      "승인됨" 또는 "거절됨"
  3. 결제 성공 시
  // Creem이 자동으로 실행:

  // A) 구독 레코드 생성
  {
    id: "sub_abc123",
    status: "active",
    customer_id: "cus_xyz789",
    product_id: "prod_xxx",
    amount: 3000,
    current_period_end: "2025-11-02"
  }

  // B) 사용자를 success_url로 리다이렉트
  window.location.href = "https://mysite.com/dashboard?success=true";

  // C) 웹훅 전송 (6단계로 연결!)
  POST https://mysite.com/api/webhooks/creem
  {
    eventType: "checkout.completed",
    object: { subscription: {...}, customer: {...} }
  }
  4. 결제 실패 시
  Creem 페이지에 에러 메시지 표시:
  "카드 잔액이 부족합니다"
  "카드 정보를 확인해주세요"

  사용자는 계속 Creem 페이지에 머물러 있음
  다시 시도 가능

  ---
  중요한 타이밍 문제

  사용자가 결제 버튼 클릭
      ↓
  카드사 통신 (1-3초 소요)
      ↓
  ┌─────────────────────────────────────┐
  │  동시에 2가지 일이 일어남:          │
  ├─────────────────────────────────────┤
  │                                     │
  │  1) 사용자 리다이렉트 (즉시)        │
  │     → https://mysite.com/dashboard  │
  │                                     │
  │  2) 웹훅 전송 (1-5초 후)            │
  │     → https://mysite.com/api/webhooks│
  │                                     │
  └─────────────────────────────────────┘

  문제 시나리오:

  09:00:00 - 결제 완료
  09:00:00 - 사용자가 /dashboard 도착
  09:00:00 - 화면 로드, DB 조회 → 구독 정보 없음! (아직 웹훅 안 옴)
  09:00:03 - 웹훅 도착, DB 업데이트
  09:00:05 - 사용자가 새로고침 → 이제 구독 정보 보임

  해결 방법 (일반적으로 사용):

  // dashboard 페이지에서
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  if (success === 'true') {
    // 웹훅이 올 때까지 기다림
    setTimeout(() => {
      window.location.reload();  // 3초 후 자동 새로고침
    }, 3000);

    return <div>결제 처리 중... 잠시만 기다려주세요</div>;
  }

  ---
  URL 파라미터의 역할

  📁 services/creem.ts:39 - successUrl 설정

  success_url: options.successUrl,
  // 실제 값: "https://mysite.com/dashboard?success=true"

  왜 ?success=true를 붙이나요?

  // dashboard 페이지에서 판단
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get('success') === 'true') {
    // "결제 성공했구나!"
    toast.success("구독이 활성화되었습니다!");
  } else {
    // 일반적인 대시보드 진입
  }

  다른 파라미터 예시:

  // 성공
  successUrl: "/dashboard?success=true"

  // 취소 (사용자가 뒤로가기)
  cancelUrl: "/pricing?canceled=true"

  // 세션 ID 포함 (추적용)
  successUrl: "/dashboard?session_id={SESSION_ID}&success=true"

⏺ ---
  📍 6단계: 웹훅 수신 및 처리 - 완전 분해

  이 단계가 시스템의 핵심입니다! 가장 자세히 설명하겠습니다.

  6-1. 웹훅 엔드포인트

  📁 app/api/webhooks/creem/route.ts:27

  export async function POST(request: NextRequest) {

  이 함수가 언제 실행되나요?

  Creem 서버가 이 URL로 HTTP POST 요청:
  POST https://mysite.com/api/webhooks/creem

  Next.js가 자동으로 이 함수 실행

  Next.js API Route 구조:

  // app/api/webhooks/creem/route.ts

  export async function GET(request) { }    // GET /api/webhooks/creem
  export async function POST(request) { }   // POST /api/webhooks/creem  ← 우리가 사용
  export async function PUT(request) { }    // PUT /api/webhooks/creem
  export async function DELETE(request) { } // DELETE /api/webhooks/creem

  ---
  6-2. 보안 검증 (가장 중요!)

  📁 app/api/webhooks/creem/route.ts:29-55

  // 웹훅 시그니처 검증
  const body = await request.text();
  const signature = request.headers.get("creem-signature");
  const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("CREEM_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  if (signature) {
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== computedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
  }

  한 줄씩 분해:

  Line 30: 요청 본문 읽기

  const body = await request.text();

  일반 JSON이 아니라 원본 텍스트로 읽어야 합니다. 왜냐하면:
  - 서명 검증은 원본 그대로의 문자열로 해야 함
  - JSON 파싱하면 공백, 순서 등이 바뀔 수 있음

  Line 31-32: 서명과 비밀키 가져오기

  const signature = request.headers.get("creem-signature");
  const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;

  Creem이 보낸 HTTP 요청 예시:
  POST /api/webhooks/creem HTTP/1.1
  Host: mysite.com
  Content-Type: application/json
  creem-signature: 5d41402abc4b2a76b9719d911017c592

  {"eventType":"checkout.completed",...}

  creem-signature 헤더가 핵심!

  Line 34-40: 비밀키 확인

  if (!webhookSecret) {
    console.error("CREEM_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  만약 .env 파일에 CREEM_WEBHOOK_SECRET가 없으면:
  - 서버 에러 (500)
  - Creem에게 "우리 설정이 잘못됐어요" 알림

  Line 42-54: 서명 검증 (암호학!)

  if (signature) {
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== computedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
  }

  HMAC-SHA256이 뭔가요?

  마치 "암호화된 도장" 같은 것입니다:

  // Creem이 하는 일 (보안 서버):
  const message = '{"eventType":"checkout.completed",...}';
  const secret = "my_webhook_secret_xyz123";

  const signature = crypto
    .createHmac("sha256", secret)  // SHA256 해시 알고리즘 사용
    .update(message)               // 메시지 넣기
    .digest("hex");                // 16진수로 출력

  // 결과: "5d41402abc4b2a76b9719d911017c592"
  // 이걸 HTTP 헤더에 넣어서 전송

  // 우리가 하는 일 (우리 서버):
  const receivedSignature = "5d41402abc4b2a76b9719d911017c592";
  const receivedMessage = '{"eventType":"checkout.completed",...}';
  const ourSecret = "my_webhook_secret_xyz123";  // Creem과 동일한 비밀키!

  const ourSignature = crypto
    .createHmac("sha256", ourSecret)
    .update(receivedMessage)
    .digest("hex");

  if (receivedSignature === ourSignature) {
    console.log("진짜 Creem이 보낸 거 맞음!");
  } else {
    console.log("가짜! 해커!");
  }

  왜 안전한가요?

  1. 비밀키 필요:
    - webhookSecret은 Creem과 우리만 알고 있음
    - 해커는 모름 → 같은 서명 만들 수 없음
  2. 변조 불가:
  // 해커가 메시지 조작 시도:
  원본: '{"userId":"user_123","amount":3000}'
  조작: '{"userId":"hacker_999","amount":3000}'

  // 서명이 완전히 달라짐:
  원본 서명: "5d41402abc4b..."
  조작 서명: "9f3c82be71a7..."  ← 불일치!

  // 우리 서버가 거부함
  3. 재전송 공격 방지:
    - 각 요청마다 타임스탬프 포함 가능
    - 오래된 요청은 거부

  ---
  6-3. 웹훅 데이터 파싱

  📁 app/api/webhooks/creem/route.ts:57-72

  const webhookData = JSON.parse(body);
  const { eventType, object: data } = webhookData;

  // 메타데이터에서 userId 추출
  let userId =
    data.metadata?.userId ||
    data.subscription?.metadata?.userId ||
    data.order?.metadata?.userId;

  if (!userId) {
    console.error("User ID not found in webhook metadata");
    return NextResponse.json(
      { error: "User ID not found in metadata" },
      { status: 400 }
    );
  }

  Creem이 보낸 데이터 구조:

  {
    "eventType": "checkout.completed",
    "object": {
      "subscription": {
        "id": "sub_abc123",
        "status": "active",
        "current_period_start_date": "2025-10-02",
        "current_period_end_date": "2025-11-02",
        "metadata": {
          "userId": "user_123",      // ← 3단계에서 넣어준 값!
          "plan": "Pro Monthly"
        }
      },
      "product": {
        "id": "prod_xxx",
        "name": "Pro Monthly",
        "price": 3000,
        "currency": "USD",
        "billing_period": "month"
      },
      "customer": {
        "id": "cus_xyz789",
        "email": "user@example.com"
      },
      "metadata": {
        "userId": "user_123"         // ← 여기도 있음
      }
    }
  }

  왜 userId를 여러 곳에서 찾나요?

  userId =
    data.metadata?.userId ||              // 우선순위 1
    data.subscription?.metadata?.userId || // 우선순위 2
    data.order?.metadata?.userId;          // 우선순위 3

  이벤트 타입마다 데이터 구조가 다르기 때문:
  - checkout.completed: data.metadata.userId
  - subscription.active: data.subscription.metadata.userId
  - order.created: data.order.metadata.userId

  ?. 연산자 (Optional Chaining):

  // 일반적인 방법 (에러 나기 쉬움):
  const userId = data.metadata.userId;  // data.metadata가 undefined면 에러!

  // 안전한 방법:
  const userId = data.metadata?.userId;
  // data.metadata가 없으면 userId는 undefined (에러 안 남)

  ---
  6-4. 이벤트 타입별 처리

  📁 app/api/webhooks/creem/route.ts:75-122

  switch (eventType) {
    case "checkout.completed":
      if (data.subscription) {
        await updateUserSubscriptionServer(
          userId,
          buildSubscriptionData(data, data.subscription)
        );

        if (data.customer?.id) {
          await updateUserCustomerIdServer(userId, data.customer.id);
        }
      }
      break;

    case "subscription.active":
    case "subscription.paid":
    case "subscription.update":
      await updateUserSubscriptionServer(userId, buildSubscriptionData(data));
      break;

    case "subscription.trialing":
      await updateUserSubscriptionServer(userId, {
        ...buildSubscriptionData(data),
        status: "trialing",
      });
      break;

    case "subscription.canceled":
      await updateUserSubscriptionServer(userId, {
        ...buildSubscriptionData(data),
        status: "canceled",
        canceled_at: data.canceled_at || new Date().toISOString(),
      });
      break;

    case "subscription.expired":
      await updateUserSubscriptionServer(userId, {
        ...buildSubscriptionData(data),
        status: "expired",
      });
      break;

    default:
      // 처리되지 않은 웹훅 이벤트
      break;
  }

  이벤트 타입 설명:

  | 이벤트                   | 언제 발생?        | 우리가 하는 일               |
  |-----------------------|---------------|------------------------|
  | checkout.completed    | 사용자가 처음 결제 완료 | 구독 정보 + Customer ID 저장 |
  | subscription.active   | 구독이 활성화됨      | 구독 상태 업데이트             |
  | subscription.paid     | 매월 자동 결제 성공   | 결제 기간 갱신               |
  | subscription.update   | 사용자가 플랜 변경    | 새 플랜 정보 저장             |
  | subscription.trialing | 무료 체험 시작      | 상태를 "trialing"으로       |
  | subscription.canceled | 사용자가 구독 취소    | 취소일 기록                 |
  | subscription.expired  | 결제 실패로 만료     | 상태를 "expired"로         |

  checkout.completed 상세 분석 (76-89줄)

  case "checkout.completed":
    if (data.subscription) {
      // 1) 구독 정보 저장
      await updateUserSubscriptionServer(
        userId,
        buildSubscriptionData(data, data.subscription)
      );

      // 2) Customer ID 저장 (처음만)
      if (data.customer?.id) {
        await updateUserCustomerIdServer(userId, data.customer.id);
      }
    }
    break;

  왜 두 번 나눠서 저장하나요?

  // Customer ID (평생 안 바뀜)
  await updateUserCustomerIdServer("user_123", "cus_xyz789");
  // → profiles.customer_id = "cus_xyz789"

  // 구독 정보 (계속 바뀜)
  await updateUserSubscriptionServer("user_123", {
    id: "sub_abc123",
    status: "active",
    amount: 3000,
    current_period_end: "2025-11-02"
  });
  // → profiles.subscription = { id: "sub_abc123", ... }

  ---
  6-5. 구독 데이터 변환 함수

  📁 app/api/webhooks/creem/route.ts:8-25

  function buildSubscriptionData(data: any, subscription?: any) {
    const subData = subscription || data;
    const product = data.product;

    return {
      id: subData.id,
      status: subData.status,
      product_id: product?.id,
      product_name: product?.name,
      amount: product?.price,
      currency: product?.currency || "USD",
      interval: product?.billing_period,
      current_period_start: subData.current_period_start_date,
      current_period_end: subData.current_period_end_date,
      canceled_at: subData.canceled_at,
    };
  }

  왜 이 함수가 필요한가요?

  Creem의 데이터 구조 → 우리 DB 구조로 변환:

  // Creem 데이터 (복잡함):
  {
    "object": {
      "subscription": {
        "id": "sub_abc123",
        "current_period_start_date": "2025-10-02T00:00:00Z"
      },
      "product": {
        "name": "Pro Monthly",
        "price": 3000,
        "billing_period": "month"
      }
    }
  }

  // 우리 DB 형식 (간단함):
  {
    "id": "sub_abc123",
    "product_name": "Pro Monthly",
    "amount": 3000,
    "interval": "month",
    "current_period_start": "2025-10-02T00:00:00Z"
  }

  실제 사용 예:

  // checkout.completed 이벤트
  const subscriptionData = buildSubscriptionData(
    data,                  // 전체 웹훅 데이터
    data.subscription      // 구독 객체
  );

  // subscription.paid 이벤트 (구독 객체가 최상위)
  const subscriptionData = buildSubscriptionData(data);

  ---
  6-6. 성공 응답

  📁 app/api/webhooks/creem/route.ts:124

  return NextResponse.json({ success: true });

  왜 응답이 중요한가요?

  우리 서버 → Creem:
  HTTP 200 OK
  { "success": true }

  Creem이 판단:
  "웹훅 처리 완료! 더 이상 재시도 안 함"

  만약 에러 (500) 응답하면:
  우리 서버 → Creem:
  HTTP 500 Error

  Creem이 판단:
  "실패했네? 1분 후 재시도..."
  "또 실패? 5분 후 재시도..."
  "계속 실패? 1시간 후 재시도..."
  (최대 3일 동안 시도)

  📍 7단계: 데이터베이스 업데이트 - 완전 분해

  7-1. Admin Client 생성

  📁 lib/supabase/admin.ts:3-14

  export const createAdminClient = () => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,  // ⭐ 핵심!
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  };

  일반 클라이언트 vs Admin 클라이언트:

  | 일반 클라이언트             | Admin 클라이언트         |
  |----------------------|---------------------|
  | SUPABASE_ANON_KEY 사용 | SERVICE_ROLE_KEY 사용 |
  | 제한된 권한 (RLS 적용)      | 무제한 권한              |
  | 사용자별 데이터만 접근         | 모든 데이터 접근 가능        |
  | 프론트엔드에서 사용           | 서버에서만 사용            |

  왜 Admin 클라이언트가 필요한가요?

  // 일반 클라이언트로 다른 사용자 데이터 업데이트 시도:
  const { data, error } = await supabase
    .from("profiles")
    .update({ subscription: {...} })
    .eq("id", "user_123");  // ❌ RLS 정책 위반!

  // Supabase가 거부:
  // "당신은 user_123이 아닙니다!"

  // Admin 클라이언트 (웹훅에서만 사용):
  const supabase = createAdminClient();  // 신의 권한!

  const { data, error } = await supabase
    .from("profiles")
    .update({ subscription: {...} })
    .eq("id", "user_123");  // ✅ 성공!

  보안 주의사항:

  // ✅ 안전 (서버에서만 실행):
  export async function updateUserSubscriptionServer(userId, data) {
    const supabase = createAdminClient();  // OK
    ...
  }

  // ❌ 위험 (절대 하면 안 됨!):
  "use client";  // 클라이언트 컴포넌트

  export function DangerousComponent() {
    const supabase = createAdminClient();  // 🚨 SERVICE_ROLE_KEY가 브라우저에 노출됨!
    ...
  }

  ---
  7-2. Customer ID 업데이트

  📁 services/creem.ts:81-98

  export async function updateUserCustomerIdServer(
    userId: string,
    customerId: string
  ): Promise<void> {
    const supabase = await createAdminClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        customer_id: customerId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      throw new Error(`Customer ID 업데이트에 실패했습니다: ${error.message}`);
    }
  }

  SQL로 변환하면:

  UPDATE profiles
  SET
    customer_id = 'cus_xyz789',
    updated_at = '2025-10-02T09:30:00.000Z'
  WHERE id = 'user_123';

  실행 전후 비교:

  // 실행 전:
  {
    id: "user_123",
    email: "user@example.com",
    customer_id: null,          // ← 빈 값
    subscription: null,
    updated_at: "2025-09-15T..."
  }

  // 실행 후:
  {
    id: "user_123",
    email: "user@example.com",
    customer_id: "cus_xyz789",  // ✅ 저장됨!
    subscription: null,
    updated_at: "2025-10-02T09:30:00.000Z"
  }

  왜 Customer ID를 저장하나요?

  나중에 고객 포털 URL 생성할 때 필요:

  // 9단계에서 사용:
  const portalUrl = await getCustomerPortalUrl(profile.customer_id);
  // → Creem에 "cus_xyz789의 포털 주세요" 요청

  ---
  7-3. 구독 정보 업데이트

  📁 services/creem.ts:103-120

  export async function updateUserSubscriptionServer(
    userId: string,
    subscriptionData: Partial<UserSubscription>
  ): Promise<void> {
    const supabase = await createAdminClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription: subscriptionData,  // JSONB 컬럼!
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      throw new Error(`구독 정보 업데이트에 실패했습니다: ${error.message}`);
    }
  }

  Partial<UserSubscription>이 뭔가요?

  // UserSubscription 타입:
  interface UserSubscription {
    id?: string;
    status?: string;
    product_id?: string;
    product_name?: string;
    amount?: number;
    // ... 10개 필드
  }

  // Partial<UserSubscription>: 일부만 넘겨도 OK
  updateUserSubscriptionServer("user_123", {
    status: "canceled",  // 이것만 업데이트
    canceled_at: "2025-10-02"
  });

  JSONB 컬럼의 힘:

  PostgreSQL의 JSONB 타입은 JSON을 저장하면서도 쿼리 가능:

  -- JSON 전체 저장
  UPDATE profiles
  SET subscription = '{
    "id": "sub_abc123",
    "status": "active",
    "product_name": "Pro Monthly",
    "amount": 3000,
    "current_period_end": "2025-11-02"
  }'::jsonb
  WHERE id = 'user_123';

  -- 나중에 쿼리 가능:
  SELECT * FROM profiles
  WHERE subscription->>'status' = 'active';  -- active 구독자만 조회

  SELECT * FROM profiles
  WHERE (subscription->>'amount')::int > 2000;  -- $20 이상 플랜 조회

  실행 전후 비교:

  // 실행 전:
  {
    id: "user_123",
    customer_id: "cus_xyz789",
    subscription: null,  // ← 빈 값
  }

  // updateUserSubscriptionServer 실행:
  updateUserSubscriptionServer("user_123", {
    id: "sub_abc123",
    status: "active",
    product_id: "prod_xxx",
    product_name: "Pro Monthly",
    amount: 3000,
    currency: "USD",
    interval: "month",
    current_period_start: "2025-10-02",
    current_period_end: "2025-11-02"
  });

  // 실행 후:
  {
    id: "user_123",
    customer_id: "cus_xyz789",
    subscription: {
      id: "sub_abc123",
      status: "active",
      product_id: "prod_xxx",
      product_name: "Pro Monthly",
      amount: 3000,
      currency: "USD",
      interval: "month",
      current_period_start: "2025-10-02T00:00:00.000Z",
      current_period_end: "2025-11-02T00:00:00.000Z",
      canceled_at: null
    },
    updated_at: "2025-10-02T09:30:05.123Z"
  }

  ---
  7-4. 데이터베이스 스키마

  profiles 테이블 구조 (추정):

  CREATE TABLE profiles (
    -- 기본 정보
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT,
    username TEXT,
    name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user',

    -- 결제 관련 (Creem)
    customer_id TEXT,           -- Creem Customer ID
    subscription JSONB,         -- 구독 정보 (JSON 형태)

    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 인덱스 (빠른 조회)
  CREATE INDEX idx_profiles_customer_id ON profiles(customer_id);
  CREATE INDEX idx_profiles_subscription_status
    ON profiles((subscription->>'status'));

  RLS (Row Level Security) 정책:

  -- 사용자는 자신의 프로필만 조회 가능
  CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

  -- 사용자는 자신의 프로필만 수정 가능
  CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

  -- ⭐ Admin (SERVICE_ROLE_KEY)은 모든 정책 무시!

  ---
  7-5. 트랜잭션과 동시성

  문제 시나리오:

  09:00:00 - 웹훅 A: subscription.active 수신
  09:00:00 - 웹훅 B: subscription.paid 수신 (동시에!)

  두 개의 updateUserSubscriptionServer 동시 실행:
  A: subscription = { status: "active", ... }
  B: subscription = { current_period_end: "2025-11-02", ... }

  결과: 덮어쓰기 발생!

  해결책 (더 나은 코드):

  export async function updateUserSubscriptionServer(
    userId: string,
    subscriptionData: Partial<UserSubscription>
  ): Promise<void> {
    const supabase = await createAdminClient();

    // 1) 현재 구독 정보 조회
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription")
      .eq("id", userId)
      .single();

    // 2) 기존 데이터와 병합
    const updatedSubscription = {
      ...profile?.subscription,  // 기존 데이터
      ...subscriptionData,       // 새 데이터
    };

    // 3) 업데이트
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription: updatedSubscription,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw new Error(`업데이트 실패: ${error.message}`);
  }

  이 코드는 이미 services/user.ts:266-292에 구현되어 있습니다!


⏺ ---
  📍 8-9단계: 사용자 대시보드 & 구독 관리 - 완전 분해

  8-1. 데이터 조회 Hook

  📁 hooks/user-hook.ts:111-117

  export function useUserSubscription(userId?: string) {
    return useQuery({
      queryKey: ["user-subscription", userId],
      queryFn: () => getUserSubscription(userId),
      enabled: !!userId,
    });
  }

  enabled 옵션이 뭔가요?

  // userId가 없으면 쿼리 실행 안 함
  const { data } = useUserSubscription(undefined);  // 실행 X
  const { data } = useUserSubscription("user_123"); // 실행 O

  !!userId의 의미:

  !!undefined  // false
  !!null       // false
  !!""         // false
  !!"user_123" // true

  // 즉, userId가 있을 때만 쿼리 실행

  queryKey의 역할:

  // 캐시 키로 사용:
  queryKey: ["user-subscription", "user_123"]

  // 캐시에 저장:
  {
    "user-subscription,user_123": {
      data: { id: "sub_abc", status: "active", ... },
      fetchedAt: 1234567890
    }
  }

  // 나중에 같은 키로 요청하면 캐시에서 가져옴

  ---
  8-2. 데이터 조회 Service

  📁 services/user.ts:239-261

  export async function getUserSubscription(
    userId?: string
  ): Promise<UserSubscription | null> {
    if (!userId) {
      const user = await getCurrentUser();
      if (!user) return null;
      userId = user.id;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("subscription")
      .eq("id", userId)
      .single();

    if (error || !data || !data.subscription) {
      return null;
    }

    return data.subscription as UserSubscription;
  }

  단계별 동작:

  Line 241-246: userId 처리

  if (!userId) {
    const user = await getCurrentUser();
    if (!user) return null;
    userId = user.id;
  }

  - userId가 없으면 현재 로그인 사용자 조회
  - "내 구독 정보 보기" 용도

  Line 248: 일반 클라이언트 사용

  const supabase = createClient();  // Admin 아님!

  - 읽기만 하므로 일반 클라이언트로 충분
  - RLS 정책: 사용자는 자신의 프로필만 조회 가능

  Line 250-254: Supabase 쿼리

  const { data, error } = await supabase
    .from("profiles")
    .select("subscription")  // subscription 컬럼만 가져오기
    .eq("id", userId)        // WHERE id = userId
    .single();               // 단일 행 반환 (배열 아님)

  SQL로 변환:
  SELECT subscription
  FROM profiles
  WHERE id = 'user_123'
  LIMIT 1;

  Line 256-258: 에러 처리

  if (error || !data || !data.subscription) {
    return null;
  }

  다음 경우 null 반환:
  - DB 에러
  - 사용자 없음
  - subscription 컬럼이 비어있음

  Line 260: 타입 캐스팅

  return data.subscription as UserSubscription;

  PostgreSQL JSONB → TypeScript 타입으로 변환

  ---
  8-3. 대시보드 페이지 - 데이터 로딩

  📁 app/[locale]/dashboard/subscription/page.tsx:26-30

  export default function SubscriptionPage() {
    const { data: user, isLoading } = useCurrentUser();
    const { data: subscription, isLoading: subscriptionLoading } =
      useUserSubscription(user?.id);
    const { data: profile } = useCurrentUserProfile();

  실행 흐름:

  1단계: 컴포넌트 마운트
      ↓
  2단계: useCurrentUser() 실행
      → isLoading = true
      → Supabase에 사용자 정보 요청
      ↓
  3단계: 사용자 정보 도착
      → user = { id: "user_123", ... }
      → isLoading = false
      ↓
  4단계: useUserSubscription(user.id) 실행
      → subscriptionLoading = true
      → DB에 구독 정보 요청
      ↓
  5단계: 구독 정보 도착
      → subscription = { status: "active", ... }
      → subscriptionLoading = false
      ↓
  6단계: 화면 렌더링

  왜 순차적으로 실행되나요?

  useUserSubscription(user?.id)
                      ↑
                   user가 없으면 undefined

  // enabled: !!userId 때문에
  // user가 로드되기 전까지 구독 쿼리 실행 안 됨

  ---
  8-4. 로딩 상태 처리

  📁 app/[locale]/dashboard/subscription/page.tsx:97-119

  if (isLoading || subscriptionLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">구독 관리</h1>
          <p className="text-muted-foreground">
            구독 플랜과 결제 정보를 관리하세요.
          </p>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  Skeleton UI:

  ┌────────────────────────────────┐
  │  구독 관리                      │
  │  구독 플랜과 결제 정보를...     │
  ├────────────────────────────────┤
  │  ▅▅▅▅                          │  ← 깜빡이는 회색 막대
  │  ▅▅▅▅▅▅▅▅                      │
  │  ▅▅▅▅▅▅▅▅▅▅▅▅▅▅                │
  └────────────────────────────────┘

  왜 이렇게 하나요?
  - 사용자에게 "로딩 중"임을 시각적으로 알림
  - 빈 화면보다 UX 좋음
  - animate-pulse: Tailwind CSS 애니메이션

  ---
  8-5. 구독 없을 때 처리

  📁 app/[locale]/dashboard/subscription/page.tsx:121-141

  if (!subscription || !subscription.status) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">구독 관리</h1>
          <p className="text-muted-foreground">
            구독 플랜과 결제 정보를 관리하세요.
          </p>
        </div>
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            현재 활성화된 구독이 없습니다.{" "}
            <Link href="/pricing" className="font-semibold underline">
              여기에서 플랜을 선택하세요
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  조건 설명:

  !subscription              // 구독 정보 자체가 없음
  !subscription.status       // status 필드가 비어있음

  // 다음 경우 모두 해당:
  subscription = null
  subscription = {}
  subscription = { id: "sub_xxx", status: null }

  ---
  8-6. 구독 정보 표시

  📁 app/[locale]/dashboard/subscription/page.tsx:154-219

  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <CardTitle>현재 플랜</CardTitle>
        </div>
        <Badge className={getStatusColor(subscription.status!)}>
          {getStatusText(subscription.status!)}
        </Badge>
      </div>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* 플랜명과 가격 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">플랜명</p>
          <p className="font-semibold text-lg">
            {subscription.product_name || "Unknown Plan"}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">가격</p>
          <p className="font-semibold text-lg">
            {subscription.amount
              ? formatAmount(subscription.amount, subscription.currency || "USD")
              : "N/A"}
            <span className="text-sm text-muted-foreground">
              /{subscription.interval === "month" ? "월" : "년"}
            </span>
          </p>
        </div>
      </div>

      <Separator />

      {/* 결제 주기 */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">현재 결제 주기</p>
        </div>
        <p className="font-medium">
          {formatDate(subscription.current_period_start)} -
          {formatDate(subscription.current_period_end)}
        </p>
      </div>

      {/* 취소 알림 */}
      {subscription.canceled_at && (
        <Alert>
          <AlertDescription>
            구독이 {formatDate(subscription.canceled_at)}에 취소되었습니다.
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  </Card>

  ---
  8-7. 상태별 뱃지 색상

  📁 app/[locale]/dashboard/subscription/page.tsx:34-47

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "past_due":
        return "bg-yellow-100 text-yellow-800";
      case "paused":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  실제 화면:

  ┌─────────────────────────────────┐
  │ 👑 현재 플랜    [ 활성 ]  ← 초록색  │
  │                                 │
  │ 플랜명         가격              │
  │ Pro Monthly    $30/월           │
  │                                 │
  │ 📅 현재 결제 주기                │
  │ 2025년 10월 2일 - 2025년 11월 2일│
  └─────────────────────────────────┘

  ---


  9단계: Customer Portal 열기

  📁 app/[locale]/dashboard/subscription/page.tsx:79-95

  const handleCustomerPortal = async () => {
    if (!profile?.profile?.customer_id) {
      toast.error("고객 ID를 찾을 수 없습니다.");
      return;
    }

    setIsLoadingPortal(true);
    try {
      const portalUrl = await getCustomerPortalUrl(profile.profile.customer_id);
      window.open(portalUrl, "_blank");
    } catch (error) {
      toast.error("고객 포털 접속에 실패했습니다.");
      console.error("Customer portal error:", error);
    } finally {
      setIsLoadingPortal(false);
    }
  };

  📁 services/creem.ts:124-143

  export async function getCustomerPortalUrl(
    customerId: string
  ): Promise<string> {
    const response = await fetch(`${CREEM_API_BASE_URL}/v1/customers/billing`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        customer_id: customerId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "고객 포털 URL 생성에 실패했습니다.");
    }

    const data = await response.json();
    return data.customer_portal_link;
  }

  실행 흐름:

  1. 사용자가 "플랜 변경하기" 버튼 클릭
      ↓
  2. handleCustomerPortal() 실행
      ↓
  3. customer_id 확인 ("cus_xyz789")
      ↓
  4. Creem API 호출:
     POST /v1/customers/billing
     { customer_id: "cus_xyz789" }
      ↓
  5. Creem 응답:
     { customer_portal_link: "https://billing.creem.io/portal/temp_abc" }
      ↓
  6. 새 탭에서 열기:
     window.open(portalUrl, "_blank")

  Customer Portal에서 할 수 있는 일:

  ┌────────────────────────────────┐
  │  Creem Customer Portal         │
  ├────────────────────────────────┤
  │  Pro Monthly - $30/월          │
  │  다음 결제: 2025년 11월 2일     │
  │                                │
  │  [ 플랜 변경 ]                  │
  │    → Starter ($17/월)          │
  │    → Enterprise (문의)         │
  │                                │
  │  [ 결제 수단 ]                  │
  │    •••• 1234                   │
  │    [ 변경 ]                    │
  │                                │
  │  [ 청구서 내역 ]                │
  │    2025-10-02  $30.00  PDF     │
  │    2025-09-02  $30.00  PDF     │
  │                                │
  │  [ 구독 취소 ]                  │
  └────────────────────────────────┘

  📍 10단계: 자동 갱신 - 완전 분해

  이 단계는 우리 코드가 아니라 Creem이 자동으로 처리하지만, 6-7단계를 재사용합니다.

  10-1. Creem의 자동 갱신 시스템

  2025-10-02 - 첫 결제
      ↓
  Creem DB에 기록:
  {
    subscription_id: "sub_abc123",
    customer_id: "cus_xyz789",
    next_billing_date: "2025-11-02",  ← 1개월 후
    payment_method: "card_ending_1234"
  }
      ↓
  [30일 동안 Creem 대기...]
      ↓
  2025-11-02 00:00:00 (UTC)
  Creem 자동 작업(Cron Job) 실행:
  "오늘 결제할 구독 찾기"
      ↓
  SELECT * FROM subscriptions
  WHERE next_billing_date = CURRENT_DATE
  AND status = 'active';
      ↓
  sub_abc123 발견!

  ---
  10-2. 자동 결제 프로세스

  // Creem 내부 로직 (우리가 볼 수 없음, 추정)

  async function processBillingCycle(subscription) {
    try {
      // 1) 결제 시도
      const payment = await chargeCard({
        customer_id: subscription.customer_id,
        amount: subscription.amount,
        payment_method_id: subscription.payment_method_id
      });

      if (payment.status === "succeeded") {
        // 2) 다음 결제일 계산
        subscription.current_period_start = "2025-11-02";
        subscription.current_period_end = "2025-12-02";
        subscription.next_billing_date = "2025-12-02";

        // 3) 웹훅 전송
        await sendWebhook({
          eventType: "subscription.paid",
          object: subscription
        });

        // 4) 이메일 발송
        await sendEmail({
          to: subscription.customer_email,
          subject: "결제 완료",
          body: "Pro Monthly 플랜 $30 결제가 완료되었습니다."
        });
      } else {
        // 결제 실패 처리
        await handleFailedPayment(subscription);
      }
    } catch (error) {
      await handleBillingError(subscription, error);
    }
  }

  ---
  10-3. 성공 시 웹훅

  Creem → 우리 서버

  // Creem이 보내는 HTTP 요청
  POST https://mysite.com/api/webhooks/creem
  Headers: {
    "creem-signature": "abc123..."
  }
  Body: {
    "eventType": "subscription.paid",
    "object": {
      "id": "sub_abc123",
      "status": "active",
      "current_period_start_date": "2025-11-02T00:00:00Z",
      "current_period_end_date": "2025-12-02T00:00:00Z",
      "product": {
        "id": "prod_xxx",
        "name": "Pro Monthly",
        "price": 3000
      },
      "metadata": {
        "userId": "user_123"
      }
    }
  }

  📁 app/api/webhooks/creem/route.ts:92-95

  case "subscription.paid":
    await updateUserSubscriptionServer(userId, buildSubscriptionData(data));
    break;

  실행되는 SQL:

  UPDATE profiles
  SET subscription = jsonb_set(
    subscription,
    '{current_period_end}',
    '"2025-12-02T00:00:00Z"'
  ),
  updated_at = NOW()
  WHERE id = 'user_123';

  ---
  10-4. 실패 시 처리

  시나리오 1: 카드 잔액 부족

  2025-11-02 - 자동 결제 시도
      ↓
  카드사 응답: "잔액 부족"
      ↓
  Creem 내부 처리:
    - subscription.status = "past_due"
    - subscription.retry_count = 1
    - subscription.next_retry = "2025-11-03"
      ↓
  웹훅 전송: "subscription.past_due"

  📁 app/api/webhooks/creem/route.ts (현재 처리 안 됨!)

  현재 코드에는 past_due 처리가 없습니다. 추가해야 할 코드:

  case "subscription.past_due":
    await updateUserSubscriptionServer(userId, {
      ...buildSubscriptionData(data),
      status: "past_due",
    });

    // 선택: 사용자에게 이메일 발송
    await sendPaymentFailureEmail(userId);
    break;

  ---
  시나리오 2: 재시도 후 계속 실패

  2025-11-02 - 1차 시도 실패
  2025-11-03 - 2차 시도 실패
  2025-11-04 - 3차 시도 실패
      ↓
  Creem 판단: "3일 동안 계속 실패"
      ↓
  구독 취소 처리:
    subscription.status = "canceled"
    subscription.canceled_at = "2025-11-04T12:00:00Z"
      ↓
  웹훅 전송: "subscription.canceled"

  📁 app/api/webhooks/creem/route.ts:104-110

  case "subscription.canceled":
    await updateUserSubscriptionServer(userId, {
      ...buildSubscriptionData(data),
      status: "canceled",
      canceled_at: data.canceled_at || new Date().toISOString(),
    });
    break;

  DB 업데이트:

  UPDATE profiles
  SET subscription = jsonb_set(
    jsonb_set(
      subscription,
      '{status}',
      '"canceled"'
    ),
    '{canceled_at}',
    '"2025-11-04T12:00:00Z"'
  ),
  updated_at = NOW()
  WHERE id = 'user_123';

  ---
  10-5. 사용자 화면 반영

  결제 성공 시:

  사용자가 /dashboard/subscription 접속
      ↓
  useUserSubscription() 실행
      ↓
  DB에서 최신 데이터 조회:
  {
    status: "active",
    current_period_end: "2025-12-02"  ← 업데이트됨!
  }
      ↓
  화면에 표시:
  "다음 결제일: 2025년 12월 2일"

  결제 실패 시:

  DB 데이터:
  {
    status: "past_due",
    current_period_end: "2025-11-02"
  }
      ↓
  화면에 표시:
  ⚠️ 결제 지연
  "결제 수단을 확인해주세요"
  [ 결제 수단 업데이트 ] 버튼

  ---
  10-6. 추가 구현 권장사항

  현재 코드에 없지만 추가하면 좋은 기능:

  1) past_due 상태 UI

  // app/[locale]/dashboard/subscription/page.tsx

  {subscription.status === "past_due" && (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>결제 지연</AlertTitle>
      <AlertDescription>
        결제 수단에 문제가 있습니다. 3일 내에 해결하지 않으면 구독이 취소됩니다.
        <Button 
          onClick={handleCustomerPortal} 
          className="ml-4"
        >
          결제 수단 업데이트
        </Button>
      </AlertDescription>
    </Alert>
  )}

  2) 만료 임박 알림

  // services/user.ts

  export async function getDaysUntilRenewal(userId?: string): Promise<number> {
    const subscription = await getUserSubscription(userId);

    if (!subscription?.current_period_end) return -1;

    const endDate = new Date(subscription.current_period_end);
    const now = new Date();
    const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  // 대시보드에서 사용:
  const daysLeft = await getDaysUntilRenewal(user.id);

  {daysLeft <= 7 && daysLeft > 0 && (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        {daysLeft}일 후 자동 결제됩니다.
      </AlertDescription>
    </Alert>
  )}

  3) 웹훅 재시도 로깅

  // app/api/webhooks/creem/route.ts

  export async function POST(request: NextRequest) {
    const webhookId = crypto.randomUUID();

    console.log(`[Webhook ${webhookId}] 수신:`, {
      eventType,
      userId,
      timestamp: new Date().toISOString()
    });

    try {
      // ... 처리 로직

      console.log(`[Webhook ${webhookId}] 성공`);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(`[Webhook ${webhookId}] 실패:`, error);

      // DB에 실패 로그 저장 (선택사항)
      await logWebhookFailure({
        webhook_id: webhookId,
        event_type: eventType,
        error: error.message,
        retry_count: request.headers.get("creem-retry-count") || "0"
      });

      return NextResponse.json({ error: "처리 실패" }, { status: 500 });
    }
  }



