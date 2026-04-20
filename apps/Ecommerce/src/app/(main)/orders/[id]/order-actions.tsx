"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNextStatuses } from "@/lib/order-engine";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Xác nhận",
  PROCESSING: "Xử lý",
  SHIPPED: "Giao hàng",
  DELIVERED: "Đã giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Hủy đơn",
  REFUNDED: "Hoàn tiền",
  RETURNED: "Trả hàng",
};

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  CONFIRMED:  { bg: "#3b82f6", text: "#fff" },
  PROCESSING: { bg: "#8b5cf6", text: "#fff" },
  SHIPPED:    { bg: "#06b6d4", text: "#fff" },
  DELIVERED:  { bg: "#10b981", text: "#fff" },
  COMPLETED:  { bg: "#059669", text: "#fff" },
  CANCELLED:  { bg: "#ef4444", text: "#fff" },
  REFUNDED:   { bg: "#f97316", text: "#fff" },
  RETURNED:   { bg: "#ec4899", text: "#fff" },
};

export default function OrderActions({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nextStatuses = getNextStatuses(currentStatus as any);

  async function updateStatus(newStatus: string) {
    if (!confirm(`Chuyển đơn hàng sang "${STATUS_LABELS[newStatus]}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "Lỗi cập nhật trạng thái");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (nextStatuses.length === 0) return null;

  return (
    <div className="flex gap-2">
      {nextStatuses.map((s) => {
        const style = STATUS_STYLES[s] ?? { bg: "#6b7280", text: "#fff" };
        return (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            disabled={loading}
            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity disabled:opacity-60"
            style={{ background: style.bg, color: style.text }}
          >
            {STATUS_LABELS[s] ?? s}
          </button>
        );
      })}
    </div>
  );
}
