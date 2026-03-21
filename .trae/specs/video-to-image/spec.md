# 首页视频背景替换为静态图片 Spec

## Why
首页视频背景在滚动时存在 bug（视频 parallax 效果导致滚动异常），将视频替换为静态图片可解决该问题，同时减少页面加载体积。

## What Changes
- 将首页 `index.html` 的 `<video>` 标签替换为 `<img>` 标签展示 `source/index_imgs/20260322-044041.jpg`
- 移除视频相关的 JS 逻辑（parallax 滚动、视频帧回调等）
- 保留 video-overlay 渐变遮罩效果
- 移除 video-bg 相关 CSS 样式

## Impact
- Affected specs：首页视觉呈现
- Affected code：`index.html`（头部模块）

## ADDED Requirements
### Requirement: 静态图片背景
系统 SHALL 使用 `source/index_imgs/20260322-044041.jpg` 作为首页头部背景图片。

#### Scenario: 图片正常显示
- **WHEN** 页面加载完成
- **THEN** 背景显示静态图片，覆盖整个视口

## MODIFIED Requirements
### Requirement: 头部背景模块
原视频背景模块修改为静态图片背景模块：
- 移除 `<video>` 标签及其 source 子元素
- 移除视频控制逻辑（play/pause/autoplay 处理）
- 移除视频 parallax 滚动效果
- 保留图片的 object-fit: cover 填充方式
- 保留 video-overlay 渐变遮罩

## REMOVED Requirements
### Requirement: 视频背景
**Reason**: 视频滚动时有 bug，且增加页面加载体积
**Migration**: 替换为静态图片

### Requirement: 视频相关 JavaScript
**Reason**: 不再需要视频控制逻辑
**Migration**: 移除 video parallax、requestVideoFrameCallback 等代码
