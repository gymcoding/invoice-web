/**
 * 견적서 항목 테이블 컴포넌트
 * 견적 항목들을 테이블 형식으로 표시합니다.
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { InvoiceItem } from '@/types/invoice'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvoiceTableProps {
  /** 견적 항목 배열 */
  items: InvoiceItem[]
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 견적 항목 테이블 컴포넌트
 * 항목명, 수량, 단가, 금액을 테이블 형식으로 표시합니다.
 */
export function InvoiceTable({ items, className }: InvoiceTableProps) {
  return (
    <Card
      className={cn(
        'shadow-md transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="text-muted-foreground h-5 w-5" />
          견적 항목
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {/* 데스크톱 테이블 뷰 */}
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%] px-4 py-3">항목명</TableHead>
                <TableHead className="px-4 py-3 text-center">수량</TableHead>
                <TableHead className="px-4 py-3 text-right">단가</TableHead>
                <TableHead className="px-4 py-3 text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 font-medium">
                    {item.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    {formatCurrency(item.unitPrice)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 모바일 카드 뷰 */}
        <div className="space-y-4 p-6 md:hidden">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'space-y-2 rounded-lg border p-4',
                index !== items.length - 1 && 'border-b'
              )}
            >
              <div className="text-foreground font-semibold">
                {item.description}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">수량:</span>{' '}
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">단가:</span>{' '}
                  <span className="font-medium">
                    {formatCurrency(item.unitPrice)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between border-t pt-2 text-base">
                <span className="text-muted-foreground font-medium">금액</span>
                <span className="text-foreground font-bold">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
