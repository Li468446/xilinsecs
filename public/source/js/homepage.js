(function () {
  const supportsIO = "IntersectionObserver" in window;
  const supportsRIC = "requestIdleCallback" in window;
  let projectDataPromise;

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function throttle(callback, wait) {
    let lastCall = 0;
    let timeoutId = 0;

    return function throttled(...args) {
      const now = Date.now();
      const remaining = wait - (now - lastCall);

      if (remaining <= 0) {
        lastCall = now;
        callback.apply(this, args);
        return;
      }

      if (timeoutId) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        timeoutId = 0;
        lastCall = Date.now();
        callback.apply(this, args);
      }, remaining);
    };
  }

  function runWhenIdle(callback, timeout) {
    if (supportsRIC) {
      window.requestIdleCallback(callback, { timeout: timeout || 2000 });
      return;
    }

    window.addEventListener(
      "load",
      () => {
        window.setTimeout(callback, 0);
      },
      { once: true }
    );
  }

  function once(callback) {
    let called = false;

    return function runOnce(...args) {
      if (called) {
        return;
      }
      called = true;
      callback.apply(this, args);
    };
  }

  function observeElement(target, options) {
    const element = typeof target === "string" ? document.querySelector(target) : target;

    if (!element) {
      return null;
    }

    const settings = {
      rootMargin: "300px 0px",
      threshold: 0.01,
      once: true,
      onEnter: null,
      onLeave: null,
      ...options,
    };

    if (!supportsIO) {
      if (typeof settings.onEnter === "function") {
        settings.onEnter(element);
      }
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (typeof settings.onEnter === "function") {
              settings.onEnter(entry.target, entry);
            }
            if (settings.once) {
              observer.unobserve(entry.target);
            }
          } else if (typeof settings.onLeave === "function") {
            settings.onLeave(entry.target, entry);
          }
        });
      },
      {
        rootMargin: settings.rootMargin,
        threshold: settings.threshold,
      }
    );

    observer.observe(element);
    return observer;
  }

  function loadScript(src, options) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      return Promise.resolve(existing);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const attrs = options || {};

      script.src = src;
      script.async = attrs.async !== false;
      if (attrs.defer) {
        script.defer = true;
      }

      Object.keys(attrs).forEach((key) => {
        if (key === "async" || key === "defer") {
          return;
        }
        if (attrs[key] === true) {
          script.setAttribute(key, "");
        } else if (attrs[key] !== false && attrs[key] != null) {
          script.setAttribute(key, attrs[key]);
        }
      });

      script.onload = () => resolve(script);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function onFirstInteraction(callback) {
    const handler = once(() => {
      ["pointerdown", "touchstart", "keydown", "scroll"].forEach((eventName) => {
        window.removeEventListener(eventName, handler);
      });
      callback();
    });

    ["pointerdown", "touchstart", "keydown", "scroll"].forEach((eventName) => {
      window.addEventListener(eventName, handler, { passive: true, once: true });
    });
  }

  function createParticleScene(canvas, options) {
    if (!canvas) {
      return null;
    }

    const config = {
      particleCount: 48,
      fps: 24,
      connectDistance: 0,
      particleColor: "rgba(100, 200, 255, ",
      lineColor: "rgba(30, 180, 255, ",
      speed: 0.2,
      sizeMin: 0.5,
      sizeMax: 1.8,
      opacityMin: 0.2,
      opacityMax: 0.75,
      dynamicColor: false,
      useViewport: false,
      ...options,
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      rafId: 0,
      running: false,
      lastFrame: 0,
      particles: [],
    };

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getParticleCount() {
      const mobileScale = window.innerWidth <= 768 ? 0.45 : 1;
      return Math.max(18, Math.round(config.particleCount * mobileScale));
    }

    function createParticle() {
      const opacity = random(config.opacityMin, config.opacityMax);
      return {
        x: random(0, state.width),
        y: random(0, state.height),
        r: random(config.sizeMin, config.sizeMax),
        dx: random(-config.speed, config.speed),
        dy: random(-config.speed, config.speed),
        opacity,
        twinkleSpeed: random(0.004, 0.01),
        color: config.dynamicColor
          ? `rgba(${Math.floor(random(10, 20))}, ${Math.floor(random(150, 200))}, ${Math.floor(
              random(240, 255)
            )}, ${opacity})`
          : null,
      };
    }

    function seedParticles() {
      state.particles = Array.from({ length: getParticleCount() }, createParticle);
    }

    function resize() {
      const bounds = config.useViewport
        ? { width: window.innerWidth, height: window.innerHeight }
        : canvas.parentElement.getBoundingClientRect();

      state.width = Math.max(1, Math.round(bounds.width || 0));
      state.height = Math.max(1, Math.round(bounds.height || 0));
      state.dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 768 ? 1.2 : 1.5);

      canvas.width = Math.round(state.width * state.dpr);
      canvas.height = Math.round(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      seedParticles();
    }

    function connectParticles() {
      if (!config.connectDistance) {
        return;
      }

      for (let i = 0; i < state.particles.length; i += 1) {
        for (let j = i + 1; j < state.particles.length; j += 1) {
          const dx = state.particles[i].x - state.particles[j].x;
          const dy = state.particles[i].y - state.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance >= config.connectDistance) {
            continue;
          }

          const opacity = 0.18 * (1 - distance / config.connectDistance);
          ctx.beginPath();
          ctx.strokeStyle = `${config.lineColor}${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(state.particles[i].x, state.particles[i].y);
          ctx.lineTo(state.particles[j].x, state.particles[j].y);
          ctx.stroke();
        }
      }
    }

    function frame(timestamp) {
      if (!state.running) {
        return;
      }

      if (timestamp - state.lastFrame < 1000 / config.fps) {
        state.rafId = window.requestAnimationFrame(frame);
        return;
      }

      state.lastFrame = timestamp;
      ctx.clearRect(0, 0, state.width, state.height);

      state.particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > state.width) {
          particle.dx *= -1;
        }
        if (particle.y < 0 || particle.y > state.height) {
          particle.dy *= -1;
        }

        particle.opacity += particle.twinkleSpeed;
        if (particle.opacity >= config.opacityMax || particle.opacity <= config.opacityMin) {
          particle.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = particle.color || `${config.particleColor}${particle.opacity})`;
        ctx.fill();
      });

      connectParticles();
      state.rafId = window.requestAnimationFrame(frame);
    }

    const handleResize = throttle(resize, 150);

    window.addEventListener("resize", handleResize, { passive: true });
    resize();

    return {
      start() {
        if (state.running || document.hidden) {
          return;
        }
        resize();
        state.running = true;
        state.lastFrame = 0;
        state.rafId = window.requestAnimationFrame(frame);
      },
      stop() {
        state.running = false;
        if (state.rafId) {
          window.cancelAnimationFrame(state.rafId);
          state.rafId = 0;
        }
      },
      resize,
    };
  }

  function bindSceneToSection(section, scene, rootMargin) {
    if (!section || !scene) {
      return;
    }

    observeElement(section, {
      once: false,
      rootMargin: rootMargin || "250px 0px",
      threshold: 0.01,
      onEnter: () => scene.start(),
      onLeave: () => scene.stop(),
    });

    if (!supportsIO) {
      scene.start();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        scene.stop();
      }
    });
  }

  function initNavbar() {
    const navbar = document.querySelector(".xsec-navbar");
    const navbarToggle = document.getElementById("navbarToggle");
    const navbarMenu = document.getElementById("navbarMenu");

    if (!navbar || !navbarToggle || !navbarMenu) {
      return;
    }

    function closeMobileMenu() {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
      document.body.style.overflow = "";
    }

    function openMobileMenu() {
      navbarToggle.classList.add("active");
      navbarMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function bindMobileSubmenus() {
      const submenuToggles = navbarMenu.querySelectorAll(".submenu-toggle");
      const submenuToggleSubs = navbarMenu.querySelectorAll(".submenu-toggle-sub");

      submenuToggles.forEach((toggle) => {
        toggle.addEventListener("click", function handleToggle(event) {
          if (window.innerWidth > 991.98) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          const submenu = this.nextElementSibling;
          if (!submenu || !submenu.classList.contains("submenu")) {
            return;
          }

          submenuToggles.forEach((otherToggle) => {
            if (otherToggle === this) {
              return;
            }
            const otherSubmenu = otherToggle.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains("submenu")) {
              otherSubmenu.classList.remove("expanded");
              otherToggle.classList.remove("expanded");
            }
          });

          submenu.classList.toggle("expanded");
          this.classList.toggle("expanded");
        });
      });

      submenuToggleSubs.forEach((toggle) => {
        toggle.addEventListener("click", function handleSubToggle(event) {
          if (window.innerWidth > 991.98) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          const submenu = this.nextElementSibling;
          if (!submenu || !submenu.classList.contains("submenu")) {
            return;
          }

          submenuToggleSubs.forEach((otherToggle) => {
            if (otherToggle === this || otherToggle.parentElement !== this.parentElement) {
              return;
            }
            const otherSubmenu = otherToggle.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains("submenu")) {
              otherSubmenu.classList.remove("expanded");
              otherToggle.classList.remove("expanded");
            }
          });

          submenu.classList.toggle("expanded");
          this.classList.toggle("expanded");
        });
      });
    }

    navbarToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (navbarMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    const updateNavbar = throttle(() => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }, 16);

    window.addEventListener("scroll", updateNavbar, { passive: true });
    window.addEventListener(
      "resize",
      throttle(() => {
        if (window.innerWidth > 991.98) {
          closeMobileMenu();
          navbarMenu.querySelectorAll(".submenu.expanded").forEach((submenu) => {
            submenu.classList.remove("expanded");
          });
          navbarMenu
            .querySelectorAll(".submenu-toggle.expanded, .submenu-toggle-sub.expanded")
            .forEach((toggle) => {
              toggle.classList.remove("expanded");
            });
        }
      }, 120),
      { passive: true }
    );

    document.addEventListener("click", (event) => {
      if (
        navbarMenu.classList.contains("active") &&
        !navbarMenu.contains(event.target) &&
        !navbarToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navbarMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    bindMobileSubmenus();
    updateNavbar();
  }

  function initHero() {
    const heroContent = document.getElementById("hero-content");
    const overlay = document.getElementById("video-overlay");

    if (!heroContent || !overlay) {
      return;
    }

    let ticking = false;

    function updateHeader() {
      const scrollTop = window.scrollY;
      const translateY = scrollTop * 0.3;
      const opacity = Math.max(0.3, 1 - scrollTop / 400);
      const overlayOpacity = Math.min(0.65, (scrollTop / 400) * 0.65);

      heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
      heroContent.style.opacity = String(opacity);
      overlay.style.background = `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,${overlayOpacity}))`;
      ticking = false;
    }

    const onScroll = throttle(() => {
      if (ticking || document.hidden) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    }, 16);

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeader();
  }

  function initAboutSection() {
    const section = document.querySelector(".ezy__about3_xOZLftWU");
    if (!section) {
      return;
    }

    const cards = section.querySelectorAll(".fade-card");

    if (supportsIO) {
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              window.requestAnimationFrame(() => {
                window.setTimeout(() => {
                  entry.target.classList.add("show");
                }, index * 140);
              });
            } else {
              entry.target.classList.remove("show");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      cards.forEach((card) => cardObserver.observe(card));
    } else {
      cards.forEach((card) => card.classList.add("show"));
    }

    const scene = createParticleScene(document.getElementById("particle-bg"), {
      particleCount: 60,
      fps: 24,
      connectDistance: 100,
      particleColor: "rgba(30, 180, 255, ",
      lineColor: "rgba(30, 180, 255, ",
      speed: 0.35,
      sizeMin: 0.5,
      sizeMax: 2,
      opacityMin: 0.2,
      opacityMax: 0.8,
      dynamicColor: true,
    });

    bindSceneToSection(section, scene, "250px 0px");
  }

  function initProductSection() {
    const section = document.querySelector(".product-section");
    if (!section) {
      return;
    }

    const items = section.querySelectorAll(".scroll-animate");

    if (supportsIO) {
      const itemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const delay = Number(entry.target.dataset.delay || 0);
            if (entry.isIntersecting) {
              window.requestAnimationFrame(() => {
                window.setTimeout(() => {
                  entry.target.classList.add("visible");
                }, delay);
              });
            } else {
              entry.target.classList.remove("visible");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      items.forEach((item) => itemObserver.observe(item));
    } else {
      items.forEach((item) => item.classList.add("visible"));
    }

    const scene = createParticleScene(document.getElementById("product-bg"), {
      particleCount: 34,
      fps: 24,
      particleColor: "rgba(10, 170, 255, ",
      speed: 0.15,
      sizeMin: 0.5,
      sizeMax: 1.5,
      opacityMin: 0.2,
      opacityMax: 0.6,
    });

    bindSceneToSection(section, scene, "250px 0px");
  }

  function getProjectsData() {
    if (!projectDataPromise) {
      projectDataPromise = fetch("/source/data/projects.json", { credentials: "same-origin" }).then((response) => {
        if (!response.ok) {
          throw new Error(`projects fetch failed: ${response.status}`);
        }
        return response.json();
      });
    }

    return projectDataPromise;
  }

  function buildProjectCard(project) {
    return `
      <div class="project-card">
        <div class="project-card-inner">
          <div class="project-img-wrapper">
            <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" decoding="async">
            <div class="card-date">${project.date.day}<br>${project.date.month}<br>${project.date.year}</div>
          </div>
          <div class="project-content">
            <p class="project-author">By <span class="author-name">${project.author}</span></p>
            <h4 class="project-name">${project.title}</h4>
            <p class="project-description">${project.description}</p>
            <a href="${project.link || "#"}" class="btn project-btn">
              查看详情 <i class="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function setupProjectTrack(track) {
    if (!track || track.dataset.dragReady === "true") {
      return;
    }

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let velocity = 0;
    let lastX = 0;
    let animationId = 0;

    const getPositionX = (event) => (event.touches ? event.touches[0].clientX : event.clientX);

    const animate = () => {
      track.style.transform = `translateX(${currentTranslate}px)`;
      if (!isDragging) {
        velocity *= 0.95;
        if (Math.abs(velocity) > 0.5) {
          currentTranslate += velocity;
          animationId = window.requestAnimationFrame(animate);
        } else {
          animationId = 0;
        }
      } else {
        animationId = window.requestAnimationFrame(animate);
      }
    };

    function startDrag(event) {
      isDragging = true;
      startX = getPositionX(event) - prevTranslate;
      velocity = 0;
      lastX = getPositionX(event);
      track.style.animationPlayState = "paused";
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    }

    function moveDrag(event) {
      if (!isDragging) {
        return;
      }
      const x = getPositionX(event);
      velocity = x - lastX;
      currentTranslate = x - startX;
      lastX = x;
      animationId = window.requestAnimationFrame(animate);
    }

    function endDrag() {
      if (!isDragging) {
        return;
      }
      isDragging = false;
      prevTranslate = currentTranslate;
      window.requestAnimationFrame(animate);
      window.setTimeout(() => {
        track.style.animationPlayState = "running";
      }, 120);
    }

    track.addEventListener("touchstart", startDrag, { passive: true });
    track.addEventListener("touchmove", moveDrag, { passive: true });
    track.addEventListener("touchend", endDrag);
    track.addEventListener("touchcancel", endDrag);
    track.addEventListener("mousedown", startDrag);
    track.addEventListener("mousemove", moveDrag);
    track.addEventListener("mouseup", endDrag);
    track.addEventListener("mouseleave", endDrag);
    track.style.cursor = "grab";
    track.dataset.dragReady = "true";
  }

  function initProjectSection() {
    const section = document.querySelector(".project-section");
    const track = document.getElementById("projectCarousel");
    if (!section || !track) {
      return;
    }

    const initializeProjects = once(() => {
      getProjectsData()
        .then((data) => {
          if (!Array.isArray(data.projects) || !data.projects.length) {
            return;
          }

          track.innerHTML = data.projects.concat(data.projects).map(buildProjectCard).join("");
          setupProjectTrack(track);
        })
        .catch((error) => {
          console.error("加载项目数据失败:", error);
        });
    });

    observeElement(section, {
      rootMargin: "800px 0px",
      once: true,
      onEnter: initializeProjects,
    });

    runWhenIdle(() => {
      getProjectsData().catch(() => {});
    }, 2500);

    const scene = createParticleScene(document.getElementById("project-bg"), {
      particleCount: 40,
      fps: 24,
      particleColor: "rgba(100, 200, 255, ",
      speed: 0.18,
      sizeMin: 0.5,
      sizeMax: 1.5,
      opacityMin: 0.3,
      opacityMax: 0.8,
    });

    bindSceneToSection(section, scene, "300px 0px");
  }

  function initNewsSection() {
    const section = document.querySelector(".news-section");
    const carousel = section ? section.querySelector(".news-carousel") : null;
    const dotsContainer = section ? section.querySelector(".news-dots") : null;

    if (!section || !carousel || !dotsContainer) {
      return;
    }

    const initializeNews = once(() => {
      if (typeof window.newsData === "undefined" || !Array.isArray(window.newsData) || !window.newsData.length) {
        return;
      }

      let currentIndex = 0;
      let autoSlideInterval = 0;
      let visibleCards = window.innerWidth >= 768 ? 3 : 1;
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;

      function setVisibleCards() {
        visibleCards = window.innerWidth >= 768 ? 3 : 1;
      }

      carousel.innerHTML = "";
      dotsContainer.innerHTML = "";

      window.newsData.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <div class="news-card-inner">
            <img src="${item.thumb}" alt="${item.title}" class="news-thumb" loading="lazy" decoding="async">
            <h5>${item.title}</h5>
            <time>${item.date}</time>
            <p>${item.desc}</p>
            <a href="${item.link}" class="read-more-btn">阅读更多</a>
          </div>
        `;
        carousel.appendChild(card);

        const dot = document.createElement("span");
        dot.className = "dot";
        dot.dataset.index = String(index);
        dotsContainer.appendChild(dot);
      });

      const cards = Array.from(carousel.querySelectorAll(".news-card"));
      const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

      function updateDisplay(index) {
        const offset = index * (100 / visibleCards);
        carousel.style.transition = "transform 0.5s ease";
        carousel.style.transform = `translateX(-${offset}%)`;
        cards.forEach((card, cardIndex) => {
          card.classList.toggle("active", cardIndex >= index && cardIndex < index + visibleCards);
        });
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("active", dotIndex >= index && dotIndex < index + visibleCards);
        });
      }

      function startAutoSlide() {
        window.clearInterval(autoSlideInterval);
        autoSlideInterval = window.setInterval(() => {
          currentIndex = currentIndex + 1 > cards.length - visibleCards ? 0 : currentIndex + 1;
          updateDisplay(currentIndex);
        }, 5000);
      }

      function pauseAutoSlide() {
        window.clearInterval(autoSlideInterval);
      }

      function resumeAutoSlide() {
        if (document.hidden) {
          return;
        }
        startAutoSlide();
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          currentIndex = Number(dot.dataset.index);
          updateDisplay(currentIndex);
          pauseAutoSlide();
          resumeAutoSlide();
        });
      });

      function startDrag(event) {
        pauseAutoSlide();
        isDragging = true;
        startX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
        currentTranslate = -currentIndex * (carousel.offsetWidth / visibleCards);
      }

      function moveDrag(event) {
        if (!isDragging) {
          return;
        }
        const x = event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
        const dx = x - startX;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(${currentTranslate + dx}px)`;
      }

      function endDrag(event) {
        if (!isDragging) {
          return;
        }

        isDragging = false;
        const x = event.type.includes("touch") ? event.changedTouches[0].clientX : event.clientX;
        const dx = x - startX;

        if (dx < -50 && currentIndex < cards.length - visibleCards) {
          currentIndex += 1;
        } else if (dx > 50 && currentIndex > 0) {
          currentIndex -= 1;
        }

        updateDisplay(currentIndex);
        resumeAutoSlide();
      }

      carousel.addEventListener("mousedown", startDrag);
      carousel.addEventListener("mousemove", moveDrag);
      carousel.addEventListener("mouseup", endDrag);
      carousel.addEventListener("mouseleave", endDrag);
      carousel.addEventListener("touchstart", startDrag, { passive: true });
      carousel.addEventListener("touchmove", moveDrag, { passive: true });
      carousel.addEventListener("touchend", endDrag);

      window.addEventListener(
        "resize",
        throttle(() => {
          setVisibleCards();
          updateDisplay(currentIndex);
        }, 150),
        { passive: true }
      );

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          pauseAutoSlide();
        } else {
          resumeAutoSlide();
        }
      });

      setVisibleCards();
      updateDisplay(currentIndex);
      startAutoSlide();
    });

    observeElement(section, {
      rootMargin: "700px 0px",
      once: true,
      onEnter: initializeNews,
    });

    const scene = createParticleScene(document.getElementById("news-bg"), {
      particleCount: 36,
      fps: 24,
      particleColor: "rgba(100, 200, 255, ",
      speed: 0.18,
      sizeMin: 0.5,
      sizeMax: 1.5,
      opacityMin: 0.3,
      opacityMax: 0.8,
    });

    bindSceneToSection(section, scene, "300px 0px");
  }

  function initTeamSection() {
    const section = document.querySelector(".team-section-apple");
    if (!section) {
      return;
    }

    const elements = section.querySelectorAll(".team-heading-apple, .team-subheading-apple, .team-card-apple");

    if (!supportsIO) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Array.from(elements).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function initHistorySection() {
    const section = document.getElementById("development-history");
    if (!section) {
      return;
    }

    const items = section.querySelectorAll(".timeline-item");

    if (supportsIO) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              window.setTimeout(() => {
                entry.target.classList.add("visible");
              }, index * 180);
            } else {
              entry.target.classList.remove("visible");
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      items.forEach((item) => observer.observe(item));
    } else {
      items.forEach((item) => item.classList.add("visible"));
    }

    const scene = createParticleScene(document.getElementById("history-bg"), {
      particleCount: 42,
      fps: 24,
      particleColor: "rgba(100, 200, 255, ",
      speed: 0.24,
      sizeMin: 1,
      sizeMax: 2,
      opacityMin: 0.3,
      opacityMax: 0.8,
    });

    bindSceneToSection(section, scene, "300px 0px");
  }

  function initFooterLoader() {
    const footer = document.getElementById("site-footer");
    if (!footer) {
      return;
    }

    const loadFooter = once(() => {
      loadScript("/source/footer.js", { async: true }).catch((error) => {
        console.error("页脚脚本加载失败:", error);
      });
    });

    observeElement(footer, {
      rootMargin: "1200px 0px",
      once: true,
      onEnter: loadFooter,
    });

    runWhenIdle(loadFooter, 7000);
  }

  function initThirdPartyLoaders() {
    const loadAnalytics = once(() => {
      loadScript("/api/aegis-init.js", { async: true }).catch(() => {});
    });

    const loadChat = once(() => {
      loadScript(
        "https://chats.sec.hn.cn/chat/api/embed?protocol=https&host=chats.sec.hn.cn&token=20b9bb4261b8ee7c",
        { async: true }
      ).catch(() => {});
    });

    runWhenIdle(loadAnalytics, 5000);
    runWhenIdle(loadChat, 8000);

    onFirstInteraction(() => {
      loadAnalytics();
      loadChat();
    });
  }

  onReady(() => {
    initNavbar();
    initHero();
    initAboutSection();
    initProductSection();
    initProjectSection();
    initNewsSection();
    initTeamSection();
    initHistorySection();
    initFooterLoader();
    initThirdPartyLoaders();
  });
})();
