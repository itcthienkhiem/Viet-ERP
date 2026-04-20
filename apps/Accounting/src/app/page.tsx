'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import {
  TrendingUp, TrendingDown, BookOpen, Receipt, CreditCard,
  Building2, PieChart, Landmark, AlertCircle, ArrowRight,
  CheckCircle2, Clock, XCircle, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Tổng phải thu', value: '0 ₫', change: null, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-l-emerald-500' },
  { label: 'Tổng phải trả', value: '0 ₫', change: null, icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500' },
  { label: 'Doanh thu tháng', value: '0 ₫', change: null, icon: PieChart, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-l-blue-500' },
  { label: 'Chi phí tháng', value: '0 ₫', change: null, icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-l-amber-500' },
]

const modules = [
  { href: '/gl', icon: BookOpen, label: 'Sổ cái tổng hợp', desc: 'Bút toán, tài khoản TT200', color: 'text-blue-600', bg: 'bg-blue-50' },
  { href: '/ar', icon: TrendingUp, label: 'Công nợ phải thu', desc: 'Hóa đơn bán, thu tiền KH', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { href: '/ap', icon: CreditCard, label: 'Công nợ phải trả', desc: 'Hóa đơn mua, thanh toán NCC', color: 'text-red-600', bg: 'bg-red-50' },
  { href: '/einvoice', icon: Receipt, label: 'Hóa đơn điện tử', desc: 'NĐ 123/2020 + TT 78/2021', color: 'text-purple-600', bg: 'bg-purple-50' },
  { href: '/tax', icon: Building2, label: 'Khai báo thuế', desc: 'VAT, CIT, PIT — XML HTKK', color: 'text-amber-600', bg: 'bg-amber-50' },
  { href: '/bank', icon: Landmark, label: 'Ngân hàng', desc: 'Đối chiếu sao kê tự động', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { href: '/budget', icon: AlertCircle, label: 'Ngân sách', desc: 'Lập kế hoạch, theo dõi', color: 'text-lime-600', bg: 'bg-lime-50' },
  { href: '/reports', icon: PieChart, label: 'Báo cáo tài chính', desc: 'B01-DN, B02-DN, B03-DN, IFRS', color: 'text-pink-600', bg: 'bg-pink-50' },
]

const quickActions = [
  { label: '+ Bút toán mới', href: '/gl/new', variant: 'primary' },
  { label: '+ Hóa đơn bán', href: '/ar/new', variant: 'success' },
  { label: '+ Hóa đơn mua', href: '/ap/new', variant: 'danger' },
  { label: '+ Hóa đơn điện tử', href: '/einvoice/new', variant: 'purple' },
  { label: '📊 Báo cáo tháng', href: '/reports/monthly', variant: 'default' },
  { label: '🏛️ Khai thuế GTGT', href: '/tax/vat', variant: 'default' },
]

const variantStyles: Record<string, string> = {
  primary: 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100',
  danger: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100',
  default: 'bg-[var(--acc-bg-hover)] text-[var(--acc-text-secondary)] border border-[var(--acc-border)] hover:bg-[var(--acc-border)]',
}

const recentEntries = [
  { id: 'JV-2026-000001', date: '20/04/2026', desc: 'Bút toán mẫu', debit: '10,000,000', credit: '10,000,000', status: 'posted' },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Dashboard — Kế toán & Tài chính" />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={cn('stat-card border-l-4', s.border)}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--acc-text-muted)] mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-[var(--acc-text-primary)]">{s.value}</p>
                  <p className="text-xs text-[var(--acc-text-muted)] mt-1">Tháng 4/2026</p>
                </div>
                <div className={cn('p-2 rounded-lg', s.bg)}>
                  <s.icon className={cn('w-5 h-5', s.color)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Modules */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Modules kế toán</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {modules.map((m) => (
                <Link key={m.href} href={m.href} className="glass-card p-4 group cursor-pointer">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', m.bg)}>
                    <m.icon className={cn('w-5 h-5', m.color)} />
                  </div>
                  <p className="text-xs font-semibold text-[var(--acc-text-primary)] leading-tight">{m.label}</p>
                  <p className="text-[10px] text-[var(--acc-text-muted)] mt-1 leading-tight">{m.desc}</p>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-4">
              <h3 className="text-xs font-semibold text-[var(--acc-text-muted)] uppercase tracking-wider mb-3">Thao tác nhanh</h3>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((a) => (
                  <Link key={a.href} href={a.href} className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors', variantStyles[a.variant])}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Kỳ kế toán */}
            <div className="glass-card p-4">
              <h3 className="text-xs font-semibold text-[var(--acc-text-muted)] uppercase tracking-wider mb-3">Kỳ kế toán 2026</h3>
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <div key={m} className={cn(
                    'text-center py-1.5 rounded text-xs font-medium cursor-pointer transition-colors',
                    m === 4
                      ? 'bg-emerald-100 text-emerald-700 font-semibold ring-1 ring-emerald-400'
                      : m < 4
                        ? 'bg-[var(--acc-bg-hover)] text-[var(--acc-text-muted)]'
                        : 'text-[var(--acc-text-muted)] hover:bg-[var(--acc-bg-hover)]'
                  )}>
                    T{m}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[var(--acc-text-muted)] mt-2">● Kỳ hiện tại: Tháng 4/2026</p>
            </div>

            {/* Tax deadlines */}
            <div className="glass-card p-4">
              <h3 className="text-xs font-semibold text-[var(--acc-text-muted)] uppercase tracking-wider mb-3">Lịch nộp thuế</h3>
              <div className="space-y-2">
                {[
                  { date: '20/04', label: 'Thuế GTGT T3/2026', status: 'pending' },
                  { date: '30/04', label: 'Thuế TNDN Q1/2026', status: 'pending' },
                  { date: '20/04', label: 'Thuế TNCN T3/2026', status: 'pending' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--acc-bg-hover)] transition-colors">
                    <div className="w-10 text-center">
                      <p className="text-[10px] text-[var(--acc-text-muted)]">Hạn</p>
                      <p className="text-xs font-bold text-amber-600">{t.date}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--acc-text-primary)] truncate">{t.label}</p>
                    </div>
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* VAS Compliance */}
            <div className="rounded-lg p-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
              <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-2">✅ Tuân thủ VAS</h3>
              <div className="space-y-1">
                {['TT200/2014/TT-BTC', 'TT133/2016/TT-BTC', 'NĐ123/2020/NĐ-CP', 'IFRS Parallel'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Journal Entries */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
            <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Bút toán gần đây</h2>
            <Link href="/gl" className="text-xs text-[var(--acc-accent)] hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-acc">
              <thead>
                <tr>
                  <th>Số bút toán</th>
                  <th>Ngày</th>
                  <th>Diễn giải</th>
                  <th className="text-right">Nợ</th>
                  <th className="text-right">Có</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[var(--acc-text-muted)]">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>Chưa có bút toán nào</p>
                    </td>
                  </tr>
                ) : recentEntries.map((e) => (
                  <tr key={e.id}>
                    <td className="font-mono text-xs text-blue-600">{e.id}</td>
                    <td>{e.date}</td>
                    <td>{e.desc}</td>
                    <td className="text-right font-mono">{e.debit}</td>
                    <td className="text-right font-mono">{e.credit}</td>
                    <td>
                      <span className={cn('badge-acc', e.status === 'posted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                        {e.status === 'posted' ? 'Đã ghi sổ' : 'Nháp'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
