/**
 * 粒子动画管理器
 * 统一管理页面中多个Canvas粒子动画，优化性能
 */
class ParticleManager {
  constructor(options = {}) {
    this.canvases = [];
    this.animations = new Map();
    this.isVisible = !document.hidden;
    this.fpsLimit = options.fpsLimit || 30;
    this.frameInterval = 1000 / this.fpsLimit;
    this.lastFrameTime = 0;

    this.initVisibilityHandler();
  }

  initVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.resumeAll();
      } else {
        this.pauseAll();
      }
    });
  }

  create(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const config = {
      particleCount: options.particleCount || 60,
      particleColor: options.particleColor || 'rgba(100, 200, 255, ',
      connectDistance: options.connectDistance || 100,
      speed: options.speed || 0.3,
      size: options.size || { min: 0.5, max: 2 },
      opacity: options.opacity || { min: 0.3, max: 0.8 }
    };

    const ctx = canvas.getContext('2d');
    this.resizeCanvas(canvas);

    const resizeHandler = () => this.resizeCanvas(canvas);
    window.addEventListener('resize', resizeHandler);

    const particles = this.initParticles(canvas, config);
    const animation = { canvas, ctx, particles, config, resizeHandler, running: true };

    this.canvases.push(canvas);
    this.animations.set(canvasId, animation);

    if (this.isVisible) {
      this.startAnimation(animation);
    }

    return animation;
  }

  resizeCanvas(canvas) {
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }

  initParticles(canvas, config) {
    const particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * (config.size.max - config.size.min) + config.size.min,
        dx: (Math.random() - 0.5) * config.speed,
        dy: (Math.random() - 0.5) * config.speed,
        opacity: Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min,
        twinkleSpeed: Math.random() * 0.01 + 0.005
      });
    }
    return particles;
  }

  startAnimation(animation) {
    const animate = (timestamp) => {
      if (!animation.running) return;
      if (!this.isVisible) return;

      if (timestamp - this.lastFrameTime < this.frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      this.lastFrameTime = timestamp;

      const { canvas, ctx, particles, config } = animation;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width || p.x < 0) p.dx *= -1;
        if (p.y > canvas.height || p.y < 0) p.dy *= -1;

        p.opacity += p.twinkleSpeed;
        if (p.opacity >= config.opacity.max || p.opacity <= config.opacity.min) {
          p.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${config.particleColor}${p.opacity})`;
        ctx.fill();
      });

      this.connectParticles(particles, ctx, config, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animation.running = true;
    requestAnimationFrame(animate);
  }

  connectParticles(particles, ctx, config, width, height) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.connectDistance) {
          const opacity = 0.2 * (1 - dist / config.connectDistance);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(30, 180, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  pauseAll() {
    this.animations.forEach(animation => {
      animation.running = false;
    });
  }

  resumeAll() {
    this.animations.forEach(animation => {
      if (!animation.running) {
        animation.running = true;
        this.startAnimation(animation);
      }
    });
  }

  destroy(canvasId) {
    const animation = this.animations.get(canvasId);
    if (animation) {
      animation.running = false;
      window.removeEventListener('resize', animation.resizeHandler);
      this.animations.delete(canvasId);
      const index = this.canvases.indexOf(animation.canvas);
      if (index > -1) {
        this.canvases.splice(index, 1);
      }
    }
  }

  destroyAll() {
    this.animations.forEach((_, id) => this.destroy(id));
  }
}

if (typeof window !== 'undefined') {
  window.ParticleManager = ParticleManager;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParticleManager;
}
