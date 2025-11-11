/**
 * 로그인 Server Actions
 */

'use server'

import { verifyPassword } from '@/lib/auth/password'
import { createSession } from '@/lib/auth/session'

/**
 * Server Action 결과 타입
 */
interface ActionResult {
  success: boolean
  message: string
}

/**
 * 로그인 처리 Server Action
 * @param formData - 폼 데이터 (password 필드 포함)
 * @returns 로그인 성공/실패 결과
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  const password = formData.get('password') as string

  // 비밀번호 입력 검증
  if (!password) {
    return {
      success: false,
      message: '비밀번호를 입력해주세요',
    }
  }

  // 비밀번호 확인
  if (!verifyPassword(password)) {
    return {
      success: false,
      message: '비밀번호가 일치하지 않습니다',
    }
  }

  // 세션 생성
  await createSession()

  return {
    success: true,
    message: '로그인 성공',
  }
}
