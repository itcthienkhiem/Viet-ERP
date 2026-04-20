import prisma from "@/lib/db";
import { fmtVND, fmtDateTime, orderStatusLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    productCount,
    orderCount,
    pendingOrders,
    recentOrders,
    revenue,
    lowStockProducts,
    ordersByStatus,
  ] = await Promise.all([
    prisma.product.count({ where: { deletedAt: null } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { lines: { select: { id: true } } },
    }),
    prisma.order.aggregate({
      where: { status: { in: ["COMPLETED", "DELIVERED"] } },
      _sum: { total: true },
    }),
    prisma.product.findMany({
      where: {
        deletedAt: null,
        trackInventory: true,
        status: "ACTIVE",
      },
      select: { id: true, name: true, stockQuantity: true, lowStockAlert: true },
      orderBy: { stockQuantity: "asc" },
      take: 20,
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const totalRevenue = Number(revenue._sum.total ?? 0);
  const alertProducts = lowStockProducts.filter(
    (p) => p.stockQuantity <= p.lowStockAlert
  );

  const kpiCards = [
    {
      label: "Doanh thu",
      value: fmtVND(totalRevenue),
      icon: DollarSign,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
      href: "/analytics",
    },
    {
      label: "Tổng đơn hàng",
      value: orderCount.toString(),
      icon: ShoppingCart,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
      href: "/orders",
    },
    {
      label: "Chờ xác nhận",
      value: pendingOrders.toString(),
      icon: Clock,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-400/10",
      href: "/orders?status=PENDING",
    },
    {
      label: "Sản phẩm",
      value: productCount.toString(),
      icon: Package,
      iconColor: "text-[var(--crm-accent-text)]",
      iconBg: "bg-[rgba(var(--accent-rgb),0.1)]",
      href: "/products",
    },
  ];

  const totalOrderCount = ordersByStatus.reduce((s, x) => s + x._count, 0);

  return (
    <PageShell
      title="Dashboard"
      description="Tổng quan Ecommerce"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="block">
              <div className="kpi-card cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-[var(--crm-text-secondary)] uppercase tracking-wide">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold text-[var(--crm-text-primary)] tracking-tight">
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${card.iconBg} ring-1 ring-[var(--crm-border)]`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card-static overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--glass-border)]">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
              Đơn hàng gần đây
            </h2>
            <Link
              href="/orders"
              className="text-xs text-[var(--crm-accent-text)] hover:underline font-medium"
            >
              Xem tất cả →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center text-[var(--crm-text-muted)]">
              <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Chưa có đơn hàng nào</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  {["Mã đơn", "Khách hàng", "Tổng tiền", "Trạng thái", "Ngày tạo"].map((h) => (
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
                {recentOrders.map((order) => {
                  const { label, color } = orderStatusLabel(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                    >
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-mono text-xs font-semibold text-[var(--crm-accent-text)] hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="text-sm font-medium text-[var(--crm-text-primary)]">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-[var(--crm-text-muted)]">
                          {order.customerPhone}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-sm font-semibold text-[var(--crm-text-primary)]">
                        {fmtVND(Number(order.total))}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: color + "20",
                            color,
                          }}
                        >
                          {label}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[var(--crm-text-muted)]">
                        {fmtDateTime(order.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Orders by status */}
          <div className="glass-card-static p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[var(--crm-accent-text)]" />
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                Đơn theo trạng thái
              </h2>
            </div>
            {ordersByStatus.length === 0 ? (
              <p className="text-xs text-[var(--crm-text-muted)]">Chưa có dữ liệu</p>
            ) : (
              <div className="space-y-2.5">
                {ordersByStatus.map((s) => {
                  const { label, color } = orderStatusLabel(s.status);
                  const pct = totalOrderCount > 0
                    ? Math.round((s._count / totalOrderCount) * 100)
                    : 0;
                  return (
                    <div key={s.status}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-[var(--crm-text-secondary)]">{label}</span>
                        <span className="text-xs font-semibold text-[var(--crm-text-primary)]">
                          {s._count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--crm-border-subtle)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Low stock alert */}
          {alertProducts.length > 0 && (
            <div className="glass-card-static p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Tồn kho thấp ({alertProducts.length})
                </h2>
              </div>
              <div className="space-y-2">
                {alertProducts.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <Link
                      href={`/products/${p.id}`}
                      className="text-xs text-[var(--crm-text-secondary)] hover:text-[var(--crm-accent-text)] truncate max-w-[140px]"
                    >
                      {p.name}
                    </Link>
                    <span
                      className="text-xs font-semibold ml-2 shrink-0"
                      style={{
                        color: p.stockQuantity === 0 ? "#ef4444" : "#f59e0b",
                      }}
                    >
                      {p.stockQuantity === 0 ? "Hết hàng" : `Còn ${p.stockQuantity}`}
                    </span>
                  </div>
                ))}
                {alertProducts.length > 5 && (
                  <Link
                    href="/products?status=OUT_OF_STOCK"
                    className="text-xs text-[var(--crm-accent-text)] hover:underline"
                  >
                    +{alertProducts.length - 5} sản phẩm khác
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
