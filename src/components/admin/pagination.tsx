'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  /** 현재 페이지 번호 */
  currentPage: number
  /** 다음 페이지 존재 여부 */
  hasNext: boolean
  /** 다음 페이지 커서 */
  nextCursor: string | null
}

/**
 * 페이지네이션 컴포넌트
 * URL 쿼리 파라미터를 통해 페이지 상태 관리
 */
export function Pagination({
  currentPage,
  hasNext,
  nextCursor,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * 페이지 이동 핸들러
   * @param page - 이동할 페이지 번호
   * @param cursor - Notion API 커서 (선택사항)
   */
  function goToPage(page: number, cursor?: string) {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))

    if (cursor) {
      params.set('cursor', cursor)
    } else {
      params.delete('cursor')
    }

    router.push(`?${params.toString()}`)
  }

  /**
   * 이전 페이지로 이동
   * 커서를 제거하고 페이지 번호만 감소
   */
  function handlePrevious() {
    goToPage(currentPage - 1)
  }

  /**
   * 다음 페이지로 이동
   * Notion API의 next_cursor를 사용
   */
  function handleNext() {
    if (nextCursor) {
      goToPage(currentPage + 1, nextCursor)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground text-sm">페이지 {currentPage}</p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          이전
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!hasNext}
        >
          다음
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
