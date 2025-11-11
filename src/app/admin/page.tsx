/**
 * 관리자 대시보드 홈 페이지
 * Server Component
 */

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FileText, Users, Clock } from 'lucide-react'

/**
 * 관리자 대시보드 페이지
 */
export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-muted-foreground mt-2">
          견적서 관리 시스템에 오신 것을 환영합니다
        </p>
      </div>

      {/* 주요 기능 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">견적서 관리</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              발행한 모든 견적서를 확인하고 관리할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              클라이언트 관리
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              클라이언트 정보를 확인하고 관리할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최근 활동</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              최근 견적서 발행 및 승인 현황을 확인할 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 안내 메시지 */}
      <Card>
        <CardHeader>
          <CardTitle>시작하기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground text-sm">
            왼쪽 사이드바에서 <strong>견적서 목록</strong>을 클릭하여 모든
            견적서를 확인하세요.
          </p>
          <p className="text-muted-foreground text-sm">
            견적서를 검색하고 필터링하여 원하는 정보를 빠르게 찾을 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
