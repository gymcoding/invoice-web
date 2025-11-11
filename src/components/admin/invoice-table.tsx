import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Invoice, InvoiceStatus } from '@/types/invoice'
import { formatCurrency, formatDate } from '@/lib/format'
import Link from 'next/link'
import { ExternalLink, ArrowUpDown } from 'lucide-react'
import { generateInvoiceUrl } from '@/lib/utils/link-generator'
import { LinkDisplay } from '@/components/admin/link-display'
import { CopyButton } from '@/components/admin/copy-button'
import { ShareButton } from '@/components/admin/share-button'

interface InvoiceTableProps {
  invoices: Invoice[]
  currentSort?: 'issue_date' | 'total_amount'
}

/**
 * 견적서 상태별 배지 설정
 */
const statusConfig: Record<
  InvoiceStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' }
> = {
  pending: { label: '대기', variant: 'default' },
  approved: { label: '승인', variant: 'secondary' },
  rejected: { label: '거절', variant: 'destructive' },
}

/**
 * 정렬 버튼 컴포넌트
 */
function SortButton({
  field,
  currentSort,
  children,
}: {
  field: 'issue_date' | 'total_amount'
  currentSort?: string
  children: React.ReactNode
}) {
  const isActive = currentSort === field

  return (
    <Link
      href={`?sort=${field}`}
      className="hover:text-foreground flex items-center gap-2 transition-colors"
    >
      {children}
      <ArrowUpDown
        className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
      />
    </Link>
  )
}

/**
 * 견적서 테이블 컴포넌트
 * shadcn/ui Table로 견적서 목록을 테이블 형태로 표시
 */
export function InvoiceTable({ invoices, currentSort }: InvoiceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">견적서 번호</TableHead>
            <TableHead>클라이언트명</TableHead>
            <TableHead className="w-[140px]">
              <SortButton field="issue_date" currentSort={currentSort}>
                발행일
              </SortButton>
            </TableHead>
            <TableHead className="w-[140px]">유효기간</TableHead>
            <TableHead className="w-[140px] text-right">
              <SortButton field="total_amount" currentSort={currentSort}>
                총액
              </SortButton>
            </TableHead>
            <TableHead className="w-[100px]">상태</TableHead>
            <TableHead className="w-[250px]">링크</TableHead>
            <TableHead className="w-[100px] text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>{formatDate(invoice.issueDate, 'short')}</TableCell>
              <TableCell>{formatDate(invoice.validUntil, 'short')}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(invoice.totalAmount)}
              </TableCell>
              <TableCell>
                <Badge variant={statusConfig[invoice.status].variant}>
                  {statusConfig[invoice.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <LinkDisplay url={generateInvoiceUrl(invoice.id)} />
                  <CopyButton text={generateInvoiceUrl(invoice.id)} />
                  <ShareButton
                    url={generateInvoiceUrl(invoice.id)}
                    title={invoice.invoiceNumber}
                    description={`${invoice.clientName}님의 견적서`}
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/invoice/${invoice.id}`} target="_blank">
                    보기
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
