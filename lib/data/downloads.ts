import type { DownloadRecord, PortalRecord } from "@/lib/data/types";

export const downloads: DownloadRecord[] = [
  {
    slug: "ioa-secure-office",
    href: "/downloads/ioa-secure-office/",
    title: "iOA 安全办公接入",
    summary: "面向内部员工与授权伙伴的 iOA 安全办公软件下载与接入说明。",
    description:
      "聚合 iOA 下载入口、适用平台、团队 PIN 使用说明与基础接入提示，方便内部办公与授权伙伴接入。",
    heroImage: "/source/index_imgs/wx.jpg",
    seoTitle: "iOA 安全办公接入",
    seoDescription: "iOA 安全办公软件下载与接入说明。",
    platforms: ["Windows", "macOS", "Android", "iOS"],
    benefits: [
      "统一办公接入方式",
      "多平台下载说明",
      "PIN 码使用提示与复制能力",
    ],
    primaryLink: {
      label: "打开腾讯云下载页",
      href: "https://ioa.cloud.tencent.com/download/",
      external: true,
    },
    secondaryLink: {
      label: "联系客户经理",
      href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af",
      external: true,
    },
    note: "本入口仅服务海口希灵赛斯员工及授权业务伙伴。",
    pin: "SLALAQ",
    cta: { label: "进入下载页", href: "/downloads/ioa-secure-office/" },
    tags: ["iOA", "办公", "下载"],
  },
  {
    slug: "cross-border-office",
    href: "/downloads/cross-border-office/",
    title: "跨境办公接入",
    summary: "基于 Cloudflare Zero Trust 的跨境办公客户端下载与接入说明。",
    description:
      "为员工和授权伙伴提供 Cloudflare Zero Trust / WARP 客户端下载、接入步骤和使用注意事项。",
    heroImage: "/source/index_imgs/index_01.jpg",
    seoTitle: "跨境办公接入",
    seoDescription: "Cloudflare Zero Trust 跨境办公客户端下载与接入说明。",
    platforms: ["Windows", "macOS", "Android", "iOS"],
    benefits: [
      "统一团队接入说明",
      "跨境访问与零信任连接建议",
      "适用于多平台办公场景",
    ],
    primaryLink: {
      label: "前往 Cloudflare 下载页",
      href: "https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/",
      external: true,
    },
    secondaryLink: {
      label: "联系信息化负责人",
      href: "/partners/workspace/",
    },
    note: "团队名称需联系公司信息化负责人获取。",
    cta: { label: "查看接入说明", href: "/downloads/cross-border-office/" },
    tags: ["Cloudflare", "跨境办公", "Zero Trust"],
  },
];

export const contactPortals: PortalRecord[] = [
  {
    slug: "request",
    href: "/contact/request/",
    title: "项目需求提交",
    summary: "提交业务需求、预算区间与预期目标，我们会尽快反馈。",
    description:
      "适合企业官网重构、系统建设、基础设施升级、安全服务或长期合作咨询等场景。",
    heroImage: "/source/index_imgs/20260322-044041.webp",
    seoTitle: "项目需求提交",
    seoDescription: "提交业务需求，获取 HK XSEC 的初步方案反馈。",
    audience: "潜在客户 / 现有客户",
    embedUrl: "https://f.kdocs.cn/g/qxDI5LYp/",
    steps: ["填写需求背景与目标", "补充预算或时间窗口", "提交后等待客户经理联系"],
    faqs: [
      {
        question: "提交后多久会收到反馈？",
        answer: "通常会在工作日内尽快完成初步查看并通过邮件或企业微信联系。",
      },
      {
        question: "没有完整需求文档可以提交吗？",
        answer: "可以，先描述业务目标和现状即可，我们会协助梳理。",
      },
    ],
    cta: { label: "返回联系页", href: "/contact/" },
    tags: ["需求", "表单", "咨询"],
  },
];

