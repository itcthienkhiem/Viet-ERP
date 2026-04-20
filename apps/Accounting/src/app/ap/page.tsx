'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Plus, Filter, Download, Search, CreditCard, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const tabs = ['Tất cả', 'Nháp', 'Chờ duyệt', 'Đã duyệt', 'Một phần', 'Đã thanh toán', 'Quá hạn']

export default function APPage() {
  const [activeTab, setActiveTab] = useState('Tất cả')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Công nợ phải trả (AP)" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tổng phải trả', value: '0 ₫', icon: CreditCard, color: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500' },
            { label: 'Quá hạn', value: '0 ₫', icon: AlertCircle, color: 'text-red-700', bg: 'bg-red-100', border: 'border-l-red-700' },
            { label: 'Đến hạn 30 ngày', value: '0 ₫', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-l-amber-500' },
            { label: 'Đã thanh toán tháng này', value: '0 ₫', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-l-emerald-500' },
          ].map((s) => (
            <div key={s.label} className={cn('stat-card border-l-4', s.border)}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--acc-text-muted)]">{s.label}</p>
                  <p className="text-xl font-bold text-[var(--acc-text-primary)] mt-1">{s.value}</p>
                </div>
                <div className={cn('p-2 rounded-lg', s.bg)}>
                  <s.icon className={cn('w-4 h-4', s.color)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)] gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-red-600" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Hóa đơn phải trả</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--acc-text-muted)]" />
                <input placeholder="Tìm hóa đơn, nhà cung cấp..." className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] bg-[var(--acc-bg-card)] text-[var(--acc-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--acc-accent)] w-52" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Filter className="w-3.5 h-3.5" /> Lọc
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                <Download className="w-3.5 h-3.5" /> Xuất
              </button>
              <Link href="/ap/new" className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
                <Plus className="w-3.5 h-3.5" /> Nhập hóa đơn
              </Link>
            </div>
          </div>

          <div className="flex gap-1 px-4 pt-3 border-b border-[var(--glass-border)] overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={cn('px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors -mb-px whitespace-nowrap',
                  activeTab === tab ? 'bg-[var(--acc-bg-card)] border border-b-[var(--acc-bg-card)] border-[var(--acc-border)] text-red-600' : 'text-[var(--acc-text-muted)] hover:text-[var(--acc-text-primary)]'
                )}>
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-acc">
              <thead>
                <tr>
                  <th><input type="checkbox" className="rounded" /></th>
                  <th>Số hóa đơn</th>
                  <th>Nhà cung cấp</th>
                  <th>MST NCC</th>
                  <th>Ngày HĐ</th>
                  <th>Đến hạn</th>
                  <th className="text-right">Tổng tiền</th>
                  <th className="text-right">Đã trả</th>
                  <th className="text-right">Còn lại</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={11} className="text-center py-12">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-[var(--acc-text-muted)] opacity-30" />
                    <p className="text-sm text-[var(--acc-text-muted)]">Chưa có hóa đơn phải trả</p>
                    <Link href="/ap/new" className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
                      <Plus className="w-3.5 h-3.5" /> Nhập hóa đơn mua hàng
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
