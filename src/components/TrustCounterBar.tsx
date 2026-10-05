import React from 'react';

const items = [
  'Policy guidance',
  'Claim documents',
  'Insurer follow-up',
  'Bengaluru-based support',
];

export default function TrustCounterBar() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-lg md:text-xl font-bold text-amber-400">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
