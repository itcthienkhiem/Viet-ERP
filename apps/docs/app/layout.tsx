import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VietERP Docs',
  description: 'Developer Documentation & API Reference',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0f1117', color: '#e2e8f0' }}>
        {children}
      </body>
    </html>
  )
}
