"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  { title: 'Life Insurance', desc: "Protect your family's future with comprehensive life plans. Term, endowment, ULIP options.", icon: '♥', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', text: 'text-rose-600', href: '/services/life-insurance' },
  { title: 'Health Insurance', desc: 'Cashless hospitalization, pre-existing coverage, senior citizen plans, family floater options.', icon: '✚', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600', href: '/services/health-insurance' },
  { title: 'Term Insurance', desc: 'Highest coverage at lowest premiums. Secure your family\'s future with ₹1 Cr+ cover.', icon: '🛡', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-600', href: '/services/term-insurance' },
  { title: 'Motor Insurance', desc: 'Car & bike insurance — comprehensive, third-party, zero depreciation add-ons, NCB protection.', icon: '🚗', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-600', href: '/services/motor-insurance' },
  { title: 'Claim Support', desc: 'Help reviewing claim decisions, organizing documents, and understanding insurer grievance options.', icon: '✓', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', text: 'text-purple-600', href: '/support' },
  { title: 'Policy Review', desc: 'Free audit of your existing portfolio. Identify gaps, overpayment, and better options.', icon: '📋', color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', text: 'text-cyan-600', href: '/contact' },
];

// ─── Stagger Variants ─────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardItem: any = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Component ────────────────────────────────────────────────
export default function ServicesGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {services.map((s, i) => (
        <motion.a
          key={i}
          href={s.href}
          variants={cardItem}
          className="group block relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 card-premium"
          whileHover={{ y: -8, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Gradient border overlay on hover */}
          <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style="background: linear-gradient(135deg, rgba(59,130,246,0.3), rgba(251,191,36,0.2), rgba(59,130,246,0.1)); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; -webkit-mask-composite: xor;"></div>

          {/* Icon with enhanced styling */}
          <motion.div
            className={`relative w-14 h-14 ${s.bg} ${s.text} rounded-2xl flex items-center justify-center text-2xl mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            <span className="relative z-10">{s.icon}</span>
          </motion.div>

          {/* Title with enhanced typography */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200" style="font-feature-settings: 'cv11', 'ss01';">
            {s.title}
            <span className="block text-[10px] font-semibold text-blue-500 tracking-widest uppercase mt-0.5 group-hover:text-amber-500 transition-colors duration-200">
              Explore →
            </span>
          </h3>

          {/* Description with better readability */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{s.desc}</p>

          {/* "Learn more" link with animated arrow */}
          <motion.div
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -8, opacity: 0 }}
            whileHover={{ x: 4 }}
            whileHover={{ opacity: 1 }}
          >
            Learn more
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="rounded-full bg-blue-600/10 p-0.5"
            >
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </motion.div>
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  );
}
