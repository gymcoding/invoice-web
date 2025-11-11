'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Share2, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
}

/**
 * 링크 공유 버튼 컴포넌트 (Client Component)
 * 이메일, 텔레그램 등 다양한 공유 옵션 제공
 */
export function ShareButton({ url, title, description }: ShareButtonProps) {
  const shareViaEmail = () => {
    const subject = encodeURIComponent(`견적서: ${title}`)
    const body = encodeURIComponent(
      `${description || '견적서를 확인해주세요'}\n\n${url}`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const shareViaTelegram = () => {
    const text = encodeURIComponent(`${title}\n${url}`)
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 복사되었습니다')
    } catch {
      toast.error('복사에 실패했습니다')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">공유</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={shareViaEmail}>
          <Mail className="mr-2 h-4 w-4" />
          이메일로 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaTelegram}>
          <MessageCircle className="mr-2 h-4 w-4" />
          텔레그램으로 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          <Share2 className="mr-2 h-4 w-4" />
          링크 복사
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
