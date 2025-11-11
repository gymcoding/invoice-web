# 노션 기반 견적서 관리 시스템 MVP PRD

## 🎯 핵심 정보

**목적**: 노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF 다운로드할 수 있는 시스템
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업과 견적서를 받는 클라이언트

## 🚶 사용자 여정

### 견적서 작성자 (관리자)

```
1. 노션 데이터베이스
   ↓ 견적서 정보 입력

2. 노션에서 견적서 작성 완료
   ↓ 자동으로 고유 URL 생성

3. 클라이언트에게 고유 링크 전달
   ↓ 이메일/메신저로 공유

4. 완료
```

### 클라이언트 (견적서 수신자)

```
1. 이메일/메신저에서 링크 클릭
   ↓ 고유 견적서 URL 접속

2. 견적서 조회 페이지
   ↓ 견적서 내용 확인

3. PDF 다운로드 버튼 클릭
   ↓ PDF 생성 및 다운로드

4. 완료 → 견적서 파일 저장/인쇄 가능
```

## ⚡ 기능 명세

### 1. MVP 핵심 기능

| ID       | 기능명                 | 설명                                 | MVP 필수 이유                                      | 관련 페이지        |
| -------- | ---------------------- | ------------------------------------ | -------------------------------------------------- | ------------------ |
| **F001** | 노션 데이터베이스 연동 | Notion API를 통해 견적서 데이터 조회 | 시스템의 핵심 데이터 소스                          | 견적서 조회 페이지 |
| **F002** | 견적서 조회            | 고유 URL로 특정 견적서 내용 표시     | 클라이언트가 견적서를 확인하는 핵심 기능           | 견적서 조회 페이지 |
| **F003** | PDF 다운로드           | 견적서를 PDF 파일로 변환 및 다운로드 | 클라이언트가 견적서를 저장/인쇄하기 위한 필수 기능 | 견적서 조회 페이지 |

### 2. MVP 필수 지원 기능

| ID       | 기능명             | 설명                                    | MVP 필수 이유                | 관련 페이지        |
| -------- | ------------------ | --------------------------------------- | ---------------------------- | ------------------ |
| **F010** | 견적서 URL 생성    | 노션 데이터베이스 ID 기반 고유 URL 생성 | 견적서 접근을 위한 필수 기능 | 노션 (외부 시스템) |
| **F011** | 견적서 유효성 검증 | 존재하지 않는 견적서 접근 시 에러 처리  | 잘못된 URL 접근 방지         | 견적서 조회 페이지 |
| **F012** | 반응형 레이아웃    | 모바일/태블릿/데스크톱 대응             | 다양한 기기에서 견적서 확인  | 견적서 조회 페이지 |

### 3. MVP 이후 기능 (제외)

- 관리자 대시보드 (견적서 목록, 통계 등)
- 견적서 상태 관리 (승인/거절/대기)
- 이메일 자동 발송 기능
- 견적서 템플릿 커스터마이징
- 견적서 버전 관리 및 히스토리
- 다국어 지원
- 견적서 만료일 설정

## 📱 메뉴 구조

```
📱 견적서 시스템 (공개 접근)
└── 📄 견적서 조회
    └── 기능: F001, F002, F003, F011, F012 (노션 데이터 조회, 웹 뷰어, PDF 다운로드)
```

**참고**: MVP에서는 별도의 관리자 페이지 없이 노션 데이터베이스를 직접 사용

---

## 📄 페이지별 상세 기능

### 견적서 조회 페이지

> **구현 기능:** `F001`, `F002`, `F003`, `F011`, `F012` | **접근 방식:** 공개 URL (인증 불필요)

| 항목            | 내용                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **역할**        | 클라이언트가 고유 링크를 통해 견적서를 조회하고 PDF로 다운로드하는 전용 페이지                                                                                                                                                                                           |
| **진입 경로**   | 이메일/메신저에서 받은 고유 URL 클릭 (예: `/invoice/[notionPageId]`)                                                                                                                                                                                                     |
| **사용자 행동** | • 견적서 내용 확인 (회사정보, 항목, 금액 등)<br>• PDF 다운로드 버튼 클릭<br>• 견적서 파일 저장/인쇄                                                                                                                                                                      |
| **주요 기능**   | • 노션 API를 통한 견적서 데이터 실시간 조회<br>• 견적서 정보 렌더링 (발행일, 유효기간, 항목별 금액, 총액 등)<br>• 존재하지 않는 견적서 ID 접근 시 404 에러 표시<br>• 반응형 디자인으로 모든 디바이스 지원<br>• **PDF 다운로드** 버튼 (클릭 시 즉시 PDF 생성 및 다운로드) |
| **다음 이동**   | PDF 다운로드 완료 → 같은 페이지 유지 (재다운로드 가능), 잘못된 URL → 404 에러 페이지                                                                                                                                                                                     |

---

### 404 에러 페이지

> **구현 기능:** `F011` | **접근 방식:** 자동 리디렉션

| 항목            | 내용                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **역할**        | 존재하지 않는 견적서 ID 접근 시 안내 메시지 표시                                                  |
| **진입 경로**   | 잘못된 견적서 URL 접근 시 자동 표시                                                               |
| **사용자 행동** | • 에러 메시지 확인<br>• 발행자에게 올바른 링크 요청 안내                                          |
| **주요 기능**   | • 친절한 에러 메시지 표시<br>• "견적서를 찾을 수 없습니다" 안내<br>• 발행자에게 문의하도록 가이드 |
| **다음 이동**   | 페이지 종료 (사용자가 올바른 링크를 다시 받아야 함)                                               |

