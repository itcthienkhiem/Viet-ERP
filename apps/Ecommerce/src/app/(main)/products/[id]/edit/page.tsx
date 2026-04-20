"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

const PRODUCT_TYPES = [
  { value: "PHYSICAL", label: "Vật lý" },
  { value: "DIGITAL", label: "Kỹ thuật số" },
  { value: "SERVICE", label: "Dịch vụ" },
  { value: "BUNDLE", label: "Combo" },
  { value: "SUBSCRIPTION", label: "Đăng ký" },
];

const PRODUCT_STATUSES = [
  { value: "DRAFT", label: "Nháp" },
  { value: "ACTIVE", label: "Đang bán" },
  { value: "OUT_OF_STOCK", label: "Hết hàng" },
  { value: "DISCONTINUED", label: "Ngừng bán" },
  { value: "ARCHIVED", label: "Lưu trữ" },
];

const VAT_RATES = [
  { value: "0", label: "0%" },
  { value: "5", label: "5%" },
  { value: "8", label: "8%" },
  { value: "10", label: "10%" },
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[var(--crm-text-secondary)]">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"),
      sku: form.get("sku"),
      type: form.get("type"),
      status: form.get("status"),
      basePrice: form.get("basePrice"),
      salePrice: form.get("salePrice") || null,
      costPrice: form.get("costPrice") || null,
      vatRate: form.get("vatRate") || "10",
      description: form.get("description"),
      shortDescription: form.get("shortDescription"),
      metaTitle: form.get("metaTitle"),
      metaDescription: form.get("metaDescription"),
      trackInventory: form.get("trackInventory") === "on",
      stockQuantity: parseInt(form.get("stockQuantity") as string) || 0,
      lowStockAlert: parseInt(form.get("lowStockAlert") as string) || 5,
    };

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Lỗi cập nhật sản phẩm");
      }
      router.push(`/products/${params.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <PageShell title="Chỉnh sửa sản phẩm">
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[rgb(var(--accent-rgb))] border-t-transparent rounded-full animate-spin" />
        </div>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell title="Không tìm thấy sản phẩm">
        <Link href="/products" className="text-sm text-[var(--crm-accent-text)] hover:underline">
          ← Quay lại danh sách
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`Sửa: ${product.name}`}
      actions={
        <Link
          href={`/products/${params.id}`}
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

      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <SectionCard title="Thông tin cơ bản">
          <div className="space-y-4">
            <Field label="Tên sản phẩm" required>
              <Input name="name" required defaultValue={product.name} />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="SKU" required>
                <Input name="sku" required defaultValue={product.sku} />
              </Field>
              <Field label="Loại sản phẩm">
                <Select name="type" defaultValue={product.type}>
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Trạng thái">
                <Select name="status" defaultValue={product.status}>
                  {PRODUCT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field label="Mô tả ngắn">
              <Input name="shortDescription" defaultValue={product.shortDescription ?? ""} />
            </Field>
            <Field label="Mô tả chi tiết">
              <textarea
                name="description"
                rows={4}
                defaultValue={product.description ?? ""}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Giá bán">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Giá gốc (VNĐ)" required>
              <Input name="basePrice" type="number" required min="0" defaultValue={Number(product.basePrice)} />
            </Field>
            <Field label="Giá khuyến mãi">
              <Input name="salePrice" type="number" min="0" defaultValue={product.salePrice ? Number(product.salePrice) : ""} />
            </Field>
            <Field label="Giá vốn">
              <Input name="costPrice" type="number" min="0" defaultValue={product.costPrice ? Number(product.costPrice) : ""} />
            </Field>
            <Field label="VAT (%)">
              <Select name="vatRate" defaultValue={String(Number(product.vatRate))}>
                {VAT_RATES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </Select>
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Tồn kho">
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="trackInventory"
                id="trackInventory"
                defaultChecked={product.trackInventory}
                className="w-4 h-4 rounded border-[var(--crm-border)] accent-[rgb(var(--accent-rgb))]"
              />
              <span className="text-sm text-[var(--crm-text-secondary)]">Theo dõi tồn kho</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Số lượng tồn kho">
                <Input name="stockQuantity" type="number" min="0" defaultValue={product.stockQuantity} />
              </Field>
              <Field label="Cảnh báo tồn kho thấp">
                <Input name="lowStockAlert" type="number" min="0" defaultValue={product.lowStockAlert} />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="SEO">
          <div className="space-y-4">
            <Field label="Meta Title">
              <Input name="metaTitle" defaultValue={product.metaTitle ?? ""} />
            </Field>
            <Field label="Meta Description">
              <textarea
                name="metaDescription"
                rows={2}
                defaultValue={product.metaDescription ?? ""}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading} className="btn-accent-glow gap-2">
            <Save className="w-4 h-4" />
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
          <Link
            href={`/products/${params.id}`}
            className="px-4 py-2 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] border border-[var(--crm-border)] rounded-md hover:bg-[var(--glass-bg-hover)] transition-colors"
          >
            Hủy
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
