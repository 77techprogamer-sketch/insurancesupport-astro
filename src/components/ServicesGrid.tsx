"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  { title: 'Life Insurance', desc: "Protect your family's future with comprehensive life plans. Term, endowment, ULIP options.", icon: '♥', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', text: 'text-rose-600', href: '/services/life-insurance' },
  { title: 'Health Insurance', desc: 'Cashless hospitalization, pre-existing coverage, senior citizen plans, family floater options.', icon: '✚', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600', href: '/services/health-insurance' },
  { title: 'Term Insurance', desc: 'Highest coverage at lowest premiums. Secure your family\'s future with ₹1 Cr+ cover.', icon: '🛡', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-600', href: '/services/term-insurance' },
  { title: 'Motor Insurance', desc: 'Car & bike insurance — comprehensive, third-party, zero depreciation add-ons, NCB protection.', icon: '🚗', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-600', href: '/services/motor-insurance' },
  { title: 'Claim Recovery', desc: 'Rejected claims overturned. 95% success rate. LIC, health, motor — we fight for your money.', icon: '✓', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', text: 'text-purple-600', href: '/support' },
  { title: 'Policy Review', desc: 'Free audit of your existing portfolio. Identify gaps, overpayment, and better options.', icon: '📋', color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', text: 'text-cyan-600', href: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicesGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {services.map((s, i) => (
        <motion.a
          key={i}
          href={s.href}
          variants={itemVariants}
          className="group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 card-hover card-shine"
          whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Icon with gradient background */}
          <motion.div
            className={`w-14 h-14 ${s.bg} ${s.text} rounded-2xl flex items-center justify-center text-2xl mb-4`}
            whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            {s.icon}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
            whileHover={{ x: 4, transition: { duration: 0.3 } }}
          >
            {s.title}
          </motion.h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>

          {/* Learn more link */}
          <motion.div
            className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: 8, transition: { duration: 0.3 } }}
          >
            Learn more
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  );
}