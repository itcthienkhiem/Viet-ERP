"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

const DISCOUNT_TYPES = [
  { value: "PERCENTAGE", label: "Giảm theo % (VD: 10%)" },
  { value: "FIXED_AMOUNT", label: "Giảm số tiền cố định (VD: 50.000đ)" },
  { value: "FREE_SHIPPING", label: "Miễn phí vận chuyển" },
  { value: "BUY_X_GET_Y", label: "Mua X tặng Y" },
  { value: "BUNDLE_PRICE", label: "Giá combo" },
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card-static p-5">
      <h2 className="text-sm font-semibold text-[var(--crm-text-primary)] mb-4 pb-3 border-b border-[var(--glass-border)]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[var(--crm-text-secondary)]">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[var(--crm-text-muted)]">{hint}</p>}
    </div>
  );
}

export default function NewPromotionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("PERCENTAGE");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      tenantId: "default",
      name: form.get("name"),
      description: form.get("description") || null,
      code: form.get("code") || null,
      type: form.get("type"),
      value: parseFloat(form.get("value") as string) || 0,
      maxDiscount: form.get("maxDiscount") ? parseFloat(form.get("maxDiscount") as string) : null,
      minOrderAmount: form.get("minOrderAmount") ? parseFloat(form.get("minOrderAmount") as string) : null,
      minQuantity: form.get("minQuantity") ? parseInt(form.get("minQuantity") as string) : null,
      usageLimit: form.get("usageLimit") ? parseInt(form.get("usageLimit") as string) : null,
      perCustomerLimit: form.get("perCustomerLimit") ? parseInt(form.get("perCustomerLimit") as string) : null,
      startDate: form.get("startDate"),
      endDate: form.get("endDate"),
      buyQuantity: form.get("buyQuantity") ? parseInt(form.get("buyQuantity") as string) : null,
      getQuantity: form.get("getQuantity") ? parseInt(form.get("getQuantity") as string) : null,
    };

    try {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Lỗi tạo khuyến mãi");
      }
      const promo = await res.json();
      router.push(`/promotions/${promo.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  return (
    <PageShell
      title="Tạo khuyến mãi mới"
      actions={
        <Link
          href="/promotions"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
      }
    >
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <SectionCard title="Thông tin cơ bản">
          <div className="space-y-4">
            <Field label="Tên chương trình" required>
              <Input name="name" required placeholder="VD: Giảm 10% cho đơn từ 500k" />
            </Field>
            <Field label="Mô tả">
              <textarea
                name="description"
                rows={2}
                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </Field>
            <Field label="Mã coupon" hint="Để trống nếu không cần mã coupon (áp dụng tự động)">
              <Input name="code" placeholder="VD: SALE10, FREESHIP" className="uppercase" />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Loại & Giá trị giảm">
          <div className="space-y-4">
            <Field label="Loại khuyến mãi" required>
              <Select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {DISCOUNT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </Select>
            </Field>

            {type !== "FREE_SHIPPING" && (
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label={type === "PERCENTAGE" ? "Phần trăm giảm (%)" : type === "BUNDLE_PRICE" ? "Giá combo (VNĐ)" : "Số tiền giảm (VNĐ)"}
                  required
                >
                  <Input
                    name="value"
                    type="number"
                    required
                    min="0"
                    placeholder={type === "PERCENTAGE" ? "10" : "50000"}
                  />
                </Field>
                {type === "PERCENTAGE" && (
                  <Field label="Giảm tối đa (VNĐ)" hint="Để trống = không giới hạn">
                    <Input name="maxDiscount" type="number" min="0" placeholder="200000" />
                  </Field>
                )}
              </div>
            )}

            {type === "BUY_X_GET_Y" && (
              <div className="grid grid-cols-2 gap-4">
                <Field label="Mua X sản phẩm">
                  <Input name="buyQuantity" type="number" min="1" defaultValue="2" />
                </Field>
                <Field label="Tặng Y sản phẩm">
                  <Input name="getQuantity" type="number" min="1" defaultValue="1" />
                </Field>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Điều kiện áp dụng">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Đơn hàng tối thiểu (VNĐ)">
              <Input name="minOrderAmount" type="number" min="0" placeholder="500000" />
            </Field>
            <Field label="Số lượng sản phẩm tối thiểu">
              <Input name="minQuantity" type="number" min="0" placeholder="1" />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Giới hạn sử dụng">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tổng lượt dùng" hint="Để trống = không giới hạn">
              <Input name="usageLimit" type="number" min="0" placeholder="100" />
            </Field>
            <Field label="Lượt dùng / khách" hint="Để trống = không giới hạn">
              <Input name="perCustomerLimit" type="number" min="0" placeholder="1" />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Thời gian hiệu lực">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ngày bắt đầu" required>
              <Input name="startDate" type="date" required defaultValue={today} />
            </Field>
            <Field label="Ngày kết thúc" required>
              <Input name="endDate" type="date" required defaultValue={nextMonth} />
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading} className="btn-accent-glow gap-2">
            <Save className="w-4 h-4" />
            {loading ? "Đang tạo..." : "Tạo khuyến mãi"}
          </Button>
          <Link
            href="/promotions"
            className="px-4 py-2 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] border border-[var(--crm-border)] rounded-md hover:bg-[var(--glass-bg-hover)] transition-colors"
          >
            Hủy
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
