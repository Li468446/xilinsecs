# 海口希灵赛斯网络科技有限公司官方网站

![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.sec.hn.cn)
![GitHub last commit](https://img.shields.io/github/last-commit/hkx-cms/hkx-cms)
![GitHub](https://img.shields.io/github/license/hkx-cms/hkx-cms)

海口希灵赛斯网络科技有限公司官方网站源代码仓库。我们专注于提供企业级信息化解决方案，包括私有云建设、信息安全咨询和网站开发等服务。

## 项目概述

本项目是海口希灵赛斯网络科技有限公司官方网站的完整代码库，采用静态网站架构，使用HTML5、CSS3和原生JavaScript构建。网站遵循现代化Web标准，支持响应式设计，兼容各种设备和浏览器。

### 核心功能

- **企业展示**：全面展示公司业务、产品和服务
- **SEO优化**：完善的搜索引擎优化配置
- **AI友好**：支持大语言模型(LLM)索引和内容理解
- **响应式设计**：适配各种屏幕尺寸和设备
- **PWA支持**：提供类似原生应用的用户体验

## 技术架构

### 前端技术栈

- HTML5语义化标签
- CSS3变量和现代化样式
- 原生JavaScript (ES5兼容)
- 响应式设计框架

### 项目结构

```
.
├── api/                 # API配置文件
├── business/            # 业务相关页面
│   ├── product/         # 产品展示
│   ├── services/        # 服务页面
│   │   ├── b/           # 企业服务
│   │   ├── c/           # 客户支持
│   │   ├── g/           # 公共服务
│   │   └── p/           # 合作伙伴
├── careers/             # 招聘信息
├── leadership/          # 领导团队
├── legal/               # 法律信息
├── source/              # 静态资源
└── ...                  # 配置文件和索引文件
```

### 核心配置文件

- `robots.txt` - 搜索引擎爬虫访问规则
- `sitemap.xml` - 网站地图索引
- `llms.txt` - 大语言模型索引文件（新增）
- `manifest.json` - PWA应用配置
- `/source/footer.js` - 全局页脚配置
- `/leadership/config.js` - 领导团队新闻配置
- `/api/info.json` - API端点配置文件，包含DOH服务和IP地理位置查询等接口信息

## AI优化特性

### LLMs.txt支持

我们新增了`llms.txt`文件，为大语言模型提供结构化的内容索引，帮助AI更好地理解和引用我们网站的信息。

文件位置：[/llms.txt](llms.txt)

该文件采用Markdown格式，包含：
- 网站内容概述
- 核心业务分类索引
- 重要页面链接和简要描述

### API配置

我们新增了API配置文件`/api/info.json`，其中包含所有外部服务的端点信息：
- DOH(DNS over HTTPS)服务端点
- IP地理位置查询接口
- 第三方监控服务配置

所有前端服务都应通过读取此配置文件获取服务端点，确保配置变更时无需修改前端代码。

### SEO增强

- 结构化数据（Schema.org）
- Open Graph标签
- Twitter Card标签
- 语义化HTML结构

## 开发指南

### 本地运行

```bash
# 克隆项目
git clone https://github.com/your-username/hkx-cms.git

# 进入项目目录
cd hkx-cms

# 启动本地服务器（需要Python）
python -m http.server 8000

# 或使用其他本地服务器工具
```

### 目录规范

遵循模块化设计原则，按功能划分目录：
- 每个业务模块独立目录
- 配置文件集中管理
- 静态资源统一存放

### API配置规范

所有外部服务的API端点应配置在`/api/info.json`文件中，前端代码应通过读取该配置文件获取服务端点，避免硬编码URL。

### 编码规范

- HTML语义化标签
- CSS变量统一管理样式
- JavaScript模块化组织
- 文件命名规范统一

## 部署说明

1. 确保所有静态资源路径正确
2. 检查配置文件中的链接有效性
3. 上传到Web服务器目录
4. 验证各页面正常访问

## SEO和可访问性

- 完整的元数据配置
- 语义化HTML结构
- 响应式设计
- 图片alt属性
- 合理的标题层级

## 贡献指南

虽然此项目主要由海口希灵赛斯网络科技有限公司维护，但我们欢迎社区的建议和贡献。

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 许可证

本项目使用MIT许可证。详见[LICENSE](LICENSE)文件。

## 商标声明

海口希灵赛斯网络科技有限公司的名称、标志及其他品牌标识为其注册商标，未经书面许可不得使用。在任何衍生作品中，您必须移除或替换公司品牌标识。

## 联系我们

如有任何询问、合作或技术支持需求，请通过以下方式联系我们：

- **官方网站**：[https://www.sec.hn.cn](https://www.sec.hn.cn)
- **电子邮箱**：xsec-mail@sec.hn.cn
- **客服支持**：[在线客服](https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af)