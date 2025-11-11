/**
 * 견적서 총액 요약 컴포넌트
 * 견적서의 총 금액을 강조하여 표시합니다.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { Invoice } from '@/types/invoice'
import { DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvoiceSummaryProps {
  /** 견적서 데이터 (총액 사용) */
  invoice: Invoice
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 총액 요약 컴포넌트
 * 견적서의 최종 총액을 크게 표시합니다.
 */
export function InvoiceSummary({ invoice, className }: InvoiceSummaryProps) {
  return (
    <Card
      className={cn(
        'shadow-md transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <DollarSign className="text-muted-foreground h-5 w-5" />
          총액
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 총액 표시 */}
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">
              총 견적 금액
            </p>
            <p className="text-foreground text-3xl font-bold sm:text-4xl">
              {formatCurrency(invoice.totalAmount)}
            </p>
          </div>

          {/* 항목 개수 */}
          <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-2">
            <p className="text-muted-foreground text-sm">총 항목</p>
            <p className="text-foreground text-lg font-bold">
              {invoice.items.length}
            </p>
            <p className="text-muted-foreground text-sm">개</p>
          </div>
        </div>

        {/* 부가세 안내 (추후 기능 확장 시 사용) */}
        <div className="bg-muted/50 mt-4 rounded-md p-3">
          <p className="text-muted-foreground text-sm">
            * 부가세는 별도로 청구됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
