# Selloframe - Claude Code 개발 규칙

> 이 문서는 Claude Code가 이 프로젝트에서 코드를 작성할 때 따라야 하는 규칙을 정의합니다.

## 📋 프로젝트 개요

**프로젝트명**: Selloframe
**기술 스택**: Next.js 15.5.5, React 19, TypeScript, Tailwind CSS 4, Supabase
**디자인 시스템**: Linear Design System (Dark Mode)
**패키지 매니저**: npm

## 🎨 디자인 시스템 규칙

### Linear Design System 기반

이 프로젝트는 **Linear의 공식 디자인 시스템**을 기반으로 합니다.

#### 핵심 색상
```typescript
// lib/theme.ts에서 관리
background.primary: '#08090a'    // 기본 배경
background.secondary: '#141516'  // 카드/섹션 배경
foreground.primary: '#f7f8f8'    // 기본 텍스트
foreground.secondary: '#d0d6e0'  // 보조 텍스트
foreground.tertiary: '#8a8f98'   // 3차 텍스트
brand.background: '#5e6ad2'      // 브랜드 색상
accent.default: '#7170ff'        // 액센트 색상
```

#### 타이포그래피
- **기본 폰트**: Inter Variable (시스템 폰트 폴백)
- **기본 크기**: 13px - 15px
- **Letter Spacing**: -0.011em ~ -0.022em (헤딩)
- **Font Weight**: 400 (normal), 510 (medium), 590 (semibold)

#### 간격 시스템
- 8px 기반 간격 시스템 사용
- `spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', ... }`

#### Border & Radius
- **Border Color**: `#23252a` (primary), `#34343a` (secondary)
- **Border Radius**: 4px, 6px, 8px, 12px (용도별 선택)

---

## 🧩 필수 UI 컴포넌트 사용 규칙

### ⚠️ 중요: 기존 컴포넌트 우선 사용

**모든 UI 요소는 `components/ui/` 디렉토리의 기존 컴포넌트를 사용해야 합니다.**

### 사용 가능한 컴포넌트 목록

