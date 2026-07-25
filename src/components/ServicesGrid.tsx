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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      {services.map((s, i) => (
        <a href={s.href} key={i} className="group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 card-hover card-shine reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
          {/* Icon with gradient background */}
          <div className={`w-14 h-14 ${s.bg} ${s.text} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
            {s.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>

          {/* Learn more link */}
          <div className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </a>
      ))}
    </div>
  );
}
