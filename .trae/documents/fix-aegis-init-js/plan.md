# 修复 api/aegis-init.js 文件错误计划

## 问题分析

`api/aegis-init.js` 文件包含大量报错，原因是：
- 文件扩展名是 `.js`（JavaScript 文件）
- 但文件内容包含 HTML `<script>` 标签
- 浏览器直接请求 JS 文件时会将 `<script>` 标签作为文本处理，导致解析错误

## 解决方案

将 `api/aegis-init.js` 重构为纯 JavaScript 文件，移除所有 HTML `<script>` 标签，改为标准 JavaScript 代码。

### 修改前（错误）
```html
<script src="https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js"></script>
<script>
  if (typeof Aegis === 'function') {
    var aegis = new Aegis({...});
  }
</script>
```

### 修改后（正确）
```javascript
(function() {
  var script1 = document.createElement('script');
  script1.src = 'https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js';
  document.head.appendChild(script1);

  script1.onload = function() {
    if (typeof Aegis === 'function') {
      new Aegis({
        id: '0GVpeTz2n3Epk34gYP',
        uin: 'e70af75a-1e3f-4f1d-9d23-302dca2dc099',
        reportApiSpeed: true,
        reportAssetSpeed: true,
        spa: true,
        hostUrl: 'https://rumt-zh.com'
      });
    }
  };

  // Google Analytics
  var script2 = document.createElement('script');
  script2.async = true;
  script2.src = 'https://www.googletagmanager.com/gtag/js?id=G-0PVCDX1CZK';
  document.head.appendChild(script2);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'G-0PVCDX1CZK');

  // Microsoft Clarity
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "u1z97w1v6n");
})();
```

## 受影响文件
- `/Users/a0000/WebstormProjects/hkx-cms/api/aegis-init.js`

## 验证方法
1. 浏览器控制台无 JavaScript 错误
2. 页面正常加载
3. Aegis、Google Analytics、Clarity 监控功能正常工作
