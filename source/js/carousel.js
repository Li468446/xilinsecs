/**
 * 轮播组件
 * 提供触摸滑动、自动播放、拖拽交互等功能
 */
class Carousel {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.track = this.container?.querySelector('.carousel-track');
    this.options = {
      autoPlay: options.autoPlay !== false,
      autoPlayInterval: options.autoPlayInterval || 5000,
      pauseOnHover: options.pauseOnHover !== false,
      dragEnabled: options.dragEnabled !== false,
      loop: options.loop !== false,
      visibleCount: options.visibleCount || 3,
      ...options
    };

    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isDragging = false;
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.velocity = 0;
    this.lastX = 0;
    this.animationId = null;

    this.init();
  }

  init() {
    if (!this.container || !this.track) return;

    this.setupTouchEvents();
    this.setupMouseEvents();

    if (this.options.autoPlay) {
      this.startAutoPlay();
    }

    if (this.options.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  getPositionX(event) {
    return event.touches ? event.touches[0].clientX : event.clientX;
  }

  setupTouchEvents() {
    this.track.addEventListener('touchstart', (e) => this.startDrag(e));
    this.track.addEventListener('touchmove', (e) => this.drag(e));
    this.track.addEventListener('touchend', () => this.endDrag());
    this.track.addEventListener('touchcancel', () => this.endDrag());
  }

  setupMouseEvents() {
    if (!this.options.dragEnabled) return;

    this.track.addEventListener('mousedown', (e) => this.startDrag(e));
    this.track.addEventListener('mousemove', (e) => this.drag(e));
    this.track.addEventListener('mouseup', () => this.endDrag());
    this.track.addEventListener('mouseleave', () => this.endDrag());
    this.track.style.cursor = 'grab';
  }

  startDrag(event) {
    this.isDragging = true;
    this.startX = this.getPositionX(event) - this.prevTranslate;
    this.velocity = 0;
    this.lastX = this.getPositionX(event);
    this.pauseAutoPlay();

    if (this.track.style.animationPlayState) {
      this.track.style.animationPlayState = 'paused';
    }
    cancelAnimationFrame(this.animationId);
  }

  drag(event) {
    if (!this.isDragging) return;

    const x = this.getPositionX(event);
    const dx = x - this.lastX;
    this.velocity = dx;
    this.currentTranslate = x - this.startX;
    this.lastX = x;

    this.animationId = requestAnimationFrame(() => {
      this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    });
  }

  endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.prevTranslate = this.currentTranslate;

    const movedBy = this.currentTranslate - this.prevTranslate;
    const threshold = 50;

    if (movedBy < -threshold) {
      this.next();
    } else if (movedBy > threshold) {
      this.prev();
    }

    if (this.options.dragEnabled) {
      this.track.style.cursor = 'grab';
    }

    requestAnimationFrame(() => {
      if (this.options.autoPlay) {
        this.startAutoPlay();
      }
      if (this.track.style.animationPlayState !== '') {
        setTimeout(() => {
          this.track.style.animationPlayState = 'running';
        }, 100);
      }
    });
  }

  goTo(index, immediate = false) {
    const cards = this.track.children;
    if (!cards.length) return;

    const totalCards = cards.length;
    this.currentIndex = Math.max(0, Math.min(index, totalCards - 1));

    if (immediate) {
      this.track.style.transition = 'none';
    } else {
      this.track.style.transition = 'transform 0.5s ease';
    }

    const cardWidth = cards[0]?.offsetWidth || 300;
    const gap = 30;
    const offset = -this.currentIndex * (cardWidth + gap);

    this.track.style.transform = `translateX(${offset}px)`;

    if (immediate) {
      this.track.offsetHeight;
      this.track.style.transition = '';
    }
  }

  next() {
    const cards = this.track.children;
    if (!cards.length) return;

    const maxIndex = cards.length - this.options.visibleCount;
    if (this.currentIndex < maxIndex) {
      this.goTo(this.currentIndex + 1);
    } else if (this.options.loop) {
      this.goTo(0);
    }
  }

  prev() {
    const cards = this.track.children;
    if (!cards.length) return;

    const maxIndex = cards.length - this.options.visibleCount;
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    } else if (this.options.loop) {
      this.goTo(maxIndex);
    }
  }

  startAutoPlay() {
    this.pauseAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.options.autoPlayInterval);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  destroy() {
    this.pauseAutoPlay();
    this.track.style.transform = '';
    this.track.style.cursor = '';
  }
}

if (typeof window !== 'undefined') {
  window.Carousel = Carousel;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Carousel;
}
