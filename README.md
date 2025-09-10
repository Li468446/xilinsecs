# 网站配置文件说明

此文档详细说明了网站的配置文件结构和内容管理方式。

## 全局配置

网站使用全局配置系统来管理通用信息，包括品牌信息、导航链接、备案信息等。

### 配置文件位置

- 页脚配置文件: `/source/footer.js`

### 配置结构

```javascript
window.siteConfig = {
    footer: {
        brand: {
            name: "XSEC",
            description: "致力于提供专业的信息化解决方案,助力企业数字化转型升级。"
        },
        links: [
            {
                title: "关于我们",
                items: [
                    { text: "企业简介", href: "/leadership/me/" },
                    { text: "企业动态", href: "/leadership/" },
                    { text: "领导团队", href: "/leadership/me/lead/" },
                    { text: "发展历程", href: "#" },
                    { text: "隐私政策", href: "/legal/privacy/" }
                ]
            },
            {
                title: "工作机会",
                items: [
                    { text: "XSEC 职业机会", href: "/careers/cn/" },
                    { text: "在 XSEC 生活", href: "/careers/cn/life-at-xsec.html" },
                    { text: "在 XSEC 工作", href: "/careers/cn/work-at-xsec.html" }
                ]
            },
            {
                title: "资源",
                items: [
                    { text: "技术博客", href: "https://blog.csdn.net/qq_73252299?spm=1000.2115.3001.5343", target: "_blank" },
                    { text: "支持中心", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af" },
                    { text: "公共服务", href: "/business/g/" }
                ]
            },
            {
                title: "联系我们",
                items: [
                    { text: "客服咨询", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af", target: "_blank" },
                    { text: "商务合作", href: "/business/c/subscription.html", target: "_blank" },
                    { text: "客户服务", href: "/business/c/", target: "_blank" }
                ]
            }
        ],
        copyright: "© 2025 海口希灵赛斯网络科技有限公司. 保留所有权利.",
        beian: {
            icp: "琼ICP备2025060601号",
            police: "                "
        }
    }
};
```

## 页面配置

每个页面都有独立的SEO配置，包括标题、描述、关键词等元数据。

### 页面元数据配置示例

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#007AFF">
    <meta name="robots" content="index, follow">
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">
    <meta name="author" content="海口希灵赛斯网络科技有限公司">
    <link rel="canonical" href="https://www.sec.hn.cn/">
    <link rel="manifest" href="./manifest.json">
    <link rel="alternate" type="application/rss+xml" title="海口希灵赛斯网络科技有限公司RSS订阅" href="/rss.xml">
    <title>页面标题</title>
    <link rel="icon" href="./favicon.ico">
    <link rel="apple-touch-icon" href="source/imgs/logo.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="description" content="页面描述" />
    <meta property="og:title" content="页面标题" />
    <meta property="og:description" content="页面描述" />
    <meta property="og:image" content="页面图片" />
    <meta property="og:url" content="页面URL" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="海口希灵赛斯网络科技有限公司" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="页面标题" />
    <meta name="twitter:description" content="页面描述" />
    <meta name="twitter:image" content="页面图片" />
    <meta name="twitter:site" content="@sec_hn" />
</head>
```

## 样式配置

网站使用CSS变量来统一管理样式，确保整体风格一致性。

### 主要CSS变量

```css
:root {
    --apple-bg: #f5f7fa;
    --apple-card-bg: rgba(255, 255, 255, 0.7);
    --apple-text: #333;
    --apple-text-light: #6c757d;
    --apple-accent: #0071e3;
    --apple-accent-hover: #0077ed;
    --apple-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    --glass-border: 1px solid rgba(255, 255, 255, 0.4);
    --transition-smooth: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}
```

## 结构化数据配置

网站使用结构化数据帮助搜索引擎更好地理解内容。

### 组织结构化数据示例

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "海口希灵赛斯网络科技有限公司",
  "url": "https://www.sec.hn.cn",
  "logo": "https://www.sec.hn.cn/source/imgs/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/yourcompany",
    "https://twitter.com/yourcompany"
  ]
}
</script>
```

## 更新规范

当需要更新网站配置时，请遵循以下规范：

1. **页脚信息更新**：
   - 修改 `/source/footer.js` 文件中的相应配置项
   - 确保链接有效性和信息准确性

2. **SEO信息更新**：
   - 更新页面 `<head>` 部分的元数据
   - 确保标题、描述、关键词与页面内容匹配

3. **样式更新**：
   - 优先修改CSS变量以保持一致性
   - 避免硬编码颜色值和尺寸

4. **结构化数据更新**：
   - 根据页面内容调整结构化数据类型
   - 确保数据准确反映页面信息

## 维护说明

1. 所有配置更改后应进行全面测试
2. 确保在各种设备和浏览器上正常显示
3. 定期检查链接有效性
4. 保持配置文件的注释更新

## 项目目录结构

