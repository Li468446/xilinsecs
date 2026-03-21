# 首页加载速度优化规范

## Why
当前首页加载速度较慢，影响用户体验和 SEO 排名。需要通过优化资源加载策略来提升页面性能，同时保留所有页面内容。

## What Changes
- 图片资源：使用 `loading="lazy"` 延迟加载非首屏图片
- 视频资源：添加 `preload="none"` 避免预加载，保留 `poster` 作为预览图
- 字体加载：使用 `font-display: swap` 确保文字可读
- CSS/JS 资源：确保使用异步加载方式
- 减少不必要的重绘和回流

## Impact
- 受影响文件：`index.html`
- 用户体验：页面加载更快，首屏显示更早
- SEO：页面性能指标提升

## ADDED Requirements
### Requirement: 图片延迟加载
系统 SHALL 对非首屏图片使用 `loading="lazy"` 属性

#### Scenario: 首屏图片
- **WHEN** 首页加载时
- **THEN** 首屏可见的图片立即加载

#### Scenario: 非首屏图片
- **WHEN** 图片进入可视区域前
- **THEN** 不加载该图片，等待滚动到可视区域

### Requirement: 视频资源优化
系统 SHALL 优化视频加载策略，不阻塞页面渲染

#### Scenario: 视频加载
- **WHEN** 首页加载时
- **THEN** 视频不预加载，仅在用户点击播放时加载

### Requirement: 字体显示优化
系统 SHALL 使用 `font-display: swap` 确保文字始终可见

#### Scenario: 字体加载中
- **WHEN** 自定义字体正在加载
- **THEN** 使用系统字体显示，字体加载完成后切换
