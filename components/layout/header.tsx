"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-data";
import { buttonStyles } from "@/components/ui/button";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="site-shell pt-4">
        <div className="flex items-center justify-between rounded-full border border-white/70 bg-[#f6f2e9]/88 px-4 py-3 shadow-soft backdrop-blur-xl">
          <SmartLink href="/" className="flex items-center gap-3">
            <Image src={siteConfig.logo} alt={siteConfig.shortName} width={40} height={40} className="rounded-xl" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">HK XSEC</div>
              <div className="text-sm font-medium text-slate-800">{siteConfig.name}</div>
            </div>
          </SmartLink>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => (
              <div key={item.label} className="group relative">
                <SmartLink href={item.href} className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950">
                  {item.label}
                  {item.children ? <ChevronDown className="h-4 w-4" /> : null}
                </SmartLink>
                {item.children ? (
                  <div className="pointer-events-none absolute left-0 top-full min-w-[220px] pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="rounded-3xl border border-white/70 bg-[#f8f5ee]/95 p-3 shadow-glass backdrop-blur-xl">
                      {item.children.map((child) => (
                        <SmartLink key={child.href} href={child.href} className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950">
                          {child.label}
                        </SmartLink>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <SmartLink href="/news/" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              企业动态
            </SmartLink>
            <SmartLink href="/contact/" className={buttonStyles({ size: "md" })}>
              Start a project
            </SmartLink>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full border border-slate-200 p-2 text-slate-700 lg:hidden"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden",
            mobileOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mt-3 rounded-[28px] border border-white/70 bg-[#f8f5ee]/95 p-4 shadow-glass backdrop-blur-xl">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-slate-100 py-3 last:border-none">
                <SmartLink
                  href={item.href}
                  className="block text-sm font-semibold text-slate-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </SmartLink>
                {item.children ? (
                  <div className="mt-2 space-y-2 pl-2">
                    {item.children.map((child) => (
                      <SmartLink
                        key={child.href}
                        href={child.href}
                        className="block text-sm text-slate-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <SmartLink href="/contact/" className={cn(buttonStyles({ size: "md" }), "mt-4 w-full")} onClick={() => setMobileOpen(false)}>
              Start a project
            </SmartLink>
          </div>
        </div>
      </div>
    </header>
  );
}
