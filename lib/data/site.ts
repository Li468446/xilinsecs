import {
  Blocks,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Globe,
  Handshake,
  Laptop2,
  Package,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import type { CTA, HomeHighlight, LinkItem, SiteStat } from "@/lib/data/types";

export const siteConfig = {
  name: "海口希灵赛斯网络科技有限责任公司",
  shortName: "HK XSEC",
  domain: "https://www.sec.hn.cn",
  description:
    "为企业交付基础设施、软件系统、安全能力与服务运营入口的数字化建设团队。",
  tagline: "用可落地的基础设施、软件与安全能力，搭建更可靠的业务系统。",
  address:
    "海南省海口市龙华区金宇街道南海大道豪苑路1号海口中关村信息谷创新中心2025-ZC-1115",
  email: "xuzhongxin@sec.hn.cn",
  supportEmail: "chenziyi@sec.hn.cn",
  heroImage: "/source/index_imgs/20260322-044041.webp",
  logo: "/source/imgs/logo.png",
  wecomLink: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af",
  icpLink: "https://beian.miit.gov.cn/",
  icpText: "琼ICP备2025060601号-1",
  verifyLink:
    "https://e-register.amr.hainan.gov.cn:17089/#/?qyxx=I8%20HAEmgoR6TVmokEB2TW1jqNWu%2F6cwhlApRTM7toGszlRcs6ZUi30MySmjBAtsgtZrbljvmf6FmOfpPbwlMUXvXAKOaWdJBSpMNk53TLb0OV2l7K2tyrV5eL%20ru5FxZeM%20zBV09hFpPXdWTrE13jYyjlD6xSGFbyQCUx1f3M4I%3D",
};

export const homeHero = {
  kicker: "Brand platform for infrastructure teams",
  title: "把企业的基础设施、软件交付与安全运营放进同一条执行链。",
  description:
    "HK XSEC 聚焦信息化底座、业务系统、网络安全和服务运营入口。我们不只交付页面或设备，而是把架构、流程、可运维性与增长效率一起落到上线结果里。",
  primaryCta: {
    label: "发起项目沟通",
    href: "/contact/",
  } satisfies CTA,
  secondaryCta: {
    label: "查看精选案例",
    href: "/projects/",
    variant: "outline",
  } satisfies CTA,
};

export const homeStats: SiteStat[] = [
  {
    value: "4",
    label: "业务能力带",
    detail: "基础设施、软件系统、安全运营、服务入口统一规划。",
  },
  {
    value: "10+",
    label: "可访问入口",
    detail: "客户、伙伴、工具、下载与内容体系全部统一到新站架构。",
  },
  {
    value: "EdgeOne",
    label: "部署基线",
    detail: "按静态导出与边缘分发优化，兼顾性能、SEO 与可维护性。",
  },
];

export const homeHighlights: HomeHighlight[] = [
  {
    title: "基础设施与云平台",
    description: "从私有云、虚拟化到边缘节点治理，帮助团队把环境稳定性和交付效率真正拉齐。",
    icon: Cloud,
  },
  {
    title: "软件系统与服务入口",
    description: "围绕官网、业务平台、代理协同和客户服务，建立统一的信息架构与内容运营基础。",
    icon: Blocks,
  },
  {
    title: "网络与信息安全",
    description: "把漏洞扫描、渗透测试、安全加固与持续运营放进同一套项目交付路径中。",
    icon: ShieldCheck,
  },
  {
    title: "伙伴协同与客户成功",
    description: "让客户、伙伴与内部团队共享一套更顺滑的查询、提交流程和工作台入口。",
    icon: Workflow,
  },
];

export const contactChannels = [
  {
    title: "企业微信沟通",
    description: "适合项目咨询、长期运维与合作洽谈。",
    href: siteConfig.wecomLink,
    label: "打开企业微信",
    icon: Handshake,
  },
  {
    title: "提交项目需求",
    description: "适合新项目、改版、集成或基础设施升级类需求。",
    href: "/contact/request/",
    label: "提交需求",
    icon: BriefcaseBusiness,
  },
  {
    title: "伙伴合作入口",
    description: "适合代理合作、联合交付与资源协同。",
    href: "/partners/apply/",
    label: "申请合作",
    icon: Users,
  },
];

export const footerGroups: Array<{ title: string; links: LinkItem[] }> = [
  {
    title: "主站",
    links: [
      { label: "首页", href: "/" },
      { label: "关于我们", href: "/about/" },
      { label: "项目案例", href: "/projects/" },
      { label: "联系我们", href: "/contact/" },
    ],
  },
  {
    title: "业务",
    links: [
      { label: "服务能力", href: "/services/" },
      { label: "产品目录", href: "/products/" },
      { label: "合作伙伴", href: "/partners/" },
      { label: "招聘信息", href: "/careers/" },
    ],
  },
  {
    title: "资源",
    links: [
      { label: "工具中心", href: "/tools/" },
      { label: "下载中心", href: "/downloads/" },
      { label: "企业动态", href: "/news/" },
      { label: "隐私政策", href: "/legal/privacy/" },
    ],
  },
  {
    title: "外部入口",
    links: [
      { label: "企业微信", href: siteConfig.wecomLink, external: true },
      {
        label: "云效 Ops",
        href: "https://devops.aliyun.com/workbench?orgId=690f52c666aca23eccbe7d4c",
        external: true,
      },
      { label: "镜像仓库", href: "https://packages.sec.hn.cn/", external: true },
      { label: "互联网违法举报", href: "https://www.12377.cn/", external: true },
    ],
  },
];

export const aboutPillars = [
  {
    title: "架构与基础设施",
    description: "围绕私有云、虚拟化、网络与边缘环境做统一规划，而不是割裂式采购。",
    icon: Building2,
  },
  {
    title: "应用与交付",
    description: "从官网、内容平台到业务系统与伙伴入口，让体验与运维都能站得住。",
    icon: Laptop2,
  },
  {
    title: "安全与合规",
    description: "把安全评估、加固、响应和审计意识提前到方案和实施阶段。",
    icon: ShieldCheck,
  },
  {
    title: "设备与上线保障",
    description: "把硬件、软件、流程与知识移交放进一套完整的上线链路，而不是只交设备。",
    icon: Package,
  },
  {
    title: "公共服务设计",
    description: "在客户、伙伴和公众工具之间建立更低门槛、可访问、可追踪的服务入口。",
    icon: Globe,
  },
];

export const partnershipModes = [
  {
    title: "顾问与方案设计",
    description: "适合需要从 0 到 1 规划架构、服务目录或产品路径的团队。",
  },
  {
    title: "交付与重构实施",
    description: "适合官网升级、平台重做、流程入口统一与基础设施改造项目。",
  },
  {
    title: "长期运营支撑",
    description: "适合把性能、安全、内容治理和服务协同纳入持续改进节奏的团队。",
  },
];