export const customerPortals: PortalRecord[] = [
  {
    slug: "orders",
    href: "/customer/orders/",
    title: "账单与订单查询",
    summary: "面向客户的订单和账单查询入口。",
    description: "用于查询已有业务订单、账单和相关状态信息。",
    heroImage: "/leadership/indexnews/images/news/post4.webp",
    seoTitle: "账单与订单查询",
    seoDescription: "客户订单与账单查询入口。",
    audience: "现有客户",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/3xMjDQLw",
    steps: ["进入查询页", "输入对应信息", "查看查询结果"],
    faqs: [
      {
        question: "查询不到结果怎么办？",
        answer: "请先确认信息填写是否准确，若仍有问题可通过企业微信联系客户经理。",
      },
    ],
    cta: { label: "联系客户经理", href: "/contact/" },
    tags: ["订单", "账单", "客户服务"],
  },
  {
    slug: "subscriptions",
    href: "/customer/subscriptions/",
    title: "订阅状态查询",
    summary: "用于查看产品订阅和服务续期相关状态。",
    description: "客户可在此查询产品订阅、续期或服务状态信息。",
    heroImage: "/source/index_imgs/index_cplb01.webp",
    seoTitle: "订阅状态查询",
    seoDescription: "客户产品订阅与续期状态查询入口。",
    audience: "现有客户",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/f2jfAF1M",
    steps: ["填写查询信息", "查看当前订阅状态", "如需调整请联系客户经理"],
    faqs: [
      {
        question: "是否支持续费咨询？",
        answer: "可以，若需续费或变更请通过页面下方联系方式发起沟通。",
      },
    ],
    cta: { label: "回到客户服务", href: "/services/customer/" },
    tags: ["订阅", "续期", "查询"],
  },
  {
    slug: "profile",
    href: "/customer/profile/",
    title: "客户信息查询",
    summary: "查询客户登记与合作信息。",
    description: "用于查看客户基础信息、关联业务和登记状态。",
    heroImage: "/source/index_imgs/wx.jpg",
    seoTitle: "客户信息查询",
    seoDescription: "客户登记信息查询入口。",
    audience: "现有客户",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/4WPatwqD",
    steps: ["填写查询信息", "核对客户数据", "如需修改请联系客户经理"],
    faqs: [
      {
        question: "信息有误怎么办？",
        answer: "请通过企业微信或邮件联系团队进行核对与处理。",
      },
    ],
    cta: { label: "联系我们", href: "/contact/" },
    tags: ["客户信息", "查询", "资料"],
  },
];

export const customerTicketPortals: PortalRecord[] = [
  {
    slug: "new",
    href: "/customer/tickets/new/",
    title: "工单提交",
    summary: "提交服务工单，我们会尽快处理。",
    description: "适合售后支持、环境异常、配置调整和服务请求等场景。",
    heroImage: "/source/index_imgs/index_01.jpg",
    seoTitle: "工单提交",
    seoDescription: "客户服务工单提交入口。",
    audience: "现有客户",
    embedUrl: "https://f.kdocs.cn/g/XbhwlWZn/",
    steps: ["填写问题背景", "补充环境信息", "等待团队响应"],
    faqs: [
      {
        question: "是否支持紧急问题？",
        answer: "可在工单中标记紧急程度，并同步通过企业微信沟通。",
      },
    ],
    cta: { label: "查看工单状态", href: "/customer/tickets/status/" },
    tags: ["工单", "支持", "售后"],
  },
  {
    slug: "status",
    href: "/customer/tickets/status/",
    title: "工单状态查询",
    summary: "查询已提交工单的当前状态与处理进度。",
    description: "适合查看现有工单的受理、处理中或完成状态。",
    heroImage: "/leadership/indexnews/images/news/post4.webp",
    seoTitle: "工单状态查询",
    seoDescription: "客户工单状态与处理进度查询入口。",
    audience: "现有客户",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/IVqhPleK",
    steps: ["填写工单信息", "查看当前进度", "如需补充可联系客户经理"],
    faqs: [
      {
        question: "查询结果多久更新？",
        answer: "通常随内部处理状态同步更新，若遇异常可直接联系团队确认。",
      },
    ],
    cta: { label: "提交新工单", href: "/customer/tickets/new/" },
    tags: ["工单", "查询", "进度"],
  },
];

