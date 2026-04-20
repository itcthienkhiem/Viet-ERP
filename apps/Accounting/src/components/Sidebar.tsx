'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, FileText, Receipt, CreditCard,
  Building2, PieChart, Calculator, Settings, ChevronLeft, ChevronRight,
  TrendingUp, Landmark, FileSpreadsheet, AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Tổng quan',
    items: [
      { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Sổ sách',
    items: [
      { href: '/gl', icon: BookOpen, label: 'Sổ cái (GL)' },
      { href: '/gl/accounts', icon: Calculator, label: 'Hệ thống TK' },
      { href: '/gl/periods', icon: FileSpreadsheet, label: 'Kỳ kế toán' },
    ],
  },
  {
    label: 'Công nợ',
    items: [
      { href: '/ar', icon: TrendingUp, label: 'Phải thu (AR)' },
      { href: '/ap', icon: CreditCard, label: 'Phải trả (AP)' },
    ],
  },
  {
    label: 'Hóa đơn',
    items: [
      { href: '/einvoice', icon: Receipt, label: 'Hóa đơn điện tử' },
      { href: '/ar/new', icon: FileText, label: 'Tạo hóa đơn bán' },
      { href: '/ap/new', icon: FileText, label: 'Nhập hóa đơn mua' },
    ],
  },
  {
    label: 'Ngân hàng & Thuế',
    items: [
      { href: '/bank', icon: Landmark, label: 'Ngân hàng' },
      { href: '/tax', icon: Building2, label: 'Khai báo thuế' },
    ],
  },
  {
    label: 'Báo cáo',
    items: [
      { href: '/reports', icon: PieChart, label: 'Báo cáo tài chính' },
      { href: '/budget', icon: AlertCircle, label: 'Ngân sách' },
    ],
  },
  {
    label: 'Hệ thống',
    items: [
      { href: '/settings', icon: Settings, label: 'Cài đặt' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'sidebar-acc h-screen flex flex-col transition-all duration-200 shrink-0',
      collapsed ? 'w-[52px]' : 'w-[220px]'
    )}>
      {/* Logo */}
      <div className="h-11 flex items-center px-3 border-b border-[var(--glass-border)] shrink-0 gap-2">
        {!collapsed && (
          <span className="text-sm font-bold flex-1 pl-1 whitespace-nowrap">
            <span className="text-[var(--acc-text-primary)]">VietERP </span>
            <span className="text-[var(--acc-accent)]">Kế toán</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md text-[var(--acc-text-muted)] hover:text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 px-1.5 overflow-y-auto space-y-3">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--acc-text-muted)] px-2 mb-1">
                {group.label}
              </p>
            )}
            <div className="space-y-px">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'nav-item-acc',
                      collapsed && 'justify-center px-2',
                      isActive && 'active'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && !collapsed && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--acc-accent)] rounded-r-full" />
                    )}
                    <item.icon className="w-[17px] h-[17px] shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[var(--acc-bg-hover)]">
            <div className="w-6 h-6 rounded-full bg-[var(--acc-accent)]/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[var(--acc-accent)]">KT</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--acc-text-primary)] truncate">Kế toán viên</p>
              <p className="text-[10px] text-[var(--acc-text-muted)] truncate">VAS/IFRS</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
