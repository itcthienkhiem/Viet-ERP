import prisma from "@/lib/db";
import { fmtVND, productStatusLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { Package, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "DRAFT", label: "Nháp" },
  { value: "ACTIVE", label: "Đang bán" },
  { value: "OUT_OF_STOCK", label: "Hết hàng" },
  { value: "DISCONTINUED", label: "Ngừng bán" },
  { value: "ARCHIVED", label: "Lưu trữ" },
];

const TYPE_LABELS: Record<string, string> = {
  PHYSICAL: "Vật lý",
  DIGITAL: "Kỹ thuật số",
  SERVICE: "Dịch vụ",
  BUNDLE: "Combo",
  SUBSCRIPTION: "Đăng ký",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string; page?: string };
}) {
  const search = searchParams.search ?? "";
  const status = searchParams.status ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const limit = 20;

  const where: any = { deletedAt: null };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { where: { isPrimary: true }, take: 1 } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <PageShell
      title="Sản phẩm"
      description={`${total} sản phẩm`}
      actions={
        <Link
          href="/products/new"
          className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </Link>
      }
    >
      {/* Filters */}
      <form method="GET" className="flex gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Tìm theo tên, SKU..."
          className="input-premium flex-1 h-9"
        />
        <select
          name="status"
          defaultValue={status}
          className="input-premium h-9 w-40"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 h-9 rounded-md border border-[var(--crm-border)] bg-[var(--glass-bg)] text-sm text-[var(--crm-text-secondary)] hover:bg-[var(--glass-bg-hover)] transition-colors"
        >
          Lọc
        </button>
      </form>

      {/* Table */}
      <div className="glass-card-static overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--glass-border)]">
              {["Sản phẩm", "SKU", "Loại", "Giá bán", "Tồn kho", "Trạng thái", ""].map((h) => (
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
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <Package className="w-12 h-12 mx-auto mb-3 text-[var(--crm-text-muted)] opacity-30" />
                  <p className="text-sm text-[var(--crm-text-muted)]">Chưa có sản phẩm nào</p>
                  <Link
                    href="/products/new"
                    className="inline-block mt-3 px-4 py-2 btn-accent-glow text-sm"
                  >
                    Thêm sản phẩm đầu tiên
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const { label, color } = productStatusLabel(p.status);
                return (
                  <tr
                    key={p.id}
                    className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--crm-bg-subtle)] border border-[var(--crm-border-subtle)] flex items-center justify-center shrink-0 overflow-hidden">
                          {p.images[0]?.url ? (
                            <img
                              src={p.images[0].url}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-4 h-4 text-[var(--crm-text-muted)]" />
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/products/${p.id}`}
                            className="text-sm font-medium text-[var(--crm-text-primary)] hover:text-[var(--crm-accent-text)] transition-colors"
                          >
                            {p.name}
                          </Link>
                          {p.shortDescription && (
                            <div className="text-xs text-[var(--crm-text-muted)] mt-0.5 truncate max-w-[200px]">
                              {p.shortDescription}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--crm-text-muted)]">
                      {p.sku}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-secondary)]">
                      {TYPE_LABELS[p.type] ?? p.type}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-sm font-semibold text-[var(--crm-text-primary)]">
                        {fmtVND(Number(p.salePrice ?? p.basePrice))}
                      </div>
                      {p.salePrice && (
                        <div className="font-mono text-xs text-[var(--crm-text-muted)] line-through">
                          {fmtVND(Number(p.basePrice))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.trackInventory ? (
                        <span
                          className="font-semibold"
                          style={{
                            color:
                              p.stockQuantity === 0
                                ? "#ef4444"
                                : p.stockQuantity <= p.lowStockAlert
                                ? "#f59e0b"
                                : "#10b981",
                          }}
                        >
                          {p.stockQuantity}
                        </span>
                      ) : (
                        <span className="text-[var(--crm-text-muted)] text-xs">
                          Không theo dõi
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: color + "20", color }}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/products/${p.id}/edit`}
                        className="text-xs text-[var(--crm-accent-text)] hover:underline font-medium"
                      >
                        Sửa
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[var(--glass-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--crm-text-muted)]">
              Trang {page} / {totalPages} ({total} sản phẩm)
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}&search=${search}&status=${status}`}
                  className="px-3 py-1.5 text-xs border border-[var(--crm-border)] rounded-md text-[var(--crm-text-secondary)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                >
                  ← Trước
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}&search=${search}&status=${status}`}
                  className="px-3 py-1.5 text-xs border border-[var(--crm-border)] rounded-md text-[var(--crm-text-secondary)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                >
                  Sau →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
