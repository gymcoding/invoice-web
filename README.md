# 노션 기반 견적서 관리 시스템 MVP

노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF 다운로드할 수 있는 시스템입니다.

## 🎯 프로젝트 개요

**목적**: 노션 데이터베이스를 활용한 간편한 견적서 발행 및 조회 시스템
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업과 견적서를 받는 클라이언트
**핵심 가치**: 별도의 관리 시스템 없이 노션으로 견적서를 관리하고, 고객은 링크 하나로 간편하게 조회

## 📱 주요 페이지

1. **견적서 조회 페이지** (`/invoice/[id]`) - 고유 URL로 특정 견적서 조회 및 PDF 다운로드
2. **안내 페이지** (`/invoice/guide`) - 시스템 사용 방법 안내
3. **404 에러 페이지** - 존재하지 않는 견적서 접근 시 친절한 안내

## ⚡ 핵심 기능

### 견적서 조회 및 관리

- **노션 API 연동**: Notion 데이터베이스에서 견적서 데이터 실시간 조회
- **견적서 조회**: 고유 URL을 통한 견적서 내용 확인
- **PDF 다운로드**: 견적서를 PDF 파일로 변환 및 다운로드
- **유효성 검증**: 잘못된 견적서 ID 접근 시 404 에러 처리
- **반응형 디자인**: 모바일/태블릿/데스크톱 모든 기기 대응

### 🆕 새로운 기능 (v2.0)

#### 관리자 기능

- **관리자 인증**: 비밀번호 기반 로그인 시스템
- **견적서 목록**: 모든 견적서를 한눈에 조회
- **검색 및 필터**: 클라이언트명, 견적서 번호, 상태별 검색
- **정렬 기능**: 발행일, 총액 기준 정렬

#### 링크 관리

- **고유 URL 생성**: 각 견적서의 고유 링크 자동 생성 및 표시
- **원클릭 복사**: 링크를 클립보드에 원클릭으로 복사
- **링크 공유**: 이메일, 텔레그램으로 견적서 링크 공유
- **공유 옵션**: 드롭다운 메뉴에서 다양한 공유 방법 선택

#### 다크모드

- **테마 전환**: 라이트/다크/시스템 테마 지원
- **전체 페이지 적용**: 모든 관리자 및 견적서 페이지에서 다크모드 지원
- **자동 저장**: 선택한 테마를 브라우저에 자동 저장
- **시맨틱 색상**: TailwindCSS 시맨틱 변수로 일관된 다크모드 경험

#### 성능 최적화

- **API 캐싱**: 60초 캐싱으로 Notion API 호출 최소화
- **Request Deduplication**: 동일 요청 병합으로 중복 호출 방지
- **병렬 처리**: 견적 항목 조회 병렬 처리
- **레이지 로딩**: 컴포넌트 지연 로딩으로 초기 번들 크기 감소

#### 보안 강화

- **Rate Limiting**: API 요청 제한으로 서비스 안정성 확보
- **세션 관리**: JWT 기반 안전한 세션 관리
- **환경 변수 검증**: 프로덕션 환경에서 약한 비밀번호 차단

## 🛠️ 기술 스택

### 프론트엔드

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI)

### 외부 API & 통합

- **@notionhq/client** - Notion API 공식 SDK
- **Notion API v1** - 데이터베이스 조회 및 페이지 정보 가져오기

### PDF 생성 (구현 예정)

- **@react-pdf/renderer** 또는 **Puppeteer**

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

#### Notion Integration 생성 방법

1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "견적서 시스템")
4. "Internal Integration Token" 복사 → `.env.local`에 저장
5. Notion에서 견적서 데이터베이스 생성
6. 데이터베이스 우측 상단 "..." → "Add connections" → 생성한 Integration 선택
7. 데이터베이스 ID 복사 (URL에서 확인 가능)

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정
- ✅ 견적서 조회 페이지 UI 구성
- ✅ 안내 페이지 및 404 에러 페이지
- ✅ Notion API 클라이언트 설치
- 🔄 Notion API 연동 구현 (진행 예정)
- ⏳ PDF 생성 기능 구현 (계획)

