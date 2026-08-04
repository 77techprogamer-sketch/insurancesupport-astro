// Framer Motion-style Scroll Reveal System
// Supports: fade-up, fade-in, slide-left, slide-right, scale, pop-up,
// rotate-in, elastic, blur-in, bounce-in
document.addEventListener('DOMContentLoaded', () => {
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

  // Reset all .reveal* elements with animation attributes
  document.querySelectorAll('[class*="reveal"]').forEach((el) => {
    const cls = el.className;
    let anim = 'fade-up';
    if (cls.includes('reveal-left')) anim = 'slide-left';
    else if (cls.includes('reveal-right')) anim = 'slide-right';
    else if (cls.includes('reveal-scale')) anim = 'scale';
    else if (cls.includes('reveal-bounce')) anim = 'bounce-in';
    else if (cls.includes('reveal-blur')) anim = 'blur-in';

    // Check data-animation attribute override
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

    // Store variant for observer handler
    el.dataset.animVariant = anim;
  });

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

  // Observe all reveal elements (both current and future)
  const observeAll = () => {
    document.querySelectorAll('[class*="reveal"]:not(.revealed)').forEach((el) => {
      observer.observe(el);
    });
  };
  observeAll();

  // MutationObserver for dynamically added content
  const mo = new MutationObserver(() => observeAll());
  mo.observe(document.body, { childList: true, subtree: true });

  // Stagger children support
  document.querySelectorAll('.stagger-children').forEach((parent) => {
    const children = parent.querySelectorAll('[class*="reveal"]');
    children.forEach((child, i) => {
      const baseDelay = parseFloat(child.getAttribute('data-delay')) || 0;
      child.style.transitionDelay = `${baseDelay + i * 0.08}s`;
    });
  });

  // Smooth scroll for anchor links
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
});