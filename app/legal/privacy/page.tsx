import { buildMetadata } from "@/lib/metadata";
import { privacySections, siteConfig } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "隐私政策",
  description: "了解 HK XSEC 如何收集、使用和保护个人信息。",
  path: "/legal/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="隐私政策"
        description="我们尽量以简单、明确的方式说明会收集什么信息、为什么使用，以及你拥有的权利。"
        image="/source/index_imgs/index_cplb01.webp"
        actions={[
          { label: "联系我们", href: "/contact/" },
          { label: "返回首页", href: "/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell max-w-4xl space-y-4">
          {privacySections.map((section) => (
            <Reveal key={section.title}>
              <article className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>
                <p className="mt-4 text-sm leading-8 text-slate-700">{section.body}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <article className="glass-card p-8 text-sm leading-8 text-slate-700">
              如需行使相关权利或进一步咨询，请通过
              <a href={`mailto:${siteConfig.email}`} className="mx-1 font-semibold text-blue-700">
                {siteConfig.email}
              </a>
              与我们联系。
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