## 📖 문서

### 기획 및 개발

- [PRD 문서](./docs/PRD.md) - 상세 요구사항 및 기능 명세
- [ROADMAP](./docs/ROADMAP.md) - 프로젝트 로드맵 및 진행 상황
- [개발 가이드](./CLAUDE.md) - 개발 지침 및 규칙

### 사용 및 배포

- [관리자 가이드](./docs/admin-guide.md) - 관리자 시스템 사용 방법
- [API 문서](./docs/api-documentation.md) - API 명세 및 통합 가이드
- [배포 체크리스트](./docs/deployment-checklist.md) - 프로덕션 배포 가이드

## 🗄️ 노션 데이터베이스 구조

### Invoices (견적서 데이터베이스)

- 견적서 번호 (Title)
- 클라이언트명 (Text)
- 발행일 (Date)
- 유효기간 (Date)
- 상태 (Select: 대기/승인/거절)
- 총 금액 (Number)
- 항목 (Relation → Items)

### Items (견적 항목 데이터베이스)

- 항목명 (Title)
- 수량 (Number)
- 단가 (Number)
- 금액 (Formula: 수량 × 단가)
- 견적서 (Relation → Invoices)

## ✅ MVP 성공 기준

1. ✅ 노션 데이터베이스에서 견적서 정보를 정상적으로 가져옴
2. ✅ 고유 URL로 접근 시 견적서가 웹에서 정확하게 표시됨
3. ✅ PDF 다운로드 버튼 클릭 시 견적서가 PDF로 다운로드됨
4. ✅ 모바일/태블릿/데스크톱에서 정상 작동
5. ✅ 잘못된 URL 접근 시 적절한 에러 메시지 표시

## 📦 주요 스크립트

```bash
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run start       # 프로덕션 서버 실행
npm run lint        # ESLint 실행
npm run format      # Prettier 포맷팅
npm run typecheck   # TypeScript 타입 체크
npm run check-all   # 모든 검사 통합 실행
```

## 🧪 E2E 테스트

### Playwright MCP를 사용한 자동화 테스트

프로젝트의 주요 기능을 Playwright MCP로 자동화 테스트합니다.

#### 테스트 시나리오

1. **정상 견적서 조회** - 유효한 ID로 페이지 접근 및 렌더링 확인
2. **PDF 다운로드** - PDF 생성 및 다운로드 기능 검증
3. **404 에러 처리** - 잘못된 ID 접근 시 에러 페이지 확인
4. **성능 테스트** - 페이지 로드 < 3초, PDF 생성 < 5초 검증
5. **캐싱 검증** - Notion API 캐싱 전략 작동 확인
6. **Rate Limiting** - API 제한 기능 검증

#### 테스트 실행 방법

1. **개발 서버 시작**:

   ```bash
   npm run dev
   ```

2. **Claude Code에서 Playwright MCP 도구 사용**:
   - `browser_navigate`: 페이지 접근
   - `browser_snapshot`: 페이지 상태 확인
   - `browser_click`: 버튼 클릭
   - `browser_wait_for`: 요소 대기
   - `browser_network_requests`: 네트워크 요청 모니터링

3. **테스트 시나리오 파일**: `tests/e2e/invoice.spec.ts`

#### 성능 지표 (ROADMAP 기준)

- ✅ 페이지 로드 시간 < 3초
- ✅ PDF 생성 시간 < 5초
- ✅ 에러율 < 1%
- ✅ 캐시 적중률 > 80%

#### 테스트 전제 조건

- `.env.local`에 유효한 Notion API 키 설정
- 테스트용 견적서 페이지 ID 준비 (실제 Notion 페이지 ID)
- 개발 서버가 `http://localhost:3000` 또는 `http://localhost:3001`에서 실행 중

## 🚀 배포

### Vercel 배포 가이드

#### 1️⃣ Vercel 프로젝트 생성

