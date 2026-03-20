/**
 * 导航栏模块
 * 处理导航栏的滚动效果、下拉菜单和响应式行为
 */
class Navbar {
  constructor(options = {}) {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.dropdownConfigs = options.dropdownConfigs || [
      { itemId: 'businessDropdownItem', toggleId: 'businessDropdown' },
      { itemId: 'aboutDropdownItem', toggleId: 'aboutDropdown' },
      { itemId: 'serviceDropdownItem', toggleId: 'serviceDropdown' },
      { itemId: 'productDropdownItem', toggleId: 'productDropdown' }
    ];
    this.lastScrollPosition = 0;
    this.ticking = false;
    this.scrollThreshold = options.scrollThreshold || 50;
    this.transitionDuration = options.transitionDuration || 300;

    this.init();
  }

  init() {
    if (!this.navbar) return;

    this.initDropdowns();
    this.initScrollHandler();
    this.initVisibilityHandler();
  }

  initDropdowns() {
    this.dropdownConfigs.forEach(config => {
      const itemEl = document.getElementById(config.itemId);
      const toggleEl = document.getElementById(config.toggleId);

      if (itemEl && toggleEl) {
        this.setupDropdown(itemEl, toggleEl);
      }
    });
  }

  setupDropdown(dropdownItem, dropdownToggle) {
    const dropdownMenu = dropdownToggle.nextElementSibling;
    if (!dropdownMenu) return;

    let timeoutId;

    const showDropdown = () => {
      clearTimeout(timeoutId);
      dropdownMenu.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
      dropdownMenu.style.opacity = '0';
      dropdownMenu.style.transform = 'translateY(-10px) scale(0.95)';
      dropdownMenu.style.pointerEvents = 'none';

      dropdownMenu.offsetHeight;

      const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
      instance.show();
      dropdownToggle.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.add('show');

      setTimeout(() => {
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.transform = 'translateY(0) scale(1)';
        dropdownMenu.style.pointerEvents = 'auto';
      }, 10);
    };

    const hideDropdown = () => {
      clearTimeout(timeoutId);
      dropdownMenu.style.opacity = '1';
      dropdownMenu.style.transform = 'translateY(0) scale(1)';
      dropdownMenu.style.pointerEvents = 'auto';

      timeoutId = setTimeout(() => {
        setTimeout(() => {
          dropdownMenu.style.opacity = '0';
          dropdownMenu.style.transform = 'translateY(-10px) scale(0.95)';
          dropdownMenu.style.pointerEvents = 'none';

          timeoutId = setTimeout(() => {
            dropdownMenu.classList.remove('show');
            const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
            instance.hide(true);
            dropdownToggle.setAttribute('aria-expanded', 'false');
          }, 300);
        }, 10);
      }, 200);
    };

    dropdownItem.addEventListener('mouseenter', showDropdown);
    dropdownItem.addEventListener('mouseleave', hideDropdown);
    dropdownMenu.addEventListener('mouseenter', showDropdown);
    dropdownMenu.addEventListener('mouseleave', hideDropdown);
  }

  initScrollHandler() {
    const onScroll = () => {
      if (!this.ticking) {
        requestAnimationFrame(() => this.updateNavbarOnScroll());
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', Utils.throttle(onScroll, 16), { passive: true });
  }

  updateNavbarOnScroll() {
    const scrollPosition = window.scrollY;

    if (Math.abs(scrollPosition - this.lastScrollPosition) < 2) {
      this.ticking = false;
      return;
    }

    this.lastScrollPosition = scrollPosition;
    const scrollPercentage = Math.min(scrollPosition / 100, 1);

    const r = 255 - (255 - 30) * scrollPercentage;
    const g = 255 - (255 - 30) * scrollPercentage;
    const b = 255 - (255 - 30) * scrollPercentage;
    const alpha = 0.2 + 0.65 * scrollPercentage;

    this.navbar.style.background = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;

    const textR = 68 + (255 - 68) * scrollPercentage;
    const textG = 68 + (255 - 68) * scrollPercentage;
    const textB = 68 + (255 - 68) * scrollPercentage;

    this.navLinks.forEach(link => {
      link.style.color = `rgb(${Math.floor(textR)}, ${Math.floor(textG)}, ${Math.floor(textB)})`;
    });

    const brand = document.querySelector('.navbar-brand');
    if (brand) {
      brand.style.color = `rgb(${Math.floor(textR)}, ${Math.floor(textG)}, ${Math.floor(textB)})`;
    }

    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
      const menuBgAlpha = 0.7 + 0.2 * scrollPercentage;
      menu.style.background = `rgba(255, 255, 255, ${menuBgAlpha})`;
      menu.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    });

    if (scrollPosition > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.ticking = false;
  }

  initVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.removeEventListener('scroll', this.handleScroll);
      } else {
        window.addEventListener('scroll', Utils.throttle(() => this.updateNavbarOnScroll(), 16), { passive: true });
      }
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.navbar = null;
  }
}

if (typeof window !== 'undefined') {
  window.Navbar = Navbar;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navbar;
}
