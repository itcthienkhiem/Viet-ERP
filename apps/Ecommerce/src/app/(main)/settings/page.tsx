import { PageShell } from "@/components/layout/PageShell";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageShell
      title="Cài đặt"
      description="Cấu hình hệ thống Ecommerce"
    >
      <div className="glass-card-static py-16 text-center">
        <Settings className="w-14 h-14 mx-auto mb-4 text-[var(--crm-text-muted)] opacity-30" />
        <p className="text-base font-semibold text-[var(--crm-text-primary)] mb-1">
          Cài đặt hệ thống
        </p>
        <p className="text-sm text-[var(--crm-text-muted)]">
          Tính năng đang được phát triển
        </p>
      </div>
    </PageShell>
  );
}
