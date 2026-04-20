import { categories, coreModules, commerceModules, operationsModules, intelligenceModules } from "@/data/modules";
import { config } from "@/lib/config";

export default function Footer() {
  const categoryGroups = [
    { cat: categories.core, mods: coreModules },
    { cat: categories.commerce, mods: commerceModules },
    { cat: categories.operations, mods: operationsModules },
    { cat: categories.intelligence, mods: intelligenceModules },
  ];

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-3">
            <div className="mb-4">
              <span className="font-semibold text-[15px] tracking-[-0.02em] text-text-primary">VietERP</span>
            </div>
            <p className="text-[12px] text-text-tertiary leading-[1.7] max-w-[240px] mb-4">
              Nền tảng ERP AI-Native toàn diện cho doanh nghiệp Việt Nam. 14 modules, triển khai nhanh, vận hành ngay.
            </p>
            <div className="flex gap-2 mt-4">
              <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-bg-tertiary hover:bg-bg-elevated transition-colors text-[10px] text-text-tertiary font-medium" title="LinkedIn">in</a>
              <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-bg-tertiary hover:bg-bg-elevated transition-colors text-[10px] text-text-tertiary font-medium" title="YouTube">YT</a>
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {categoryGroups.map(({ cat, mods }) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2" style={{ backgroundColor: cat.color }} />
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary">{cat.name}</h4>
                  </div>
                  <ul className="space-y-2">
                    {mods.map((mod) => (
                      <li key={mod.id}>
                        <span className="text-[13px] text-text-secondary leading-relaxed hover:text-text-primary transition-colors cursor-default">{mod.shortName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary mb-3">Sản phẩm</h4>
            <ul className="space-y-2">
              {[
                { label: "Tính năng", href: "#features" },
                { label: "Bảng giá", href: "#pricing" },
                { label: "Tài liệu hướng dẫn", href: "#docs" },
                { label: "Lộ trình phát triển", href: "#roadmap" },
              ].map((link) => (
                <li key={link.label}><a href={link.href} className="text-[13px] text-text-secondary leading-relaxed hover:text-text-primary transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary mb-3">Hỗ trợ</h4>
            <ul className="space-y-2">
              {[
                { label: "Trung tâm hỗ trợ", href: "#support" },
                { label: "Đặt lịch tư vấn", href: "mailto:sales@vierp.dev" },
                { label: "Cộng đồng người dùng", href: "#community" },
              ].map((link) => (
                <li key={link.label}><a href={link.href} className="text-[13px] text-text-secondary leading-relaxed hover:text-text-primary transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary mb-3">Tech Stack</h4>
            <ul className="space-y-2">
              {["Next.js 14", "TypeScript 5", "PostgreSQL 16", "Prisma ORM", "Tailwind CSS", "Docker + K8s"].map((t) => (
                <li key={t}><span className="text-[13px] text-text-secondary leading-relaxed">{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text-tertiary mb-3">Liên hệ</h4>
            <ul className="space-y-2">
              <li><a href={`mailto:${config.email.hello}`} className="text-[13px] text-text-secondary leading-relaxed hover:text-text-primary transition-colors">{config.email.hello}</a></li>
              <li><a href={`mailto:${config.email.sales}`} className="text-[13px] text-text-secondary leading-relaxed hover:text-text-primary transition-colors">{config.email.sales}</a></li>
              <li><span className="text-[13px] text-text-secondary leading-relaxed">Hotline: 1800 xxxx</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-tertiary uppercase tracking-[0.1em]">© 2026 VIET-ERP. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] text-text-tertiary/50 tracking-[0.02em]">
            Nền tảng ERP AI-Native cho Doanh nghiệp Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
