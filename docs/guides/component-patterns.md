# 컴포넌트 패턴 가이드

이 문서는 Next.js 15.5.3 + React 19 환경에서 효율적이고 재사용 가능한 컴포넌트 작성 패턴을 제공합니다.

## 🧩 기본 설계 원칙

### 1. 단일 책임 원칙 (Single Responsibility)

```tsx
// ✅ 각 컴포넌트가 하나의 명확한 책임
export function UserAvatar({ user, size = 'md' }) {
  return (
    <Avatar className={avatarSizes[size]}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}

export function UserStatus({ isOnline }) {
  return (
    <div
      className={cn(
        'h-3 w-3 rounded-full',
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      )}
    />
  )
}

// ❌ 여러 책임이 섞인 컴포넌트
export function UserCard({ user }) {
  // 아바타 + 상태 + 프로필 + 액션 버튼 + 통계... (너무 많은 책임)
}
```

### 2. 컴포지션 우선 (Composition over Inheritance)

```tsx
// ✅ 컴포지션 패턴
export function Card({ children, className, ...props }) {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-6", className)} {...props}>
      {children}
    </div>
  )
}

// 사용법
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>내용</CardContent>
</Card>

// ❌ 상속 패턴 (리액트에는 부적합)
class BaseCard extends Component { ... }
class UserCard extends BaseCard { ... }
```

## 🔄 Server vs Client Components

### Server Components (기본값)

```tsx
// ✅ Server Component (데이터 패칭, SEO 중요)
import { Suspense } from 'react'

export default async function UserListPage() {
  // 서버에서 데이터 패칭
  const users = await getUsers()

  return (
    <div>
      <h1>사용자 목록</h1>
      <Suspense fallback={<UserListSkeleton />}>
        <UserList users={users} />
      </Suspense>
    </div>
  )
}

// 서버 컴포넌트에서 서버 전용 유틸리티 사용 가능
async function UserList({ users }) {
  return (
    <div className="grid gap-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Client Components ('use client' 필요)

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'

// ✅ Client Component (상호작용, 상태 관리)
export function UserSearchForm() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="사용자 검색..."
      />
      <SearchResults results={results} />
    </div>
  )
}

// ✅ React 19 useActionState 활용
export function UserForm() {
  const [state, formAction, isPending] = useActionState(updateUserAction, {
    success: false,
    message: '',
  })

  return (
    <form action={formAction}>
      <input name="name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

### Server-Client 경계 설정

```tsx
// ✅ 적절한 경계 설정
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id) // 서버에서 데이터 패칭

  return (
    <div>
      {/* 서버 컴포넌트 영역 */}
      <ProductInfo product={product} />
      <ProductImages images={product.images} />

      {/* 클라이언트 컴포넌트 영역 */}
      <ProductInteractions productId={product.id} />
    </div>
  )
}

// 클라이언트 컴포넌트는 별도 파일로 분리
;('use client')
export function ProductInteractions({ productId }) {
  const [liked, setLiked] = useState(false)
  // 상호작용 로직...
}
```

## 🎯 Props 설계 패턴

### 1. Props Interface 정의

```tsx
// ✅ 명확한 Props 타입 정의
interface ButtonProps {
  children: React.ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <Spinner className="mr-2" /> : null}
      {children}
    </button>
  )
}
```

### 2. Polymorphic Components

```tsx
// ✅ 다형성 컴포넌트 (as prop 패턴)
interface TextProps<T extends React.ElementType = 'p'> {
  as?: T
  children: React.ReactNode
  variant?: 'body' | 'caption' | 'subtitle'
  className?: string
}

