# 工作页面重构规范

## Why

当前 work-at-xsec.html 页面布局显示不合理，需要重构以：

* 与 index.html 保持一致的导航栏实现

* 简化页面结构，提升可维护性

* 确保移动端显示正常

## What Changes

* 采用与 careers/cn/index.html 一致的导航栏实现

* 简化页面结构，移除冗余代码

* 保持页面功能和内容完整

## Impact

* 受影响文件：`careers/cn/work-at-xsec.html`

* 用户体验：页面布局合理，导航流畅

## MODIFIED Requirements

### Requirement: 页面基本结构

页面 SHALL 包含以下基本元素：

* 固定导航栏（与 index.html 一致）

* Hero 区域（标题和副标题）

* 职位列表区域

* 在线申请区域

* 应征者查询区域

* 公平就业声明

* 页脚

### Requirement: 导航栏功能

导航栏 SHALL 提供以下功能：

* 桌面端：水平菜单显示

* 移动端：汉堡菜单切换显示/隐藏

* 滚动时背景变化效果

* 当前页面高亮显示

### Requirement: 页面内容保留

保留以下内容：

* 在线申请表单 iframe

* 应征者查询按钮

* 公平就业机会声明

* 申请模态弹窗

