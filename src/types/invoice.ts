/**
 * 견적서 비즈니스 도메인 타입 정의
 * CSV 데이터 및 PRD 기반으로 설계된 타입 시스템
 */

/**
 * 견적서 상태 타입
 * CSV 데이터 기반: "대기", "승인", "거절"
 */
export type InvoiceStatus = 'pending' | 'approved' | 'rejected'

/**
 * 견적 항목 인터페이스
 * Items 테이블 구조를 반영
 */
export interface InvoiceItem {
  /** 항목 고유 ID (Notion Page ID) */
  id: string
  /** 항목명 (예: 웹사이트 디자인) */
  description: string
  /** 수량 */
  quantity: number
  /** 단가 */
  unitPrice: number
  /** 금액 (수량 × 단가) */
  amount: number
}

/**
 * 견적서 인터페이스
 * Invoices 테이블 구조를 반영
 */
export interface Invoice {
  /** 견적서 고유 ID (Notion Page ID) */
  id: string
  /** 견적서 번호 (예: INV-2025-001) */
  invoiceNumber: string
  /** 클라이언트명 (예: ABC 회사) */
  clientName: string
  /** 발행일 (ISO 8601 형식) */
  issueDate: string
  /** 유효기간 (ISO 8601 형식) */
  validUntil: string
  /** 견적 항목 배열 */
  items: InvoiceItem[]
  /** 총 금액 */
  totalAmount: number
  /** 견적서 상태 (대기/승인/거절) */
  status: InvoiceStatus
}

/**
 * 회사 정보 인터페이스
 * PDF 생성 시 사용되는 발행자 정보
 */
export interface CompanyInfo {
  /** 회사명 */
  name: string
  /** 주소 (선택사항) */
  address?: string
  /** 전화번호 (선택사항) */
  phone?: string
  /** 이메일 (선택사항) */
  email?: string
}

/**
 * PDF 생성용 데이터 인터페이스
 * 견적서 정보와 회사 정보를 포함
 */
export interface InvoicePDFData {
  /** 견적서 데이터 */
  invoice: Invoice
  /** 회사 정보 (선택사항) */
  companyInfo?: CompanyInfo
}
