import React from 'react';

const services = [
  { title: 'Life Insurance', desc: 'Protect your family\'s future with comprehensive life plans. Term, endowment, ULIP options.', icon: '♥', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', text: 'text-rose-600', href: '/services/life-insurance' },
  { title: 'Health Insurance', desc: 'Cashless hospitalization, pre-existing coverage, senior citizen plans, family floater options.', icon: '✚', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600', href: '/services/health-insurance' },
  { title: 'Term Insurance', desc: 'Highest coverage at lowest premiums. Secure your family\'s future with ₹1 Cr+ cover.', icon: '🛡', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-600', href: '/services/term-insurance' },
  { title: 'Motor Insurance', desc: 'Car & bike insurance — comprehensive, third-party, zero depreciation add-ons, NCB protection.', icon: '🚗', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-600', href: '/services/motor-insurance' },
  { title: 'Claim Recovery', desc: 'Rejected claims overturned. 95% success rate. LIC, health, motor — we fight for your money.', icon: '✓', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', text: 'text-purple-600', href: '/support' },
  { title: 'Policy Review', desc: 'Free audit of your existing portfolio. Identify gaps, overpayment, and better options.', icon: '📋', color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', text: 'text-cyan-600', href: '/contact' },
];

export default function ServicesGrid() {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      {services.map((s, i) => (
        <a href={s.href} key={i} class="group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 card-tilt reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
          <div class={`w-14 h-14 ${s.bg} ${s.text} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {s.icon}
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
        </a>
      ))}
    </div>
  );
}