import prisma from "@/lib/db";
import { fmtVND, fmtDate, promotionStatusLabel, promotionTypeLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { Tag, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell
      title="Khuyến mãi"
      description={`${promotions.length} chương trình`}
      actions={
        <Link
          href="/promotions/new"
          className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Tạo khuyến mãi
        </Link>
      }
    >
      {promotions.length === 0 ? (
        <div className="glass-card-static py-16 text-center">
          <Tag className="w-14 h-14 mx-auto mb-4 text-[var(--crm-text-muted)] opacity-30" />
          <p className="text-base font-semibold text-[var(--crm-text-primary)] mb-1">
            Chưa có khuyến mãi
          </p>
          <p className="text-sm text-[var(--crm-text-muted)] mb-4">
            Tạo mã giảm giá và chương trình ưu đãi cho khách hàng
          </p>
          <Link
            href="/promotions/new"
            className="btn-accent-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm"
          >
            Tạo khuyến mãi đầu tiên
          </Link>
        </div>
      ) : (
        <div className="glass-card-static overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                {["Tên chương trình", "Mã coupon", "Loại", "Giá trị", "Đã dùng", "Thời gian", "Trạng thái"].map((h) => (
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
              {promotions.map((p) => {
                const now = new Date();
                const isExpired = p.endDate < now && p.status === "ACTIVE";
                const displayStatus = isExpired ? "EXPIRED" : p.status;
                const { label, color } = promotionStatusLabel(displayStatus);

                return (
                  <tr
                    key={p.id}
                    className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/promotions/${p.id}`}
                        className="text-sm font-medium text-[var(--crm-text-primary)] hover:text-[var(--crm-accent-text)] transition-colors"
                      >
                        {p.name}
                      </Link>
                      {p.description && (
                        <p className="text-xs text-[var(--crm-text-muted)] mt-0.5 truncate max-w-[200px]">
                          {p.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {p.code ? (
                        <span className="font-mono text-xs bg-[var(--crm-bg-subtle)] border border-[var(--crm-border-subtle)] px-2 py-1 rounded-md text-[var(--crm-text-primary)]">
                          {p.code}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--crm-text-muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-secondary)]">
                      {promotionTypeLabel(p.type)}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold text-[var(--crm-text-primary)]">
                      {p.type === "PERCENTAGE"
                        ? `${Number(p.value)}%`
                        : fmtVND(Number(p.value))}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--crm-text-secondary)]">
                      {p.usageCount}
                      {p.usageLimit ? (
                        <span className="text-[var(--crm-text-muted)]"> / {p.usageLimit}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-[var(--crm-text-secondary)]">
                        {fmtDate(p.startDate)}
                      </div>
                      <div className="text-xs text-[var(--crm-text-muted)]">
                        → {fmtDate(p.endDate)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: color + "20", color }}
                      >
                        {label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
}
