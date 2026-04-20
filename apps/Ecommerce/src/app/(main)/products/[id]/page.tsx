import prisma from "@/lib/db";
import { fmtVND, fmtDateTime, productStatusLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Package, Edit, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  PHYSICAL: "Vật lý",
  DIGITAL: "Kỹ thuật số",
  SERVICE: "Dịch vụ",
  BUNDLE: "Combo",
  SUBSCRIPTION: "Đăng ký",
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
      inventoryLogs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!product) notFound();

  const { label, color } = productStatusLabel(product.status);

  return (
    <PageShell
      title={product.name}
      description={`SKU: ${product.sku}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            <Edit className="w-4 h-4" />
            Chỉnh sửa
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic info card */}
          <div className="glass-card-static p-5">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4 pb-3 border-b border-[var(--glass-border)]">
              Thông tin sản phẩm
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Tên sản phẩm", value: product.name },
                { label: "SKU", value: product.sku, mono: true },
                { label: "Loại", value: TYPE_LABELS[product.type] ?? product.type },
                { label: "Trạng thái", value: null, badge: { label, color } },
                { label: "Giá gốc", value: fmtVND(Number(product.basePrice)), mono: true },
                {
                  label: "Giá khuyến mãi",
                  value: product.salePrice ? fmtVND(Number(product.salePrice)) : "—",
                  mono: true,
                },
                {
                  label: "Giá vốn",
                  value: product.costPrice ? fmtVND(Number(product.costPrice)) : "—",
                  mono: true,
                },
                { label: "VAT", value: `${Number(product.vatRate)}%` },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-[var(--crm-text-muted)] mb-1">{row.label}</p>
                  {row.badge ? (
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: row.badge.color + "20", color: row.badge.color }}
                    >
                      {row.badge.label}
                    </span>
                  ) : (
                    <p
                      className={`text-sm font-medium text-[var(--crm-text-primary)] ${
                        row.mono ? "font-mono" : ""
                      }`}
                    >
                      {row.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {product.shortDescription && (
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-xs text-[var(--crm-text-muted)] mb-1">Mô tả ngắn</p>
                <p className="text-sm text-[var(--crm-text-secondary)]">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {product.description && (
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-xs text-[var(--crm-text-muted)] mb-1">Mô tả chi tiết</p>
                <p className="text-sm text-[var(--crm-text-secondary)] whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="glass-card-static overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--glass-border)]">
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Biến thể ({product.variants.length})
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--glass-border)]">
                    {["SKU", "Tên", "Thuộc tính", "Giá", "Tồn kho", "Trạng thái"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--crm-text-muted)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr
                      key={v.id}
                      className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                    >
                      <td className="px-4 py-2.5 font-mono text-xs text-[var(--crm-text-muted)]">
                        {v.sku}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-[var(--crm-text-primary)]">
                        {v.name}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[var(--crm-text-secondary)]">
                        {Object.entries(v.attributes as Record<string, string>)
                          .map(([k, val]) => `${k}: ${val}`)
                          .join(", ")}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-sm">
                        {v.price ? fmtVND(Number(v.price)) : "—"}
                      </td>
                      <td className="px-4 py-2.5 text-sm font-semibold"
                        style={{ color: v.stock === 0 ? "#ef4444" : "#10b981" }}>
                        {v.stock}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: v.isActive ? "#10b98120" : "#6b728020",
                            color: v.isActive ? "#10b981" : "#6b7280",
                          }}
                        >
                          {v.isActive ? "Hoạt động" : "Tắt"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Inventory log */}
          {product.inventoryLogs.length > 0 && (
            <div className="glass-card-static overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--glass-border)]">
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Lịch sử tồn kho
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--glass-border)]">
                    {["Loại", "Số lượng", "Trước", "Sau", "Tham chiếu", "Thời gian"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--crm-text-muted)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.inventoryLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                    >
                      <td className="px-4 py-2.5 text-xs font-medium text-[var(--crm-text-secondary)]">
                        {log.type}
                      </td>
                      <td className="px-4 py-2.5 text-sm font-semibold font-mono"
                        style={{ color: log.quantity >= 0 ? "#10b981" : "#ef4444" }}>
                        {log.quantity >= 0 ? "+" : ""}{log.quantity}
                      </td>
                      <td className="px-4 py-2.5 text-sm font-mono text-[var(--crm-text-muted)]">
                        {log.previousQty}
                      </td>
                      <td className="px-4 py-2.5 text-sm font-mono font-semibold text-[var(--crm-text-primary)]">
                        {log.newQty}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[var(--crm-text-muted)] font-mono">
                        {log.reference ?? "—"}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[var(--crm-text-muted)]">
                        {fmtDateTime(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Inventory */}
          <div className="glass-card-static p-4">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-3">
              Tồn kho
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Theo dõi tồn kho</span>
                <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                  {product.trackInventory ? "Có" : "Không"}
                </span>
              </div>
              {product.trackInventory && (
                <>
                  <div className="flex justify-between">
                    <span className="text-xs text-[var(--crm-text-muted)]">Số lượng hiện tại</span>
                    <span
                      className="text-sm font-bold font-mono"
                      style={{
                        color:
                          product.stockQuantity === 0
                            ? "#ef4444"
                            : product.stockQuantity <= product.lowStockAlert
                            ? "#f59e0b"
                            : "#10b981",
                      }}
                    >
                      {product.stockQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[var(--crm-text-muted)]">Cảnh báo thấp</span>
                    <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                      {product.lowStockAlert}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Images */}
          {product.images.length > 0 && (
            <div className="glass-card-static p-4">
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-3">
                Hình ảnh ({product.images.length})
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-lg overflow-hidden bg-[var(--crm-bg-subtle)] border border-[var(--crm-border-subtle)]"
                  >
                    <img
                      src={img.url}
                      alt={img.alt ?? product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="glass-card-static p-4">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-3">
              Thông tin thêm
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Ngày tạo</span>
                <span className="text-xs text-[var(--crm-text-secondary)]">
                  {fmtDateTime(product.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Cập nhật</span>
                <span className="text-xs text-[var(--crm-text-secondary)]">
                  {fmtDateTime(product.updatedAt)}
                </span>
              </div>
              {product.barcode && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--crm-text-muted)]">Barcode</span>
                  <span className="text-xs font-mono text-[var(--crm-text-primary)]">
                    {product.barcode}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
