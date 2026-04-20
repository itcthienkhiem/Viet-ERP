'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Plus, Filter, Download, Search, Receipt, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const tabs = ['Tất cả', 'Nháp', 'Đã ký số', 'Đã gửi', 'CQT chấp nhận', 'CQT từ chối', 'Đã hủy']

const statusConfig: Record<string, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  DRAFT: { label: 'Nháp', cls: 'bg-gray-100 text-gray-600', icon: FileText },
  SIGNED: { label: 'Đã ký số', cls: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
  TRANSMITTED: { label: 'Đã truyền CQT', cls: 'bg-purple-100 text-purple-700', icon: Clock },
  ACCEPTED: { label: 'CQT chấp nhận', cls: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  REJECTED: { label: 'CQT từ chối', cls: 'bg-red-100 text-red-700', icon: XCircle },
  CANCELLED: { label: 'Đã hủy', cls: 'bg-gray-100 text-gray-500', icon: XCircle },
}

export default function EInvoicePage() {
  const [activeTab, setActiveTab] = useState('Tất cả')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Hóa đơn điện tử" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Compliance banner */}
        <div className="rounded-lg p-4 bg-purple-50 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <Receipt className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-400">Hóa đơn điện tử theo NĐ 123/2020 + TT 78/2021</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
                Hỗ trợ đầy đủ: Ký số, truyền CQT, tra cứu mã, hóa đơn điều chỉnh/thay thế, xuất XML
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tổng hóa đơn', value: '0', sub: 'Tháng 4/2026', border: 'border-l-purple-500' },
            { label: 'CQT chấp nhận', value: '0', sub: 'Hợp lệ', border: 'border-l-emerald-500' },
            { label: 'Chờ xử lý', value: '0', sub: 'Đang truyền', border: 'border-l-amber-500' },
            { label: 'Lỗi/Từ chối', value: '0', sub: 'Cần xử lý', border: 'border-l-red-500' },
          ].map((s) => (
            <div key={s.label} className={cn('stat-card border-l-4', s.border)}>
              <p className="text-xs text-[var(--acc-text-muted)]">{s.label}</p>
              <p className="text-xl font-bold text-[var(--acc-text-primary)] mt-1">{s.value}</p>
              <p className="text-[10px] text-[var(--acc-text-muted)] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Invoice table */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)] gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Danh sách hóa đơn điện tử</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--acc-text-muted)]" />
                <input placeholder="Tìm số HĐ, MST người mua..." className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] bg-[var(--acc-bg-card)] text-[var(--acc-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--acc-accent)] w-52" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Filter className="w-3.5 h-3.5" /> Lọc
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Download className="w-3.5 h-3.5" /> Xuất XML
              </button>
              <Link href="/einvoice/new" className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium">
                <Plus className="w-3.5 h-3.5" /> Tạo hóa đơn
              </Link>
            </div>
          </div>

          <div className="flex gap-1 px-4 pt-3 border-b border-[var(--glass-border)] overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={cn('px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors -mb-px whitespace-nowrap',
                  activeTab === tab ? 'bg-[var(--acc-bg-card)] border border-b-[var(--acc-bg-card)] border-[var(--acc-border)] text-purple-600' : 'text-[var(--acc-text-muted)] hover:text-[var(--acc-text-primary)]'
                )}>
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-acc">
              <thead>
                <tr>
                  <th>Mẫu số</th>
                  <th>Ký hiệu</th>
                  <th>Số HĐ</th>
                  <th>Ngày HĐ</th>
                  <th>Người mua</th>
                  <th>MST người mua</th>
                  <th className="text-right">Tiền hàng</th>
                  <th className="text-right">Thuế GTGT</th>
                  <th className="text-right">Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Mã tra cứu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={11} className="text-center py-12">
                    <Receipt className="w-10 h-10 mx-auto mb-3 text-[var(--acc-text-muted)] opacity-30" />
                    <p className="text-sm text-[var(--acc-text-muted)]">Chưa có hóa đơn điện tử</p>
                    <Link href="/einvoice/new" className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium">
                      <Plus className="w-3.5 h-3.5" /> Tạo hóa đơn điện tử
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
