import prisma from "@/lib/db";
import { fmtVND, paymentMethodLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { DollarSign, ShoppingCart, TrendingUp, Target } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalRevenue,
    monthRevenue,
    lastMonthRevenue,
    totalOrders,
    monthOrders,
    ordersByStatus,
    topProducts,
    revenueByPayment,
    dailyRevenue,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { status: { in: ["COMPLETED", "DELIVERED"] } },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: { in: ["COMPLETED", "DELIVERED"] },
        createdAt: { gte: startOfMonth },
      },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: { in: ["COMPLETED", "DELIVERED"] },
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
      _sum: { total: true },
    }),
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.groupBy({ by: ["status"], _count: true }),
    prisma.orderLine.groupBy({
      by: ["productId", "productName"],
      where: { order: { status: { in: ["COMPLETED", "DELIVERED"] } } },
      _sum: { lineTotal: true, quantity: true },
      orderBy: { _sum: { lineTotal: "desc" } },
      take: 5,
    }),
    prisma.order.findMany({
      where: { status: { in: ['COMPLETED', 'DELIVERED'] } },
    }),
    prisma.order.findMany({
      where: {
        status: { in: ['COMPLETED', 'DELIVERED'] },
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      select: { createdAt: true, total: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const thisMonthRev = Number(monthRevenue._sum.total ?? 0);
  const lastMonthRev = Number(lastMonthRevenue._sum.total ?? 0);
  const growth =
    lastMonthRev > 0
      ? ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100
      : null;
  const totalRev = Number(totalRevenue._sum.total ?? 0);
  const aov = totalOrders > 0 ? totalRev / totalOrders : 0;

  // Group revenue by payment method in JS
  const paymentMap = new Map<string, { revenue: number; count: number }>();
  for (const o of revenueByPayment as any[]) {
    const method = o.paymentMethod as string;
    const existing = paymentMap.get(method) ?? { revenue: 0, count: 0 };
    existing.revenue += Number(o.total);
    existing.count += 1;
    paymentMap.set(method, existing);
  }
  const paymentData = Array.from(paymentMap.entries())
    .map(([method, data]) => ({ method, ...data }))
    .sort((a, b) => b.revenue - a.revenue);
  const dailyMap = new Map<string, { revenue: number; orders: number }>();
  for (const o of dailyRevenue as any[]) {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const existing = dailyMap.get(key) ?? { revenue: 0, orders: 0 };
    existing.revenue += Number(o.total);
    existing.orders += 1;
    dailyMap.set(key, existing);
  }
  const dailyData = Array.from(dailyMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const kpiCards = [
    {
      label: "Tổng doanh thu",
      value: fmtVND(totalRev),
      sub: `Tháng này: ${fmtVND(thisMonthRev)}`,
      icon: DollarSign,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
    },
    {
      label: "Tổng đơn hàng",
      value: totalOrders.toString(),
      sub: `Tháng này: ${monthOrders}`,
      icon: ShoppingCart,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
    },
    {
      label: "Tăng trưởng",
      value: growth !== null ? `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%` : "—",
      sub: "So với tháng trước",
      icon: TrendingUp,
      iconColor: growth !== null && growth >= 0 ? "text-emerald-400" : "text-red-400",
      iconBg: growth !== null && growth >= 0 ? "bg-emerald-400/10" : "bg-red-400/10",
    },
    {
      label: "Giá trị đơn TB",
      value: fmtVND(aov),
      sub: "Average Order Value",
      icon: Target,
      iconColor: "text-[var(--crm-accent-text)]",
      iconBg: "bg-[rgba(var(--accent-rgb),0.1)]",
    },
  ];

  const totalOrderCount = ordersByStatus.reduce((s, x) => s + x._count, 0);
  const maxDailyRev = Math.max(...dailyData.map((d) => d.revenue), 1);
  const maxPaymentRev = Math.max(...paymentData.map((p) => p.revenue), 1);

  const statusLabels: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    PROCESSING: "Đang xử lý",
    SHIPPED: "Đang giao",
    DELIVERED: "Đã giao",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy",
    REFUNDED: "Hoàn tiền",
    RETURNED: "Trả hàng",
  };

  const statusColors: Record<string, string> = {
    PENDING: "#f59e0b",
    CONFIRMED: "#3b82f6",
    PROCESSING: "#8b5cf6",
    SHIPPED: "#06b6d4",
    DELIVERED: "#10b981",
    COMPLETED: "#059669",
    CANCELLED: "#ef4444",
    REFUNDED: "#f97316",
    RETURNED: "#ec4899",
  };

  return (
    <PageShell
      title="Báo cáo & Thống kê"
      description="Tổng quan hiệu suất kinh doanh"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="kpi-card">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-[var(--crm-text-secondary)] uppercase tracking-wide">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--crm-text-primary)] tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-xs text-[var(--crm-text-muted)]">{card.sub}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${card.iconBg} ring-1 ring-[var(--crm-border)]`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Orders by status */}
        <div className="glass-card-static p-5">
          <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4">
            Đơn hàng theo trạng thái
          </h2>
          {ordersByStatus.length === 0 ? (
            <p className="text-sm text-[var(--crm-text-muted)]">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {ordersByStatus
                .sort((a, b) => b._count - a._count)
                .map((s) => {
                  const pct =
                    totalOrderCount > 0
                      ? Math.round((s._count / totalOrderCount) * 100)
                      : 0;
                  const barColor = statusColors[s.status] ?? "rgb(var(--accent-rgb))";
                  return (
                    <div key={s.status}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-[var(--crm-text-secondary)]">
                          {statusLabels[s.status] ?? s.status}
                        </span>
                        <span className="text-xs font-semibold text-[var(--crm-text-primary)]">
                          {s._count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 bg-[var(--crm-border-subtle)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Revenue by payment method */}
        <div className="glass-card-static p-5">
          <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4">
            Doanh thu theo phương thức thanh toán
          </h2>
          {paymentData.length === 0 ? (
            <p className="text-sm text-[var(--crm-text-muted)]">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {paymentData.map((p) => {
                  const rev = p.revenue;
                  const pct = Math.round((rev / maxPaymentRev) * 100);
                  return (
                    <div key={p.method}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-[var(--crm-text-secondary)]">
                          {paymentMethodLabel(p.method)}
                        </span>
                        <div>
                          <span className="text-xs font-mono font-semibold text-[var(--crm-text-primary)]">
                            {fmtVND(rev)}
                          </span>
                          <span className="text-xs text-[var(--crm-text-muted)] ml-2">
                            ({p.count} đơn)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-[var(--crm-border-subtle)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all bg-[rgb(var(--accent-rgb))]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top products */}
        <div className="glass-card-static p-5">
          <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4">
            Top 5 sản phẩm bán chạy
          </h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-[var(--crm-text-muted)]">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div
                  key={p.productId}
                  className="flex items-center gap-3 py-2 border-b border-[var(--crm-border-subtle)] last:border-0"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: i === 0 ? "rgba(var(--accent-rgb), 0.2)" : "var(--crm-bg-subtle)",
                      color: i === 0 ? "rgb(var(--accent-rgb))" : "var(--crm-text-muted)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--crm-text-primary)] truncate">
                      {p.productName}
                    </p>
                    <p className="text-xs text-[var(--crm-text-muted)]">
                      {Number(p._sum.quantity ?? 0)} đã bán
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[var(--crm-text-primary)] shrink-0">
                    {fmtVND(Number(p._sum.lineTotal ?? 0))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Daily revenue */}
        <div className="glass-card-static p-5">
          <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4">
            Doanh thu 7 ngày gần đây
          </h2>
          {dailyData.length === 0 ? (
            <p className="text-sm text-[var(--crm-text-muted)]">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {dailyData.map((d) => {
                const pct = maxDailyRev > 0 ? Math.round((d.revenue / maxDailyRev) * 100) : 0;
                const dateStr = new Date(d.date).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                });
                return (
                  <div key={d.date}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-[var(--crm-text-secondary)]">{dateStr}</span>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[var(--crm-text-primary)]">
                          {fmtVND(d.revenue)}
                        </span>
                        <span className="text-xs text-[var(--crm-text-muted)] ml-2">
                          ({d.orders} đơn)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-[var(--crm-border-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all bg-[rgb(var(--accent-rgb))]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
