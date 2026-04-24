import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Globe,
  Laptop2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { homeHero, siteConfig, teamMembers, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import TimelineList from "@/components/sections/timeline-list";
import Reveal from "@/components/sections/reveal";
import { ButtonLink } from "@/components/ui/button";

const coreCapabilities = [
  {
    title: "VMware私有云",
    description: "释放服务器最大性能，节省硬件采购成本，提供高可用性云计算服务。",
    icon: Cloud,
    href: "/business/services/b/hnhsd-vmh3c.html",
    label: "了解更多",
  },
  {
    title: "信息安全咨询",
    description: "部署防火墙、态势感知平台、漏洞扫描系统，全方位保障企业信息安全。",
    icon: ShieldCheck,
    href: "https://blog.csdn.net/qq_73252299?spm=1000.2115.3001.5343",
    label: "了解更多",
  },
  {
    title: "信息化基础建设",
    description: "快速构建企业门户，提升SEO排名，提供静态网站建设和托管服务。",
    icon: Globe,
    href: "/business/services/b/htc-ihaikou.html",
    label: "了解更多",
  },
];

const productOffers = [
  {
    title: "私有云建设及咨询",
    description: "针对不同客户群体与预算，分析需求，为客户量身定制私有云建设方案。",
    icon: Cloud,
  },
  {
    title: "信创系统集成",
    description: "将客户系统进行国产化封装，并进行BT等保测试，助力客户信创迁移。",
    icon: Building2,
  },
  {
    title: "信息安全测试及咨询",
    description: "提供内网自查服务，对每台设备漏洞扫描或定向测试，并输出整改建议。",
    icon: ShieldCheck,
  },
  {
    title: "信息系统建设",
    description: "建立企业/单位门户网站或定制部署Blog、WAF、LTD、CRM等应用系统。",
    icon: Laptop2,
  },
];

const deliveryFeatures = [
  {
    title: "专业定制",
    description: "根据需求打造专属解决方案",
    icon: Workflow,
  },
  {
    title: "高效交付",
    description: "严格遵循项目时间表",
    icon: BriefcaseBusiness,
  },
  {
    title: "持续支持",
    description: "项目交付后提供完善的技术支持",
    icon: Users,
  },
];

const featuredProjects = [
  {
    title: "HTC iHAIKOU 网站建设",
    description: "海口旅游职业学院职教周 iHAIKOU内容分发系统建设",
    image: "/source/index_imgs/ihaikou_index01.webp",
    author: "徐中信",
    date: "2025-01-17",
    href: "/business/services/b/htc-ihaikou.html",
  },
  {
    title: "VMware 私有云故障修复",
    description: "分管运维现场处理VMware私有云故障",
    image: "/source/index_imgs/hsd_index02.webp",
    author: "徐中信",
    date: "2025-03-26",
    href: "/business/services/b/hnhsd-vmh3c.html",
  },
  {
    title: "海口海甸小学信创系统软件适配",
    description: "海口海甸小学银河麒麟信创系统软件适配",
    image: "/business/services/b/hhps-xinchuang/01.webp",
    author: "徐中信",
    date: "2025-09-03",
    href: "/business/services/b/keliy.pdf",
  },
  {
    title: "海口红塔烟草局",
    description: "海口红塔烟草局数据中心控制器故障检修",
    image: "/business/services/b/hhps-xinchuang/01.webp",
    author: "徐中信",
    date: "2025-10-28",
    href: "/business/services/b/",
  },
];

const latestNews = [
  {
    title: "新增技术进出口经营信息",
    summary: "为海南自贸港封关准备，新增技术进出口，代理进出口经营。",
    date: "2025-11-06",
    image: "/leadership/indexnews/images/news/post6.webp",
    href: "https://www.hnftp.gov.cn/",
  },
  {
    title: "代理商服务平台上线",
    summary: "企业自主开发代理商服务平台前端服务上线，面向希灵赛斯的代理商提供跨部门协作等服务。",
    date: "2025-09-01",
    image: "/leadership/indexnews/images/news/post1_thumb.webp",
    href: "/business/services/p/",
  },
  {
    title: "公共服务平台上线",
    summary: "企业自主开发公共服务平台前端服务上线，面向全球网民提供公共服务。",
    date: "2025-08-11",
    image: "/leadership/indexnews/images/news/post3_news.webp",
    href: "/business/services/g/index.html",
  },
  {
    title: "客户服务平台上线",
    summary: "企业自主开发客户服务平台前端，面向希灵赛斯的潜在客户和现有客户提供服务。",
    date: "2025-07-31",
    image: "/leadership/indexnews/images/news/post4.webp",
    href: "/business/services/c/index.html",
  },
];

export const metadata = buildMetadata({
  title: "海口希灵赛斯：一家专注于信息化解决方案的科技公司",
  description: siteConfig.seoDescription,
  path: "/",
  image: siteConfig.heroImage,
});

export default function HomePage() {
  return (
    <>
      <PageHero
        kicker={homeHero.kicker}
        title={homeHero.title}
        description={homeHero.description}
        image={siteConfig.heroImage}
        actions={[homeHero.primaryCta]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal className="ink-panel overflow-hidden px-6 py-10 sm:px-8 md:px-10">
            <div className="max-w-3xl">
              <div className="section-kicker">核心定位</div>
              <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                打造数字化未来
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">专业IT解决方案提供商</p>
            </div>
            <div className="mt-8">
              <IconCardGrid items={coreCapabilities} columns="three" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal className="rainbow-panel overflow-hidden px-6 py-10 text-slate-950 sm:px-8 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/80 shadow-soft">
                <Image
                  src="/source/index_imgs/index_cplb01.webp"
                  alt="我们的核心产品与服务"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/10 to-transparent" />
              </div>

              <div>
                <div className="max-w-3xl">
                  <div className="section-kicker">核心产品</div>
                  <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                    我们的核心产品与服务
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                    围绕私有云、信息安全、信创适配与信息系统建设，提供从咨询到实施的整体支撑。
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {productOffers.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="glass-card p-5 transition hover:-translate-y-1"
                      >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[28px] border border-orange-200 bg-white/80 p-6 shadow-soft backdrop-blur">
                  <h3 className="text-2xl font-semibold text-slate-950">提交您的需求</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    把您的项目需求、时间节点与预算提交给我们，我们会在T+1个工作日内联系您。
                  </p>
                  <ButtonLink href="/business/services/c/need.html" className="mt-6">
                    现在提交
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal className="rainbow-panel overflow-hidden px-6 py-10 text-slate-950 sm:px-8 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="glass-card p-6">
                <h2 className="heading-display text-3xl font-semibold text-slate-950 md:text-4xl">定制专属方案</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  我们为每个客户提供量身定制的解决方案，满足您的独特需求，助力业务发展。
                </p>
                <div className="mt-8 space-y-4">
                  {deliveryFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4 rounded-[22px] border border-white/80 bg-white/70 p-4 shadow-soft"
                      >
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <ButtonLink href={siteConfig.wecomLink} className="mt-8">
                  立即咨询
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>

              <div>
                <div className="max-w-3xl">
                  <div className="section-kicker">项目案例</div>
                  <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                    精选项目案例
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">我们为客户创造的商业价值</p>
                </div>

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  {featuredProjects.map((project) => (
                    <article key={project.title} className="glass-card overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 to-transparent p-4 text-xs font-semibold tracking-[0.18em] text-blue-700">
                          {project.date}
                        </div>
                      </div>
                      <div className="space-y-4 p-6">
                        <p className="text-sm text-slate-500">
                          负责人 <span className="font-semibold text-slate-800">{project.author}</span>
                        </p>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
                        </div>
                        <ButtonLink href={project.href} variant="outline">
                          查看详情
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </ButtonLink>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="近期动态"
              title="关注我们的最新进展"
              description="把原站近期动态里的重点内容完整回填到首页，方便直接查看。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {latestNews.map((item) => (
              <Reveal key={item.title}>
                <article className="glass-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 hover:scale-105" />
                  </div>
                  <div className="space-y-4 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{item.date}</p>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                    </div>
                    <ButtonLink href={item.href} variant="ghost" className="group px-0">
                      阅读更多
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="团队成员"
              title="认识希灵赛斯背后的团队"
              description="核心团队成员信息已按原站首页内容补回。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <Reveal key={member.slug}>
                <article className="glass-card p-6 text-center">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-[24px] border border-white/70">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{member.name}</h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-blue-700">{member.title}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              kicker="发展历程"
              title="发展历程"
              description="首页原有的时间线内容已按阶段回填。"
            />
          </Reveal>
          <Reveal>
            <TimelineList items={timeline} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
