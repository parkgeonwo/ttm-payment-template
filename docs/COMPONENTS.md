# UI Component Library Guide

Linear Design System을 기반으로 한 재사용 가능한 UI 컴포넌트 라이브러리입니다.

## 📦 설치 및 사용

### Import 방법

```typescript
// 개별 컴포넌트 import
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

// 또는 중앙 집중식 import
import { Button, Input, Card } from '@/components/ui'
```

## 🎨 Theme

모든 컴포넌트는 `lib/theme.ts`에 정의된 디자인 토큰을 사용합니다.

```typescript
import { theme } from '@/lib/theme'

// 예: theme.colors.primary[500]
```

## 📚 컴포넌트

### Button

다양한 variant와 size를 지원하는 버튼 컴포넌트입니다.

```tsx
import Button from '@/components/ui/Button'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<IconComponent />}>Add Item</Button>
<Button rightIcon={<IconComponent />}>Next</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | 버튼 스타일 variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| fullWidth | `boolean` | `false` | 전체 너비 사용 여부 |
| loading | `boolean` | `false` | 로딩 상태 표시 |
| leftIcon | `ReactNode` | - | 왼쪽 아이콘 |
| rightIcon | `ReactNode` | - | 오른쪽 아이콘 |

### Input

텍스트 입력 필드 컴포넌트입니다.

```tsx
import Input from '@/components/ui/Input'

// Basic usage
<Input placeholder="Enter text..." />

// With label and helper text
<Input
  label="Email"
  placeholder="your@email.com"
  helperText="We'll never share your email"
/>

// With error
<Input
  label="Username"
  error="Username is required"
/>

// With icons
<Input
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Full width
<Input fullWidth />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | 입력 필드 레이블 |
| error | `string` | - | 에러 메시지 |
| helperText | `string` | - | 도움말 텍스트 |
| leftIcon | `ReactNode` | - | 왼쪽 아이콘 |
| rightIcon | `ReactNode` | - | 오른쪽 아이콘 |
| fullWidth | `boolean` | `false` | 전체 너비 사용 여부 |

### Card

컨텐츠를 담는 카드 컴포넌트입니다.

```tsx
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'

// Basic usage
<Card>
  <CardContent>Card content</CardContent>
</Card>

// Complete structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Variants
<Card hoverable>Hoverable card</Card>
<Card padding="none">No padding</Card>
<Card bordered={false}>No border</Card>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| padding | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 카드 내부 여백 |
| hoverable | `boolean` | `false` | 호버 효과 활성화 |
| bordered | `boolean` | `true` | 테두리 표시 여부 |

### Badge

상태나 카테고리를 나타내는 배지 컴포넌트입니다.

```tsx
import Badge from '@/components/ui/Badge'

// Basic usage
<Badge>Default</Badge>

// Variants
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With dot indicator
<Badge dot variant="success">Active</Badge>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | 배지 스타일 variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 배지 크기 |
| dot | `boolean` | `false` | 점 표시기 표시 |

### Select

드롭다운 선택 컴포넌트입니다.

```tsx
import Select from '@/components/ui/Select'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

// Basic usage
<Select options={options} />

// With label and placeholder
<Select
  label="Choose an option"
  placeholder="Select..."
  options={options}
/>

// With error
<Select
  label="Required field"
  error="Please select an option"
  options={options}
/>

// Full width
<Select options={options} fullWidth />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | 선택 필드 레이블 |
| error | `string` | - | 에러 메시지 |
| helperText | `string` | - | 도움말 텍스트 |
| options | `SelectOption[]` | **required** | 옵션 목록 |
| placeholder | `string` | - | 플레이스홀더 텍스트 |
| fullWidth | `boolean` | `false` | 전체 너비 사용 여부 |

### Textarea

여러 줄 텍스트 입력 컴포넌트입니다.

```tsx
import Textarea from '@/components/ui/Textarea'

