'use client'

import { Header } from '@/components/Header'
import { Building2, Clock, CheckCircle2, AlertCircle, Download, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'

const taxTypes = [
  {
    code: 'VAT', name: 'Thuế GTGT', nameEn: 'Value Added Tax',
    period: 'Tháng/Quý', deadline: '20 ngày sau kỳ',
    status: 'pending', color: 'blue',
    description: 'Tờ khai thuế GTGT theo mẫu 01/GTGT (tháng) hoặc 01/GTGT (quý)',
  },
  {
    code: 'CIT', name: 'Thuế TNDN', nameEn: 'Corporate Income Tax',
    period: 'Quý/Năm', deadline: 'Quý: 30 ngày; Năm: 31/3',
    status: 'pending', color: 'emerald',
    description: 'Thuế thu nhập doanh nghiệp tạm tính quý và quyết toán năm',
  },
  {
    code: 'PIT', name: 'Thuế TNCN', nameEn: 'Personal Income Tax',
    period: 'Tháng/Quý', deadline: '20 ngày sau kỳ',
    status: 'pending', color: 'amber',
    description: 'Thuế thu nhập cá nhân khấu trừ tại nguồn từ tiền lương',
  },
  {
    code: 'FCT', name: 'Thuế nhà thầu', nameEn: 'Foreign Contractor Tax',
    period: 'Phát sinh', deadline: '10 ngày sau phát sinh',
    status: 'none', color: 'purple',
    description: 'Thuế nhà thầu nước ngoài theo phương pháp trực tiếp',
  },
]

const colorMap: Record<string, { badge: string; btn: string; border: string }> = {
  blue: { badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', border: 'border-l-blue-500' },
  emerald: { badge: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', border: 'border-l-emerald-500' },
  amber: { badge: 'bg-amber-100 text-amber-700', btn: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100', border: 'border-l-amber-500' },
  purple: { badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', border: 'border-l-purple-500' },
}

export default function TaxPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Khai báo thuế" />

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Tax deadline alert */}
        <div className="rounded-lg p-4 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Lịch nộp thuế tháng 4/2026</h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { date: '20/04/2026', label: 'Thuế GTGT tháng 3/2026', urgent: true },
                  { date: '30/04/2026', label: 'Thuế TNDN tạm tính Q1/2026', urgent: false },
                  { date: '20/04/2026', label: 'Thuế TNCN tháng 3/2026', urgent: true },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-2 text-xs text-amber-700">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span className="font-medium">{d.date}</span>
                    <span>—</span>
                    <span>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tax type cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {taxTypes.map((t) => {
            const c = colorMap[t.color]
            return (
              <div key={t.code} className={cn('glass-card p-5 border-l-4', c.border)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('badge-acc', c.badge)}>{t.code}</span>
                      <h3 className="text-sm font-semibold text-[var(--acc-text-primary)]">{t.name}</h3>
                    </div>
                    <p className="text-xs text-[var(--acc-text-muted)]">{t.nameEn}</p>
                  </div>
                  <span className={cn('badge-acc', t.status === 'none' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-700')}>
                    {t.status === 'none' ? 'Không phát sinh' : 'Chưa khai'}
                  </span>
                </div>

                <p className="text-xs text-[var(--acc-text-secondary)] mb-3">{t.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-2 rounded-lg bg-[var(--acc-bg-hover)]">
                    <p className="text-[var(--acc-text-muted)] mb-0.5">Kỳ khai báo</p>
                    <p className="font-medium text-[var(--acc-text-primary)]">{t.period}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--acc-bg-hover)]">
                    <p className="text-[var(--acc-text-muted)] mb-0.5">Hạn nộp</p>
                    <p className="font-medium text-[var(--acc-text-primary)]">{t.deadline}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md border transition-colors', c.btn)}>
                    <Calculator className="w-3.5 h-3.5" /> Tính thuế
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md border border-[var(--acc-border)] text-[var(--acc-text-secondary)] hover:bg-[var(--acc-bg-hover)] transition-colors">
                    <Download className="w-3.5 h-3.5" /> Xuất XML
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tax declarations history */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[var(--acc-text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--acc-text-primary)]">Lịch sử khai báo</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-acc">
              <thead>
                <tr>
                  <th>Loại thuế</th>
                  <th>Kỳ</th>
                  <th>Hạn nộp</th>
                  <th>Ngày nộp</th>
                  <th className="text-right">Doanh thu chịu thuế</th>
                  <th className="text-right">Thuế phải nộp</th>
                  <th>Trạng thái</th>
                  <th>Mã xác nhận</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center py-10 text-[var(--acc-text-muted)]">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Chưa có lịch sử khai báo</p>
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
