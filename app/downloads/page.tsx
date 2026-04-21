import { buildMetadata } from "@/lib/metadata";
import { downloads } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import DownloadCard from "@/components/sections/download-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "下载中心",
  description: "iOA 与跨境办公接入说明的品牌化下载中心。",
  path: "/downloads/",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        kicker="Downloads"
        title="把软件下载和接入说明做成真正可用的品牌化下载中心。"
        description="下载页不再只是一个外链，而是同时提供平台说明、接入提示和后续沟通入口。"
        image="/source/index_imgs/index_01.jpg"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看工具中心", href: "/tools/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Resources"
              title="下载资源"
              description="面向员工、客户或授权伙伴的软件下载和接入说明。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {downloads.map((item) => (
              <Reveal key={item.slug}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