export function Text<T extends React.ElementType = 'p'>({
  as,
  children,
  variant = 'body',
  className,
  ...props
}: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps>) {
  const Component = as || 'p'

  return (
    <Component
      className={cn(textVariants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// 사용법
<Text>기본 단락</Text>
<Text as="h1" variant="subtitle">제목</Text>
<Text as="span" variant="caption">캡션</Text>
```

### 3. Render Props 패턴

```tsx
// ✅ Render Props 패턴
interface DataFetcherProps<T> {
  url: string
  children: (
    data: T | null,
    loading: boolean,
    error: Error | null
  ) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchData(url)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return children(data, loading, error)
}

// 사용법
;<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <Spinner />
    if (error) return <ErrorMessage error={error} />
    return <UserList users={users || []} />
  }}
</DataFetcher>
```

## 🔄 재사용성 패턴

### 1. 컴포넌트 변형 (Variants)

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

// ✅ CVA로 변형 정의
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        outline: 'border-2',
        ghost: 'border-transparent shadow-none',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode
  className?: string
}

export function Card({
  variant,
  size,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  )
}
```

### 2. 컴파운드 컴포넌트 패턴

```tsx
// ✅ 컴파운드 컴포넌트 패턴
interface AccordionContextType {
  openItems: Set<string>
  toggle: (value: string) => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export function Accordion({ children, type = 'single' }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (value: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        if (type === 'single') {
          newSet.clear()
        }
        newSet.add(value)
      }
      return newSet
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, children }) {
  return <div data-value={value}>{children}</div>
}

export function AccordionTrigger({ children, value }) {
  const { toggle } = useContext(AccordionContext)
  return (
    <button onClick={() => toggle(value)} className="accordion-trigger">
      {children}
    </button>
  )
}

export function AccordionContent({ children, value }) {
  const { openItems } = useContext(AccordionContext)
  const isOpen = openItems.has(value)

  return isOpen ? <div className="accordion-content">{children}</div> : null
}

// 사용법
;<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">질문 1</AccordionTrigger>
    <AccordionContent value="item-1">답변 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## ⚡ 성능 최적화 패턴

### 1. 메모이제이션

```tsx
import { memo, useMemo, useCallback } from 'react'

// ✅ React.memo로 불필요한 리렌더링 방지
export const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
  onUpdate,
}: {
  data: ComplexData[]
  onUpdate: (id: string) => void
}) {
  // 복잡한 계산을 메모이제이션
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      calculated: expensiveCalculation(item),
    }))
  }, [data])

  // 콜백 함수 메모이제이션
  const handleUpdate = useCallback(
    (id: string) => {
      onUpdate(id)
    },
    [onUpdate]
  )

  return (
    <div>
      {processedData.map(item => (
        <ExpensiveItem key={item.id} item={item} onUpdate={handleUpdate} />
      ))}
    </div>
  )
})
```

### 2. 지연 로딩 (Lazy Loading)

```tsx
import { lazy, Suspense } from 'react'

// ✅ 동적 import로 코드 분할
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const Chart = lazy(() => import('@/components/charts/Chart'))

export function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>

      <Suspense fallback={<div>차트 로딩 중...</div>}>
        <Chart />
      </Suspense>

      <Suspense fallback={<div>컴포넌트 로딩 중...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}
```

### 3. 가상화 (Virtualization)

```tsx
// ✅ 큰 리스트 가상화
import { FixedSizeList as List } from 'react-window'

interface VirtualizedListProps {
  items: any[]
  itemHeight: number
  height: number
}

export function VirtualizedList({
  items,
  itemHeight,
  height,
}: VirtualizedListProps) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ListItem item={items[index]} />
    </div>
  )

  return (
    <List height={height} itemCount={items.length} itemSize={itemHeight}>
      {Row}
    </List>
  )
}
```

## 🛡️ 타입 안전성 패턴

### 1. 제네릭 컴포넌트

```tsx
// ✅ 타입 안전한 제네릭 컴포넌트
interface SelectProps<T> {
  options: T[]
  value?: T
  onChange: (value: T) => void
  getLabel: (option: T) => string
  getValue: (option: T) => string
  className?: string
}

