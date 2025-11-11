/**
 * JWT 기반 세션 관리 유틸리티
 * Next.js 15 내장 jose 라이브러리 사용
 */

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { env } from '@/lib/env'
import type { SessionPayload } from '@/types/auth'

/** JWT 암호화 키 (TextEncoder로 변환) */
const SECRET = new TextEncoder().encode(env.SESSION_SECRET)

/** 쿠키 이름 */
const COOKIE_NAME = 'admin_session'

/** 세션 만료 시간 (7일) */
const MAX_AGE = 7 * 24 * 60 * 60 // 604800초

/**
 * 새로운 관리자 세션 생성
 * JWT 토큰을 생성하고 httpOnly 쿠키에 저장
 */
export async function createSession(): Promise<void> {
  // JWT 토큰 생성
  const token = await new SignJWT({
    isAuthenticated: true,
    loginTime: Date.now(),
  } satisfies SessionPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)

  // 쿠키에 저장
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, // XSS 공격 방지
    secure: env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF 공격 방지
    maxAge: MAX_AGE,
    path: '/',
  })
}

/**
 * 현재 세션 정보 조회
 * @returns 세션 페이로드 또는 null (세션이 없거나 만료된 경우)
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as SessionPayload
  } catch {
    // JWT 검증 실패 (만료, 변조 등)
    return null
  }
}

/**
 * 세션 삭제 (로그아웃)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
