# 프로젝트 개발 규칙

## 프로젝트 개요

**노션 기반 견적서 관리 시스템 MVP** - 노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF 다운로드

### 핵심 기술 스택

- **프레임워크**: Next.js 15.5.3 (App Router + Turbopack)
- **런타임**: React 19.1.0 + TypeScript 5
- **스타일링**: TailwindCSS v4 + shadcn/ui (new-york)
- **폼**: React Hook Form + Zod + Server Actions
- **외부 API**: @notionhq/client (Notion API SDK)

### MVP 범위

**포함**:

- 견적서 조회 페이지 (`/invoice/[id]`)
- Notion API 연동
- PDF 다운로드 기능

**제외** (MVP 이후):

- 관리자 대시보드
- 이메일 발송
- 템플릿 커스터마이징

---

## 프로젝트 구조 규칙

### 필수 디렉토리 구조

```
src/
├── app/              # App Router 페이지만 배치
│   ├── invoice/[id]/ # 동적 라우트
│   └── layout.tsx    # 루트 레이아웃
├── components/       # 컴포넌트 분류
│   ├── ui/          # shadcn/ui 기본 컴포넌트
│   ├── layout/      # 레이아웃 컴포넌트
│   └── providers/   # Context 프로바이더
└── lib/             # 유틸리티 및 설정
    ├── utils.ts     # cn() 헬퍼
    └── env.ts       # 환경변수 검증
```

### 경로 별칭 사용 필수

```typescript
// ✅ 필수: 경로 별칭 사용
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ 금지: 상대 경로 사용
import { Button } from '../../../components/ui/button'
```

### 파일 네이밍

- **컴포넌트 파일**: kebab-case (`user-profile.tsx`)
- **컴포넌트명**: PascalCase (`UserProfile`)
- **폴더명**: kebab-case (`user-settings/`)
- **금지**: snake_case, PascalCase 폴더명

---

## Next.js 15.5.3 필수 규칙

### App Router 엄격 사용

```typescript
// ✅ 필수: App Router 구조
app/
├── layout.tsx
├── page.tsx
└── invoice/[id]/page.tsx

// ❌ 절대 금지: Pages Router
pages/
├── index.tsx
└── _app.tsx
```

### Server Components 우선 설계

```typescript
// ✅ 필수: 기본은 Server Component
export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params  // async request API
  const data = await getInvoice(id)
  return <InvoiceView data={data} />
}

// ✅ 필수: 상호작용 필요 시에만 'use client'
'use client'
export function InteractiveButton() {
  const [clicked, setClicked] = useState(false)
  return <button onClick={() => setClicked(true)}>클릭</button>
}
```

### async request APIs 필수

```typescript
// ✅ 필수: params, searchParams, cookies, headers는 await
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const query = await searchParams
  const cookieStore = await cookies()
  const headersList = await headers()
}

// ❌ 금지: 동기식 접근
export default function Page({ params }: { params: { id: string } }) {
  const data = getData(params.id) // 에러 발생
}
```

### 금지 사항

- Pages Router 사용 금지
- `getServerSideProps`, `getStaticProps` 사용 금지
- params/searchParams 동기 접근 금지
- 'use client' 없이 useState, useEffect 사용 금지

---

## 폼 처리 필수 패턴

### React Hook Form + Zod + Server Actions

```typescript
// 1. lib/schemas/invoice.ts - 스키마 정의
import { z } from 'zod'

export const invoiceSchema = z.object({
  clientName: z.string().min(1, '클라이언트명 필수'),
  amount: z.number().positive('금액은 양수'),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>

// 2. app/actions/invoice.ts - Server Action
'use server'

export async function submitInvoiceAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // 서버 사이드 검증 필수
  const validated = invoiceSchema.safeParse({
    clientName: formData.get('clientName'),
    amount: Number(formData.get('amount')),
  })

  if (!validated.success) {
    return {
      success: false,
      message: '입력 오류',
      errors: validated.error.flatten().fieldErrors,
    }
  }

  // 비즈니스 로직
  await saveInvoice(validated.data)
  return { success: true, message: '저장 완료' }
}

// 3. components/invoice-form.tsx - 폼 컴포넌트
'use client'

import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function InvoiceForm() {
  const [state, formAction, isPending] = useActionState(submitInvoiceAction, {
    success: false,
    message: '',
  })

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    mode: 'onChange',
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value))
        })
        formAction(formData)
      })}>
        {/* 폼 필드 */}
      </form>
    </Form>
  )
}
```

