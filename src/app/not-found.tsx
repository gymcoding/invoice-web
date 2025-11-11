import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home } from 'lucide-react'

/**
 * 전역 404 Not Found 페이지
 * Next.js App Router에서 notFound() 함수 호출 시 또는
 * 존재하지 않는 경로 접근 시 자동으로 렌더링됩니다.
 * 서버 컴포넌트로 동작합니다.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5" />
                  페이지를 찾을 수 없습니다
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 404 아이콘 및 숫자 */}
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <FileQuestion className="text-muted-foreground/40 h-24 w-24 sm:h-32 sm:w-32" />
                  </div>
                  <p className="text-muted-foreground/60 mb-2 text-8xl font-bold sm:text-9xl">
                    404
                  </p>
                  <p className="text-muted-foreground text-lg">
                    요청하신 페이지가 존재하지 않습니다.
                  </p>
                </div>

                {/* 확인 사항 */}
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="mb-2 font-semibold">확인 사항:</h3>
                  <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
                    <li>URL 주소가 정확한지 확인해 주세요</li>
                    <li>페이지가 삭제되었거나 이동되었을 수 있습니다</li>
                    <li>
                      북마크나 링크가 오래된 경우 업데이트가 필요할 수 있습니다
                    </li>
                  </ul>
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-center pt-2">
                  <Button asChild size="lg">
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
