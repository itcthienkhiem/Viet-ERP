import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vierp.dev"),
  title: {
    default: "VietERP - Nền tảng ERP cho doanh nghiệp Việt Nam",
    template: "%s | VietERP",
  },
  description:
    "Nền tảng ERP toàn diện cho doanh nghiệp Việt Nam. 14 modules: HRM, CRM, MRP, Accounting, Ecommerce, TPM, OTB — tuân thủ VAS TT200, NĐ123, BHXH. AI-Native, SaaS.",
  keywords: [
    "ERP",
    "Vietnam",
    "HRM",
    "CRM",
    "MRP",
    "Accounting",
    "quản lý doanh nghiệp",
    "phần mềm kế toán",
    "phần mềm ERP",
    "SaaS",
    "AI",
  ],
  authors: [{ name: "VietERP" }],
  creator: "VietERP",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    url: "https://vierp.dev",
    siteName: "VietERP",
    title: "VietERP - Nền tảng ERP cho doanh nghiệp Việt Nam",
    description:
      "14 modules ERP cho doanh nghiệp Việt Nam. Tuân thủ VAS, hoá đơn điện tử, BHXH. AI-Native, Multi-tenant SaaS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={`${beVietnamPro.className} antialiased bg-bg`}>{children}</body>
    </html>
  );
}
