import prisma from "@/lib/db";
import { fmtDateTime, storefrontStatusLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { Store, Plus, Globe, Package, ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StorefrontsPage() {
  const storefronts = await prisma.storefront.findMany({
    where: { deletedAt: null },
    include: {
      _count: { select: { orders: true, products: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell
      title="Cửa hàng"
      description={`${storefronts.length} storefront`}
      actions={
        <Link
          href="/storefronts/new"
          className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Tạo cửa hàng
        </Link>
      }
    >
      {storefronts.length === 0 ? (
        <div className="glass-card-static py-16 text-center">
          <Store className="w-14 h-14 mx-auto mb-4 text-[var(--crm-text-muted)] opacity-30" />
          <p className="text-base font-semibold text-[var(--crm-text-primary)] mb-1">
            Chưa có cửa hàng
          </p>
          <p className="text-sm text-[var(--crm-text-muted)] mb-4">
            Tạo storefront để bắt đầu bán hàng online
          </p>
          <Link
            href="/storefronts/new"
            className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            Tạo cửa hàng đầu tiên
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {storefronts.map((sf) => {
            const { label, color } = storefrontStatusLabel(sf.status);
            return (
              <div key={sf.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(var(--accent-rgb),0.1)] flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5 text-[var(--crm-accent-text)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                        {sf.name}
                      </h3>
                      <p className="text-xs text-[var(--crm-text-muted)] font-mono">
                        /{sf.slug}
                      </p>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
                    style={{ background: color + "20", color }}
                  >
                    {label}
                  </span>
                </div>

                {sf.description && (
                  <p className="text-xs text-[var(--crm-text-secondary)] mb-3 line-clamp-2">
                    {sf.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-[var(--crm-text-muted)] mb-3">
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    {sf._count.products} sản phẩm
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {sf._count.orders} đơn hàng
                  </span>
                  <span className="font-mono">{sf.currency}</span>
                </div>

                {sf.domain && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--crm-accent-text)] mb-3">
                    <Globe className="w-3.5 h-3.5" />
                    {sf.domain}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[var(--glass-border)]">
                  <span className="text-xs text-[var(--crm-text-muted)]">
                    {fmtDateTime(sf.createdAt)}
                  </span>
                  <Link
                    href={`/storefronts/${sf.id}`}
                    className="text-xs font-medium text-[var(--crm-accent-text)] hover:underline"
                  >
                    Quản lý →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
