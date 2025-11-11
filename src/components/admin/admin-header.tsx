/**
 * 관리자 페이지 헤더 컴포넌트
 */

import { LogoutButton } from './logout-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { FileText } from 'lucide-react'

/**
 * 관리자 헤더
 * 로고, 타이틀, 테마 토글, 로그아웃 버튼 포함
 */
export function AdminHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <FileText className="text-primary h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">견적서 관리 시스템</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
