-- ============================================
-- Creem 결제 시스템을 위한 데이터베이스 스키마
-- ============================================

-- 1. profiles 테이블 생성
-- auth.users와 1:1 관계, 사용자 프로필 및 구독 정보 저장
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  username TEXT,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  customer_id TEXT UNIQUE,
  subscription JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 인덱스 생성 (빠른 조회를 위해)
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_customer_id ON profiles(customer_id);
CREATE INDEX idx_profiles_subscription_status ON profiles((subscription->>'status'));
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS 정책 생성
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  USING (auth.uid() = id);

-- 참고: Service Role (SUPABASE_SERVICE_ROLE_KEY)은 모든 RLS 정책을 우회합니다.
-- 이는 웹훅 엔드포인트에서 구독 데이터를 업데이트하는 데 필요합니다.

-- 5. 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- 6. 트리거: updated_at 자동 업데이트
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- 7. 함수: 새 사용자 등록 시 자동으로 profiles 레코드 생성
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- 8. 트리거: auth.users에 새 사용자 생성 시 profiles 레코드 자동 생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- subscription JSONB 구조 예시
-- ============================================
/*
{
  "id": "sub_abc123",                           -- 구독 ID
  "status": "active",                           -- 상태: active, past_due, canceled, trialing
  "product_id": "prod_xxx",                     -- 상품 ID
  "product_name": "Pro Monthly",                -- 상품 이름
  "amount": 29900,                              -- 금액 (원)
  "interval": "month",                          -- 주기: month, year
  "current_period_start": "2025-10-15T00:00:00Z", -- 현재 구독 시작일
  "current_period_end": "2025-11-15T00:00:00Z",   -- 현재 구독 종료일
  "canceled_at": null,                          -- 취소일 (취소된 경우)
  "trial_end": null                             -- 체험 종료일 (체험 중인 경우)
}
*/

-- ============================================
-- 유용한 쿼리 예시
-- ============================================

-- 활성 구독 사용자 조회
-- SELECT * FROM profiles WHERE subscription->>'status' = 'active';

-- 특정 플랜 구독자 조회
-- SELECT * FROM profiles WHERE subscription->>'product_name' = 'Pro Monthly';

-- 구독 만료 임박 사용자 조회 (7일 이내)
-- SELECT * FROM profiles
-- WHERE subscription->>'status' = 'active'
-- AND (subscription->>'current_period_end')::timestamptz < NOW() + INTERVAL '7 days';

-- Customer ID로 사용자 조회
-- SELECT * FROM profiles WHERE customer_id = 'cus_xxx';
