import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import {
  homeHero,
  homeHighlights,
  homeStats,
  partnershipModes,
  projects,
  services,
  newsItems,
} from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import StatGrid from "@/components/sections/stat-grid";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import ProjectCard from "@/components/sections/project-card";
import NewsCard from "@/components/sections/news-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "首页",
  description: "HK XSEC 品牌首页，聚合基础设施、软件与安全能力。",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <PageHero
        kicker={homeHero.kicker}
        title={homeHero.title}
        description={homeHero.description}
        image="/source/index_imgs/20260322-044041.webp"
        actions={[homeHero.primaryCta, homeHero.secondaryCta]}
        aside={<StatGrid stats={homeStats} />}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal className="ink-panel overflow-hidden px-6 py-10 sm:px-8 md:px-10">
            <SectionHeading
              kicker="Capabilities"
              title="把“官网、系统、基础设施、安全”放进同一套交付视角。"
              description="我们更关注一个项目上线之后是否稳定、可维护、可继续迭代，而不是只交付一组页面或一套设备。"
            />
            <div className="mt-8">
              <IconCardGrid items={homeHighlights} columns="four" tone="dark" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Service map"
              title="服务按角色组织，不再按旧目录记忆。"
              description="新的信息架构把企业、客户、伙伴和公共服务分成四条清晰路径，每条路径都对应明确任务。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={services.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  label: "进入该路径",
                  bullets: item.capabilities.slice(0, 2),
                }))}
                columns="two"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Selected work"
              title="精选案例"
              description="从基础设施恢复到内容平台搭建，再到服务入口体系重构，我们把真实项目的交付逻辑整理成可查看的案例。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="How we work"
              title="合作方式尽量简单，但结果要站得住。"
              description="我们通常会从问题梳理、方案验证和上线路径开始，再进入实施与长期运营支持。"
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-4">
              {partnershipModes.map((mode) => (
                <article key={mode.title} className="glass-card flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{mode.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{mode.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Latest"
              title="最新动态"
              description="把平台发布、服务升级和经营信息统一收录在新的动态目录里。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {newsItems.slice(0, 3).map((item) => (
              <Reveal key={item.slug}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="让品牌站、业务入口和技术底座回到同一条演进路径里。"
            description="如果你正在处理官网升级、服务中心改造、基础设施重构或安全治理，我们可以从当前问题开始一起拆解。"
            primary={{ label: "发起项目沟通", href: "/contact/" }}
            secondary={{ label: "查看服务能力", href: "/services/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
