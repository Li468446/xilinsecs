/**
 * 工具函数库
 * 提供常用的JavaScript工具函数
 */
const Utils = {
  /**
   * 节流函数 - 限制函数在指定时间间隔内最多执行一次
   * @param {Function} func - 要节流的函数
   * @param {number} limit - 时间间隔（毫秒）
   * @returns {Function} 节流后的函数
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * 防抖函数 - 延迟执行函数，直到停止调用一段时间后
   * @param {Function} func - 要防抖的函数
   * @param {number} wait - 等待时间（毫秒）
   * @param {boolean} immediate - 是否立即执行
   * @returns {Function} 防抖后的函数
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  /**
   * 线性插值
   * @param {number} start - 起始值
   * @param {number} end - 结束值
   * @param {number} amt - 插值量（0-1）
   * @returns {number} 插值结果
   */
  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  },

  /**
   * 生成范围随机数
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number} 随机数
   */
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * 随机整数
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number} 随机整数
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * 格式化数字（补零）
   * @param {number} num - 数字
   * @returns {string} 格式化后的字符串
   */
  padZero(num) {
    return num.toString().padStart(2, '0');
  },

  /**
   * 检查元素是否在视口中
   * @param {HTMLElement} element - 要检查的元素
   * @param {number} threshold - 触发阈值（0-1）
   * @returns {boolean} 是否在视口
   */
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
      rect.bottom >= 0
    );
  },

  /**
   * 获取元素相对于视口的位置
   * @param {HTMLElement} element - 元素
   * @returns {object} 位置信息
   */
  getPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height
    };
  },

  /**
   * 平滑滚动到元素
   * @param {HTMLElement|string} target - 目标元素或选择器
   * @param {number} offset - 偏移量
   */
  smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * 创建Intersection Observer
   * @param {Function} callback - 回调函数
   * @param {object} options - 配置选项
   * @returns {IntersectionObserver} Observer实例
   */
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  },

  /**
   * 观察元素
   * @param {HTMLElement} element - 要观察的元素
   * @param {Function} onVisible - 可见时的回调
   * @param {Function} onHidden - 不可见时的回调
   * @param {object} options - 配置选项
   */
  observeElement(element, onVisible, onHidden, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onVisible && onVisible(entry);
        } else {
          onHidden && onHidden(entry);
        }
      });
    }, options);

    observer.observe(element);
    return observer;
  },

  /**
   * 加载脚本
   * @param {string} src - 脚本URL
   * @returns {Promise} Promise对象
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  /**
   * 加载样式表
   * @param {string} href - 样式表URL
   * @returns {Promise} Promise对象
   */
  loadStylesheet(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  },

  /**
   * DOM就绪
   * @param {Function} callback - 回调函数
   */
  ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  },

  /**
   * 事件委托
   * @param {HTMLElement} parent - 父元素
   * @param {string} event - 事件类型
   * @param {string} selector - 子元素选择器
   * @param {Function} handler - 事件处理函数
   */
  delegate(parent, event, selector, handler) {
    parent.addEventListener(event, function(e) {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, e);
      }
    });
  },

  /**
   * 深度合并对象
   * @param {object} target - 目标对象
   * @param {...object} sources - 源对象
   * @returns {object} 合并后的对象
   */
  deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.deepMerge(target, ...sources);
  },

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  },

  /**
   * 获取设备类型
   * @returns {string} 'mobile' | 'tablet' | 'desktop'
   */
  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },

  /**
   * 是否为触摸设备
   * @returns {boolean}
   */
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
};

if (typeof window !== 'undefined') {
  window.Utils = Utils;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
