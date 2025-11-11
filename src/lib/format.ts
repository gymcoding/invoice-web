/**
 * 데이터 포맷 유틸리티
 * 날짜, 통화 등의 데이터를 사용자 친화적인 형식으로 변환
 */

/**
 * 날짜를 한국어 형식으로 포맷
 * @param date ISO 8601 날짜 문자열 또는 Date 객체
 * @param format 포맷 타입 ('long' | 'short' | 'numeric')
 * @returns 포맷된 한국어 날짜 문자열
 *
 * @example
 * formatDate('2025-10-07') // "2025년 10월 7일"
 * formatDate('2025-10-07', 'short') // "2025. 10. 7."
 * formatDate('2025-10-07', 'numeric') // "2025-10-07"
 */
export function formatDate(
  date: string | Date,
  format: 'long' | 'short' | 'numeric' = 'long'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // 유효하지 않은 날짜 처리
  if (isNaN(dateObj.getTime())) {
    return '-'
  }

  switch (format) {
    case 'long':
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj)

    case 'short':
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(dateObj)

    case 'numeric':
      return dateObj.toISOString().split('T')[0]

    default:
      return dateObj.toLocaleDateString('ko-KR')
  }
}

/**
 * 금액을 한국 원화(KRW) 형식으로 포맷
 * @param amount 금액 (숫자)
 * @param options 추가 포맷 옵션
 * @returns 포맷된 원화 문자열
 *
 * @example
 * formatCurrency(1000000) // "₩1,000,000"
 * formatCurrency(1500000, { showSymbol: false }) // "1,500,000원"
 */
export function formatCurrency(
  amount: number,
  options?: {
    /** 통화 기호 표시 여부 (기본값: true) */
    showSymbol?: boolean
    /** 원 단위 표시 여부 (기본값: false) */
    showWon?: boolean
  }
): string {
  const { showSymbol = true, showWon = false } = options || {}

  // 숫자가 아닌 경우 처리
  if (isNaN(amount)) {
    return showSymbol ? '₩0' : '0원'
  }

  const formatted = new Intl.NumberFormat('ko-KR').format(amount)

  if (showSymbol) {
    return `₩${formatted}`
  }

  if (showWon) {
    return `${formatted}원`
  }

  return formatted
}

/**
 * 견적서 상태를 한국어로 변환
 * @param status 견적서 상태
 * @returns 한국어 상태 텍스트
 */
export function formatInvoiceStatus(
  status: 'pending' | 'approved' | 'rejected'
): string {
  const statusMap = {
    pending: '대기',
    approved: '승인',
    rejected: '거절',
  }

  return statusMap[status] || status
}

/**
 * 파일명에 안전한 문자열로 변환
 * @param text 원본 텍스트
 * @returns 파일명에 사용 가능한 문자열
 *
 * @example
 * sanitizeFilename('견적서 #001 (2025.10.07)') // "견적서-001-2025-10-07"
 */
export function sanitizeFilename(text: string): string {
  return text
    .replace(/[#()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\./g, '-')
    .toLowerCase()
}
