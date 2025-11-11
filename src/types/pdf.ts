/**
 * PDF 생성 관련 타입 정의
 * 견적서를 PDF로 변환하는 기능에 사용되는 타입들
 */

import type { Invoice } from './invoice'

/**
 * PDF 생성 옵션 인터페이스
 */
export interface PDFGenerationOptions {
  /** 견적서 데이터 */
  invoice: Invoice
  /** 파일명 (선택사항, 기본값: invoice-{번호}.pdf) */
  filename?: string
  /** 용지 크기 (선택사항, 기본값: A4) */
  format?: 'A4' | 'Letter'
  /** 용지 방향 (선택사항, 기본값: portrait) */
  orientation?: 'portrait' | 'landscape'
}

/**
 * PDF 생성 결과 인터페이스
 */
export interface PDFGenerationResult {
  /** 생성 성공 여부 */
  success: boolean
  /** PDF Blob 객체 (성공 시) */
  blob?: Blob
  /** 다운로드 가능한 URL (성공 시) */
  url?: string
  /** 에러 메시지 (실패 시) */
  error?: string
}
