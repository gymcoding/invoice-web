/**
 * 더미 데이터 생성 유틸리티
 * 개발 및 테스트 환경에서 사용할 샘플 견적서 데이터 생성
 */

import type { Invoice, InvoiceItem } from '@/types/invoice'

/**
 * 더미 견적 항목 생성
 */
function generateMockItems(): InvoiceItem[] {
  return [
    {
      id: 'item-1',
      description: '웹사이트 디자인',
      quantity: 1,
      unitPrice: 5000000,
      amount: 5000000,
    },
    {
      id: 'item-2',
      description: '프론트엔드 개발',
      quantity: 1,
      unitPrice: 8000000,
      amount: 8000000,
    },
    {
      id: 'item-3',
      description: '백엔드 API 개발',
      quantity: 1,
      unitPrice: 7000000,
      amount: 7000000,
    },
    {
      id: 'item-4',
      description: '데이터베이스 설계',
      quantity: 1,
      unitPrice: 3000000,
      amount: 3000000,
    },
    {
      id: 'item-5',
      description: '유지보수 (6개월)',
      quantity: 6,
      unitPrice: 500000,
      amount: 3000000,
    },
  ]
}

/**
 * 더미 견적서 생성
 * @returns 샘플 견적서 데이터
 */
export function generateMockInvoice(): Invoice {
  const items = generateMockItems()
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0)

  return {
    id: 'mock-invoice-001',
    invoiceNumber: 'INV-2025-001',
    clientName: 'ABC 주식회사',
    issueDate: '2025-10-07',
    validUntil: '2025-10-21',
    items,
    totalAmount,
    status: 'pending',
  }
}

/**
 * 여러 개의 더미 견적서 생성
 * @param count 생성할 견적서 개수
 * @returns 샘플 견적서 배열
 */
export function generateMockInvoices(count: number): Invoice[] {
  return Array.from({ length: count }, (_, index) => {
    const invoice = generateMockInvoice()
    return {
      ...invoice,
      id: `mock-invoice-${String(index + 1).padStart(3, '0')}`,
      invoiceNumber: `INV-2025-${String(index + 1).padStart(3, '0')}`,
      clientName: `클라이언트 ${index + 1}`,
    }
  })
}
