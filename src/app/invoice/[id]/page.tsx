import { Footer } from '@/components/layout/footer'
import { InvoiceHeader } from '@/components/invoice/InvoiceHeader'
import { InvoiceClientInfo } from '@/components/invoice/InvoiceClientInfo'
import { InvoiceTable } from '@/components/invoice/InvoiceTable'
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary'
import { PDFDownloadButton } from '@/components/invoice/PDFDownloadButton'
import { InvoiceSkeleton } from '@/components/invoice/InvoiceSkeleton'
import { getOptimizedInvoice } from '@/lib/services/invoice.service'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { formatCurrency } from '@/lib/format'

interface InvoicePageProps {
  params: Promise<{
    id: string
  }>
}

/**
 * Open Graph 메타데이터 생성
 * 링크 미리보기에 견적서 정보 표시
 */
export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const invoice = await getOptimizedInvoice(id)

    return {
      title: `견적서 ${invoice.invoiceNumber}`,
      description: `${invoice.clientName}님의 견적서 - 총액: ${formatCurrency(invoice.totalAmount)}`,
      openGraph: {
        title: `견적서 ${invoice.invoiceNumber}`,
        description: `${invoice.clientName}님의 견적서`,
        type: 'website',
      },
    }
  } catch {
    return {
      title: '견적서 조회',
      description: '견적서를 확인하세요',
    }
  }
}

/**
 * 견적서 콘텐츠 컴포넌트 (Async Server Component)
 *
 * 데이터 페칭 로직을 분리하여 Suspense 경계 내에서 실행되도록 함
 * 이를 통해 점진적 로딩과 스켈레톤 UI를 제공
 */
async function InvoiceContent({ id }: { id: string }) {
  // 최적화된 견적서 조회 (캐싱 + Request Deduplication)
  let invoiceData
  try {
    invoiceData = await getOptimizedInvoice(id)
  } catch (error) {
    console.error('견적서 조회 실패:', error)
    // 에러 발생 시 404 페이지로 리다이렉트
    notFound()
  }

  // 견적서를 찾을 수 없는 경우 (이 부분은 실제로는 try-catch에서 처리됨)
  if (!invoiceData) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-muted/30 flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* 페이지 타이틀 */}
          <div className="mx-auto mb-6 max-w-3xl">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl">
              견적서 조회
            </h1>
            <p className="text-muted-foreground mt-2">
              견적서의 상세 내용을 확인하실 수 있습니다.
            </p>
          </div>

          {/* 견적서 콘텐츠 */}
          <div className="mx-auto max-w-3xl space-y-8">
            {/* 견적서 헤더 */}
            <InvoiceHeader invoice={invoiceData} />

            {/* 클라이언트 정보 */}
            <InvoiceClientInfo invoice={invoiceData} />

            {/* 견적 항목 테이블 */}
            <InvoiceTable items={invoiceData.items} />

            {/* 총액 요약 */}
            <InvoiceSummary invoice={invoiceData} />

            {/* 구분선 */}
            <Separator className="my-8" />

            {/* 액션 버튼 영역 */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PDFDownloadButton invoice={invoiceData} size="lg" />
            </div>

            {/* 안내 메시지 */}
            <div className="bg-card text-muted-foreground rounded-lg border p-4 text-center text-sm">
              <p>
                견적서에 대한 문의사항이 있으시면 발행자에게 직접 연락해 주세요.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

/**
 * 견적서 페이지
 *
 * Suspense를 사용하여 점진적 로딩을 구현
 * 데이터 로딩 중에는 InvoiceSkeleton을 표시하고,
 * 로딩 완료 후 실제 견적서 콘텐츠를 렌더링
 */
export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoiceContent id={id} />
    </Suspense>
  )
}