### 필수 규칙

- Zod 스키마로 타입 정의
- 서버-클라이언트 이중 검증 필수
- Server Actions에서 스키마 검증 수행
- `useActionState`로 서버 상태 관리

---

## 스타일링 규칙

### TailwindCSS v4 유틸리티 클래스 우선

```typescript
// ✅ 필수: Tailwind 유틸리티 클래스
<div className="flex items-center justify-between rounded-lg bg-background p-4">
  <h2 className="text-lg font-semibold text-foreground">제목</h2>
</div>

// ❌ 금지: 인라인 스타일
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '18px' }}>제목</h2>
</div>
```

### shadcn/ui 컴포넌트 활용

```bash
# 새 컴포넌트 추가
npx shadcn@latest add button
npx shadcn@latest add card
```

```typescript
// ✅ 필수: shadcn/ui 컴포넌트 사용
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

<Card>
  <Button variant="outline">버튼</Button>
</Card>
```

### cn() 함수로 클래스 조합

```typescript
import { cn } from '@/lib/utils'

// ✅ 필수: cn() 함수 사용
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>

// ❌ 금지: 문자열 직접 조합
<div className={`base ${isActive ? 'active' : ''} ${className}`}>
```

### 시맨틱 색상 변수 (다크모드 대응)

```typescript
// ✅ 필수: CSS 변수 기반 시맨틱 색상
<div className="bg-background text-foreground">
  <h1 className="text-primary">제목</h1>
  <p className="text-muted-foreground">설명</p>
</div>

// ❌ 금지: 하드코딩된 색상
<div className="bg-white text-black dark:bg-black dark:text-white">
  <h1 className="text-blue-600">제목</h1>
</div>
```

### 금지 사항

- 인라인 스타일 (`style={{}}`) 금지
- 하드코딩된 색상 클래스 금지 (`bg-white`, `text-black`)
- 커스텀 CSS 클래스 최소화
- `!important` 남용 금지

---

## 컴포넌트 작성 규칙

### Server Component 기본, 'use client' 최소화

```typescript
// ✅ Server Component (기본)
export default async function InvoiceList() {
  const invoices = await getInvoices()
  return <div>{invoices.map(...)}</div>
}

// ✅ Client Component (상호작용 필요시에만)
'use client'
export function SearchForm() {
  const [query, setQuery] = useState('')
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

### 단일 책임 원칙

```typescript
// ✅ 각 컴포넌트가 하나의 명확한 책임
export function UserAvatar({ user }: { user: User }) {
  return <Avatar><AvatarImage src={user.avatar} /></Avatar>
}

export function UserStatus({ isOnline }: { isOnline: boolean }) {
  return <div className={cn("h-3 w-3 rounded-full", isOnline ? "bg-green-500" : "bg-gray-400")} />
}

// ❌ 여러 책임이 섞인 컴포넌트
export function UserCard({ user }) {
  // 아바타 + 상태 + 프로필 + 통계... (너무 많은 책임)
}
```

### Props 인터페이스 정의 필수

```typescript
// ✅ 필수: 명확한 Props 타입
interface ButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function Button({ children, variant = 'default', ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }))} {...props}>{children}</button>
}

// ❌ Props 타입 없음
export function Button(props) {
  return <button {...props} />
}
```

### 파일 크기 제한

- 단일 파일: 300줄 이하 권장
- 300줄 초과 시 분할 필수

---

## 환경 변수 관리

### lib/env.ts에서 Zod 검증 필수

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY 필수'),
  NOTION_DATABASE_ID: z.string().min(1, 'NOTION_DATABASE_ID 필수'),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
})
```

### 환경 변수 추가 시 필수 작업

1. `.env.local` 또는 `.env.example`에 변수 추가
2. `lib/env.ts`의 `envSchema`에 검증 규칙 추가
3. `env` 객체 파싱에 변수 추가

---

## Notion API 통합 규칙

### Notion 클라이언트 초기화

```typescript
// lib/notion.ts
import { Client } from '@notionhq/client'
import { env } from './env'

export const notion = new Client({
  auth: env.NOTION_API_KEY,
})
```

