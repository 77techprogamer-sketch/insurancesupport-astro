// Framer Motion-style Scroll Reveal System
// Supports: fade-up, fade-in, slide-left, slide-right, scale, pop-up,
// rotate-in, elastic, blur-in, bounce-in
(function() {
  'use strict';

  const animMap = {
    'fade-up':       { o: 0, t: 'translateY(40px)',       s: 1 },
    'fade-in':       { o: 0, t: 'translateY(0)',          s: 1 },
    'slide-left':    { o: 0, t: 'translateX(-50px)',      s: 1 },
    'slide-right':   { o: 0, t: 'translateX(50px)',       s: 1 },
    'scale':         { o: 0, t: 'translateY(0) scale(0.85)', s: 1 },
    'pop-up':        { o: 0, t: 'translateY(50px) scale(0.6)', s: 1 },
    'rotate-in':     { o: 0, t: 'translateY(0) rotate(-8deg) scale(0.9)', s: 1 },
    'elastic':       { o: 0, t: 'translateY(50px)',       s: 1 },
    'blur-in':       { o: 0, t: 'translateY(20px)',       s: 1 },
    'bounce-in':     { o: 0, t: 'translateY(0) scale(0.3)', s: 1 },
  };

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

  function buildTransition(delay, duration, variant) {
    if (variant === 'pop-up' || variant === 'elastic') {
      return `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
    }
    if (variant === 'bounce-in') {
      return `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
    }
    if (variant === 'blur-in') {
      return `all 0.8s ${EASE} ${delay}s`;
    }
    return `all 0.6s ${EASE} ${delay}s`;
  }

  // ───── SCROLL REVEAL SETUP ────────────────────────────────
  function setupReveals() {
    document.querySelectorAll('[class*="reveal"]').forEach((el) => {
      if (el.dataset.animInitialized) return;
      el.dataset.animInitialized = 'true';

      const cls = el.className;
      let anim = 'fade-up';
      if (cls.includes('reveal-left')) anim = 'slide-left';
      else if (cls.includes('reveal-right')) anim = 'slide-right';
      else if (cls.includes('reveal-scale')) anim = 'scale';
      else if (cls.includes('reveal-bounce')) anim = 'bounce-in';
      else if (cls.includes('reveal-blur')) anim = 'blur-in';

      const dataAnim = el.getAttribute('data-animation');
      if (dataAnim && animMap[dataAnim]) anim = dataAnim;

      const v = animMap[anim];
      const delay = parseFloat(el.getAttribute('data-delay')) || 0;
      const duration = parseFloat(el.getAttribute('data-duration')) || 0.6;

      el.style.opacity = v.o;
      el.style.transform = v.t;
      el.style.transition = buildTransition(delay, duration, anim);
      if (anim === 'blur-in') {
        el.style.filter = 'blur(10px)';
      }
      el.dataset.animVariant = anim;
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('revealed');
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0deg)';
          el.style.filter = 'blur(0)';
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  function observeAll() {
    document.querySelectorAll('[class*="reveal"]:not(.revealed)').forEach((el) => {
      observer.observe(el);
    });
  }

  setupReveals();
  observeAll();

  const mo = new MutationObserver(() => {
    setupReveals();
    observeAll();
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Stagger children
  document.querySelectorAll('.stagger-children').forEach((parent) => {
    const children = parent.querySelectorAll('[class*="reveal"]');
    children.forEach((child, i) => {
      const baseDelay = parseFloat(child.getAttribute('data-delay')) || 0;
      child.style.transitionDelay = `${baseDelay + i * 0.08}s`;
    });
  });

  // ───── PARALLAX ON SCROLL ──────────────────────────────────
  // Usage: <section class="parallax-section" data-parallax-speed="0.15">
  //        <div class="parallax-layer" data-parallax-offset="60">
  function setupParallax() {
    const sections = document.querySelectorAll('.parallax-section');
    if (!sections.length) return;

    let ticking = false;

    function updateParallax() {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Only animate when section is visible
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.1;
        const progress = (rect.top + rect.height / 2) / viewportHeight;
        const offset = (progress - 0.5) * speed * 200;

        const layers = section.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const layerOffset = parseFloat(layer.getAttribute('data-parallax-offset')) || 0;
          layer.style.transform = `translateY(${offset + layerOffset}px)`;
        });
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial positioning
    updateParallax();
  }

  setupParallax();

  // ───── SMOOTH SCROLL ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
