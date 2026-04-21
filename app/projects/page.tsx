import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import ProjectCard from "@/components/sections/project-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "项目案例",
  description: "查看 HK XSEC 的基础设施、平台与服务入口相关项目案例。",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Projects"
        title="案例不只是展示结果，也展示我们如何组织交付。"
        description="这里收录的项目覆盖基础设施恢复、内容平台建设、系统适配和站点重构，重点展示问题、路径和最终结果。"
        image="/source/index_imgs/20260322-044041.webp"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看服务能力", href: "/services/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Case studies"
              title="全部案例"
              description="每个案例都整理了背景、交付内容和可复用的方法。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
