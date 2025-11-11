/**
 * 로그아웃 버튼 컴포넌트
 * Client Component (버튼 클릭 이벤트 처리)
 */

'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

/**
 * 로그아웃 버튼
 */
export function LogoutButton() {
  const router = useRouter()

  /**
   * 로그아웃 핸들러
   */
  async function handleLogout() {
    try {
      await logoutAction()
      toast.success('로그아웃되었습니다')
      router.push('/admin-login')
      router.refresh()
    } catch {
      toast.error('로그아웃 중 오류가 발생했습니다')
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      로그아웃
    </Button>
  )
}
