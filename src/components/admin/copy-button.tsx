'use client'

import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useClipboard } from '@/hooks/use-clipboard'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CopyButtonProps {
  text: string
  label?: string
}

/**
 * 링크 복사 버튼 컴포넌트 (Client Component)
 * 클립보드 API를 사용하여 텍스트 복사 기능 제공
 */
export function CopyButton({ text, label = '링크 복사' }: CopyButtonProps) {
  const { copy, isCopied } = useClipboard()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copy(text)}
            className="h-8 w-8"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? '복사됨!' : label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
