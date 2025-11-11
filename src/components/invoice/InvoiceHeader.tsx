/**
 * 견적서 헤더 컴포넌트
 * 견적서 번호, 발행일, 유효기간, 상태 배지를 표시합니다.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatInvoiceStatus } from '@/lib/format'
import type { Invoice } from '@/types/invoice'
import { Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvoiceHeaderProps {
  /** 견적서 데이터 */
  invoice: Invoice
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 견적서 헤더 컴포넌트
 * 견적서의 기본 정보와 상태를 표시합니다.
 */
export function InvoiceHeader({ invoice, className }: InvoiceHeaderProps) {
  // 상태에 따른 배지 색상 결정
  const getStatusVariant = (
    status: Invoice['status']
  ): 'default' | 'destructive' | 'secondary' => {
    switch (status) {
      case 'approved':
        return 'default'
      case 'rejected':
        return 'destructive'
      case 'pending':
      default:
        return 'secondary'
    }
  }

  return (
    <Card
      className={cn(
        'shadow-md transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      <CardHeader className="space-y-1">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle className="text-2xl font-bold sm:text-3xl">
            {invoice.invoiceNumber}
          </CardTitle>
          <Badge variant={getStatusVariant(invoice.status)} className="text-sm">
            {formatInvoiceStatus(invoice.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* 발행일 */}
          <div className="flex items-start gap-3">
            <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                발행일
              </p>
              <p className="text-base font-semibold">
                {formatDate(invoice.issueDate)}
              </p>
            </div>
          </div>

          {/* 유효기간 */}
          <div className="flex items-start gap-3">
            <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                유효기간
              </p>
              <p className="text-base font-semibold">
                {formatDate(invoice.validUntil)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
