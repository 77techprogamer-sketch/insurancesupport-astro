import React, { useEffect, useState, useRef } from 'react';

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, label }: Props) {
  const [count, setCount] = useState(end); // Start at final value for SSR
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Reset to 0 only after hydration, then animate up
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      setCount(0);
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-blue-600 counter-value">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-500 mt-1 font-medium">{label}</div>
    </div>
  );
}
