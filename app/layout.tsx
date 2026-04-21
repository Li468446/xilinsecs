import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.shortName} | 基础设施、软件与安全能力`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "海口希灵赛斯",
    "信息化解决方案",
    "私有云建设",
    "信息安全咨询",
    "网站建设",
    "Pages 托管",
    "企业服务",
  ],
  openGraph: {
    title: `${siteConfig.shortName} | 信息化与安全解决方案`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.heroImage,
        width: 1616,
        height: 940,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | 信息化与安全解决方案`,
    description: siteConfig.description,
    images: [siteConfig.heroImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
