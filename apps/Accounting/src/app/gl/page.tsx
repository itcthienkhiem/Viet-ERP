'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Plus, Filter, Download, Search, BookOpen, ArrowRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const statusConfig: Record<string, { label: string; cls: string }> = {
  DRAFT: { label: 'Nháp', cls: 'bg-gray-100 text-gray-600' },
  PENDING: { label: 'Chờ duyệt', cls: 'bg-amber-100 text-amber-700' },
  APPROVED: { label: 'Đã duyệt', cls: 'bg-blue-100 text-blue-700' },
  POSTED: { label: 'Đã ghi sổ', cls: 'bg-emerald-100 text-emerald-700' },
  REVERSED: { label: 'Đã đảo', cls: 'bg-red-100 text-red-700' },
}

const journalTypes: Record<string, string> = {
  GENERAL: 'Tổng hợp', CASH_RECEIPT: 'Phiếu thu', CASH_PAYMENT: 'Phiếu chi',
  BANK_RECEIPT: 'Báo có NH', BANK_PAYMENT: 'Báo nợ NH', SALES: 'Bán hàng',
  PURCHASE: 'Mua hàng', PAYROLL: 'Bảng lương', DEPRECIATION: 'Khấu hao',
}

const tabs = ['Tất cả', 'Nháp', 'Chờ duyệt', 'Đã ghi sổ', 'Đã đảo']

export default function GLPage() {
  const [activeTab, setActiveTab] = useState('Tất cả')
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Sổ cái tổng hợp (GL)" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tổng bút toán', value: '0', sub: 'Tháng 4/2026', color: 'border-l-blue-500' },
            { label: 'Đã ghi sổ', value: '0', sub: 'Confirmed', color: 'border-l-emerald-500' },
            { label: 'Chờ duyệt', value: '0', sub: 'Pending', color: 'border-l-amber-500' },
            { label: 'Tổng phát sinh', value: '0 ₫', sub: 'Debit = Credit', color: 'border-l-purple-500' },
          ].map((s) => (
            <div key={s.label} className={cn('stat-card border-l-4', s.color)}>
              <p className="text-xs text-[var(--acc-text-muted)]">{s.label}</p>
              <p className="text-xl font-bold text-[var(--acc-text-primary)] mt-1">{s.value}</p>
              <p className="text-[10px] text-[var(--acc-text-muted)] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Main table */}
        <div className="glass-card overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)] gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--acc-text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Danh sách bút toán</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--acc-text-muted)]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm bút toán..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] bg-[var(--acc-bg-card)] text-[var(--acc-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--acc-accent)] w-48"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Filter className="w-3.5 h-3.5" /> Lọc
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Download className="w-3.5 h-3.5" /> Xuất
              </button>
              <Link href="/gl/new" className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[var(--acc-accent)] text-white hover:opacity-90 transition-opacity font-medium">
                <Plus className="w-3.5 h-3.5" /> Tạo bút toán
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-4 pt-3 border-b border-[var(--glass-border)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors -mb-px',
                  activeTab === tab
                    ? 'bg-[var(--acc-bg-card)] border border-b-[var(--acc-bg-card)] border-[var(--acc-border)] text-[var(--acc-accent)]'
                    : 'text-[var(--acc-text-muted)] hover:text-[var(--acc-text-primary)]'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-acc">
              <thead>
                <tr>
                  <th>Số bút toán</th>
                  <th>Ngày</th>
                  <th>Loại</th>
                  <th>Diễn giải</th>
                  <th className="text-right">Tổng Nợ</th>
                  <th className="text-right">Tổng Có</th>
                  <th>Nguồn</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="text-center py-12">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-[var(--acc-text-muted)] opacity-30" />
                    <p className="text-sm text-[var(--acc-text-muted)]">Chưa có bút toán nào</p>
                    <p className="text-xs text-[var(--acc-text-muted)] mt-1">Tạo bút toán đầu tiên để bắt đầu</p>
                    <Link href="/gl/new" className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs rounded-md bg-[var(--acc-accent)] text-white hover:opacity-90 transition-opacity font-medium">
                      <Plus className="w-3.5 h-3.5" /> Tạo bút toán mới
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart of Accounts quick view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[var(--acc-text-primary)]">Hệ thống tài khoản TT200</h3>
              <Link href="/gl/accounts" className="text-xs text-[var(--acc-accent)] flex items-center gap-1 hover:underline">
                Xem đầy đủ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-1.5">
              {[
                { code: 'Loại 1', name: 'Tài sản ngắn hạn', accounts: '111, 112, 113, 121, 131, 141, 151, 152, 153, 154, 155, 156, 157, 158' },
                { code: 'Loại 2', name: 'Tài sản dài hạn', accounts: '211, 212, 213, 214, 217, 221, 222, 228, 241, 242, 243, 244' },
                { code: 'Loại 3', name: 'Nợ phải trả', accounts: '311, 315, 331, 333, 334, 335, 336, 337, 338, 341, 343, 344, 347, 352, 353, 356, 357' },
                { code: 'Loại 4', name: 'Vốn chủ sở hữu', accounts: '411, 412, 413, 414, 415, 417, 418, 419, 421, 422, 441, 461, 466' },
                { code: 'Loại 5', name: 'Doanh thu', accounts: '511, 512, 515, 521' },
                { code: 'Loại 6', name: 'Chi phí SXKD', accounts: '611, 621, 622, 623, 627, 631, 632, 635, 641, 642' },
                { code: 'Loại 7', name: 'Thu nhập khác', accounts: '711' },
                { code: 'Loại 8', name: 'Chi phí khác', accounts: '811, 821' },
                { code: 'Loại 9', name: 'Xác định KQKD', accounts: '911' },
              ].map((g) => (
                <div key={g.code} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--acc-bg-hover)] transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-blue-600 w-14 shrink-0">{g.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--acc-text-primary)]">{g.name}</p>
                    <p className="text-[10px] text-[var(--acc-text-muted)] truncate">{g.accounts}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-[var(--acc-text-primary)] mb-3">Kỳ kế toán 2026</h3>
            <div className="space-y-2">
              {Array.from({ length: 12 }, (_, i) => ({
                month: i + 1,
                name: `Tháng ${i + 1}/2026`,
                status: i < 3 ? 'closed' : i === 3 ? 'open' : 'future',
                entries: i < 3 ? 0 : 0,
              })).map((p) => (
                <div key={p.month} className={cn(
                  'flex items-center justify-between p-2.5 rounded-lg border transition-colors',
                  p.status === 'open' ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800' :
                  p.status === 'closed' ? 'border-[var(--acc-border-subtle)] bg-[var(--acc-bg-hover)]' :
                  'border-[var(--acc-border-subtle)]'
                )}>
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs font-medium', p.status === 'open' ? 'text-emerald-700' : 'text-[var(--acc-text-secondary)]')}>
                      {p.name}
                    </span>
                    {p.status === 'open' && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Hiện tại</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[var(--acc-text-muted)]">{p.entries} bút toán</span>
                    <span className={cn('text-[10px] font-medium',
                      p.status === 'closed' ? 'text-gray-500' :
                      p.status === 'open' ? 'text-emerald-600' : 'text-[var(--acc-text-muted)]'
                    )}>
                      {p.status === 'closed' ? 'Đã đóng' : p.status === 'open' ? 'Đang mở' : 'Chưa mở'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