1. **Vercel 계정 생성 및 로그인**
   - [Vercel 대시보드](https://vercel.com/dashboard) 접속
   - GitHub 계정으로 로그인

2. **프로젝트 임포트**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택 및 연결
   - Framework Preset: Next.js 자동 감지

3. **빌드 설정 확인**
   - Build Command: `npm run build` (자동 설정)
   - Output Directory: `.next` (자동 설정)
   - Install Command: `npm install` (자동 설정)

#### 2️⃣ 환경 변수 설정

**Settings → Environment Variables**에서 다음 변수 추가:

| 변수명               | 값                   | 환경                | 설명                           |
| -------------------- | -------------------- | ------------------- | ------------------------------ |
| `NOTION_API_KEY`     | `secret_xxxxx...`    | Production, Preview | Notion Integration Token       |
| `NOTION_DATABASE_ID` | `xxxxxxxx...` (32자) | Production, Preview | 견적서 데이터베이스 ID         |
| `NODE_ENV`           | `production`         | Production          | 자동 설정됨 (수동 설정 불필요) |

**환경 변수 획득 방법**:

- `NOTION_API_KEY`: [Notion Integrations](https://www.notion.so/my-integrations) → Create new integration
- `NOTION_DATABASE_ID`: Notion 데이터베이스 URL에서 확인 (32자 해시)

#### 3️⃣ 배포 실행

**자동 배포**:

- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- PR 생성 시 자동으로 Preview 배포 생성

**수동 배포**:

- Vercel 대시보드 → "Deployments" → "Redeploy" 클릭

#### 4️⃣ 배포 확인

배포 완료 후 다음을 확인하세요:

1. **도메인 접속**: `https://your-project.vercel.app`
2. **견적서 페이지**: `/invoice/[notion-page-id]` 접근 테스트
3. **PDF 다운로드**: PDF 생성 및 다운로드 기능 테스트
4. **보안 헤더**: 개발자 도구 → Network → Response Headers 확인
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `X-RateLimit-Limit: 10`

#### 5️⃣ 커스텀 도메인 설정 (선택적)

1. Vercel 대시보드 → Settings → Domains
2. "Add" 클릭 → 도메인 입력
3. DNS 레코드 설정 (Vercel이 안내)
4. SSL 인증서 자동 발급 대기 (1-2분)

### 배포 전 체크리스트

#### 필수 항목

- [ ] `npm run check-all` 통과 (타입 체크, 린트, 포맷 검사)
- [ ] `npm run build` 성공 (프로덕션 빌드 테스트)
- [ ] E2E 테스트 통과 (Playwright MCP)
- [ ] 환경 변수 설정 완료 (Vercel 대시보드)
- [ ] `.env.production` 파일이 `.gitignore`에 포함되어 있는지 확인

#### 권장 항목

- [ ] 로컬에서 프로덕션 빌드 실행: `npm run build && npm start`
- [ ] 성능 지표 확인: 페이지 로드 < 3초, PDF 생성 < 5초
- [ ] Rate Limiting 작동 확인 (API 분당 10회 제한)
- [ ] 404 에러 페이지 확인
- [ ] 모바일 반응형 테스트

### 환경별 설정

| 환경        | 브랜치    | 도메인 예시                     | 용도          |
| ----------- | --------- | ------------------------------- | ------------- |
| Production  | `main`    | `project.vercel.app`            | 프로덕션 배포 |
| Preview     | PR 브랜치 | `project-git-pr-123.vercel.app` | PR 리뷰용     |
| Development | 로컬      | `localhost:3000`                | 로컬 개발     |

### 트러블슈팅

**문제: 환경 변수가 적용되지 않음**

- 해결: Deployments → 최신 배포 → "Redeploy" 클릭

**문제: 빌드 실패 (Notion API 에러)**

- 해결: Settings → Environment Variables에서 `NOTION_API_KEY` 확인
- Integration이 데이터베이스에 연결되어 있는지 확인

**문제: PDF 다운로드 안됨**

- 해결: Vercel Functions timeout 확인 (무료 플랜: 10초)
- 폰트 파일이 `public/fonts`에 있는지 확인

**문제: Rate Limiting 작동 안 함**

- 해결: `src/middleware.ts` 파일이 배포에 포함되었는지 확인
- Middleware가 `/api/*` 경로에 적용되는지 확인

## 📝 라이선스

MIT