```
.
├── business/
│   ├── b/
│   │   ├── hnhsd-vmh3c/
│   │   │   ├── index.html
│   │   │   └── ...
│   │   ├── hnhsd-vmh3c.html
│   │   ├── htc-ihaikou.html
│   │   ├── htc_ihaikou_images/
│   │   ├── index.html
│   │   ├── order.html
│   │   └── sc.html
│   ├── c/
│   │   ├── customer-info.html
│   │   ├── index.html
│   │   ├── join.html
│   │   ├── joins.html
│   │   ├── need.html
│   │   ├── needs.html
│   │   ├── order.html
│   │   ├── subscription.html
│   │   ├── wo.html
│   │   ├── wosu.html
│   │   └── wosus.html
│   ├── g/
│   │   ├── base64.html
│   │   ├── gemini/
│   │   ├── index.html
│   │   ├── sjdm.html
│   │   ├── uuid.html
│   │   └── 目录说明
│   ├── index.html
│   ├── index_imgs/
│   ├── p/
│   │   ├── agent-orders.html
│   │   ├── agent-revenue-settlement.html
│   │   ├── agent_info_maintenance.html
│   │   ├── agent_register.html
│   │   ├── agent_registers.html
│   │   ├── index.html
│   │   └── oa.html
│   └── 目录说明
├── careers/
│   ├── cn/
│   │   ├── index.html
│   │   ├── life-at-xsec.html
│   │   ├── team.html
│   │   └── work-at-xsec.html
│   └── 目录说明
├── leadership/
│   ├── config.js
│   ├── index.html
│   ├── indexnews/
│   │   ├── images/
│   │   ├── js/
│   │   └── post1.html
│   ├── me/
│   │   ├── index.html
│   │   └── lead/
│   ├── pages/
│   └── 目录说明
├── legal/
│   └── privacy/
│       └── index.html
├── source/
│   ├── audio/
│   ├── dist/
│   ├── footer.js
│   ├── imgs/
│   │   ├── 512.png
│   │   ├── favicon.png
│   │   ├── logo-180.png
│   │   ├── logo-192.png
│   │   ├── logo.png
│   │   └── redme.md
│   ├── index_imgs/
│   ├── video/
│   └── 目录说明
├── BingSiteAuth.xml
├── README.md
├── ads.txt
├── baidu_verify_codeva-IZLfnlK9jT.html
├── config.md
├── favicon.ico
├── index.html
├── manifest.json
├── robots.txt
├── rss.xml
└── sitemap.xml
```

## JavaScript配置文件列表

以下是项目中所有的JavaScript配置文件及其对应的链接：

1. **页脚配置文件**
   - 文件路径: `/source/footer.js`
   - 作用: 管理网站全局页脚信息，包括品牌信息、链接和备案信息
   - 使用页面: 所有页面通过`<script src="/source/footer.js"></script>`引入

2. **领导团队新闻配置文件**
   - 文件路径: `/leadership/config.js`
   - 作用: 管理领导团队新闻内容
   - 使用页面: `/leadership/index.html`

这些配置文件采用全局变量的方式存储数据，通过JavaScript动态渲染页面内容，便于统一管理和维护。

# 海口希灵赛斯网络科技有限公司官方网站

## 项目概述

本仓库包含海口希灵赛斯网络科技有限公司官方网站:xinnew.top的源代码和文档。该公司专注于提供私有云建设、信息安全咨询和网站开发等 IT 解决方案，旨在为客户提供专业、高效的数字化解决方案。

## 公司介绍

海口希灵赛斯网络科技有限公司成立于 2025 年 4 月，致力于为客户提供高质量的 IT 解决方案，以满足其独特需求。我们的核心服务包括：

- **私有云建设**：利用 VMware 技术优化服务器性能，帮助客户节省物理机采购费用。
- **信息安全咨询**：提供专业的信息安全咨询服务，包括部署应用防火墙、态势感知平台和漏洞扫描等。
- **网站建设**：快速落地企业门户网站，辅助增加 SEO，为客户门户网站曝光助力。

我们的使命是“安全为盾，计算为矛，驱动数字未来”。

## 网站主要功能

- **首页**：介绍公司及其使命。
- **服务部分**：详细说明我们的主要服务，包括私有云建设、信息安全咨询和网站建设。
- **产品部分**：
  - 私有云建设及咨询：根据客户需求和预算，量身定制私有云建设方案。
  - 信创系统集成：将客户系统进行国产化封装，并进行 BT 等保测试，助力信创迁移。
  - 信息安全测试及咨询：提供内网自查服务，对每台设备进行漏洞扫描或定向测试，并输出整改建议报告。
  - 信息系统建设：帮助客户建立企业门户网站或部署 Blog、WAF、LTD、CRM 等应用系统。
- **定制解决方案**：
  - 专业定制：根据需求打造专属解决方案。
  - 高效交付：严格遵循项目时间表。
  - 持续支持：项目交付后提供完善的技术支持。
- **案例研究**：
  - **HTC iHAIKOU 网站建设**：为海口旅游职业学院建设国际站及国内站内容分发系统。
  - **VMware 私有云故障修复**：为海南好思达网络科技有限公司提供故障处理服务。
- **发展历史**：
  - **公司创立**：2025 年 4 月，两位创始人经过 6 个月的规划，成立公司。
  - **与海南好思达网络科技有限公司合作**：提供多次故障处理和咨询服务。
  - **与海口旅游职业学院（HTC）深度合作**：2025 年 5 月，为其建设 VMware 私有云体系、iHAIKOU 平台及 AI 智能助手，并持续提供咨询服务。

## 如何使用

- **访问网站**：https://www.xinnew.top 或 https://www.sec.hn.cn。
- **开发人员**：如需了解代码库或贡献代码，请参考以下贡献部分。

## 贡献

虽然此项目主要由海口希灵赛斯网络科技有限公司维护，但我们欢迎社区的建议和贡献。请 fork 仓库并提交 pull 请求以提出您的更改。

## 许可证

本项目使用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 商标

海口希灵赛斯网络科技有限公司的名称、标志及其他品牌标识为其商标，未经书面许可不得使用。在任何衍生作品中，您必须移除或替换公司品牌标识。

## 联系信息

如有任何询问、合作或支持，请联系我们：

- **电子邮件**：xsec-mail@sec.hn.cn