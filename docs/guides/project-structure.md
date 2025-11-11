# 프로젝트 구조 가이드

이 문서는 Next.js 15.5.3 프로젝트의 폴더 구조, 파일 조직 및 네이밍 컨벤션을 정의합니다.

## 🏗️ 전체 프로젝트 구조

```
claude-nextjs-starters/
├── docs/                   # 📚 프로젝트 문서
│   └── guides/            # 개발 가이드 모음
├── public/                # 🌍 정적 파일 (이미지, 아이콘)
├── src/                   # 📦 소스 코드 루트
│   ├── app/              # 🚀 Next.js App Router
│   ├── components/       # 🧩 React 컴포넌트
│   └── lib/              # 🛠️ 유틸리티 및 설정
├── components.json       # shadcn/ui 설정
├── next.config.ts        # Next.js 설정
├── package.json          # 의존성 및 스크립트
├── tsconfig.json         # TypeScript 설정
└── CLAUDE.md            # 개발 지침 메인 문서
```

## 📁 세부 폴더 구조

### src/app/ - App Router 페이지

```
src/app/
├── layout.tsx           # 🎨 루트 레이아웃 (전역 설정)
├── page.tsx            # 🏠 홈페이지 (/)
├── globals.css         # 🎨 전역 CSS 스타일
├── favicon.ico         # 🔖 파비콘
├── login/              # 🔐 로그인 페이지
│   └── page.tsx
└── signup/             # ✍️ 회원가입 페이지
    └── page.tsx
```

**🚀 App Router 규칙:**

- `page.tsx`: 해당 경로의 메인 페이지
- `layout.tsx`: 레이아웃 컴포넌트 (자식 페이지 감쌈)
- `loading.tsx`: 로딩 UI (필요시)
- `error.tsx`: 에러 UI (필요시)
- `not-found.tsx`: 404 페이지 (필요시)

### src/components/ - 컴포넌트 조직

```
src/components/
├── ui/                 # 🎛️ 기본 UI 컴포넌트 (shadcn/ui)
│   ├── button.tsx     # 버튼
│   ├── card.tsx       # 카드
│   ├── form.tsx       # 폼 관련
│   ├── input.tsx      # 입력 필드
│   └── ...           # 기타 UI 컴포넌트
├── layout/            # 🏗️ 레이아웃 컴포넌트
│   ├── container.tsx  # 컨테이너 래퍼
│   ├── header.tsx     # 헤더
│   └── footer.tsx     # 푸터
├── navigation/        # 🧭 네비게이션 컴포넌트
│   ├── main-nav.tsx   # 메인 네비게이션
│   └── mobile-nav.tsx # 모바일 네비게이션
├── sections/          # 📄 페이지 섹션 컴포넌트
│   ├── hero.tsx       # 히어로 섹션
│   ├── features.tsx   # 기능 소개
│   └── cta.tsx        # Call-to-Action
├── providers/         # 🔧 Context 프로바이더
│   └── theme-provider.tsx
├── login-form.tsx     # 🔐 로그인 폼
├── signup-form.tsx    # ✍️ 회원가입 폼
└── theme-toggle.tsx   # 🌓 테마 토글
```

**🧩 컴포넌트 분류 규칙:**

