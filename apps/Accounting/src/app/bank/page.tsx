'use client'

import { Header } from '@/components/Header'
import { Plus, Landmark, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BankPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Ngân hàng & Đối chiếu" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tổng tài khoản NH', value: '0', border: 'border-l-cyan-500' },
            { label: 'Đã đối chiếu', value: '0', border: 'border-l-emerald-500' },
            { label: 'Chưa đối chiếu', value: '0', border: 'border-l-amber-500' },
            { label: 'Chênh lệch', value: '0 ₫', border: 'border-l-red-500' },
          ].map((s) => (
            <div key={s.label} className={cn('stat-card border-l-4', s.border)}>
              <p className="text-xs text-[var(--acc-text-muted)]">{s.label}</p>
              <p className="text-xl font-bold text-[var(--acc-text-primary)] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-cyan-600" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Tài khoản ngân hàng</h2>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-medium">
              <Plus className="w-3.5 h-3.5" /> Thêm tài khoản
            </button>
          </div>
          <div className="text-center py-10">
            <Landmark className="w-10 h-10 mx-auto mb-3 text-[var(--acc-text-muted)] opacity-30" />
            <p className="text-sm text-[var(--acc-text-muted)]">Chưa có tài khoản ngân hàng</p>
            <p className="text-xs text-[var(--acc-text-muted)] mt-1">Thêm tài khoản để bắt đầu đối chiếu sao kê</p>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[var(--acc-text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Đối chiếu tháng 4/2026</h2>
            </div>
          </div>
          <div className="text-center py-8 text-[var(--acc-text-muted)]">
            <p className="text-sm">Chưa có dữ liệu đối chiếu</p>
          </div>
        </div>
      </main>
    </div>
  )
}
