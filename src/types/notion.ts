/**
 * Notion API 응답 타입 정의
 * @notionhq/client SDK 공식 타입을 재사용하여 중복 방지
 */

import type {
  PageObjectResponse,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

/**
 * Notion Page 타입 (SDK 재사용)
 */
export type NotionPage = PageObjectResponse

/**
 * Notion Database 타입 (SDK 재사용)
 */
export type NotionDatabase = DatabaseObjectResponse

/**
 * 견적서 페이지 속성 타입
 * CSV 데이터의 실제 한글 속성명을 반영
 */
export interface InvoicePageProperties {
  /** 견적서 번호 (Title 속성) */
  '견적서 번호': {
    type: 'title'
    title: Array<{ plain_text: string }>
  }
  /** 클라이언트명 (Rich Text 속성) */
  클라이언트명: {
    type: 'rich_text'
    rich_text: Array<{ plain_text: string }>
  }
  /** 발행일 (Date 속성) */
  발행일: {
    type: 'date'
    date: { start: string } | null
  }
  /** 유효기간 (Date 속성) */
  유효기간: {
    type: 'date'
    date: { start: string } | null
  }
  /** 총 금액 (Number 속성) */
  '총 금액': {
    type: 'number'
    number: number | null
  }
  /** 상태 (Select 속성: 대기/승인/거절) */
  상태: {
    type: 'select'
    select: { name: string } | null
  }
  /** 항목 (Relation 속성 → Items) */
  항목: {
    type: 'relation'
    relation: Array<{ id: string }>
  }
}

/**
 * 항목 페이지 속성 타입
 * CSV 데이터의 Items 테이블 구조를 반영
 */
export interface ItemPageProperties {
  /** 항목명 (Title 속성) */
  항목명: {
    type: 'title'
    title: Array<{ plain_text: string }>
  }
  /** 수량 (Number 속성) */
  수량: {
    type: 'number'
    number: number | null
  }
  /** 단가 (Number 속성) */
  단가: {
    type: 'number'
    number: number | null
  }
  /** 금액 (Number 속성, Formula로 계산) */
  금액: {
    type: 'number'
    number: number | null
  }
  /** Invoices (Relation 속성 → Invoices) */
  Invoices: {
    type: 'relation'
    relation: Array<{ id: string }>
  }
}

/**
 * Notion 페이지를 Invoice 속성으로 타입 캐스팅하기 위한 타입 가드
 */
export function isInvoicePage(
  page: NotionPage
): page is NotionPage & { properties: InvoicePageProperties } {
  return 'properties' in page && '견적서 번호' in page.properties
}

/**
 * Notion 페이지를 Item 속성으로 타입 캐스팅하기 위한 타입 가드
 */
export function isItemPage(
  page: NotionPage
): page is NotionPage & { properties: ItemPageProperties } {
  return 'properties' in page && '항목명' in page.properties
}
