# 首页第一板块与导航栏兼容性优化计划

## 问题分析

当前首页第一板块（hero section）与固定导航栏存在以下兼容性问题：

1. **高度重叠**：导航栏 `position: fixed` 占据页面顶部，但 hero section 从 `top: 0` 开始，导致内容被导航栏遮挡
2. **logo 高度**：导航栏高度为 64px，但 logo 图片高度设置为 40px，可能导致视觉不平衡
3. **内容对齐**：hero 内容的 padding-top 可能未考虑导航栏高度

## 优化方案

### 步骤 1：调整 hero section 顶部内边距
- 为 `.ezy__header22_9Wbn5LJN` 添加 `padding-top: 64px`，确保内容不被导航栏遮挡

### 步骤 2：调整导航栏 logo 高度以达到更好的视觉平衡
- 将 `.nav-logo` 高度从 40px 调整为 36px，使导航项有更多垂直空间
- 相应调整 `.navbar-container` 高度

### 步骤 3：优化 hero 内容垂直对齐
- 确保 hero 内容在视口中垂直居中，考虑到导航栏高度

## 受影响文件
- `/Users/a0000/WebstormProjects/hkx-cms/index.html`

## 验证方法
1. 页面加载后首屏正确显示，导航栏和 hero 内容均可见
2. 滚动时导航栏保持固定，内容平滑滚动
3. 移动端和桌面端均正常工作
