/**
 * 비밀번호 검증 유틸리티
 */

import { env } from '@/lib/env'

/**
 * 입력된 비밀번호가 관리자 비밀번호와 일치하는지 확인
 * @param password - 검증할 비밀번호
 * @returns 비밀번호 일치 여부
 */
export function verifyPassword(password: string): boolean {
  return password === env.ADMIN_PASSWORD
}
