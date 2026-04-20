import prisma from "@/lib/db";
import { fmtVND, fmtDate, fmtDateTime, promotionStatusLabel, promotionTypeLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PromotionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const promotion = await prisma.promotion.findUnique({
    where: { id: params.id },
  });

  if (!promotion) notFound();

  const now = new Date();
  const isExpired = promotion.endDate < now && promotion.status === "ACTIVE";
  const displayStatus = isExpired ? "EXPIRED" : promotion.status;
  const { label, color } = promotionStatusLabel(displayStatus);

  const usagePct =
    promotion.usageLimit && promotion.usageLimit > 0
      ? Math.min(100, Math.round((promotion.usageCount / promotion.usageLimit) * 100))
      : null;

  return (
    <PageShell
      title={promotion.name}
      description={promotionTypeLabel(promotion.type)}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/promotions"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card-static p-5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--glass-border)]">
              <div className="w-12 h-12 rounded-xl bg-[rgba(var(--accent-rgb),0.1)] flex items-center justify-center">
                <Tag className="w-6 h-6 text-[var(--crm-accent-text)]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--crm-text-primary)]">
                  {promotion.name}
                </h2>
                {promotion.description && (
                  <p className="text-sm text-[var(--crm-text-secondary)] mt-0.5">
                    {promotion.description}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Loại", value: promotionTypeLabel(promotion.type) },
                {
                  label: "Giá trị",
                  value:
                    promotion.type === "PERCENTAGE"
                      ? `${Number(promotion.value)}%`
                      : fmtVND(Number(promotion.value)),
                  mono: true,
                },
                {
                  label: "Giảm tối đa",
                  value: promotion.maxDiscount ? fmtVND(Number(promotion.maxDiscount)) : "—",
                  mono: true,
                },
                {
                  label: "Đơn tối thiểu",
                  value: promotion.minOrderAmount
                    ? fmtVND(Number(promotion.minOrderAmount))
                    : "—",
                  mono: true,
                },
                {
                  label: "SL tối thiểu",
                  value: promotion.minQuantity ? `${promotion.minQuantity} sản phẩm` : "—",
                },
                { label: "Ngày bắt đầu", value: fmtDate(promotion.startDate) },
                { label: "Ngày kết thúc", value: fmtDate(promotion.endDate) },
                { label: "Ngày tạo", value: fmtDateTime(promotion.createdAt) },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-[var(--crm-text-muted)] mb-1">{row.label}</p>
                  <p
                    className={`text-sm font-medium text-[var(--crm-text-primary)] ${
                      row.mono ? "font-mono" : ""
                    }`}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            {promotion.type === "BUY_X_GET_Y" && (
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-xs text-[var(--crm-text-muted)] mb-2">Điều kiện Mua X Tặng Y</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--crm-accent-text)]">
                      {promotion.buyQuantity ?? "?"}
                    </p>
                    <p className="text-xs text-[var(--crm-text-muted)]">Mua</p>
                  </div>
                  <div className="text-[var(--crm-text-muted)]">→</div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">
                      {promotion.getQuantity ?? "?"}
                    </p>
                    <p className="text-xs text-[var(--crm-text-muted)]">Tặng</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Coupon code */}
          {promotion.code && (
            <div className="glass-card-static p-4">
              <p className="text-xs text-[var(--crm-text-muted)] mb-2">Mã coupon</p>
              <div className="flex items-center justify-center py-3 bg-[var(--crm-bg-subtle)] rounded-lg border border-dashed border-[var(--crm-border)]">
                <span className="font-mono text-lg font-bold text-[var(--crm-accent-text)] tracking-widest">
                  {promotion.code}
                </span>
              </div>
            </div>
          )}

          {/* Usage stats */}
          <div className="glass-card-static p-4">
            <p className="text-xs text-[var(--crm-text-muted)] mb-3">Thống kê sử dụng</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs text-[var(--crm-text-secondary)]">Đã dùng</span>
                  <span className="text-xs font-semibold text-[var(--crm-text-primary)]">
                    {promotion.usageCount}
                    {promotion.usageLimit ? ` / ${promotion.usageLimit}` : ""}
                  </span>
                </div>
                {usagePct !== null && (
                  <div className="h-2 bg-[var(--crm-border-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${usagePct}%`,
                        background:
                          usagePct >= 90
                            ? "#ef4444"
                            : usagePct >= 70
                            ? "#f59e0b"
                            : "rgb(var(--accent-rgb))",
                      }}
                    />
                  </div>
                )}
              </div>
              {promotion.perCustomerLimit && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--crm-text-muted)]">Giới hạn / khách</span>
                  <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                    {promotion.perCustomerLimit} lần
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Time remaining */}
          <div className="glass-card-static p-4">
            <p className="text-xs text-[var(--crm-text-muted)] mb-2">Thời gian</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Bắt đầu</span>
                <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                  {fmtDate(promotion.startDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Kết thúc</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: isExpired ? "#ef4444" : "var(--crm-text-primary)" }}
                >
                  {fmtDate(promotion.endDate)}
                </span>
              </div>
              {!isExpired && promotion.endDate > now && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--crm-text-muted)]">Còn lại</span>
                  <span className="text-xs font-semibold text-emerald-400">
                    {Math.ceil(
                      (promotion.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    ngày
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
