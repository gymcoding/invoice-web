/**
 * 관리자 레이아웃
 * Server Component (세션 검증)
 */

import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminNav } from '@/components/admin/admin-nav'

/**
 * 관리자 레이아웃 Props
 */
interface AdminLayoutProps {
  children: React.ReactNode
}

/**
 * 관리자 레이아웃
 * 인증된 사용자만 접근 가능
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSession()

  // 세션이 없으면 로그인 페이지로 리다이렉트
  // (미들웨어에서도 체크하지만 이중 보안)
  if (!session) {
    redirect('/admin-login')
  }

  return (
    <div className="bg-background min-h-screen">
      <AdminHeader />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
