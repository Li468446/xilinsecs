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

  var script2 = document.createElement('script');
  script2.async = true;
  script2.src = 'https://www.googletagmanager.com/gtag/js?id=G-0PVCDX1CZK';
  document.head.appendChild(script2);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'G-0PVCDX1CZK');

  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "u1z97w1v6n");
})();