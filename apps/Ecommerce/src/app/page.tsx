import Link from 'next/link';

export default function HomePage() {
  const modules = [
    { href: '/products', label: '📦 Sản phẩm', desc: 'Quản lý danh mục & tồn kho' },
    { href: '/orders', label: '🛒 Đơn hàng', desc: 'Theo dõi & xử lý đơn hàng' },
    { href: '/storefronts', label: '🏪 Cửa hàng', desc: 'Quản lý storefront' },
    { href: '/promotions', label: '🎁 Khuyến mãi', desc: 'Mã giảm giá & chương trình' },
    { href: '/analytics', label: '📊 Báo cáo', desc: 'Doanh thu & thống kê' },
  ];

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        🛍️ Ecommerce Module
      </h1>
      <p style={{ color: '#666', marginBottom: 32 }}>
        Quản lý thương mại điện tử — B2B &amp; B2C, đa cửa hàng, thị trường Việt Nam
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            style={{
              display: 'block',
              padding: '20px 24px',
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow 0.15s',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{m.desc}</div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: '16px 20px', background: '#fff3cd', borderRadius: 8, border: '1px solid #ffc107' }}>
        <strong>⚠️ Module đang phát triển</strong>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#856404' }}>
          App Ecommerce đang trong giai đoạn xây dựng. Business logic engines đã sẵn sàng,
          UI đang được triển khai.
        </p>
      </div>
    </main>
  );
}
