/**
 * 관리자 네비게이션 사이드바
 * Client Component (활성 링크 하이라이팅)
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, FileText } from 'lucide-react'

/**
 * 네비게이션 항목 정의
 */
const navItems = [
  {
    href: '/admin',
    label: '대시보드',
    icon: Home,
  },
  {
    href: '/admin/invoices',
    label: '견적서 목록',
    icon: FileText,
  },
]

/**
 * 관리자 네비게이션 사이드바
 */
export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-muted/10 min-h-[calc(100vh-4rem)] w-64 border-r p-4">
      <ul className="space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
