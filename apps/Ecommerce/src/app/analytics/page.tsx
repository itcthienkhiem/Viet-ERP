import Link from 'next/link';

export default function AnalyticsPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>← Trang chủ</Link>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 0' }}>📊 Báo cáo & Thống kê</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Doanh thu hôm nay', value: '0 ₫', icon: '💰' },
          { label: 'Đơn hàng mới', value: '0', icon: '📋' },
          { label: 'Sản phẩm đang bán', value: '0', icon: '📦' },
          { label: 'Khách hàng', value: '0', icon: '👥' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: '20px 16px' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: '48px 20px', textAlign: 'center', color: '#9ca3af' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Chưa có dữ liệu</div>
        <div style={{ fontSize: 13 }}>Biểu đồ doanh thu sẽ hiển thị khi có đơn hàng</div>
      </div>
    </main>
  );
}