---

## 🗄️ 데이터 모델

### Notion Database (견적서 정보)

| 필드           | 설명                | 타입/관계        |
| -------------- | ------------------- | ---------------- |
| id             | 노션 페이지 고유 ID | String (Notion)  |
| invoice_number | 견적서 번호         | String           |
| client_name    | 클라이언트명        | String           |
| issue_date     | 발행일              | Date             |
| valid_until    | 유효기간            | Date             |
| items          | 견적 항목 리스트    | Array (Relation) |
| total_amount   | 총 금액             | Number           |
| status         | 견적서 상태         | Select           |

### Notion Database Items (견적 항목)

| 필드        | 설명               | 타입/관계       |
| ----------- | ------------------ | --------------- |
| id          | 항목 고유 ID       | String (Notion) |
| description | 항목 설명          | String          |
| quantity    | 수량               | Number          |
| unit_price  | 단가               | Number          |
| amount      | 금액 (수량 × 단가) | Formula         |
| invoice_id  | 연결된 견적서      | → Invoice.id    |

### 노션 데이터베이스 구조 예시

```
📁 견적서 데이터베이스 (Invoices)
├── 견적서 번호 (Title)
├── 클라이언트명 (Text)
├── 발행일 (Date)
├── 유효기간 (Date)
├── 상태 (Select: 대기/승인/거절)
├── 총 금액 (Number)
└── 항목 (Relation → Items)

📁 항목 데이터베이스 (Items)
├── 항목명 (Title)
├── 수량 (Number)
├── 단가 (Number)
├── 금액 (Formula: 수량 × 단가)
└── 견적서 (Relation → Invoices)
```

## 🛠️ 기술 스택 (최신 버전)

### 🎨 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router) - React 풀스택 프레임워크
- **TypeScript 5.x** - 타입 안전성 보장
- **React 19** - UI 라이브러리

### 🎨 스타일링 & UI

- **TailwindCSS v4** - 유틸리티 CSS 프레임워크
- **shadcn/ui** - 고품질 React 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리

### 📝 외부 API & 통합

- **@notionhq/client** - Notion API 공식 SDK
- **Notion API v1** - 데이터베이스 조회 및 페이지 정보 가져오기

### 📄 PDF 생성

- **@react-pdf/renderer** - React 컴포넌트로 PDF 생성
- **또는 Puppeteer** - HTML을 PDF로 변환 (서버사이드)

### 🚀 배포 & 호스팅

- **Vercel** - Next.js 15 최적화 배포 플랫폼
- **환경 변수**: `NOTION_API_KEY`, `NOTION_DATABASE_ID`

### 📦 패키지 관리

- **npm** - 의존성 관리

---

## 🔑 Notion API 설정 가이드

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "견적서 시스템")
4. "Internal Integration Token" 복사 → `.env.local`에 저장

### 2. 데이터베이스 연결

1. Notion에서 견적서 데이터베이스 생성
2. 데이터베이스 우측 상단 "..." → "Add connections" → 생성한 Integration 선택
3. 데이터베이스 ID 복사 (URL에서 확인 가능)

### 3. 환경 변수 설정

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

---

## 📦 핵심 구현 로직

### 1. Notion 데이터 조회 (Server Component)

```typescript
// app/invoice/[id]/page.tsx
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getInvoice(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId })
  const blocks = await notion.blocks.children.list({ block_id: pageId })
  return { page, blocks }
}
```

### 2. PDF 생성 (API Route)

```typescript
// app/api/generate-pdf/route.ts
import { PDFDocument } from '@react-pdf/renderer';

export async function POST(req: Request) {
  const { invoiceData } = await req.json();
  const pdfDoc = <InvoicePDF data={invoiceData} />;
  const blob = await pdf(pdfDoc).toBlob();
  return new Response(blob, {
    headers: { 'Content-Type': 'application/pdf' }
  });
}
```

### 3. 고유 URL 구조

```
https://yourdomain.com/invoice/[notionPageId]
예: https://invoice.example.com/invoice/abc123def456
```

---

## ✅ MVP 성공 기준

1. ✅ 노션 데이터베이스에서 견적서 정보를 정상적으로 가져옴
2. ✅ 고유 URL로 접근 시 견적서가 웹에서 정확하게 표시됨
3. ✅ PDF 다운로드 버튼 클릭 시 견적서가 PDF로 다운로드됨
4. ✅ 모바일/태블릿/데스크톱에서 정상 작동
5. ✅ 잘못된 URL 접근 시 적절한 에러 메시지 표시

---

## 🚀 향후 개선 방향 (MVP 이후)

### Phase 2: 관리 기능

- 관리자 대시보드 (발행한 견적서 목록)
- 견적서 상태 관리 (승인/거절 추적)
- 견적서 검색 및 필터링

### Phase 3: 자동화

- 이메일 자동 발송 (SendGrid/Resend 연동)
- 견적서 만료 알림
- 클라이언트 응답 트래킹

### Phase 4: 고급 기능

- 다중 템플릿 지원
- 다국어 견적서
- 전자 서명 기능
- 견적서 버전 관리

---

**📝 문서 버전**: v1.0 (MVP)
**📅 작성일**: 2025-10-02
**🎯 목표**: 최소 기능으로 빠른 출시 후 사용자 피드백 기반 개선
