'use client'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

/**
 * 견적서 목록 에러 바운더리
 * 데이터 조회 실패 시 표시되는 에러 UI
 */
export default function InvoicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류가 발생했습니다</AlertTitle>
          <AlertDescription>
            {error.message || '견적서 목록을 불러오는 중 문제가 발생했습니다.'}
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            다시 시도
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <a href="/admin">관리자 홈으로</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
