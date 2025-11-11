/**
 * 인증 관련 타입 정의
 */

/**
 * 로그인 폼 데이터
 */
export interface LoginFormData {
  password: string
}

/**
 * JWT 세션 페이로드
 */
export interface SessionPayload {
  /** 인증 상태 */
  isAuthenticated: boolean
  /** 로그인 시간 (Unix timestamp) */
  loginTime: number
}
