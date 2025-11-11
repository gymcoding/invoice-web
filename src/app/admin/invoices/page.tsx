import {
  getInvoicesFromNotion,
  searchInvoices,
  type InvoiceFilters,
} from '@/lib/services/invoice.service'
import { InvoiceTable } from '@/components/admin/invoice-table'
import { Pagination } from '@/components/admin/pagination'
import { SearchBar } from '@/components/admin/search-bar'
import { FilterPanel } from '@/components/admin/filter-panel'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import type { InvoiceStatus } from '@/types/invoice'

interface InvoicesPageProps {
  searchParams: Promise<{
    page?: string
    sort?: 'issue_date' | 'total_amount'
    cursor?: string
    query?: string
    status?: InvoiceStatus
    dateFrom?: string
    dateTo?: string
  }>
}

/**
 * 견적서 목록 콘텐츠 컴포넌트
 * Server Component로 데이터 페칭 수행
 */
async function InvoiceListContent({
  page,
  sort,
  cursor,
  filters,
}: {
  page: number
  sort?: 'issue_date' | 'total_amount'
  cursor?: string
  filters: InvoiceFilters
}) {
  // 필터가 있으면 searchInvoices, 없으면 getInvoicesFromNotion
  const hasFilters = !!(
    filters.query ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo
  )

  const { invoices, nextCursor, hasMore } = hasFilters
    ? await searchInvoices(filters, 10, cursor)
    : await getInvoicesFromNotion(10, cursor, sort)

  if (invoices.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {hasFilters ? '검색 결과가 없습니다' : '견적서가 없습니다'}
          </p>
          {!hasFilters && (
            <p className="text-muted-foreground mt-2 text-sm">
              Notion에 견적서를 추가해주세요
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <InvoiceTable invoices={invoices} currentSort={sort} />
      <Pagination
        currentPage={page}
        hasNext={hasMore}
        nextCursor={nextCursor}
      />
    </div>
  )
}

/**
 * 로딩 스켈레톤 UI
 */
function InvoiceTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  )
}

/**
 * 견적서 목록 페이지
 * 관리자가 발행한 모든 견적서를 조회하고 관리할 수 있는 페이지
 */
export default async function InvoicesPage({
  searchParams,
}: InvoicesPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const sort = params.sort
  const cursor = params.cursor

  // 검색 및 필터 파라미터 추출
  const filters: InvoiceFilters = {
    query: params.query,
    status: params.status,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">견적서 목록</h1>
        <p className="text-muted-foreground mt-2">
          발행한 모든 견적서를 확인하고 관리할 수 있습니다
        </p>
      </div>

      {/* 검색 및 필터 UI */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar defaultValue={filters.query} />
        <FilterPanel
          defaultStatus={filters.status}
          defaultDateFrom={filters.dateFrom}
          defaultDateTo={filters.dateTo}
        />
      </div>

      {/* 견적서 테이블 (Suspense로 래핑) */}
      <Suspense fallback={<InvoiceTableSkeleton />}>
        <InvoiceListContent
          page={page}
          sort={sort}
          cursor={cursor}
          filters={filters}
        />
      </Suspense>
    </div>
  )
}
