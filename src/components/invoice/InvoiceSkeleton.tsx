import { Skeleton } from '@/components/ui/skeleton'
import { Footer } from '@/components/layout/footer'

/**
 * 견적서 페이지 로딩 중 표시되는 스켈레톤 UI
 *
 * 실제 견적서 레이아웃과 동일한 구조로 스켈레톤을 배치하여
 * 로딩 상태에서도 일관된 사용자 경험 제공
 */
export function InvoiceSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-muted/30 flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* 페이지 타이틀 스켈레톤 */}
          <div className="mx-auto mb-6 max-w-3xl">
            <Skeleton className="h-10 w-48 sm:h-12" />
            <Skeleton className="mt-2 h-6 w-96" />
          </div>

          {/* 견적서 콘텐츠 스켈레톤 */}
          <div className="mx-auto max-w-3xl space-y-8">
            {/* 견적서 헤더 스켈레톤 */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <Skeleton className="h-8 w-32" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-36" />
              </div>
            </div>

            {/* 클라이언트 정보 스켈레톤 */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            </div>

            {/* 견적 항목 테이블 스켈레톤 */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 space-y-4">
                {/* 테이블 헤더 */}
                <div className="grid grid-cols-12 gap-4">
                  <Skeleton className="col-span-5 h-5" />
                  <Skeleton className="col-span-2 h-5" />
                  <Skeleton className="col-span-2 h-5" />
                  <Skeleton className="col-span-3 h-5" />
                </div>
                {/* 테이블 행 (3개) */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4">
                    <Skeleton className="col-span-5 h-6" />
                    <Skeleton className="col-span-2 h-6" />
                    <Skeleton className="col-span-2 h-6" />
                    <Skeleton className="col-span-3 h-6" />
                  </div>
                ))}
              </div>
            </div>

            {/* 총액 요약 스켈레톤 */}
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-7 w-28" />
                    <Skeleton className="h-7 w-40" />
                  </div>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <Skeleton className="my-8 h-px w-full" />

            {/* 액션 버튼 영역 스켈레톤 */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Skeleton className="h-12 w-48" />
            </div>

            {/* 안내 메시지 스켈레톤 */}
            <div className="bg-card rounded-lg border p-4">
              <Skeleton className="mx-auto h-5 w-96" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
