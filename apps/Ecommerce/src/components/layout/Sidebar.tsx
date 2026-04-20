"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Tag,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavItem = {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dashboard",   icon: LayoutDashboard, label: "Dashboard" },
  { href: "/products",    icon: Package,         label: "Sản phẩm" },
  { href: "/orders",      icon: ShoppingCart,    label: "Đơn hàng" },
  { href: "/storefronts", icon: Store,           label: "Cửa hàng" },
  { href: "/promotions",  icon: Tag,             label: "Khuyến mãi" },
  { href: "/analytics",   icon: BarChart3,       label: "Báo cáo" },
  { href: "/settings",    icon: Settings,        label: "Cài đặt" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "sidebar-premium h-screen flex flex-col transition-all duration-200 shrink-0",
        expanded ? "w-[240px]" : "w-[60px]"
      )}
    >
      {/* Header: Logo + Collapse toggle */}
      <div className="h-11 flex items-center px-3 border-b border-[var(--glass-border)] shrink-0 gap-2">
        {expanded ? (
          <>
            <div className="w-7 h-7 rounded-lg bg-[rgba(var(--accent-rgb),0.15)] flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[var(--crm-accent-text)]">EC</span>
            </div>
            <span className="text-sm font-bold whitespace-nowrap flex-1 pl-0.5">
              <span className="text-[var(--crm-text-primary)]">Viet</span>
              <span className="text-[var(--crm-accent-text)]">Shop</span>
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="p-1.5 rounded-md text-[var(--crm-text-muted)] hover:text-[var(--crm-text-secondary)] hover:bg-[var(--crm-bg-subtle)] transition-colors"
              title="Thu gọn"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => setExpanded(true)}
              className="p-1.5 rounded-md text-[var(--crm-text-muted)] hover:text-[var(--crm-text-secondary)] hover:bg-[var(--crm-bg-subtle)] transition-colors"
              title="Mở rộng"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-1.5 space-y-px overflow-y-auto">
        {expanded && (
          <div className="section-label mt-0.5 mb-1">MENU</div>
        )}
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item relative",
                expanded ? "px-3 py-1.5" : "justify-center px-2 py-1.5",
                isActive && "active"
              )}
              title={!expanded ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[rgb(var(--accent-rgb))] rounded-r-full" />
              )}
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {expanded && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {expanded && (
        <div className="px-4 py-3 border-t border-[var(--glass-border)]">
          <p className="text-[10px] text-[var(--crm-text-muted)] font-mono">Port 3008</p>
        </div>
      )}
    </aside>
  );
}
