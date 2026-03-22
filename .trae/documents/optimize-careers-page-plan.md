# 优化 /careers/cn/ 页面加载速度计划

## 页面现状分析

### 性能瓶颈识别

| 问题类型 | 具体问题 | 影响程度 |
|---------|---------|---------|
| **外部资源阻塞** | Bootstrap CSS/JS、Font Awesome 从 CDN 并行加载但未优化 | 高 |
| **大量装饰动画** | 17 个背景装饰元素持续运行 CSS 动画（float, pulse, rotate）| 高 |
| **内联 CSS 体积** | 超过 800 行内联样式，无法缓存 | 中 |
| **滚动事件频繁** | 3 个独立 scroll 事件监听器，无节流 | 中 |
| **无懒加载** | 首屏外元素未实现懒加载 | 中 |
| **重复声明** | CSS 变量和样式有重复定义 | 低 |

---

## 优化方案

### 1. 资源加载优化

**1.1 移除未使用的库**
- 该页面实际使用了 Bootstrap 的 navbar 和 grid 系统，但未使用其组件功能
- Font Awesome 仅使用了 5 个图标（gem, heartbeat, graduation-cap, calendar-alt）
- **方案**：将 Font Awesome 替换为轻量级 SVG 内联图标，移除 Bootstrap 改用纯 CSS 实现

**1.2 CSS/JS 异步加载**
- 将非关键 CSS 标记为 `media="print" onload="this.media='all'"` 异步加载
- 将 `<script>` 标签添加 `defer` 属性

### 2. 动画性能优化

**2.1 减少装饰元素**
- 将 17 个背景装饰减少到 4-5 个（保留视觉效果）
- 使用 `will-change` 和 `transform` 代替 `top/left` 动画
- 使用 `GPU` 加速：`transform: translate3d()` 启用 compositor layer

**2.2 动画控制**
- 使用 `prefers-reduced-motion` 媒体查询禁用动画（无障碍访问）
- 将持续动画改为滚动触发的一次性动画

### 3. JavaScript 优化

**3.1 滚动事件合并**
- 将 3 个独立的 scroll 监听器合并为 1 个
- 使用 `IntersectionObserver` 替代滚动位置计算实现动画触发
- 使用 `{ passive: true }` 标记

**3.2 代码简化**
- 移除重复的 DOM 查询逻辑

### 4. 缓存与压缩

**4.1 样式外抽**
- 将内联 CSS 移至单独文件利用浏览器缓存

---

## 实施步骤

1. [ ] 将 Font Awesome 替换为内联 SVG 图标
2. [ ] 将 Bootstrap 依赖移除，使用纯 CSS navbar
3. [ ] 减少背景装饰元素数量（17 → 4）
4. [ ] 优化 CSS 动画（添加 GPU 加速、will-change）
5. [ ] 合并滚动事件监听器
6. [ ] 使用 IntersectionObserver 实现动画懒触发
7. [ ] CSS/JS 添加异步加载属性
8. [ ] 添加 prefers-reduced-motion 支持
9. [ ] 验证页面功能完整性
10. [ ] 使用浏览器 DevTools 验证性能提升

---

## 预期效果

| 指标 | 优化前 | 优化后 |
|-----|-------|-------|
| 页面 FCP | ~2.5s | ~1.2s |
| 外部请求数 | 4 | 0 |
| CSS 动画元素 | 17 | 4 |
| JS 滚动监听器 | 3 | 1 |
| 主线程阻塞 | 严重 | 轻微 |