1. **ui/**: shadcn/ui 기반 재사용 가능한 기본 컴포넌트
   - 순수 UI 컴포넌트만 포함
   - 비즈니스 로직 없음
   - props로 모든 동작 제어

2. **layout/**: 페이지 구조를 담당하는 레이아웃 컴포넌트
   - 전체 페이지 구조
   - 공통 헤더/푸터
   - 컨테이너 래퍼

3. **navigation/**: 네비게이션 관련 컴포넌트
   - 메뉴, 브레드크럼
   - 페이지네이션
   - 사이드바

4. **sections/**: 특정 페이지 섹션을 위한 컴포넌트
   - 홈페이지 섹션들
   - 랜딩 페이지 블록
   - 마케팅 컴포넌트

5. **providers/**: React Context 프로바이더
   - 전역 상태 관리
   - 테마 관리
   - 인증 상태

### src/lib/ - 유틸리티 및 설정

```
src/lib/
├── utils.ts           # 🛠️ 공통 유틸리티 함수
└── env.ts             # 🔧 환경변수 검증
```

**📚 lib/ 폴더 확장 가이드:**

```
src/lib/
├── utils.ts           # 공통 유틸리티
├── env.ts             # 환경변수 검증
├── constants.ts       # 상수 정의
├── types/             # TypeScript 타입 정의
│   ├── auth.ts
│   └── api.ts
├── hooks/             # 커스텀 훅
│   ├── use-local-storage.ts
│   └── use-api.ts
├── schemas/           # Zod 스키마
│   ├── auth.ts
│   └── user.ts
└── api/               # API 관련 유틸리티
    ├── client.ts
    └── endpoints.ts
```

## 🏷️ 파일 네이밍 컨벤션

### 파일명 규칙

```bash
# ✅ 올바른 파일명
user-profile.tsx        # kebab-case (권장)
UserProfile.tsx         # PascalCase (컴포넌트)
userProfile.tsx         # camelCase (허용)

# ❌ 잘못된 파일명
user_profile.tsx        # snake_case (금지)
userprofile.tsx         # 소문자만 (금지)
```

### 컴포넌트 네이밍

```typescript
// ✅ 올바른 컴포넌트 네이밍
export function UserProfile() {} // PascalCase
export function LoginForm() {} // PascalCase
export function APIEndpoint() {} // 약어도 PascalCase

// ❌ 잘못된 컴포넌트 네이밍
export function userProfile() {} // camelCase (금지)
export function login_form() {} // snake_case (금지)
```

### 폴더 네이밍

```bash
# ✅ 올바른 폴더명
components/             # 소문자
user-settings/          # kebab-case
api-routes/            # kebab-case

# ❌ 잘못된 폴더명
Components/            # PascalCase (금지)
user_settings/         # snake_case (금지)
```

## 🔗 경로 별칭 (Path Aliases)

`components.json`에 정의된 경로 별칭:

```typescript
// ✅ 경로 별칭 사용 (권장)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoginForm } from '@/components/login-form'

// ❌ 상대 경로 사용 (금지)
import { Button } from '../../../components/ui/button'
import { cn } from '../../lib/utils'
```

**📍 정의된 별칭:**

- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/ui` → `src/components/ui`
- `@/utils` → `src/lib/utils`

## 📝 새 파일/폴더 추가 규칙

### 1. 새 UI 컴포넌트 추가

```bash
# shadcn/ui 컴포넌트 추가
npx shadcn@latest add [component-name]

# 커스텀 UI 컴포넌트 추가
src/components/ui/custom-component.tsx
```

### 2. 새 페이지 추가

```bash
# 정적 페이지
src/app/about/page.tsx

# 동적 페이지
src/app/users/[id]/page.tsx

# 그룹 라우트
src/app/(auth)/login/page.tsx
```

### 3. 새 비즈니스 컴포넌트 추가

```bash
# 위치 결정 기준:
1. 특정 페이지에서만 사용 → 해당 페이지 폴더 내
2. 여러 페이지에서 사용 → components/ 적절한 카테고리
3. 레이아웃 관련 → components/layout/
4. 네비게이션 관련 → components/navigation/
```

### 4. 새 유틸리티 추가

```bash
# 공통 유틸리티
src/lib/utils.ts            # 기존 파일에 추가

# 특화된 유틸리티
src/lib/date-utils.ts       # 새 파일 생성
src/lib/api-utils.ts        # 새 파일 생성
```

## 🎯 코드 조직 베스트 프랙티스

### 1. 단일 책임 원칙

- 하나의 파일은 하나의 주요 기능만 담당
- 관련된 타입과 유틸리티는 같은 파일에 포함 가능

### 2. 의존성 순서

```typescript
// 1. 외부 라이브러리
import React from 'react'
import { NextPage } from 'next'

// 2. 내부 라이브러리 (@/ 경로)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. 상대 경로
import './component.css'
```

### 3. Export 규칙

```typescript
// ✅ Named export 사용 (권장)
export function LoginForm() {}

// ✅ Default export (페이지 컴포넌트)
export default function LoginPage() {}

// ❌ 혼재 사용 지양
export function LoginForm() {}
export default LoginForm // 같은 컴포넌트를 두 방식으로 export
```

### 4. 파일 크기 관리

- 단일 파일: 300줄 이하 권장
- 300줄 초과 시 분할 고려
- 관련 기능별로 분리

## 🚫 금지사항

### ❌ 피해야 할 구조

```bash
# 깊은 중첩 구조 (4단계 이상)
src/components/pages/auth/forms/login/LoginForm.tsx

# 의미 없는 폴더명
src/components/misc/
src/components/common/
src/components/shared/

# 혼재된 케이스
src/Components/userProfile/LoginForm.tsx
```

### ❌ 피해야 할 패턴

```typescript
// 거대한 파일
export function SuperMegaComponent() {
  // 500줄 이상의 코드
}

// 혼재된 import
import Button from '@/components/ui/button' // default
import { Card } from '@/components/ui/card' // named

// 깊은 상대 경로
import { utils } from '../../../../../lib/utils'
```

## ✅ 체크리스트

새 파일/폴더 추가 시 확인사항:

- [ ] 적절한 카테고리 폴더에 배치
- [ ] kebab-case 파일명 사용
- [ ] PascalCase 컴포넌트명 사용
- [ ] 경로 별칭 사용
- [ ] 단일 책임 원칙 준수
- [ ] 적절한 export 방식 선택
- [ ] 의존성 import 순서 준수
- [ ] 파일 크기 300줄 이하 유지

이 가이드를 따라 일관성 있고 유지보수하기 쉬운 프로젝트 구조를 만들어보세요!
