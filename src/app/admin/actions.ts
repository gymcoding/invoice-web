/**
 * 관리자 페이지 공통 Server Actions
 */

'use server'

import { deleteSession } from '@/lib/auth/session'

/**
 * 로그아웃 처리 Server Action
 * 세션을 삭제하고 로그인 페이지로 리다이렉트
 */
export async function logoutAction(): Promise<void> {
  await deleteSession()
}
