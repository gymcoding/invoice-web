/**
 * 구조화된 로깅 시스템
 * 프로덕션과 개발 환경을 구분하여 로그를 출력하고, 민감 정보를 자동으로 마스킹합니다.
 */

/**
 * 로그 레벨 타입
 */
type LogLevel = 'info' | 'warn' | 'error'

/**
 * 로그 엔트리 인터페이스
 */
interface LogEntry {
  /** ISO 8601 형식의 타임스탬프 */
  timestamp: string
  /** 로그 레벨 */
  level: LogLevel
  /** 로그 메시지 */
  message: string
  /** 추가 컨텍스트 정보 (선택) */
  context?: Record<string, unknown>
  /** 에러 객체 (선택) */
  error?: {
    name: string
    message: string
    stack?: string
  }
}

/**
 * 민감 정보를 포함할 수 있는 키워드 목록
 */
const SENSITIVE_KEYS = [
  'apikey',
  'api_key',
  'password',
  'token',
  'secret',
  'auth',
  'credential',
  'private',
] as const

/**
 * 컨텍스트에서 민감 정보 마스킹
 * API 키, 비밀번호 등 민감한 정보를 [REDACTED]로 치환합니다.
 *
 * @param context - 원본 컨텍스트 객체
 * @returns 마스킹된 컨텍스트 객체
 *
 * @example
 * ```typescript
 * sanitizeContext({ apiKey: '12345', name: 'John' })
 * // { apiKey: '[REDACTED]', name: 'John' }
 * ```
 */
function sanitizeContext(
  context?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!context) return undefined

  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(context)) {
    // 키가 민감 정보 키워드를 포함하는지 확인 (대소문자 무시)
    const isSensitive = SENSITIVE_KEYS.some(sensitiveKey =>
      key.toLowerCase().includes(sensitiveKey)
    )

    sanitized[key] = isSensitive ? '[REDACTED]' : value
  }

  return sanitized
}

/**
 * 에러 객체를 직렬화 가능한 형태로 변환
 *
 * @param error - Error 객체
 * @returns 직렬화된 에러 정보
 */
function serializeError(error: Error): LogEntry['error'] {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  }
}

/**
 * 구조화된 로그 출력
 *
 * @param level - 로그 레벨
 * @param message - 로그 메시지
 * @param context - 추가 컨텍스트 정보
 * @param error - 에러 객체 (선택)
 *
 * @example
 * ```typescript
 * log('info', '사용자 로그인', { userId: '123' })
 * log('error', 'API 호출 실패', { endpoint: '/api/users' }, new Error('Timeout'))
 * ```
 */
export function log(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context: sanitizeContext(context),
  }

  // 에러 객체가 있으면 직렬화하여 추가
  if (error) {
    entry.error = serializeError(error)
  }

  // 프로덕션 환경: JSON 형식으로 출력 (로그 수집 도구 호환)
  if (process.env.NODE_ENV === 'production') {
    console[level](JSON.stringify(entry))
  } else {
    // 개발 환경: 가독성 있는 포맷으로 출력
    const timestamp = entry.timestamp
    const levelUpper = level.toUpperCase().padEnd(5)

    console[level](`[${timestamp}] ${levelUpper}: ${message}`)

    if (entry.context && Object.keys(entry.context).length > 0) {
      console[level]('  Context:', entry.context)
    }

    if (entry.error) {
      console[level]('  Error:', entry.error)
    }
  }
}

/**
 * 편의 함수가 포함된 Logger 객체
 */
export const logger = {
  /**
   * 정보성 로그
   * @param message - 로그 메시지
   * @param context - 추가 컨텍스트 (선택)
   */
  info: (message: string, context?: Record<string, unknown>) => {
    log('info', message, context)
  },

  /**
   * 경고 로그
   * @param message - 로그 메시지
   * @param context - 추가 컨텍스트 (선택)
   */
  warn: (message: string, context?: Record<string, unknown>) => {
    log('warn', message, context)
  },

  /**
   * 에러 로그
   * @param message - 로그 메시지
   * @param context - 추가 컨텍스트 (선택)
   * @param error - Error 객체 (선택)
   */
  error: (
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ) => {
    log('error', message, context, error)
  },
}
