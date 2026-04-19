import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Link href="/" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>← Trang chủ</Link>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 0' }}>📦 Sản phẩm</h1>
        </div>
        <Link
          href="/products/new"
          style={{
            padding: '8px 16px',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          + Thêm sản phẩm
        </Link>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          style={{
            width: '100%',
            padding: '10px 14px',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Product list placeholder */}
      <section className="product-list" style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'grid', gridTemplateColumns: '1fr 120px 100px 100px 80px', gap: 12, fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
          <span>Sản phẩm</span>
          <span>SKU</span>
          <span>Giá</span>
          <span>Tồn kho</span>
          <span>Trạng thái</span>
        </div>

        {/* Empty state */}
        <article data-testid="product-item" style={{ padding: '48px 20px', textAlign: 'center', color: '#9ca3af' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Chưa có sản phẩm</div>
          <div style={{ fontSize: 13 }}>Thêm sản phẩm đầu tiên để bắt đầu bán hàng</div>
          <Link
            href="/products/new"
            style={{ display: 'inline-block', marginTop: 16, padding: '8px 20px', background: '#2563eb', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 14 }}
          >
            Thêm sản phẩm
          </Link>
        </article>
      </section>
    </main>
  );
}
