if (!('IntersectionObserver' in window)) {
  document.querySelectorAll(
    '.fade-card,.scroll-animate,.need-card,.product-card,.timeline-item,.team-card-apple,.team-heading-apple,.team-subheading-apple'
  ).forEach(function(el){ el.classList.add('show'); el.classList.add('visible'); });
}

(function(){
  function setVH(){
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH);
  try {
    var bsVar = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-font-family');
    if (!bsVar) { document.documentElement.classList.add('no-bootstrap'); }
  } catch(e) {}
})();
