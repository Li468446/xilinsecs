# Tasks

- [x] Task 1: 将 video 标签替换为 img 标签
  - [x] SubTask 1.1: 读取 index.html 了解当前结构
  - [x] SubTask 1.2: 将 `<video>` 及 `<source>` 标签替换为 `<img>` 标签，src 指向 `source/index_imgs/20260322-044041.jpg`
  - [x] SubTask 1.3: 保留 img 的 class="video-bg" 和 id="header-video" 以兼容现有 CSS

- [x] Task 2: 简化 CSS 样式
  - [x] SubTask 2.1: 将 .video-bg 的 video 相关样式保留，添加 img 兼容性
  - [x] SubTask 2.2: 移除不再需要的 video 相关样式注释

- [x] Task 3: 移除视频相关 JavaScript
  - [x] SubTask 3.1: 移除视频 parallax 滚动逻辑（video.style.transform）
  - [x] SubTask 3.2: 移除 initVideo 函数及 autoplay 处理
  - [x] SubTask 3.3: 移除 requestVideoFrameCallback 代码
  - [x] SubTask 3.4: 保留 heroContent 的 parallax 效果（不影响滚动）

# Task Dependencies
- Task 1 和 Task 2 可并行执行
- Task 3 依赖 Task 1 完成
