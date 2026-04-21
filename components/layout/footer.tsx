import { footerGroups, siteConfig } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/50 bg-slate-950 text-slate-200">
      <div className="site-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">HK XSEC</p>
              <h2 className="heading-display mt-3 text-3xl font-semibold text-white">{siteConfig.shortName}</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-400">{siteConfig.description}</p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink href={link.href} className="transition hover:text-white">
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2025—2026 sec.hn.cn 版权所有</p>
          <div className="flex flex-wrap gap-4">
            <SmartLink href={siteConfig.icpLink} className="transition hover:text-white">
              {siteConfig.icpText}
            </SmartLink>
            <SmartLink href={siteConfig.verifyLink} className="transition hover:text-white">
              查验证件
            </SmartLink>
            <SmartLink href="https://www.12377.cn/" className="transition hover:text-white">
              互联网违法信息举报
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
