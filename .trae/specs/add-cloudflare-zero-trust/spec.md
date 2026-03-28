# CloudFlare Zero Trust 跨境办公页面 Spec

## Why
公司员工需要一种安全、便捷的方式实现跨境办公访问。CloudFlare Zero Trust 提供了零信任网络访问解决方案，需要创建一个专门的页面来指导员工下载客户端并加入公司团队(sec-hn-cn)。

## What Changes
- 在页脚"资源"栏目下新增"跨境办公"选项
- 开发 CloudFlare Zero Trust 下载和加入团队说明页面
- 页面路径: `/source/ssrc/cf-sec-hn-cn/index.html`
- 团队名称: sec-hn-cn

## Impact
- 受影响组件: 页脚(footer.js)
- 新增页面: source/ssrc/cf-sec-hn-cn/index.html

## ADDED Requirements

### Requirement: 页脚新增跨境办公入口
The system SHALL provide a link to the CloudFlare Zero Trust page in the footer resources section.

#### Scenario: 用户查看页脚
- **WHEN** 用户浏览网站页脚
- **THEN** 在"资源"栏目下看到"跨境办公"选项
- **AND** 点击后跳转到 `/source/ssrc/cf-sec-hn-cn/index.html`

### Requirement: CloudFlare Zero Trust 说明页面
The system SHALL provide a comprehensive page for downloading CloudFlare Zero Trust client and joining the team.

#### Scenario: 用户访问跨境办公页面
- **WHEN** 用户访问 `/source/ssrc/cf-sec-hn-cn/index.html`
- **THEN** 页面显示 CloudFlare Zero Trust 的介绍
- **AND** 提供各平台客户端下载链接
- **AND** 显示团队加入说明和团队名称(sec-hn-cn)
- **AND** 页面风格与现有网站保持一致(苹果毛玻璃风格)

#### Scenario: 页面内容结构
- **GIVEN** 用户访问页面
- **THEN** 页面包含以下模块:
  1. 页面标题和简介
  2. CloudFlare Zero Trust 介绍
  3. 客户端下载区域(Windows/macOS/Android/iOS)
  4. 团队加入说明(团队名称: sec-hn-cn)
  5. 使用说明和注意事项
  6. 统一页脚

#### Scenario: 响应式设计
- **GIVEN** 用户使用不同设备访问
- **WHEN** 设备宽度变化
- **THEN** 页面自适应显示，确保移动端和桌面端都有良好体验
