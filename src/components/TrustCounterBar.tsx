import React from 'react';

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
  return <span>{end.toLocaleString('en-IN')}{suffix}</span>;
}

export default function TrustCounterBar() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-400 counter-value">
                <AnimatedNum end={item.end} suffix={item.suffix} />
              </div>
              <div className="text-sm text-blue-200/80 mt-1 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
