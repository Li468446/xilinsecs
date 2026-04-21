import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getNewsBySlug } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import JsonLd from "@/components/seo/json-ld";
import { formatDate } from "@/lib/utils";

const routes = [
  { year: "2025", slug: "technology-import-export" },
  { year: "2025", slug: "partner-platform-launch" },
  { year: "2025", slug: "public-service-center-launch" },
  { year: "2025", slug: "customer-service-center-refresh" },
  { year: "2025", slug: "finance-q2-brief" },
];

export function generateStaticParams() {
  return routes;
}

export function generateMetadata({ params }: { params: { year: string; slug: string } }) {
  const item = getNewsBySlug(params.year, params.slug);
  if (!item) return {};

  return buildMetadata({
    title: item.seoTitle,
    description: item.seoDescription,
    path: item.href,
    image: item.heroImage,
  });
}

export default function NewsDetailPage({ params }: { params: { year: string; slug: string } }) {
  const item = getNewsBySlug(params.year, params.slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          datePublished: item.date,
          description: item.description,
          image: item.heroImage,
          url: `https://www.sec.hn.cn${item.href}`,
        }}
      />

      <PageHero
        kicker={`${item.category} · ${formatDate(item.date)}`}
        title={item.title}
        description={item.description}
        image={item.heroImage}
        actions={[
          { label: "返回企业动态", href: "/news/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <article className="glass-card p-8">
              <div className="space-y-5 text-base leading-8 text-slate-700">
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="想知道这些变化如何影响你的项目？"
            description="如果你正在评估官网升级、服务入口整合或基础设施改造，可以直接联系我们一起梳理。"
            primary={{ label: "联系团队", href: "/contact/" }}
            secondary={{ label: "继续查看动态", href: "/news/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
