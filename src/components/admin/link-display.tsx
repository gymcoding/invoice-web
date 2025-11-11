import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LinkDisplayProps {
  url: string
  className?: string
}

/**
 * 견적서 링크 표시 컴포넌트 (Server Component)
 * 링크를 새 탭에서 열 수 있도록 표시
 */
export function LinkDisplay({ url, className }: LinkDisplayProps) {
  const displayUrl = url.length > 40 ? `${url.substring(0, 37)}...` : url

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-muted-foreground hover:text-foreground text-sm',
        'flex items-center gap-1 transition-colors',
        className
      )}
    >
      <span className="max-w-[200px] truncate">{displayUrl}</span>
      <ExternalLink className="h-3 w-3 flex-shrink-0" />
    </a>
  )
}
