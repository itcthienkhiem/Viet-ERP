import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format VND */
export function fmtVND(amount: number | null | undefined): string {
  if (amount == null) return "—";
  const rounded = Math.round(amount);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
}

/** Format date dd/MM/yyyy */
export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "—";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Format datetime */
export function fmtDateTime(d: Date | string | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "—";
  return `${fmtDate(date)} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Order status label + color */
export function orderStatusLabel(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    PENDING:    { label: "Chờ xác nhận", color: "#f59e0b" },
    CONFIRMED:  { label: "Đã xác nhận",  color: "#3b82f6" },
    PROCESSING: { label: "Đang xử lý",   color: "#8b5cf6" },
    SHIPPED:    { label: "Đang giao",     color: "#06b6d4" },
    DELIVERED:  { label: "Đã giao",       color: "#10b981" },
    COMPLETED:  { label: "Hoàn thành",    color: "#059669" },
    CANCELLED:  { label: "Đã hủy",        color: "#ef4444" },
    REFUNDED:   { label: "Đã hoàn tiền",  color: "#f97316" },
    RETURNED:   { label: "Trả hàng",      color: "#ec4899" },
  };
  return map[status] ?? { label: status, color: "#6b7280" };
}

/** Product status label */
export function productStatusLabel(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    DRAFT:        { label: "Nháp",        color: "#6b7280" },
    ACTIVE:       { label: "Đang bán",    color: "#10b981" },
    OUT_OF_STOCK: { label: "Hết hàng",    color: "#f59e0b" },
    DISCONTINUED: { label: "Ngừng bán",   color: "#ef4444" },
    ARCHIVED:     { label: "Lưu trữ",     color: "#9ca3af" },
  };
  return map[status] ?? { label: status, color: "#6b7280" };
}

/** Payment method label */
export function paymentMethodLabel(method: string): string {
  const map: Record<string, string> = {
    COD:           "Tiền mặt (COD)",
    BANK_TRANSFER: "Chuyển khoản",
    MOMO:          "Ví MoMo",
    VNPAY:         "VNPay",
    ZALOPAY:       "ZaloPay",
    CREDIT_CARD:   "Thẻ tín dụng",
    DEBIT_CARD:    "Thẻ ghi nợ",
    INSTALLMENT:   "Trả góp",
    WALLET:        "Ví điện tử",
  };
  return map[method] ?? method;
}

/** Promotion type label */
export function promotionTypeLabel(type: string): string {
  const map: Record<string, string> = {
    PERCENTAGE:   "Giảm %",
    FIXED_AMOUNT: "Giảm tiền",
    FREE_SHIPPING: "Miễn ship",
    BUY_X_GET_Y:  "Mua X tặng Y",
    BUNDLE_PRICE: "Giá combo",
  };
  return map[type] ?? type;
}

/** Promotion status label */
export function promotionStatusLabel(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    DRAFT:     { label: "Nháp",      color: "#6b7280" },
    SCHEDULED: { label: "Lên lịch",  color: "#3b82f6" },
    ACTIVE:    { label: "Đang chạy", color: "#10b981" },
    PAUSED:    { label: "Tạm dừng",  color: "#f59e0b" },
    EXPIRED:   { label: "Hết hạn",   color: "#94a3b8" },
    CANCELLED: { label: "Đã hủy",    color: "#ef4444" },
  };
  return map[status] ?? { label: status, color: "#6b7280" };
}

/** Storefront status label */
export function storefrontStatusLabel(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    ACTIVE:      { label: "Hoạt động", color: "#10b981" },
    MAINTENANCE: { label: "Bảo trì",   color: "#f59e0b" },
    SUSPENDED:   { label: "Tạm dừng",  color: "#ef4444" },
    CLOSED:      { label: "Đóng",      color: "#6b7280" },
  };
  return map[status] ?? { label: status, color: "#6b7280" };
}
