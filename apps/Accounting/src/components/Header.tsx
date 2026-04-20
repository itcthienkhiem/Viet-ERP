'use client'

import { Bell, Search, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Header({ title }: { title?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="h-11 flex items-center justify-between px-6 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shrink-0">
      <div className="flex items-center gap-3">
        {title && (
          <h1 className="text-sm font-semibold text-[var(--acc-text-primary)]">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--acc-text-muted)] text-xs hover:bg-[var(--acc-bg-hover)] transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tìm kiếm...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 rounded bg-[var(--acc-bg-hover)] text-[10px] font-mono">⌘K</kbd>
        </button>

        {/* Theme */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md text-[var(--acc-text-muted)] hover:text-[var(--acc-text-primary)] hover:bg-[var(--acc-bg-hover)] transition-colors"
        >
          {mounted ? (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />) : <span className="w-4 h-4 block" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-md text-[var(--acc-text-muted)] hover:text-[var(--acc-text-primary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--acc-bg-hover)] transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-[var(--acc-accent)]/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-[var(--acc-accent)]">KT</span>
          </div>
          <span className="hidden sm:inline text-sm text-[var(--acc-text-primary)] font-medium">Kế toán</span>
        </div>
      </div>
    </header>
  )
}