export function Select<T>({
  options,
  value,
  onChange,
  getLabel,
  getValue,
  className,
}: SelectProps<T>) {
  return (
    <select
      value={value ? getValue(value) : ''}
      onChange={e => {
        const selectedValue = options.find(
          option => getValue(option) === e.target.value
        )
        if (selectedValue) onChange(selectedValue)
      }}
      className={className}
    >
      {options.map(option => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  )
}

// 사용법 (완전한 타입 추론)
;<Select<User>
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={user => user.name}
  getValue={user => user.id}
/>
```

### 2. 조건부 타입

```tsx
// ✅ 조건부 props 타입
type ButtonProps<T extends boolean = false> = {
  children: React.ReactNode
  loading?: T
} & (T extends true
  ? { onClick?: never; disabled?: boolean }
  : { onClick: () => void; disabled?: boolean })

export function Button<T extends boolean = false>(props: ButtonProps<T>) {
  const { children, loading, onClick, disabled, ...restProps } = props

  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={disabled || loading}
      {...restProps}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
```

## 🎨 고급 패턴

### 1. Hook 기반 상태 관리

```tsx
// ✅ 커스텀 훅으로 로직 분리
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(prev => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse, setValue }
}

// 컴포넌트에서 사용
export function Modal({ children }) {
  const { value: isOpen, setTrue: open, setFalse: close } = useToggle()

  return (
    <>
      <button onClick={open}>모달 열기</button>
      {isOpen && <Dialog onClose={close}>{children}</Dialog>}
    </>
  )
}
```

### 2. Context + Reducer 패턴

```tsx
// ✅ 복잡한 상태 관리
interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: calculateTotal([...state.items, action.payload]),
      }
    // 다른 케이스들...
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

## 🚫 안티패턴 및 금지사항

### ❌ 피해야 할 패턴

```tsx
// 너무 많은 props
function OverloadedComponent({
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  prop7,
  prop8,
  prop9,
  prop10,
}) {
  // 너무 많은 책임
}

// 깊은 props drilling
function App() {
  const user = useUser()
  return <Level1 user={user} />
}
function Level1({ user }) {
  return <Level2 user={user} />
}
function Level2({ user }) {
  return <Level3 user={user} />
}

// 거대한 컴포넌트
function GiantComponent() {
  // 500줄 이상의 JSX와 로직
  return <div>{/* 엄청난 양의 JSX */}</div>
}

// 불필요한 래핑
function UnnecessaryWrapper({ children }) {
  return <div>{children}</div> // 의미 없는 div
}

// 인라인 객체/함수 생성
function BadComponent() {
  return (
    <ExpensiveComponent
      config={{ option: 'value' }} // 매 렌더링마다 새 객체
      onUpdate={() => {}} // 매 렌더링마다 새 함수
    />
  )
}
```

## ✅ 컴포넌트 작성 체크리스트

새 컴포넌트 작성 시 확인사항:

### 설계

- [ ] 단일 책임 원칙 준수
- [ ] 적절한 컴포지션 활용
- [ ] 재사용 가능성 고려

### 타입 안전성

- [ ] Props 인터페이스 정의
- [ ] 제네릭 활용 (필요시)
- [ ] 조건부 타입 활용 (필요시)

### 성능

- [ ] 불필요한 리렌더링 방지
- [ ] 메모이제이션 적절히 활용
- [ ] 큰 리스트 가상화 고려

### Server/Client 분리

- [ ] Server Component 우선 고려
- [ ] 'use client' 최소화
- [ ] 적절한 경계 설정

### 접근성

- [ ] 의미있는 HTML 태그 사용
- [ ] ARIA 속성 추가
- [ ] 키보드 네비게이션 지원

### 코드 품질

- [ ] ESLint 규칙 준수
- [ ] 300줄 이하 유지
- [ ] 명확한 네이밍

이 패턴들을 활용하여 유지보수하기 쉽고 확장 가능한 컴포넌트를 작성해보세요!
