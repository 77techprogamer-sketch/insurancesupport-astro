import React, { useEffect, useState, useRef } from 'react';

interface CounterItem {
  end: number;
  suffix: string;
  label: string;
}

const items: CounterItem[] = [
  { end: 25, suffix: '+', label: 'Years Experience' },
  { end: 1000, suffix: '+', label: 'Happy Families' },
  { end: 50, suffix: ' Cr+', label: 'Claims Recovered' },
  { end: 4, suffix: '.2★', label: 'Google Rating' },
];

function AnimatedNum({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          setVal(Math.floor(Math.pow(t, 0.5) * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function TrustCounterBar() {
  return (
    <section class="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i} class="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div class="text-3xl md:text-4xl font-extrabold text-amber-400 counter-value">
                <AnimatedNum end={item.end} suffix={item.suffix} />
              </div>
              <div class="text-sm text-blue-200/80 mt-1 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}