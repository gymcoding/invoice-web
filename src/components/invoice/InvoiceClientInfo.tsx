/**
 * 견적서 클라이언트 정보 컴포넌트
 * 견적서를 받는 클라이언트의 정보를 표시합니다.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Invoice } from '@/types/invoice'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvoiceClientInfoProps {
  /** 견적서 데이터 (클라이언트명 사용) */
  invoice: Invoice
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 클라이언트 정보 섹션 컴포넌트
 * 견적서를 받는 클라이언트의 기본 정보를 표시합니다.
 */
export function InvoiceClientInfo({
  invoice,
  className,
}: InvoiceClientInfoProps) {
  return (
    <Card
      className={cn(
        'shadow-md transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Building2 className="text-muted-foreground h-5 w-5" />
          클라이언트 정보
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-muted-foreground text-sm font-medium">회사명</p>
            <p className="text-lg font-semibold">{invoice.clientName}</p>
          </div>

          {/* TODO: 추후 클라이언트 상세 정보 추가 가능 (주소, 담당자, 연락처 등) */}
        </div>
      </CardContent>
    </Card>
  )
}
