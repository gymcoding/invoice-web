import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url()
    .optional()
    .default('http://localhost:3000'),
  NOTION_API_KEY: z
    .string()
    .min(1, 'NOTION_API_KEY는 필수입니다')
    .refine(
      key => key.startsWith('secret_') || key.startsWith('ntn_'),
      'NOTION_API_KEY는 "secret_" 또는 "ntn_"로 시작해야 합니다'
    ),
  NOTION_DATABASE_ID: z
    .string()
    .min(1, 'NOTION_DATABASE_ID는 필수입니다')
    .length(32, 'NOTION_DATABASE_ID는 32자여야 합니다'),
  // 관리자 인증 환경변수
  ADMIN_PASSWORD: z
    .string()
    .min(8, '관리자 비밀번호는 최소 8자 이상이어야 합니다'),
  SESSION_SECRET: z
    .string()
    .length(32, 'SESSION_SECRET은 정확히 32자여야 합니다'),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
})

// 프로덕션 환경 보안 검증
if (env.NODE_ENV === 'production') {
  // 기본 비밀번호 사용 금지
  const weakPasswords = [
    'admin1234',
    'admin123',
    'password',
    '12345678',
    'qwerty123',
  ]

  if (weakPasswords.includes(env.ADMIN_PASSWORD.toLowerCase())) {
    throw new Error(
      '프로덕션 환경에서 약한 기본 비밀번호를 사용할 수 없습니다. 강력한 비밀번호로 변경하세요.'
    )
  }

  // 기본 SESSION_SECRET 사용 금지
  if (env.SESSION_SECRET.includes('AlwrgLHiQyGEx01dnwmuPc0V')) {
    throw new Error(
      '프로덕션 환경에서 기본 SESSION_SECRET을 사용할 수 없습니다. 새로운 시크릿 키를 생성하세요.'
    )
  }
}

export type Env = z.infer<typeof envSchema>
