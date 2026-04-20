import prisma from "@/lib/db";
import { fmtVND, fmtDateTime, orderStatusLabel, paymentMethodLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderActions from "./order-actions";
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      lines: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
      payments: { orderBy: { createdAt: "desc" } },
      shipments: { orderBy: { createdAt: "desc" } },
      timeline: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!order) notFound();

  const { label, color } = orderStatusLabel(order.status);
  const shippingAddr = order.shippingAddress as any;

  return (
    <PageShell
      title={order.orderNumber}
      description={`Tạo lúc ${fmtDateTime(order.createdAt)}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: color + "20", color }}
          >
            {label}
          </span>
          <OrderActions orderId={order.id} currentStatus={order.status} />
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order lines */}
          <div className="glass-card-static overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--glass-border)]">
              <Package className="w-4 h-4 text-[var(--crm-accent-text)]" />
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                Sản phẩm ({order.lines.length})
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  {["Sản phẩm", "Đơn giá", "SL", "VAT", "Thành tiền"].map((h) => (
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
                {order.lines.map((line) => (
                  <tr
                    key={line.id}
                    className="border-b border-[var(--crm-border-subtle)] hover:bg-[var(--glass-bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-[var(--crm-text-primary)]">
                        {line.productName}
                      </div>
                      <div className="text-xs text-[var(--crm-text-muted)] font-mono mt-0.5">
                        {line.sku}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-[var(--crm-text-secondary)]">
                      {fmtVND(Number(line.unitPrice))}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--crm-text-primary)]">
                      {line.quantity}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--crm-text-muted)]">
                      {Number(line.taxRate)}%
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold text-[var(--crm-text-primary)]">
                      {fmtVND(Number(line.lineTotal))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="px-5 py-4 border-t border-[var(--glass-border)] bg-[var(--crm-bg-subtle)] space-y-2">
              {[
                { label: "Tạm tính", value: fmtVND(Number(order.subtotal)) },
                { label: "VAT", value: fmtVND(Number(order.taxAmount)) },
                { label: "Phí vận chuyển", value: fmtVND(Number(order.shippingFee)) },
                {
                  label: "Giảm giá",
                  value: Number(order.discount) > 0 ? `-${fmtVND(Number(order.discount))}` : "—",
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm text-[var(--crm-text-secondary)]">
                  <span>{row.label}</span>
                  <span className="font-mono">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-[var(--glass-border)] text-base font-bold text-[var(--crm-text-primary)]">
                <span>Tổng cộng</span>
                <span className="font-mono text-[var(--crm-accent-text)]">
                  {fmtVND(Number(order.total))}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {order.timeline.length > 0 && (
            <div className="glass-card-static p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[var(--crm-accent-text)]" />
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Lịch sử đơn hàng
                </h2>
              </div>
              <div className="relative pl-5">
                {order.timeline.map((t, i) => (
                  <div key={t.id} className="relative pb-4">
                    <div
                      className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--crm-bg-card)]"
                      style={{
                        background: i === 0 ? "rgb(var(--accent-rgb))" : "var(--crm-border)",
                      }}
                    />
                    {i < order.timeline.length - 1 && (
                      <div className="absolute -left-[17px] top-3.5 bottom-0 w-px bg-[var(--crm-border-subtle)]" />
                    )}
                    <div className="text-sm font-medium text-[var(--crm-text-primary)]">
                      {t.status}
                    </div>
                    {t.note && (
                      <div className="text-xs text-[var(--crm-text-secondary)] mt-0.5">
                        {t.note}
                      </div>
                    )}
                    <div className="text-xs text-[var(--crm-text-muted)] mt-0.5">
                      {fmtDateTime(t.createdAt)}
                      {t.actor && ` · ${t.actor}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Customer info */}
          <div className="glass-card-static p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[rgba(var(--accent-rgb),0.1)] flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--crm-accent-text)]">
                  {order.customerName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                Khách hàng
              </h2>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-[var(--crm-text-primary)]">
                {order.customerName}
              </p>
              <p className="text-xs text-[var(--crm-text-secondary)]">
                📞 {order.customerPhone}
              </p>
              {order.customerEmail && (
                <p className="text-xs text-[var(--crm-text-secondary)]">
                  ✉️ {order.customerEmail}
                </p>
              )}
            </div>
          </div>

          {/* Shipping address */}
          {shippingAddr && (
            <div className="glass-card-static p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[var(--crm-accent-text)]" />
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Địa chỉ giao hàng
                </h2>
              </div>
              <div className="text-xs text-[var(--crm-text-secondary)] space-y-0.5 leading-relaxed">
                <p className="font-medium text-[var(--crm-text-primary)]">
                  {shippingAddr.fullName ?? order.customerName}
                </p>
                <p>{shippingAddr.street}</p>
                <p>
                  {shippingAddr.ward}, {shippingAddr.district}
                </p>
                <p>{shippingAddr.city ?? shippingAddr.province}</p>
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="glass-card-static p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-[var(--crm-accent-text)]" />
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                Thanh toán
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-[var(--crm-text-muted)]">Phương thức</span>
                <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                  {paymentMethodLabel(order.paymentMethod)}
                </span>
              </div>
              {order.payments.map((p) => (
                <div key={p.id} className="flex justify-between">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        p.status === "CAPTURED"
                          ? "#10b98120"
                          : p.status === "FAILED"
                          ? "#ef444420"
                          : "#f59e0b20",
                      color:
                        p.status === "CAPTURED"
                          ? "#10b981"
                          : p.status === "FAILED"
                          ? "#ef4444"
                          : "#f59e0b",
                    }}
                  >
                    {p.status}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[var(--crm-text-primary)]">
                    {fmtVND(Number(p.amount))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment */}
          {order.shipments.length > 0 && (
            <div className="glass-card-static p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-[var(--crm-accent-text)]" />
                <h2 className="text-sm font-semibold text-[var(--crm-text-primary)]">
                  Vận chuyển
                </h2>
              </div>
              {order.shipments.map((s) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-[var(--crm-text-muted)]">Đơn vị</span>
                    <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                      {s.provider}
                    </span>
                  </div>
                  {s.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-xs text-[var(--crm-text-muted)]">Mã vận đơn</span>
                      <span className="text-xs font-mono text-[var(--crm-accent-text)]">
                        {s.trackingNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-xs text-[var(--crm-text-muted)]">Trạng thái</span>
                    <span className="text-xs font-medium text-[var(--crm-text-primary)]">
                      {s.status}
                    </span>
                  </div>
                  {s.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-xs text-[var(--crm-text-muted)]">Dự kiến giao</span>
                      <span className="text-xs text-[var(--crm-text-secondary)]">
                        {fmtDateTime(s.estimatedDelivery)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="glass-card-static p-4">
              <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-2">
                Ghi chú
              </h2>
              <p className="text-xs text-[var(--crm-text-secondary)]">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
