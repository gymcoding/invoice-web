import { Skeleton } from '@/components/ui/skeleton'

/**
 * 견적서 목록 로딩 UI
 * Suspense fallback으로 표시되는 스켈레톤
 */
export default function InvoicesLoading() {
  return (
    <div className="space-y-6">
      {/* 헤더 스켈레톤 */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />

        {/* 페이지네이션 스켈레톤 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}
