import Link from 'next/link';

export default function NewProductPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/products" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>← Sản phẩm</Link>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 0' }}>Tạo sản phẩm mới</h1>
      </div>

      <form
        style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: 24 }}
        onSubmit={undefined}
      >
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Tên sản phẩm *</label>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>SKU *</label>
            <input
              type="text"
              placeholder="SKU"
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Giá (VNĐ) *</label>
            <input
              type="number"
              placeholder="Giá"
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Mô tả</label>
            <textarea
              placeholder="Mô tả sản phẩm"
              rows={4}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button
            type="submit"
            style={{ padding: '8px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Lưu sản phẩm
          </button>
          <Link
            href="/products"
            style={{ padding: '8px 20px', background: '#f3f4f6', color: '#374151', borderRadius: 6, textDecoration: 'none', fontSize: 14 }}
          >
            Hủy
          </Link>
        </div>
      </form>
    </main>
  );
}
