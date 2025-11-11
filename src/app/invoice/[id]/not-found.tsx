import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertCircle className="h-6 w-6" />
                  견적서를 찾을 수 없습니다
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  요청하신 견적서가 존재하지 않거나 삭제되었을 수 있습니다.
                </p>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="mb-2 font-semibold">해결 방법:</h3>
                  <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
                    <li>견적서 링크가 정확한지 다시 확인해 주세요</li>
                    <li>견적서를 발행한 담당자에게 올바른 링크를 요청하세요</li>
                    <li>링크가 만료되지 않았는지 확인해 주세요</li>
                  </ul>
                </div>

                <Button asChild className="w-full">
                  <Link href="/invoice/guide">안내 페이지로 돌아가기</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
