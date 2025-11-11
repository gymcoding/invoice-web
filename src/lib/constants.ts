/**
 * 애플리케이션 전역 상수 정의
 * as const 패턴을 사용하여 타입 리터럴 보장
 */

/**
 * 견적서 상태 상수
 * CSV 데이터 기반: "대기", "승인", "거절"
 */
export const INVOICE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export type InvoiceStatusKey = keyof typeof INVOICE_STATUS
export type InvoiceStatusValue = (typeof INVOICE_STATUS)[InvoiceStatusKey]

/**
 * 견적서 상태 한글 레이블
 * Notion의 한글 상태값과 영문 상태값 매핑
 */
export const INVOICE_STATUS_LABELS = {
  pending: '대기',
  approved: '승인',
  rejected: '거절',
} as const

/**
 * 한글 상태값을 영문 상태값으로 변환
 */
export const KOREAN_TO_STATUS_MAP = {
  대기: 'pending',
  승인: 'approved',
  거절: 'rejected',
} as const

/**
 * PDF 설정 상수
 */
export const PDF_CONFIG = {
  DEFAULT_FORMAT: 'A4',
  DEFAULT_ORIENTATION: 'portrait',
  FILENAME_PREFIX: 'invoice',
} as const

/**
 * 에러 메시지 상수
 */
export const ERROR_MESSAGES = {
  INVOICE_NOT_FOUND: '견적서를 찾을 수 없습니다.',
  NOTION_API_ERROR: 'Notion API 연결 오류가 발생했습니다.',
  PDF_GENERATION_ERROR: 'PDF 생성 중 오류가 발생했습니다.',
  INVALID_INVOICE_DATA: '유효하지 않은 견적서 데이터입니다.',
  MISSING_REQUIRED_FIELD: '필수 필드가 누락되었습니다.',
} as const

/**
 * 통화 포맷 설정
 */
export const CURRENCY_FORMAT = {
  LOCALE: 'ko-KR',
  CURRENCY: 'KRW',
  SYMBOL: '₩',
} as const
