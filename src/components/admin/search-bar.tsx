/**
 * 검색바 컴포넌트
 * 클라이언트명 또는 견적서 번호를 실시간으로 검색합니다.
 * useDebounce로 300ms 디바운싱을 적용하여 성능을 최적화합니다.
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDebounceValue } from 'usehooks-ts'

interface SearchBarProps {
  defaultValue?: string
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const [debouncedQuery] = useDebounceValue(query, 300) // 300ms 디바운싱
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedQuery) {
      params.set('query', debouncedQuery)
    } else {
      params.delete('query')
    }

    // 검색 시 1페이지로 리셋
    params.delete('page')
    params.delete('cursor')

    router.push(`?${params.toString()}`)
  }, [debouncedQuery, router, searchParams])

  function handleClear() {
    setQuery('')
  }

  return (
    <div className="relative w-full sm:w-96">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="클라이언트명 또는 견적서 번호 검색..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="pr-10 pl-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