#### 1. Button (`components/ui/Button.tsx`)
```typescript
// 사용 예시
import Button from '@/components/ui/Button'

<Button variant="primary" size="md">클릭</Button>
<Button variant="secondary" loading={isLoading}>저장</Button>
<Button variant="ghost" leftIcon={<Icon />}>아이콘</Button>
<Button variant="danger">삭제</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `leftIcon`, `rightIcon`: ReactNode

**사용 규칙:**
- CTA 버튼: `variant="primary"`
- 보조 버튼: `variant="secondary"`
- 미니멀 버튼: `variant="ghost"`
- 삭제/위험 작업: `variant="danger"`

---

#### 2. Card (`components/ui/Card.tsx`)
```typescript
import Card, { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/Card'

<Card hoverable>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
  <CardFooter>
    푸터
  </CardFooter>
</Card>
```

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean (호버 효과)
- `bordered`: boolean (기본 true)

---

#### 3. Input (`components/ui/Input.tsx`)
```typescript
import Input from '@/components/ui/Input'

<Input
  label="이메일"
  type="email"
  placeholder="이메일을 입력하세요"
  helperText="도움말 텍스트"
  error="에러 메시지"
  leftIcon={<Icon />}
  fullWidth
/>
```

**Props:**
- `label`: string
- `error`: string (에러 상태)
- `helperText`: string
- `leftIcon`, `rightIcon`: ReactNode
- `fullWidth`: boolean
- `disabled`: boolean

---

#### 4. Badge (`components/ui/Badge.tsx`)
```typescript
import Badge from '@/components/ui/Badge'

<Badge variant="success" size="md" dot>활성</Badge>
<Badge variant="error">에러</Badge>
<Badge variant="warning">경고</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean (앞에 점 표시)

---

#### 5. Select (`components/ui/Select.tsx`)
```typescript
import Select from '@/components/ui/Select'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true }
]

<Select
  label="선택"
  options={options}
  placeholder="선택하세요"
  helperText="도움말"
  error="에러 메시지"
  fullWidth
/>
```

---

#### 6. Textarea (`components/ui/Textarea.tsx`)
```typescript
import Textarea from '@/components/ui/Textarea'

<Textarea
  label="메시지"
  placeholder="메시지를 입력하세요"
  rows={4}
  resize="vertical"
  helperText="도움말"
  error="에러 메시지"
  fullWidth
/>
```

**Props:**
- `resize`: 'none' | 'vertical' | 'horizontal' | 'both'
- `rows`: number

---

## 🚨 새 컴포넌트 생성 규칙

### ⛔ 금지사항
- 기존 컴포넌트가 있는데 새로 만드는 것
- 사용자 승인 없이 임의로 새 컴포넌트 생성
- Tailwind 클래스를 인라인으로 직접 작성 (컴포넌트 사용 필수)

### ✅ 새 컴포넌트가 필요한 경우 절차

1. **사용자에게 확인 요청**
```
💡 새로운 [컴포넌트명] 컴포넌트가 필요합니다.

📌 이유:
- [왜 기존 컴포넌트로 해결이 안 되는지]
- [어떤 특수한 기능이 필요한지]

📍 사용 위치:
- [어디에 사용될 예정인지]

🎨 디자인 방향:
- [Linear Design System 준수 여부]
- [props 구조 제안]

생성해도 될까요?
```

2. **사용자 승인 후 생성**
   - `components/ui/` 디렉토리에 생성
   - Linear Design System 준수
   - TypeScript + forwardRef 사용
   - Props 타입 명확히 정의

3. **CLAUDE.md 업데이트**
   - 새 컴포넌트를 이 문서에 추가
   - 사용 예시 작성

---

## 📁 프로젝트 구조

```
/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # 인증 관련 라우트
│   │   └── login/
│   ├── api/               # API Routes
│   ├── components/        # 컴포넌트 데모 페이지
│   ├── dashboard/         # 대시보드
│   ├── pricing/           # 요금제 페이지
│   └── layout.tsx         # 루트 레이아웃
│
├── components/            # React 컴포넌트
│   ├── ui/               # ⭐ 재사용 UI 컴포넌트 (Linear 기반)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── index.ts
│   ├── landing/          # 랜딩 페이지 섹션
│   ├── Header.tsx        # 헤더 컴포넌트
│   └── PricingPlans.tsx  # 요금제 컴포넌트
│
├── lib/                   # 유틸리티 & 설정
│   ├── theme.ts          # ⭐ Linear Design System 테마
│   └── supabase/         # Supabase 설정
│
├── hooks/                 # Custom React Hooks
├── types/                 # TypeScript 타입 정의
├── services/              # API 서비스
└── public/                # 정적 파일
```

---

## 🔧 코딩 규칙

### TypeScript
- **Strict mode 사용**
- 모든 props에 타입 명시
- `any` 타입 금지
- 인터페이스 사용 (타입보다 선호)

### React
- **함수형 컴포넌트** 사용
- **forwardRef** 사용 (UI 컴포넌트)
- Hooks 사용 (`useState`, `useEffect` 등)
- "use client" 디렉티브 필요 시 명시

### 네이밍 컨벤션
- **컴포넌트**: PascalCase (예: `Button.tsx`)
- **함수/변수**: camelCase (예: `handleClick`)
- **타입/인터페이스**: PascalCase (예: `ButtonProps`)
- **상수**: UPPER_SNAKE_CASE (예: `API_URL`)

### 파일 구조
```typescript
// 1. Import statements
import { ... } from 'react'
import { ... } from 'next'

// 2. Type definitions
export interface ComponentProps {
  ...
}

// 3. Component
const Component = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
  // 4. Hooks
  // 5. Event handlers
  // 6. Render
})

// 7. Display name
Component.displayName = 'Component'

// 8. Export
export default Component
```

---

## 🎯 개발 우선순위

### 1순위: 기존 컴포넌트 사용
- `components/ui/` 컴포넌트 최대한 활용
- Tailwind 직접 작성 최소화

### 2순위: 컴포넌트 조합
- 기존 컴포넌트를 조합하여 복잡한 UI 구성
- 예: `Card` + `Button` + `Input` 조합

### 3순위: 새 컴포넌트 생성 (사용자 승인 필요)
- 기존 컴포넌트로 불가능한 경우만
- 반드시 사용자 확인 후 생성

---

## 📝 Git 커밋 규칙

### 커밋 메시지 형식
```
<type>: <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Type 종류
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `design`: UI/UX 디자인 변경
- `refactor`: 코드 리팩토링
- `docs`: 문서 수정
- `chore`: 기타 작업

---

## 🔍 코드 리뷰 체크리스트

### 컴포넌트 사용
- [ ] 기존 `components/ui/` 컴포넌트를 사용했는가?
- [ ] 새 컴포넌트 생성 시 사용자 승인을 받았는가?

### 디자인 시스템
- [ ] Linear Design System 색상을 사용했는가?
- [ ] `lib/theme.ts`의 값을 참조했는가?
- [ ] 폰트 크기가 13px-15px 범위인가?

### 코드 품질
- [ ] TypeScript 타입이 명시되었는가?
- [ ] 네이밍 컨벤션을 따랐는가?
- [ ] 불필요한 코드가 없는가?

### ESLint 규칙
- [ ] JSX 내 특수 문자 이스케이프 (`react/no-unescaped-entities`)
- [ ] 빌드 전 ESLint 에러 없음

---

## ⚠️ ESLint 규칙: JSX 내 특수 문자 처리

### 필수: `react/no-unescaped-entities` 규칙 준수

JSX 텍스트 콘텐츠에서 특수 문자(`"`, `'`, `>`, `<`, `}`)를 직접 사용하면 Vercel 배포 시 빌드 에러가 발생합니다.

### ❌ 잘못된 예시
```tsx
// ❌ 빌드 에러 발생
<p>회사(이하 "회사")는 서비스를 제공합니다.</p>
<li>웹사이트 내 '마이페이지'를 통한 처리</li>
```

### ✅ 올바른 예시
```tsx
// ✅ HTML 엔티티 사용
<p>회사(이하 &ldquo;회사&rdquo;)는 서비스를 제공합니다.</p>
<li>웹사이트 내 &lsquo;마이페이지&rsquo;를 통한 처리</li>
```

### HTML 엔티티 참조표

| 문자 | HTML 엔티티 | 설명 |
|------|-------------|------|
| `"` | `&quot;` `&ldquo;` `&#34;` `&rdquo;` | 큰따옴표 |
| `'` | `&apos;` `&lsquo;` `&#39;` `&rsquo;` | 작은따옴표 |
| `>` | `&gt;` | 보다 큰 |
| `<` | `&lt;` | 보다 작은 |
| `}` | `&#125;` | 중괄호 닫기 |

### 빌드 전 검증
```bash
# 빌드 전 반드시 실행하여 에러 확인
npm run build

# 또는 빠른 검증 (린트 + 타입 체크)
npm run validate
```

### 주의사항
- **HTML 속성 내부**에서는 따옴표를 자유롭게 사용 가능 (예: `className="text-[#f7f8f8]"`)
- **JSX 텍스트 콘텐츠**에서만 HTML 엔티티로 변환 필요
- Vercel 배포 시 이 규칙을 위반하면 자동 빌드 실패

---

## 📚 참고 자료

- **Linear Design System**: [linear.app](https://linear.app/)
- **Next.js 문서**: [nextjs.org](https://nextjs.org/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **Supabase 문서**: [supabase.com/docs](https://supabase.com/docs)

---

## 🚀 빠른 시작

### 개발 서버 실행
```bash
npm run dev
```

### 컴포넌트 데모 확인
```
http://localhost:3000/components
```

### 빌드 및 검증
```bash
# 전체 빌드 (프로덕션)
npm run build

# 빠른 검증 (ESLint + TypeScript)
npm run validate

# ESLint만 실행
npm run lint

# TypeScript 타입 체크만 실행
npm run type-check
```

---

## 🔍 배포 전 체크리스트

### Vercel 배포 전 필수 확인사항

1. **ESLint 에러 확인**
   ```bash
   npm run lint
   ```
   - `react/no-unescaped-entities` 에러가 없어야 함
   - JSX 내 특수 문자가 HTML 엔티티로 변환되었는지 확인

2. **TypeScript 타입 에러 확인**
   ```bash
   npm run type-check
   ```
   - 타입 에러가 없어야 함

3. **전체 빌드 테스트**
   ```bash
   npm run build
   ```
   - 빌드가 성공적으로 완료되어야 함
   - 에러나 경고가 없어야 함

4. **또는 통합 검증**
   ```bash
   npm run validate
   ```
   - ESLint + TypeScript를 한 번에 검증

### 자주 발생하는 배포 에러

#### 1. `react/no-unescaped-entities`
- **원인**: JSX 텍스트에서 `"`, `'` 등의 특수 문자를 직접 사용
- **해결**: HTML 엔티티로 변환 (`&ldquo;`, `&rdquo;`, `&lsquo;`, `&rsquo;`)

#### 2. TypeScript 타입 에러
- **원인**: 타입이 명시되지 않았거나 잘못된 타입 사용
- **해결**: 모든 props, 함수, 변수에 명시적 타입 지정

#### 3. Import 경로 에러
- **원인**: 절대 경로(`@/`)가 잘못 사용됨
- **해결**: `tsconfig.json`의 paths 설정 확인

---

**📌 중요: 이 규칙을 따르지 않는 코드는 리팩토링 대상입니다.**
