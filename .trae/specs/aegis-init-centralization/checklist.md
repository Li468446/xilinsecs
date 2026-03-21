# Checklist

- [x] `api/aegis-init.js` 文件创建完成，包含所有三个第三方监控脚本
- [x] `api/aegis-init.js` 中的脚本顺序与原页面保持一致（Aegis → gtag → Clarity）
- [x] `api/aegis-init.js` 中的配置参数（id、uin、hostUrl 等）与原页面保持一致
- [x] 所有 HTML 页面的 `<head>` 中已替换为单一的 `<script src="/api/aegis-init.js"></script>` 引用
- [x] HTML 页面中不再包含重复的内联脚本段落（Aegis 初始化块、gtag 初始化块、Clarity 初始化块）
- [x] 页面功能保持不变，监控脚本仍能正常加载和上报
