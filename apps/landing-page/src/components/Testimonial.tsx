"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CircuitBackground from "./CircuitBackground";

export default function Testimonial() {
  return (
    <section id="customers" className="py-[80px] md:py-[140px] bg-bg relative overflow-hidden">
      <CircuitBackground variant="testimonial" className="opacity-40" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10">
        <ScrollReveal className="max-w-[900px] mx-auto text-center">
          <p className="text-[12px] text-white tracking-[0.08em] uppercase mb-12 font-medium">Khách hàng nói gì</p>

          <blockquote className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.2] mb-10 gradient-text">
            &ldquo;VietERP là nền tảng ERP đầu tiên thực sự thiết kế cho doanh nghiệp Việt Nam. Từ kế toán VAS đến BHXH, AI Copilot đến thanh toán VNPay — mọi thứ đều sẵn sàng.&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center">
              <span className="text-[16px] font-bold text-white">NT</span>
            </div>
            <div className="text-left">
              <p className="text-[14px] font-semibold text-text-primary">Nguyễn Thanh</p>
              <p className="text-[12px] text-text-tertiary">Giám đốc Công nghệ, Tập đoàn Sản xuất</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "Triển khai VietERP cho nhà máy 500 nhân viên trong 2 tuần. Module MRP và HRM tích hợp hoàn hảo, tiết kiệm 40% thời gian quản lý so với hệ thống cũ.",
              name: "Trần Văn Minh",
              role: "Giám đốc Vận hành, Công ty Sản xuất",
              initials: "TM",
              modules: ["Accounting", "MRP", "HRM"],
              category: "Core",
              color: "#22c55e",
            },
            {
              quote: "Module Ecommerce tích hợp VNPay/MoMo sẵn, OTB planning cho Retail cực kỳ chính xác. AI Copilot giúp team phân tích dữ liệu nhanh gấp 3 lần.",
              name: "Lê Hoàng Anh",
              role: "Giám đốc Kinh doanh, Chuỗi Bán lẻ",
              initials: "LA",
              modules: ["Ecommerce", "OTB", "CRM"],
              category: "Commerce",
              color: "#06b6d4",
            },
            {
              quote: "Dashboard real-time, báo cáo tài chính tự động theo VAS TT200, hoá đơn điện tử NĐ123 — kế toán tiết kiệm 60% thời gian mỗi tháng.",
              name: "Phạm Thị Hương",
              role: "Kế toán trưởng, Công ty Dịch vụ",
              initials: "PH",
              modules: ["Accounting", "PM", "ExcelAI"],
              category: "Operations",
              color: "#8b5cf6",
            },
          ].map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.12)" }}
                transition={{ duration: 0.2 }}
                className="p-6 border border-border bg-bg-secondary hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] px-2 py-0.5 font-medium" style={{ backgroundColor: `${t.color}15`, color: t.color }}>{t.category}</span>
                </div>
                <p className="text-[14px] text-text-secondary leading-[1.7] mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: `${t.color}20` }}>
                    <span className="text-[10px] font-bold" style={{ color: t.color }}>{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-text-primary">{t.name}</p>
                    <p className="text-[11px] text-text-tertiary">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {t.modules.map((p) => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-bg-tertiary text-text-tertiary font-medium">{p}</span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
