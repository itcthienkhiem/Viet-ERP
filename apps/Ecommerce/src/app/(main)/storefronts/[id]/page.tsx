import prisma from "@/lib/db";
import { fmtVND, fmtDateTime, storefrontStatusLabel, productStatusLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Store, Package, ShoppingCart, Globe, Edit } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StorefrontDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const storefront = await prisma.storefront.findUnique({
    where: { id: params.id },
    include: {
      products: {
        include: {
          product: {
            include: { images: { where: { isPrimary: true }, take: 1 } },
          },
        },
        take: 20,
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          total: true,
          status: true,
          createdAt: true,
        },
      },
      _count: { select: { orders: true, products: true } },
    },
  });

  if (!storefront) notFound();

  const { label, color } = storefrontStatusLabel(storefront.status);

  return (
    <PageShell
      title={storefront.name}
      description={`/${storefront.slug}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/storefronts"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: color + "20", color }}
          >
            {label}
          </span>
        </div>
      }
    >
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Sản phẩm", value: storefront._count.products, icon: Package, color: "text-[var(--crm-accent-text)]", bg: "bg-[rgba(var(--accent-rgb),0.1)]" },
          { label: "Đơn hàng", value: storefront._count.orders, icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Tiền tệ", value: storefront.currency, icon: Store, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Ngôn ngữ", value: storefront.locale, icon: Globe, color: "text-amber-400", bg: "bg-amber-400/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="kpi-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[var(--crm-text-muted)] uppercase tracking-wide mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-[var(--crm-text-primary)]">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Products */}
        <div className="glass-card-static overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--glass-border)]">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
              Sản phẩm ({storefront._count.products})
            </h2>
            <Link
              href="/products"
              className="text-xs text-[var(--crm-accent-text)] hover:underline"
            >
              Quản lý →
            </Link>
          </div>
          {storefront.products.length === 0 ? (
            <div className="py-10 text-center text-[var(--crm-text-muted)]">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Chưa có sản phẩm</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--crm-border-subtle)]">
              {storefront.products.map(({ product }) => {
                const { label: pLabel, color: pColor } = productStatusLabel(product.status);
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--crm-bg-subtle)] border border-[var(--crm-border-subtle)] flex items-center justify-center shrink-0 overflow-hidden">
                      {product.images[0]?.url ? (
                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-3.5 h-3.5 text-[var(--crm-text-muted)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-xs font-medium text-[var(--crm-text-primary)] hover:text-[var(--crm-accent-text)] truncate block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-[var(--crm-text-muted)] font-mono">{product.sku}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: pColor + "20", color: pColor }}
                    >
                      {pLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="glass-card-static overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--glass-border)]">
            <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
              Đơn hàng gần đây
            </h2>
            <Link
              href="/orders"
              className="text-xs text-[var(--crm-accent-text)] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          {storefront.orders.length === 0 ? (
            <div className="py-10 text-center text-[var(--crm-text-muted)]">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Chưa có đơn hàng</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--crm-border-subtle)]">
              {storefront.orders.map((order) => {
                const { label: oLabel, color: oColor } = { label: order.status, color: "#6b7280" };
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs font-mono font-semibold text-[var(--crm-accent-text)] hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                      <p className="text-xs text-[var(--crm-text-muted)]">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-semibold text-[var(--crm-text-primary)]">
                        {fmtVND(Number(order.total))}
                      </p>
                      <p className="text-xs text-[var(--crm-text-muted)]">
                        {fmtDateTime(order.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="glass-card-static p-5 max-w-lg">
        <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-3">
          Thông tin cửa hàng
        </h2>
        <div className="space-y-2">
          {[
            { label: "Tên", value: storefront.name },
            { label: "Slug", value: `/${storefront.slug}`, mono: true },
            { label: "Domain", value: storefront.domain ?? "—" },
            { label: "Tiền tệ", value: storefront.currency },
            { label: "Ngôn ngữ", value: storefront.locale },
            { label: "Giá bao gồm VAT", value: storefront.taxIncluded ? "Có" : "Không" },
            { label: "Ngày tạo", value: fmtDateTime(storefront.createdAt) },
          ].map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-xs text-[var(--crm-text-muted)]">{row.label}</span>
              <span className={`text-xs font-medium text-[var(--crm-text-primary)] ${row.mono ? "font-mono" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