### 견적서 조회 구조

```typescript
// app/invoice/[id]/page.tsx
import { notion } from '@/lib/notion'
import { notFound } from 'next/navigation'

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params

  try {
    // Notion 페이지 조회
    const page = await notion.pages.retrieve({ page_id: id })
    const blocks = await notion.blocks.children.list({ block_id: id })

    return <InvoiceView page={page} blocks={blocks} />
  } catch (error) {
    notFound()
  }
}
```

### 에러 처리 필수

- Notion API 호출 시 try-catch 필수
- 404 에러는 `notFound()` 호출
- 500 에러는 `error.tsx`로 처리

---

## 다중 파일 조정 규칙

### 새 페이지 추가 시

1. `src/app/[route]/page.tsx` 생성
2. 필요 시 `layout.tsx`, `loading.tsx`, `error.tsx` 추가
3. Server Component로 시작, 필요 시 Client Component 분리

### Notion API 연동 시

1. `lib/env.ts`: 환경 변수 추가
2. `lib/notion.ts`: Notion 클라이언트 생성 (없으면 생성)
3. `app/invoice/[id]/page.tsx`: API 호출 로직
4. `.env.local`: 실제 API 키 설정

### 새 폼 추가 시

1. `lib/schemas/[form-name].ts`: Zod 스키마 정의
2. `app/actions/[action-name].ts`: Server Action 생성
3. `components/[form-name]-form.tsx`: 폼 컴포넌트 ('use client')

---

## 금지사항

### 절대 금지 (엄격)

- **Pages Router 사용 금지** - App Router만 사용
- **getServerSideProps/getStaticProps 사용 금지** - Server Component 사용
- **params/searchParams 동기 접근 금지** - 반드시 await
- **인라인 스타일 금지** - Tailwind 클래스만 사용
- **하드코딩된 색상 금지** - 시맨틱 색상 변수 사용
- **클라이언트에서 환경 변수 직접 접근 금지** - env 객체 사용

### 지양 사항 (권장)

- 'use client' 남용 지양 - Server Component 우선
- 커스텀 CSS 클래스 지양 - Tailwind 우선
- 깊은 props drilling 지양 - Context 사용
- 거대한 컴포넌트 지양 - 300줄 이하 유지

---

## 코드 품질 체크리스트

### 개발 완료 후 필수 실행

```bash
npm run check-all   # 타입 체크 + 린트 + 포맷 검사
npm run build       # 빌드 테스트
```

### 컴포넌트 작성 후 확인

- [ ] Server/Client Component 적절히 분리
- [ ] Props 인터페이스 정의
- [ ] Tailwind 클래스 사용
- [ ] 시맨틱 색상 변수 사용
- [ ] 파일 크기 300줄 이하
- [ ] 단일 책임 원칙 준수

### 폼 작성 후 확인

- [ ] Zod 스키마 정의
- [ ] Server Action 생성
- [ ] 서버-클라이언트 이중 검증
- [ ] useActionState 사용
- [ ] 에러 메시지 한국어

---

## AI Agent 결정 트리

### 새 기능 구현 시

1. **Server Component로 시작 가능?**
   - YES → Server Component 사용
   - NO (상호작용 필요) → 'use client' 사용

2. **폼 처리 필요?**
   - YES → React Hook Form + Zod + Server Actions 패턴 사용
   - NO → 일반 컴포넌트

3. **스타일링 필요?**
   - 기본 UI → shadcn/ui 컴포넌트 사용
   - 커스텀 스타일 → Tailwind 유틸리티 클래스
   - 조건부 스타일 → cn() 함수

4. **데이터 패칭 필요?**
   - Notion 데이터 → lib/notion.ts 사용
   - 기타 → Server Component에서 직접 fetch

### 파일 수정 시

1. **기존 파일 읽기 필수** - 수정 전 반드시 파일 읽기
2. **패턴 일치 확인** - 기존 코드 스타일 유지
3. **타입 정의 확인** - Props 인터페이스 존재 여부 확인
4. **Import 경로 확인** - 경로 별칭 사용 여부 확인

---

**📝 문서 버전**: v1.0
**📅 작성일**: 2025-10-05
**🎯 목표**: AI Agent가 즉시 실행 가능한 프로젝트별 규칙 제공
