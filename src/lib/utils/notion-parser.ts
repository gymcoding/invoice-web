/**
 * Notion API 응답 데이터 파싱 및 변환 유틸리티
 * Notion 데이터 구조를 비즈니스 도메인 타입으로 변환
 */

import type {
  NotionPage,
  InvoicePageProperties,
  ItemPageProperties,
} from '@/types/notion'
import type { Invoice, InvoiceItem, InvoiceStatus } from '@/types/invoice'
import { KOREAN_TO_STATUS_MAP } from '@/lib/constants'

/**
 * Notion 견적서 페이지를 Invoice 객체로 변환
 * @param page - Notion 견적서 페이지
 * @param itemPages - Notion 항목 페이지 배열
 * @returns 변환된 Invoice 객체
 */
export function transformNotionToInvoice(
  page: NotionPage & { properties: InvoicePageProperties },
  itemPages: Array<NotionPage & { properties: ItemPageProperties }>
): Invoice {
  const props = page.properties

  // null 체크와 기본값 처리
  const invoiceNumber =
    extractPlainText(props['견적서 번호']?.title) || 'INV-UNKNOWN'
  const clientName = extractPlainText(props.클라이언트명?.rich_text) || '미지정'
  const issueDate =
    props.발행일?.date?.start || new Date().toISOString().split('T')[0]
  const validUntil =
    props.유효기간?.date?.start || getDefaultValidUntil(issueDate)
  const totalAmount =
    props['총 금액']?.number || calculateTotalFromItems(itemPages)
  const status = mapKoreanStatus(props.상태?.select?.name)

  // 항목 변환
  const items = itemPages.map(transformNotionToItem)

  return {
    id: page.id,
    invoiceNumber,
    clientName,
    issueDate,
    validUntil,
    totalAmount,
    status,
    items,
  }
}

/**
 * Notion 항목 페이지를 InvoiceItem 객체로 변환
 * @param page - Notion 항목 페이지
 * @returns 변환된 InvoiceItem 객체
 */
function transformNotionToItem(
  page: NotionPage & { properties: ItemPageProperties }
): InvoiceItem {
  const props = page.properties

  // null 체크와 기본값 처리
  const description = extractPlainText(props.항목명?.title) || '항목명 없음'
  const quantity = props.수량?.number || 0
  const unitPrice = props.단가?.number || 0
  const amount = props.금액?.number || quantity * unitPrice

  return {
    id: page.id,
    description,
    quantity,
    unitPrice,
    amount,
  }
}

/**
 * 한글 상태를 InvoiceStatus 타입으로 매핑
 * @param koreanStatus - 한글 상태값 (대기/승인/거절)
 * @returns 영문 상태값
 */
function mapKoreanStatus(
  koreanStatus: string | null | undefined
): InvoiceStatus {
  if (!koreanStatus) {
    return 'pending'
  }

  // 타입 안전성을 위한 체크
  const mappedStatus =
    KOREAN_TO_STATUS_MAP[koreanStatus as keyof typeof KOREAN_TO_STATUS_MAP]
  return (mappedStatus as InvoiceStatus) || 'pending'
}

/**
 * Notion 텍스트 배열에서 plain text 추출
 * @param textArray - Notion 텍스트 객체 배열
 * @returns 결합된 plain text 문자열
 */
function extractPlainText(
  textArray: Array<{ plain_text: string }> | undefined | null
): string {
  if (!textArray || textArray.length === 0) {
    return ''
  }

  return textArray.map(text => text.plain_text).join('')
}

/**
 * 기본 유효기간 계산 (발행일로부터 7일 후)
 * @param issueDate - 발행일 (ISO 8601 형식)
 * @returns 유효기간 (ISO 8601 형식)
 */
function getDefaultValidUntil(issueDate: string): string {
  try {
    const date = new Date(issueDate)
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  } catch {
    // 날짜 파싱 실패 시 현재 날짜 + 7일
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  }
}

/**
 * 항목들의 금액 합계 계산
 * @param itemPages - 항목 페이지 배열
 * @returns 총 금액
 */
function calculateTotalFromItems(
  itemPages: Array<NotionPage & { properties: ItemPageProperties }>
): number {
  return itemPages.reduce((total, page) => {
    const amount = page.properties.금액?.number || 0
    return total + amount
  }, 0)
}

/**
 * 날짜 문자열 포맷 검증 및 변환
 * @param dateString - 날짜 문자열
 * @returns ISO 8601 형식의 날짜 문자열
 */
export function normalizeDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return new Date().toISOString().split('T')[0]
  }

  try {
    // Notion은 다양한 날짜 형식을 반환할 수 있음
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    return date.toISOString().split('T')[0]
  } catch {
    console.warn(`날짜 파싱 실패: ${dateString}`)
    return new Date().toISOString().split('T')[0]
  }
}

/**
 * 숫자 값 안전하게 파싱
 * @param value - 변환할 값
 * @param defaultValue - 기본값
 * @returns 파싱된 숫자
 */
export function parseNumber(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) {
      return parsed
    }
  }

  return defaultValue
}
