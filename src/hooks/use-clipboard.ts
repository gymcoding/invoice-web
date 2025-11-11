import { useState } from 'react'
import { toast } from 'sonner'

/**
 * 클립보드 복사 커스텀 훅
 * 브라우저 호환성을 고려한 폴백 로직 포함
 */
export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-999999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setIsCopied(true)
      toast.success('링크가 복사되었습니다')

      // 2초 후 아이콘 원래대로
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
      toast.error('복사에 실패했습니다')
    }
  }

  return { copy, isCopied }
}
