# 배포 체크리스트

## 📋 배포 전 확인사항

### 코드 품질

- [ ] `npm run check-all` 통과
  - TypeScript 타입 체크
  - ESLint 검사
  - Prettier 포맷 확인
- [ ] `npm run build` 성공
- [ ] 모든 테스트 통과

### 환경 변수 설정

- [ ] `.env.production` 파일 확인
- [ ] 필수 환경 변수 설정 완료:
  - [ ] `NOTION_API_KEY`
  - [ ] `NOTION_DATABASE_ID`
  - [ ] `ADMIN_PASSWORD` (강력한 비밀번호)
  - [ ] `SESSION_SECRET` (32자 랜덤 문자열)
  - [ ] `NEXT_PUBLIC_BASE_URL` (프로덕션 도메인)

### 보안 점검

- [ ] 관리자 비밀번호 기본값 아님 확인
  - ❌ 금지: `admin1234`, `admin123`, `password`
- [ ] SESSION_SECRET 새로 생성
  - 생성 명령어: `openssl rand -base64 32`
- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있음
- [ ] 민감한 정보가 코드에 하드코딩되지 않음

---

## 🚀 Vercel 배포

### 1. Vercel 계정 설정

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Add New" → "Project" 클릭

### 2. 프로젝트 Import

1. GitHub 저장소 선택
2. "Import" 클릭
3. 프로젝트 이름 설정 (선택사항)

### 3. 환경 변수 설정

**Vercel Dashboard → Settings → Environment Variables**에서 다음 변수 추가:

#### Production 환경

```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 관리자 인증
ADMIN_PASSWORD=your-strong-password-here
SESSION_SECRET=your-32-character-secret-here

# 애플리케이션 URL
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

# Next.js 환경
NODE_ENV=production
```

#### Preview 환경 (선택사항)

- Production과 동일한 환경 변수 설정
- 또는 별도의 테스트 Notion 데이터베이스 사용

### 4. 배포 실행

1. "Deploy" 버튼 클릭
2. 빌드 로그 확인
3. 배포 완료 대기 (약 2-3분)

### 5. 도메인 설정 (선택사항)

1. Vercel Dashboard → Settings → Domains
2. "Add" 클릭
3. 커스텀 도메인 입력
4. DNS 설정 업데이트

---

## ✅ 배포 후 확인

### 기능 테스트

- [ ] 관리자 로그인 작동
  - URL: `https://your-domain.vercel.app/admin-login`
  - 비밀번호 입력 후 로그인 성공
- [ ] 견적서 목록 조회
  - Notion 데이터베이스 연동 확인
  - 견적서 데이터 정상 표시
- [ ] 링크 복사 기능
  - 복사 버튼 클릭 시 URL 복사됨
  - 토스트 알림 표시
- [ ] 링크 공유 기능
  - 공유 드롭다운 메뉴 열림
  - 이메일/텔레그램 공유 작동
- [ ] 다크모드 전환
  - 테마 버튼 클릭 시 전환
  - 선택한 테마 저장됨
- [ ] PDF 다운로드
  - 견적서 페이지에서 PDF 생성
  - 다운로드 성공
- [ ] 모바일 반응형
  - 모바일 브라우저에서 정상 표시
  - 터치 인터랙션 작동

### 성능 확인

- [ ] Lighthouse 점수 확인
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
- [ ] 페이지 로딩 속도
  - 초기 로딩: < 2초
  - 페이지 전환: < 1초
- [ ] Core Web Vitals
  - LCP (Largest Contentful Paint): < 2.5초
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

### 브라우저 호환성

- [ ] Chrome 최신 버전
- [ ] Safari 최신 버전
- [ ] Firefox 최신 버전
- [ ] Edge 최신 버전
- [ ] 모바일 Safari (iOS)
- [ ] 모바일 Chrome (Android)

---

## 🔍 모니터링

### Vercel Analytics

1. Vercel Dashboard → Analytics 활성화
2. 실시간 트래픽 모니터링
3. 성능 메트릭 확인

### 에러 모니터링

1. Vercel Dashboard → Logs 확인
2. 런타임 에러 모니터링
3. API 실패 로그 확인

---

## 🔄 업데이트 배포

### 자동 배포

- `main` 브랜치에 push 시 자동 배포
- Pull Request 생성 시 Preview 배포

### 수동 배포

1. Vercel Dashboard → Deployments
2. "Redeploy" 버튼 클릭

---

## 🐛 문제 해결

### 배포 실패

**증상**: 빌드 에러 발생

**해결방법**:

1. Vercel 빌드 로그 확인
2. 환경 변수 누락 확인
3. 로컬에서 `npm run build` 테스트

### 환경 변수 오류

**증상**: "NOTION_API_KEY는 필수입니다" 에러

**해결방법**:

1. Vercel Dashboard → Settings → Environment Variables
2. 모든 필수 변수 설정 확인
3. "Redeploy" 실행

### Notion 연동 실패

**증상**: 견적서 목록이 표시되지 않음

**해결방법**:

1. Notion Integration 권한 확인
2. 데이터베이스에 Integration 연결 확인
3. `NOTION_DATABASE_ID` 정확성 확인

---

## 📊 배포 후 최적화

### CDN 캐싱

- Vercel이 자동으로 CDN 캐싱 적용
- 정적 자산 자동 최적화

### 이미지 최적화

- Next.js Image 컴포넌트 사용 확인
- 이미지 자동 포맷 변환 (WebP)

### 코드 분할

- 동적 import 사용 확인
- 번들 크기 모니터링

---

## 🔐 보안 강화

### HTTPS

- Vercel이 자동으로 HTTPS 적용
- 커스텀 도메인도 자동 SSL 인증서 발급

### 헤더 보안

- `next.config.js`에서 보안 헤더 설정 확인
- CSP (Content Security Policy) 적용

### Rate Limiting

- 관리자 로그인 시도 제한: 5회/60초
- API 요청 제한: Notion API 제한 준수

---

## 📝 배포 기록

| 날짜 | 버전 | 변경사항 | 배포자 |
| ---- | ---- | -------- | ------ |
|      |      |          |        |

---

## 🎯 다음 단계

배포가 완료되면:

1. **모니터링 설정**: 에러 추적, 성능 모니터링
2. **백업 계획**: Notion 데이터베이스 정기 백업
3. **문서 업데이트**: 변경사항 문서화
4. **사용자 교육**: 관리자 가이드 공유

---

## 📞 지원

배포 관련 문의:

- Vercel 공식 문서: https://vercel.com/docs
- Next.js 공식 문서: https://nextjs.org/docs
- Notion API 문서: https://developers.notion.com
