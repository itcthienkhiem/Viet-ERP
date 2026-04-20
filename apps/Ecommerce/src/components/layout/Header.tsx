"use client";

import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-11 flex items-center justify-between px-6 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--crm-border)] shrink-0">
      {/* Left: Search */}
      <div className="flex items-center gap-2">
        <button className="input-premium flex items-center gap-2 px-3 text-sm" style={{ paddingTop: 3, paddingBottom: 3 }}>
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tìm kiếm...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-4 px-1.5 py-0.5 rounded bg-[var(--crm-bg-subtle)] text-[10px] font-mono text-[var(--crm-text-muted)]">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] hover:bg-[var(--crm-bg-subtle)]"
        >
          <Bell className="w-[18px] h-[18px]" />
        </Button>

        {/* User avatar */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--crm-bg-subtle)] transition-colors">
          <div className="w-7 h-7 rounded-full bg-[rgba(var(--accent-rgb),0.15)] flex items-center justify-center">
            <User className="w-4 h-4 text-[var(--crm-accent-text)]" />
          </div>
          <span className="hidden sm:inline text-sm text-[var(--crm-text-primary)] font-medium">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
