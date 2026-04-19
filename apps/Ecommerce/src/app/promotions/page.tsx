import Link from 'next/link';

export default function PromotionsPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>← Trang chủ</Link>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 0' }}>🎁 Khuyến mãi</h1>
      </div>

      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: '48px 20px', textAlign: 'center', color: '#9ca3af' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎁</div>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Chưa có chương trình khuyến mãi</div>
        <div style={{ fontSize: 13 }}>Tạo mã giảm giá và chương trình ưu đãi cho khách hàng</div>
      </div>
    </main>
  );
}
