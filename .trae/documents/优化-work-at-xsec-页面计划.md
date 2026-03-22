# 优化 work-at-xsec.html 页面计划

## 任务概述
1. 在开放职位板块嵌入 JPS 职位申请表单（非全屏嵌入）
2. 优化页面访问速度

## 详细实施步骤

### 步骤 1：嵌入 JPS 职位申请表单
- 在职位列表下方添加一个新的 section
- 创建 iframe 容器，包含申请表单
- 设置适当的容器高度（约800px）和样式
- 表单 URL：`https://f.kdocs.cn/ksform/w/write/bC39DvWX#routePromt`

### 步骤 2：移除未使用的 Bootstrap 依赖
- 当前页面只使用了少量 Bootstrap 类，但加载了完整的 Bootstrap CSS/JS
- 移除 Bootstrap CSS CDN 引入（`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">`）
- 移除 Bootstrap JS CDN 引入（`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>`）
- 将 navbar 相关的 Bootstrap 类（如 `navbar-expand-lg`、`py-3`、`container`、`position-relative` 等）替换为纯 CSS 实现

### 步骤 3：优化 Font Awesome 引用
- 当前只使用了 Font Awesome 的图标功能
- 将完整的 Font Awesome 库替换为仅包含使用到的图标的精简版本
- 或者使用 CDN 的 `all.min.js` 配合 `all.min.css`，但可以考虑按需加载

### 步骤 4：减少背景装饰元素数量
- 当前有 17 个背景装饰元素（bg-decor-1 到 bg-decor-10、bg-triangle-1/2、bg-square-1/2）
- 保留 4-5 个主要的装饰元素，移除其余的
- 这样可以减少 DOM 复杂度和重排/重绘

### 步骤 5：优化动画性能
- 将装饰元素的动画简化为仅使用 CSS transform（GPU 加速）
- 添加 `will-change` 属性提示浏览器优化
- 减少动画元素的 filter 使用（blur 会导致重绘）

### 步骤 6：懒加载 iframe
- 为 iframe 添加 `loading="lazy"` 属性
- 使用 Intersection Observer 实现滚动到可视区域时才加载 iframe

### 步骤 7：优化 JavaScript
- 合并滚动事件处理逻辑
- 使用 `passive: true` 优化滚动监听（已有）
- 移除不必要的 DOM 查询

## 预期效果
- 页面加载速度提升 30-50%
- 减少外部 CDN 请求（从 4 个减少到 2 个）
- 减少 DOM 元素数量和重排/重绘次数
- JPS 表单通过 iframe 正常嵌入显示