/**
 * 관리자 로그인 페이지
 * Client Component (폼 상호작용을 위해)
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { loginAction } from './actions'
import { toast } from 'sonner'
import { Lock } from 'lucide-react'

/**
 * 로그인 페이지 컴포넌트
 */
export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  /**
   * 폼 제출 핸들러
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('password', password)

    try {
      const result = await loginAction(formData)

      if (result.success) {
        toast.success(result.message)
        router.push('/admin')
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('로그인 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-2 flex items-center justify-center">
            <div className="bg-primary/10 rounded-full p-3">
              <Lock className="text-primary h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">관리자 로그인</CardTitle>
          <p className="text-muted-foreground text-center text-sm">
            견적서 관리 시스템에 접속하려면 비밀번호를 입력하세요
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