export const partnerPortals: PortalRecord[] = [
  {
    slug: "apply",
    href: "/partners/apply/",
    title: "代理合作申请",
    summary: "填写合作信息，发起伙伴申请。",
    description: "适合渠道合作、区域代理和联合交付伙伴发起合作申请。",
    heroImage: "/source/index_imgs/zb/会员证书.png",
    seoTitle: "代理合作申请",
    seoDescription: "发起 HK XSEC 代理合作申请。",
    audience: "代理伙伴 / 渠道合作方",
    embedUrl: "https://f.kdocs.cn/g/JLEvLwWJ/",
    steps: ["填写合作信息", "提交主营方向与区域", "等待商务联系"],
    faqs: [
      {
        question: "合作申请后会如何推进？",
        answer: "团队会进行初步审核，并通过邮件或企业微信进行后续沟通。",
      },
    ],
    cta: { label: "返回合作伙伴页", href: "/partners/" },
    tags: ["伙伴申请", "合作", "代理"],
  },
  {
    slug: "orders",
    href: "/partners/orders/",
    title: "代理订单查询",
    summary: "供合作伙伴查询订单与相关状态。",
    description: "用于查看代理订单信息及推进状态。",
    heroImage: "/leadership/indexnews/images/news/post1_thumb.webp",
    seoTitle: "代理订单查询",
    seoDescription: "合作伙伴订单与推进状态查询入口。",
    audience: "代理伙伴",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/pQHfJAvc",
    steps: ["进入查询页", "填写订单信息", "查看状态"],
    faqs: [
      {
        question: "如果订单信息不完整怎么办？",
        answer: "请联系商务同事或通过工作台入口反馈。",
      },
    ],
    cta: { label: "进入伙伴工作台", href: "/partners/workspace/" },
    tags: ["伙伴订单", "查询", "代理"],
  },
  {
    slug: "profile",
    href: "/partners/profile/",
    title: "代理资料维护",
    summary: "供合作伙伴查询与维护资料信息。",
    description: "用于伙伴资料核对、更新和业务信息维护。",
    heroImage: "/source/index_imgs/zb/rz.jpg",
    seoTitle: "代理资料维护",
    seoDescription: "合作伙伴资料维护与查询入口。",
    audience: "代理伙伴",
    embedUrl: "https://www.kdocs.cn/etapps/query/q/T5FkF1si",
    steps: ["打开资料入口", "核对或提交维护信息", "等待更新确认"],
    faqs: [
      {
        question: "资料多久能生效？",
        answer: "通常会在核对完成后更新，具体以商务反馈为准。",
      },
    ],
    cta: { label: "发起合作申请", href: "/partners/apply/" },
    tags: ["伙伴资料", "维护", "查询"],
  },
  {
    slug: "workspace",
    href: "/partners/workspace/",
    title: "伙伴协同工作台",
    summary: "面向合作伙伴的协同入口和工作说明。",
    description: "用于访问伙伴日常协同页面、知识入口和基础工作说明。",
    heroImage: "/source/index_imgs/index_cplb01.webp",
    seoTitle: "伙伴协同工作台",
    seoDescription: "合作伙伴协同工作台与知识入口。",
    audience: "代理伙伴 / 协同成员",
    embedUrl: "https://www.kdocs.cn/l/coqzdEixWgDW",
    steps: ["打开协同页", "查看工作说明", "按流程完成提交与协作"],
    faqs: [
      {
        question: "忘记入口或权限不足怎么办？",
        answer: "请联系商务或信息化负责人协助处理。",
      },
    ],
    cta: { label: "查看合作伙伴页", href: "/partners/" },
    tags: ["工作台", "协同", "伙伴"],
  },
];
