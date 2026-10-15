import React from 'react';

const items = [
  'Policy guidance',
  'Claim documents',
  'Insurer follow-up',
  'Bengaluru-based support',
];

export default function TrustCounterBar() {
  return (
    <section className="bg-[#000] py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-aurora-grid" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
