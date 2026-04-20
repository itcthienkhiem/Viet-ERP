import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: { default: 'VietERP Accounting', template: '%s | Kế toán' },
  description: 'Kế toán & Tài chính — VAS/IFRS Compliant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex h-screen overflow-hidden bg-[var(--acc-bg-page)]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
