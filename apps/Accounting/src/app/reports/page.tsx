'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { PieChart, Download, FileText, ArrowRight, BarChart3, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const reports = [
  {
    code: 'B01-DN', name: 'Bảng cân đối kế toán', nameEn: 'Balance Sheet',
    desc: 'Tài sản, Nợ phải trả, Vốn chủ sở hữu tại một thời điểm',
    href: '/reports/balance-sheet', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50',
  },
  {
    code: 'B02-DN', name: 'Báo cáo KQHĐKD', nameEn: 'Income Statement',
    desc: 'Doanh thu, Chi phí, Lợi nhuận trong kỳ',
    href: '/reports/income-statement', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50',
  },
  {
    code: 'B03-DN', name: 'Lưu chuyển tiền tệ', nameEn: 'Cash Flow Statement',
    desc: 'Dòng tiền từ HĐKD, đầu tư, tài chính',
    href: '/reports/cash-flow', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50',
  },
  {
    code: 'B09-DN', name: 'Thuyết minh BCTC', nameEn: 'Notes to Financial Statements',
    desc: 'Giải trình chi tiết các khoản mục BCTC',
    href: '/reports/notes', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50',
  },
  {
    code: 'IFRS', name: 'Báo cáo IFRS', nameEn: 'IFRS Financial Statements',
    desc: 'Báo cáo theo chuẩn mực quốc tế (Enterprise tier)',
    href: '/reports/ifrs', icon: BarChart3, color: 'text-cyan-600', bg: 'bg-cyan-50',
  },
  {
    code: 'VAT-SUM', name: 'Bảng kê thuế GTGT', nameEn: 'VAT Summary',
    desc: 'Tổng hợp thuế GTGT đầu vào, đầu ra',
    href: '/reports/vat', icon: FileText, color: 'text-red-600', bg: 'bg-red-50',
  },
  {
    code: 'AGING-AR', name: 'Tuổi nợ phải thu', nameEn: 'AR Aging Analysis',
    desc: 'Phân tích công nợ theo thời gian: 30/60/90/90+ ngày',
    href: '/reports/aging-ar', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50',
  },
  {
    code: 'AGING-AP', name: 'Tuổi nợ phải trả', nameEn: 'AP Aging Analysis',
    desc: 'Phân tích công nợ NCC theo thời gian',
    href: '/reports/aging-ap', icon: TrendingUp, color: 'text-pink-600', bg: 'bg-pink-50',
  },
  {
    code: 'TRIAL-BAL', name: 'Bảng cân đối số phát sinh', nameEn: 'Trial Balance',
    desc: 'Số dư đầu kỳ, phát sinh, số dư cuối kỳ tất cả tài khoản',
    href: '/reports/trial-balance', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50',
  },
  {
    code: 'GL-DETAIL', name: 'Sổ chi tiết tài khoản', nameEn: 'GL Detail',
    desc: 'Chi tiết phát sinh từng tài khoản trong kỳ',
    href: '/reports/gl-detail', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50',
  },
]

const periods = ['Tháng 4/2026', 'Tháng 3/2026', 'Quý 1/2026', 'Năm 2025', 'Tùy chọn...']

export default function ReportsPage() {
  const [period, setPeriod] = useState('Tháng 4/2026')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Báo cáo tài chính" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Period selector */}
        <div className="glass-card p-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[var(--acc-text-muted)]" />
            <span className="text-sm font-medium text-[var(--acc-text-primary)]">Kỳ báo cáo:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={cn('px-3 py-1.5 text-xs rounded-md border transition-colors font-medium',
                  period === p
                    ? 'bg-[var(--acc-accent)] text-white border-[var(--acc-accent)]'
                    : 'border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)]'
                )}>
                {p}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
              <Download className="w-3.5 h-3.5" /> Xuất Excel
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">
              <Download className="w-3.5 h-3.5" /> Xuất PDF
            </button>
          </div>
        </div>

        {/* Report cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((r) => (
            <Link key={r.code} href={r.href} className="glass-card p-5 group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={cn('p-2 rounded-lg', r.bg)}>
                  <r.icon className={cn('w-5 h-5', r.color)} />
                </div>
                <span className="text-[10px] font-bold bg-[var(--acc-bg-hover)] text-[var(--acc-text-muted)] px-2 py-0.5 rounded">{r.code}</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--acc-text-primary)] mb-1">{r.name}</h3>
              <p className="text-[10px] text-[var(--acc-text-muted)] mb-1">{r.nameEn}</p>
              <p className="text-xs text-[var(--acc-text-secondary)] leading-relaxed">{r.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-[var(--acc-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                Xem báo cáo <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* VAS compliance note */}
        <div className="glass-card p-4">
          <h3 className="text-xs font-semibold text-[var(--acc-text-muted)] uppercase tracking-wider mb-3">Chuẩn mực áp dụng</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { code: 'TT200', name: 'Thông tư 200/2014', desc: 'Doanh nghiệp lớn', color: 'text-blue-600 bg-blue-50' },
              { code: 'TT133', name: 'Thông tư 133/2016', desc: 'Doanh nghiệp vừa và nhỏ', color: 'text-emerald-600 bg-emerald-50' },
              { code: 'NĐ123', name: 'Nghị định 123/2020', desc: 'Hóa đơn điện tử', color: 'text-purple-600 bg-purple-50' },
              { code: 'IFRS', name: 'IFRS Standards', desc: 'Báo cáo quốc tế', color: 'text-amber-600 bg-amber-50' },
            ].map((s) => (
              <div key={s.code} className={cn('p-3 rounded-lg', s.color.split(' ')[1])}>
                <span className={cn('text-xs font-bold', s.color.split(' ')[0])}>{s.code}</span>
                <p className="text-xs font-medium text-[var(--acc-text-primary)] mt-1">{s.name}</p>
                <p className="text-[10px] text-[var(--acc-text-muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
