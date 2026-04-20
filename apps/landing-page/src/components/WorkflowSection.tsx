"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CircuitBackground from "./CircuitBackground";
import { ArrowRight, UserCheck, Settings, BarChart3, Rocket } from "lucide-react";

const workflowSteps = [
  { icon: UserCheck, label: "Đăng ký & Onboard", desc: "Tạo tài khoản, cấu hình doanh nghiệp trong 15 phút", colorClass: "text-[#8b5cf6]", bgClass: "bg-[#8b5cf6]/15" },
  { icon: Settings, label: "Cấu hình Module", desc: "Chọn modules phù hợp, import dữ liệu từ Excel/CSV", colorClass: "text-[#06b6d4]", bgClass: "bg-[#06b6d4]/15" },
  { icon: BarChart3, label: "Vận hành & Phân tích", desc: "Dashboard real-time, AI insights, báo cáo tự động", colorClass: "text-[#22c55e]", bgClass: "bg-[#22c55e]/15" },
  { icon: Rocket, label: "Scale & Tăng trưởng", desc: "Nâng gói, thêm users, mở rộng modules khi cần", colorClass: "text-[#f59e0b]", bgClass: "bg-[#f59e0b]/15" },
];

export default function WorkflowSection() {
  return (
    <section className="py-[80px] md:py-[120px] relative overflow-hidden">
      <CircuitBackground variant="workflow" className="opacity-50" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <p className="text-[12px] text-white tracking-[0.08em] uppercase font-medium mb-4">
              Triển khai trong 15 phút
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-5">
              <span className="gradient-text">Đăng ký. Cấu hình. Vận hành.</span>
              <br />
              <span className="text-text-tertiary">Sẵn sàng trong 15 phút.</span>
            </h2>
            <p className="text-[15px] text-text-secondary leading-[1.7] mb-6 max-w-[420px]">
              Không cần cài đặt phần mềm, không cần đội IT. Truy cập trình duyệt, đăng ký, import dữ liệu và bắt đầu vận hành ngay.
            </p>
            <ul className="space-y-2 mb-6">
              {["Cloud-based, truy cập mọi nơi, mọi thiết bị", "Import dữ liệu từ Excel/CSV tự động", "Đội ngũ hỗ trợ onboarding tận tình", "Backup tự động, bảo mật dữ liệu chuẩn ISO 27001"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <span className="w-[5px] h-[5px] bg-white" />
                  {t}
                </li>
              ))}
            </ul>
            <a href="https://demo.vierp.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-primary hover:gap-2.5 transition-all group">
              Dùng thử ngay <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ perspective: "1000px" }}>
              <motion.div className="relative" initial={{ rotateY: -15 }} animate={{ rotateY: -15 }} whileHover={{ rotateY: -8 }} transition={{ duration: 0.3 }}>
                <div className="p-6 relative overflow-hidden" style={{ background: "linear-gradient(145deg, rgba(35, 38, 45, 0.95) 0%, rgba(20, 21, 24, 0.9) 40%, rgba(8, 9, 10, 0.98) 100%)", border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)", transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 25%, transparent 50%, rgba(0, 0, 0, 0.25) 100%)" }} />
                  <div className="flex items-center gap-2 mb-6 relative z-10">
                    <span className="text-[12px] font-semibold text-text-primary">Quy trình triển khai</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#22c55e]/20 text-[#22c55e] font-medium">15 phút</span>
                  </div>

                  <div className="space-y-3 relative z-10">
                    {workflowSteps.map((step, i) => (
                      <motion.div key={step.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}>
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 flex items-center justify-center ${step.bgClass}`}>
                              <step.icon size={14} className={step.colorClass} />
                            </div>
                            {i < workflowSteps.length - 1 && <div className="w-[1px] h-6 bg-border mt-1" />}
                          </div>
                          <div className="pt-1">
                            <p className="text-[12px] font-medium text-text-primary">{step.label}</p>
                            <p className="text-[11px] text-text-tertiary">{step.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9 }} className="mt-6 p-4 bg-black/50 border border-border relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-text-tertiary font-medium">Dashboard Overview</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#22c55e]/20 text-[#22c55e]">Live</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Doanh thu tháng", value: "2.4 tỷ ₫", color: "#22c55e" },
                        { label: "Đơn hàng mới", value: "1,247", color: "#06b6d4" },
                        { label: "Nhân viên active", value: "342", color: "#8b5cf6" },
                        { label: "AI insights", value: "18 gợi ý", color: "#f59e0b" },
                      ].map((item) => (
                        <div key={item.label} className="p-2 bg-bg-tertiary/50">
                          <p className="text-[9px] text-text-tertiary mb-0.5">{item.label}</p>
                          <p className="text-[13px] font-bold" style={{ color: item.color }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
