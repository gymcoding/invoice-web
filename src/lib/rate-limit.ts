/**
 * Rate Limiting 유틸리티
 * in-memory Map을 사용한 간단한 Rate Limiting 구현
 * API 엔드포인트 보호를 위해 분당 요청 수를 제한합니다.
 */

/**
 * Rate Limit 기록 인터페이스
 */
interface RateLimitRecord {
  /** 현재 윈도우에서의 요청 횟수 */
  count: number
  /** 윈도우 초기화 시간 (타임스탬프) */
  resetTime: number
}

/**
 * IP별 요청 기록을 저장하는 Map
 * Key: IP 주소
 * Value: RateLimitRecord
 */
const requestMap = new Map<string, RateLimitRecord>()

/**
 * 메모리 누수 방지를 위한 주기적 정리
 * 1분마다 만료된 기록 삭제
 */
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of requestMap.entries()) {
    if (now > record.resetTime) {
      requestMap.delete(key)
    }
  }
}, 60000) // 1분마다 실행

/**
 * Rate Limit 검사 결과 인터페이스
 */
interface RateLimitResult {
  /** 요청 허용 여부 */
  allowed: boolean
  /** 남은 요청 횟수 */
  remaining: number
  /** 거부 시 재시도 가능 시간 (초) */
  retryAfter?: number
}

/**
 * Rate Limiting 검사
 *
 * @param identifier - 식별자 (주로 IP 주소)
 * @param limit - 최대 요청 횟수 (기본값: 10)
 * @param windowMs - 시간 윈도우 (밀리초, 기본값: 60000 = 1분)
 * @returns RateLimitResult 객체
 *
 * @example
 * ```typescript
 * const result = checkRateLimit('192.168.1.1', 10, 60000)
 * if (!result.allowed) {
 *   return new Response('Too Many Requests', {
 *     status: 429,
 *     headers: { 'Retry-After': String(result.retryAfter) }
 *   })
 * }
 * ```
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now()
  const record = requestMap.get(identifier)

  // 기록이 없거나 윈도우가 만료된 경우 - 새 윈도우 시작
  if (!record || now > record.resetTime) {
    requestMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      allowed: true,
      remaining: limit - 1,
    }
  }

  // 제한 초과 검사
  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    }
  }

  // 요청 카운트 증가
  record.count++
  return {
    allowed: true,
    remaining: limit - record.count,
  }
}
