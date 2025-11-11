import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

/**
 * 견적서 페이지 로딩 UI
 * Next.js App Router의 loading.tsx는 자동으로 Suspense 경계를 생성합니다.
 * 서버 컴포넌트로 동작하며, 페이지 로딩 중 표시됩니다.
 * 실제 Invoice 페이지와 동일한 레이아웃 구조를 반영합니다.
 */
export default function InvoiceLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-muted/30 flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* 페이지 타이틀 스켈레톤 */}
          <div className="mb-6 space-y-2">
            <Skeleton className="h-9 w-40 sm:h-10" />
            <Skeleton className="h-5 w-64" />
          </div>

          {/* 견적서 콘텐츠 */}
          <div className="mx-auto max-w-5xl space-y-6">
            {/* InvoiceHeader 스켈레톤 */}
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <Skeleton className="h-8 w-48 sm:h-9" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* 발행일 스켈레톤 */}
                  <div className="flex items-start gap-3">
                    <Skeleton className="mt-0.5 h-5 w-5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>

                  {/* 유효기간 스켈레톤 */}
                  <div className="flex items-start gap-3">
                    <Skeleton className="mt-0.5 h-5 w-5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* InvoiceClientInfo 스켈레톤 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* InvoiceTable 스켈레톤 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                {/* 테이블 헤더 */}
                <div className="mb-4 grid grid-cols-12 gap-4 border-b pb-3">
                  <div className="col-span-5">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="mx-auto h-4 w-12" />
                  </div>
                  <div className="col-span-2 text-right">
                    <Skeleton className="ml-auto h-4 w-16" />
                  </div>
                  <div className="col-span-3 text-right">
                    <Skeleton className="ml-auto h-4 w-12" />
                  </div>
                </div>

                {/* 테이블 행 스켈레톤 (3개) */}
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="grid grid-cols-12 gap-4">
                      <div className="col-span-5 space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                      <div className="col-span-2 text-center">
                        <Skeleton className="mx-auto h-4 w-8" />
                      </div>
                      <div className="col-span-2 text-right">
                        <Skeleton className="ml-auto h-4 w-20" />
                      </div>
                      <div className="col-span-3 text-right">
                        <Skeleton className="ml-auto h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* InvoiceSummary 스켈레톤 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* 소계 */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  {/* VAT */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Separator />
                  {/* 총액 */}
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 구분선 */}
            <Separator className="my-8" />

            {/* 액션 버튼 영역 스켈레톤 */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Skeleton className="h-11 w-full sm:w-48" />
            </div>

            {/* 안내 메시지 스켈레톤 */}
            <div className="rounded-lg border p-4">
              <Skeleton className="mx-auto h-4 w-80" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
