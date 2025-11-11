/**
 * 필터 패널 컴포넌트
 * 견적서 상태, 발행일 범위로 필터링할 수 있는 Popover 기반 필터 패널
 * URL 쿼리 파라미터로 필터 상태를 유지합니다.
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Filter, X } from 'lucide-react'
import type { InvoiceStatus } from '@/types/invoice'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface FilterPanelProps {
  defaultStatus?: InvoiceStatus
  defaultDateFrom?: string
  defaultDateTo?: string
}

export function FilterPanel({
  defaultStatus,
  defaultDateFrom,
  defaultDateTo,
}: FilterPanelProps) {
  const [status, setStatus] = useState<InvoiceStatus | 'all'>(
    defaultStatus || 'all'
  )
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    defaultDateFrom ? new Date(defaultDateFrom) : undefined
  )
  const [dateTo, setDateTo] = useState<Date | undefined>(
    defaultDateTo ? new Date(defaultDateTo) : undefined
  )

  const router = useRouter()
  const searchParams = useSearchParams()

  function applyFilters() {
    const params = new URLSearchParams(searchParams)

    if (status !== 'all') {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    if (dateFrom) {
      params.set('dateFrom', format(dateFrom, 'yyyy-MM-dd'))
    } else {
      params.delete('dateFrom')
    }

    if (dateTo) {
      params.set('dateTo', format(dateTo, 'yyyy-MM-dd'))
    } else {
      params.delete('dateTo')
    }

    // 필터 변경 시 1페이지로 리셋
    params.delete('page')
    params.delete('cursor')

    router.push(`?${params.toString()}`)
  }

  function clearFilters() {
    setStatus('all')
    setDateFrom(undefined)
    setDateTo(undefined)

    const params = new URLSearchParams(searchParams)
    params.delete('status')
    params.delete('dateFrom')
    params.delete('dateTo')
    params.delete('page')
    params.delete('cursor')

    router.push(`?${params.toString()}`)
  }

  const hasActiveFilters = status !== 'all' || dateFrom || dateTo

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          필터
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground ml-1 rounded-full px-2 py-0.5 text-xs">
              {[status !== 'all', dateFrom, dateTo].filter(Boolean).length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">필터</h4>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                초기화
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">상태</label>
            <Select
              value={status}
              onValueChange={v => setStatus(v as InvoiceStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">대기</SelectItem>
                <SelectItem value="approved">승인</SelectItem>
                <SelectItem value="rejected">거절</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">발행일 (시작)</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {dateFrom
                    ? format(dateFrom, 'PPP', { locale: ko })
                    : '날짜 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">발행일 (종료)</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {dateTo ? format(dateTo, 'PPP', { locale: ko }) : '날짜 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={applyFilters} className="w-full">
            필터 적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
