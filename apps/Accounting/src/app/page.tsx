export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>VietERP Accounting</h1>
      <p style={{ color: '#666' }}>Kế toán & Tài chính — VAS/IFRS Compliant</p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Modules</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>📊 GL Engine — Sổ cái tổng hợp</li>
          <li>🧾 Invoice Engine — Hoá đơn điện tử</li>
          <li>💰 Tax Engine — Thuế VAT/GTGT</li>
          <li>📈 Reports — Báo cáo tài chính VAS</li>
          <li>🔗 Integration — Tích hợp ERP</li>
        </ul>
      </div>
      <p style={{ marginTop: '1rem', color: '#999', fontSize: '0.875rem' }}>
        Module đang trong quá trình phát triển. API available tại <code>/api/*</code>
      </p>
    </main>
  )
}
