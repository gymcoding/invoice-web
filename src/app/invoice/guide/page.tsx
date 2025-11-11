import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, FileText, Download } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold">견적서 조회 시스템</h1>
              <p className="text-muted-foreground text-lg">
                노션 기반 견적서 관리 시스템에 오신 것을 환영합니다
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  견적서 조회 방법
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">1. 견적서 링크 받기</h3>
                  <p className="text-muted-foreground text-sm">
                    발행자로부터 이메일이나 메신저를 통해 견적서 고유 링크를
                    받습니다.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">2. 견적서 확인</h3>
                  <p className="text-muted-foreground text-sm">
                    링크를 클릭하면 견적서 내용을 웹에서 바로 확인할 수
                    있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">3. PDF 다운로드</h3>
                  <p className="text-muted-foreground text-sm">
                    견적서 페이지에서 &apos;PDF 다운로드&apos; 버튼을 클릭하여
                    파일로 저장하거나 인쇄할 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  견적서 URL 예시
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="bg-muted block rounded-md p-3 text-sm">
                  https://yourdomain.com/invoice/[견적서ID]
                </code>
                <p className="text-muted-foreground mt-2 text-sm">
                  발행자가 보낸 링크의 [견적서ID] 부분은 각 견적서마다 고유한
                  값입니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  문제가 있나요?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  견적서를 찾을 수 없거나 문제가 발생한 경우, 견적서를 발행한
                  담당자에게 올바른 링크를 다시 요청해 주세요.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
