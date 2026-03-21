# 首页Hero区域滚动闪烁问题修复计划

## 问题描述
首页稍微向下滑动时，第一栏的背景图片会突然变亮后又变暗。

## 问题分析

代码中存在两套独立的滚动处理逻辑：

### 1. 导航栏滚动处理（454-491行）
```javascript
if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
} else {
    navbar.classList.remove('scrolled');
}
```
- 导航栏背景在 `scrollY > 50px` 时变化
- 初始背景：`rgba(0, 0, 0, 0.85)`
- scrolled背景：`rgba(30, 30, 30, 0.95)`

### 2. Hero区域滚动处理（567-618行）
```javascript
function updateHeader() {
    lastScroll = lerp(lastScroll, currentScroll, 0.1);
    heroContent.style.transform = `translate3d(0, ${lastScroll * 0.03}px, 0)`;
    heroContent.style.opacity = Math.max(0, 1 - currentScroll / 300);
    const overlayOpacity = Math.min(0.65, currentScroll / 500 * 0.65);
    overlay.style.background = `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,${overlayOpacity}))`;
    ticking = false;
}
```

### 问题根源
1. **lerp插值延迟**：`lastScroll` 通过 `lerp` 平滑追赶 `currentScroll`，追赶系数为 0.1
2. **状态不一致**：导航栏状态变化是"突变"的（阈值50px），而hero区域变化是"渐变"的
3. **双重背景机制**：
   - 背景图片：`source/index_imgs/20260322-044041.jpg`
   - overlay遮罩：初始透明，滚动时渐变增加黑色遮罩

当用户滚动到约50px位置时，lerp计算的 `lastScroll` 大约在 5px 左右（因为 0.1 追赶系数），而导航栏的 scrolled 类已经添加/移除，导致视觉上的不一致。

**闪烁原因**：
- 在滚动初期，lerp的追赶过程导致 `lastScroll * 0.03` 的值变化不均匀
- 导航栏背景突变 + overlay渐变，造成视觉闪烁

## 解决方案

移除hero区域滚动处理中的lerp插值，使用直接计算或更平滑的CSS transition。

### 修改文件
`/Users/a0000/WebstormProjects/hkx-cms/index.html`

### 修改内容

#### 方案：使用CSS transition替代JS lerp插值

1. **移除lerp插值计算**：heroContent的transform和opacity直接基于currentScroll计算
2. **统一导航栏变化阈值**：调整导航栏scrolled类的触发阈值，或使用平滑过渡

具体修改点：
- 第567-618行的 `updateHeader` 函数
- 移除 `lastScroll` 变量
- 移除 `lerp` 调用
- 直接使用 `currentScroll` 计算 transform 和 opacity
