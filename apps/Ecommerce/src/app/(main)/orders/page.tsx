import prisma from "@/lib/db";
import { fmtVND, fmtDateTime, orderStatusLabel, paymentMethodLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "PENDING", label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "PROCESSING", label: "Đang xử lý" },
  { value: "SHIPPED", label: "Đang giao" },
  { value: "DELIVERED", label: "Đã giao" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "RETURNED", label: "Trả hàng" },
];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; page?: string };
}) {
  const status = searchParams.status ?? "";
  const search = searchParams.search ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const limit = 20;

  const where: any = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { customerName: { contains: search, mode: "insensitive" } },
      { customerPhone: { contains: search } },
    ];
  }

  const [orders, total, statusCounts] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { lines: { select: { id: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
    prisma.order.groupBy({ by: ["status"], _count: true }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const countMap = Object.fromEntries(statusCounts.map((s) => [s.status, s._count]));
  const allCount = statusCounts.reduce((s, x) => s + x._count, 0);

  return (
    <PageShell title="Đơn hàng" description={`${total} đơn hàng`}>
      {/* Status tabs */}
      <div className="flex gap-0 border-b border-[var(--crm-border)] overflow-x-auto">
        {STATUS_OPTIONS.map((opt) => {
          const count = opt.value ? (countMap[opt.value] ?? 0) : allCount;
          const active = status === opt.value;
          return (
            <Link
              key={opt.value}
              href={`?status=${opt.value}&search=${search}`}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2"
              style={{
                color: active ? "rgb(var(--accent-rgb))" : "var(--crm-text-muted)",
                borderBottomColor: active ? "rgb(var(--accent-rgb))" : "transparent",
              }}
            >
              {opt.label}
              {count > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: active ? "rgba(var(--accent-rgb), 0.15)" : "var(--crm-bg-subtle)",
                    color: active ? "rgb(var(--accent-rgb))" : "var(--crm-text-muted)",
                  }}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Search */}
      <form method="GET">
        <input type="hidden" name="status" value={status} />
        <input
          name="search"
          defaultValue={search}
          placeholder="Tìm theo mã đơn, tên khách, SĐT..."
          className="input-premium w-full h-9"
        />
      </form>

      {/* Table */}
      <div className="glass-card-static overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--glass-border)]">
              {["Mã đơn", "Khách hàng", "Sản phẩm", "Tổng tiền", "Thanh toán", "Trạng thái", "Ngày tạo", ""].map((h) => (
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-[var(--crm-text-muted)] opacity-30" />
                  <p className="text-sm text-[var(--crm-text-muted)]">Chưa có đơn hàng nào</p>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const { label, color } = orderStatusLabel(order.status);
                return (
                  <tr
                    key={order.id}
                    className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="font-mono text-xs font-semibold text-[var(--crm-accent-text)] hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-[var(--crm-text-primary)]">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-[var(--crm-text-muted)]">
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-secondary)]">
                      {order.lines.length} sản phẩm
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold text-[var(--crm-text-primary)]">
                      {fmtVND(Number(order.total))}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-secondary)]">
                      {paymentMethodLabel(order.paymentMethod)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: color + "20", color }}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-muted)]">
                      {fmtDateTime(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs text-[var(--crm-accent-text)] hover:underline font-medium"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[var(--glass-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--crm-text-muted)]">
              Trang {page} / {totalPages}
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}&status=${status}&search=${search}`}
                  className="px-3 py-1.5 text-xs border border-[var(--crm-border)] rounded-md text-[var(--crm-text-secondary)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                >
                  ← Trước
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}&status=${status}&search=${search}`}
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
