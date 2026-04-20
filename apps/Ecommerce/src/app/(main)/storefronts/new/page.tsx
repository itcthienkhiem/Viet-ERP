"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

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

export default function NewStorefrontPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const data = {
      tenantId: "default",
      name,
      slug: form.get("slug") || slug,
      domain: form.get("domain") || null,
      description: form.get("description") || null,
      currency: form.get("currency") || "VND",
      locale: form.get("locale") || "vi-VN",
      metaTitle: form.get("metaTitle") || null,
      metaDescription: form.get("metaDescription") || null,
    };

    try {
      const res = await fetch("/api/storefronts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Lỗi tạo cửa hàng");
      }
      const sf = await res.json();
      router.push(`/storefronts/${sf.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Tạo cửa hàng mới"
      actions={
        <Link
          href="/storefronts"
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
            <Field label="Tên cửa hàng" required>
              <Input name="name" required placeholder="VD: Shop Thời Trang ABC" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Slug (URL)">
                <Input name="slug" placeholder="shop-thoi-trang-abc" />
              </Field>
              <Field label="Domain tùy chỉnh">
                <Input name="domain" placeholder="shop.example.com" />
              </Field>
            </div>
            <Field label="Mô tả">
              <textarea
                name="description"
                rows={3}
                placeholder="Mô tả về cửa hàng..."
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Cài đặt">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tiền tệ">
              <Select name="currency" defaultValue="VND">
                <option value="VND">VND — Việt Nam Đồng</option>
                <option value="USD">USD — US Dollar</option>
              </Select>
            </Field>
            <Field label="Ngôn ngữ">
              <Select name="locale" defaultValue="vi-VN">
                <option value="vi-VN">Tiếng Việt</option>
                <option value="en-US">English</option>
              </Select>
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="SEO">
          <div className="space-y-4">
            <Field label="Meta Title">
              <Input name="metaTitle" placeholder="Tiêu đề SEO" />
            </Field>
            <Field label="Meta Description">
              <textarea
                name="metaDescription"
                rows={2}
                placeholder="Mô tả SEO"
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading} className="btn-accent-glow gap-2">
            <Save className="w-4 h-4" />
            {loading ? "Đang tạo..." : "Tạo cửa hàng"}
          </Button>
          <Link
            href="/storefronts"
            className="px-4 py-2 text-sm text-[var(--crm-text-secondary)] hover:text-[var(--crm-text-primary)] border border-[var(--crm-border)] rounded-md hover:bg-[var(--glass-bg-hover)] transition-colors"
          >
            Hủy
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
