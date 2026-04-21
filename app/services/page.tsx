import { buildMetadata } from "@/lib/metadata";
import { services, products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "服务能力",
  description: "企业、客户、伙伴和公共服务四条路径的完整服务结构。",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="服务不是一列旧目录，而是围绕角色和任务组织的入口。"
        description="新的服务结构把企业、客户、伙伴和公共服务分成四条路径。每条路径对应不同目标，但都共享统一的品牌和交付标准。"
        image="/source/index_imgs/index_cplb01.webp"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看产品目录", href: "/products/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Four lanes"
              title="四类服务路径"
              description="每条路径都对应明确角色和动作，不再让用户依赖旧文件名和分散入口。"
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
                  bullets: item.capabilities.slice(0, 3),
                }))}
                columns="two"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="Related products"
              title="服务和产品能力一起工作"
              description="客户看见的是服务路径，真正交付时仍然会落到基础设施、软件或设备这些产品能力上。"
            />
          </Reveal>
          <Reveal>
            <IconCardGrid
              items={products.map((item) => ({
                title: item.title,
                description: item.description,
                icon: item.icon,
                href: item.href,
                bullets: item.features.slice(0, 2),
              }))}
              columns="three"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
