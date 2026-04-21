import { buildMetadata } from "@/lib/metadata";
import { products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "产品目录",
  description: "云与基础设施、软件与应用、硬件与安全设备的产品能力目录。",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title="产品能力是交付落地的另一面。"
        description="服务路径决定用户如何找到我们，产品能力决定项目最终如何被实现、维护和持续扩展。"
        image="/source/index_imgs/ihaikou_index01.webp"
        actions={[
          { label: "查看服务能力", href: "/services/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Catalog"
              title="三类产品能力"
              description="围绕基础设施、软件系统和设备交付组织产品目录，方便客户快速理解每条能力带的边界。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={products.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  bullets: item.features.slice(0, 3),
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
