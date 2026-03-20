# 顶部导航栏Apple风格重构规范

## Why
参考Apple网站顶部栏效果，重构导航栏样式，提供更流畅的下拉动画和用户体验。

## What Changes
- 采用Apple风格的毛玻璃导航栏
- 下拉菜单使用平滑过渡动画（类似Apple）
- 优化悬停效果和过渡
- 保持现有内容不变，只改样式

## Impact
- 受影响文件：`index.html`（导航栏CSS样式）
- 用户体验：更流畅、更现代的导航交互

## ADDED Requirements
### Requirement: Apple风格下拉动画
系统 SHALL 提供流畅的下拉菜单动画

#### Scenario: 悬停下拉
- **WHEN** 用户悬停在导航项上
- **THEN** 下拉菜单平滑淡入，带轻微缩放效果

#### Scenario: 关闭下拉
- **WHEN** 用户移开鼠标
- **THEN** 下拉菜单平滑淡出