// Basic usage
<Textarea placeholder="Enter your message..." />

// With label
<Textarea
  label="Feedback"
  placeholder="Share your thoughts"
  rows={5}
/>

// With error
<Textarea
  label="Description"
  error="Description is required"
/>

// Resize options
<Textarea resize="none" />
<Textarea resize="vertical" />
<Textarea resize="horizontal" />
<Textarea resize="both" />

// Full width
<Textarea fullWidth />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | 텍스트영역 레이블 |
| error | `string` | - | 에러 메시지 |
| helperText | `string` | - | 도움말 텍스트 |
| fullWidth | `boolean` | `false` | 전체 너비 사용 여부 |
| resize | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | 리사이즈 동작 |

## 🎨 Design Tokens

### Colors

```typescript
// Primary colors
theme.colors.primary[50]   // #f0f3ff
theme.colors.primary[500]  // #5b21b6
theme.colors.primary[900]  // #312e81

// Text colors
theme.colors.text.primary    // #18181b
theme.colors.text.secondary  // #71717a
theme.colors.text.tertiary   // #a1a1aa

// Status colors
theme.colors.status.success  // #22c55e
theme.colors.status.warning  // #f59e0b
theme.colors.status.error    // #ef4444
theme.colors.status.info     // #3b82f6
```

### Typography

```typescript
// Font sizes
theme.typography.fontSize.xs    // 0.75rem
theme.typography.fontSize.sm    // 0.875rem
theme.typography.fontSize.base  // 1rem
theme.typography.fontSize.xl    // 1.25rem

// Font weights
theme.typography.fontWeight.normal    // 400
theme.typography.fontWeight.medium    // 500
theme.typography.fontWeight.semibold  // 600
theme.typography.fontWeight.bold      // 700
```

### Spacing

```typescript
theme.spacing[1]   // 0.25rem
theme.spacing[2]   // 0.5rem
theme.spacing[4]   // 1rem
theme.spacing[8]   // 2rem
theme.spacing[16]  // 4rem
```

### Border Radius

```typescript
theme.borderRadius.sm    // 0.25rem
theme.borderRadius.md    // 0.5rem
theme.borderRadius.lg    // 0.75rem
theme.borderRadius.xl    // 1rem
theme.borderRadius.full  // 9999px
```

### Shadows

```typescript
theme.shadows.sm    // Subtle shadow
theme.shadows.base  // Default shadow
theme.shadows.md    // Medium shadow
theme.shadows.lg    // Large shadow
theme.shadows.xl    // Extra large shadow
```

## 🔧 커스터마이징

### 새로운 Variant 추가

컴포넌트에 새로운 variant를 추가하려면:

```typescript
// components/ui/Button.tsx
const variantStyles = {
  primary: '...',
  secondary: '...',
  ghost: '...',
  custom: 'bg-custom-color text-white hover:bg-custom-hover', // 새로운 variant
}
```

### Theme 값 수정

```typescript
// lib/theme.ts
export const theme = {
  colors: {
    primary: {
      500: '#your-color', // 원하는 색상으로 변경
    },
  },
}
```

## 📖 예제

### 로그인 폼

```tsx
import { Button, Input, Card, CardContent } from '@/components/ui'

function LoginForm() {
  return (
    <Card>
      <CardContent>
        <form className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            fullWidth
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            fullWidth
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 상태 표시 카드

```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'

function StatusCard() {
  return (
    <Card hoverable>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Server Status</CardTitle>
          <Badge variant="success" dot>
            Online
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          All systems operational
        </p>
      </CardContent>
    </Card>
  )
}
```

## 🚀 데모

모든 컴포넌트의 라이브 데모는 다음 경로에서 확인할 수 있습니다:

```
http://localhost:3000/components
```

개발 서버를 실행하고 위 URL로 이동하여 모든 컴포넌트의 variants, states, props를 확인하세요.
