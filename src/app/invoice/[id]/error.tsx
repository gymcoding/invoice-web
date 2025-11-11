'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { logger } from '@/lib/logger'

/**
 * 견적서 페이지 에러 바운더리
 * Next.js App Router의 error.tsx는 클라이언트 컴포넌트여야 합니다 ('use client' 필수).
 * 페이지 렌더링 중 발생한 에러를 캐치하여 사용자 친화적인 UI를 제공합니다.
 */
export default function InvoiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 구조화된 로깅으로 에러 기록
    logger.error('견적서 페이지 에러', {
      message: error.message,
      digest: error.digest,
    })
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <Card className="border-destructive mb-6">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertCircle className="h-6 w-6" />
                  견적서를 불러올 수 없습니다
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 에러 아이콘 */}
                <div className="flex justify-center">
                  <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
                    <AlertCircle className="text-destructive h-12 w-12" />
                  </div>
                </div>

                {/* 에러 메시지 */}
                <div className="bg-destructive/10 rounded-lg p-4">
                  <p className="text-sm font-medium">오류 내용:</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {error.message || '알 수 없는 오류가 발생했습니다.'}
                  </p>
                  {error.digest && (
                    <p className="text-muted-foreground mt-2 text-xs">
                      오류 ID: {error.digest}
                    </p>
                  )}
                </div>

                {/* 해결 방법 */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="mb-2 font-semibold">해결 방법:</h3>
                  <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
                    <li>페이지를 새로고침해 주세요</li>
                    <li>견적서 URL이 올바른지 확인해 주세요</li>
                    <li>잠시 후 다시 시도해 주세요</li>
                    <li>문제가 계속되면 관리자에게 문의해 주세요</li>
                  </ul>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={reset} size="lg" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    다시 시도
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="flex-1"
                  >
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      홈으로 돌아가기
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
