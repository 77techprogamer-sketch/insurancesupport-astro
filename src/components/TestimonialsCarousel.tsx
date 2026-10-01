"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Bengaluru',
    text: 'Hari Kotian helped me recover a rejected claim of ₹8 Lakhs. His team handled everything — from documentation to follow-ups with the insurer. Absolutely professional!',
    rating: 5,
  },
  {
    name: 'Sumantha Malu',
    location: 'Whitefield, Bengaluru',
    text: 'Excellent service for our two-wheeler insurance. The claim process was quick and hassle-free. Highly recommended for anyone in need of genuine insurance advice.',
    rating: 5,
  },
  {
    name: 'Priya Agarwal',
    location: 'Electronic City, Bengaluru',
    text: 'The term insurance plan I got is perfect for my family. Premium is affordable and coverage is comprehensive. The annual review system keeps our portfolio updated.',
    rating: 5,
  },
  {
    name: 'Venkatesh S.',
    location: 'Hyderabad',
    text: "Outstanding support for my father's LIC maturity claim. We had lost the original policy bond, but Hari helped us navigate the process smoothly.",
    rating: 5,
  },
  {
    name: 'Meera Nair',
    location: 'Bangalore',
    text: 'My LIC death claim was stuck for over a year. Insurance Support resolved it in 3 weeks. Cannot thank them enough.',
    rating: 5,
  },
  {
    name: 'Ravi Kumar',
    location: 'Mumbai',
    text: 'Doorstep service is a game changer. They handled my entire policy revival without me visiting any office.',
    rating: 5,
  },
];

// ─── Animation Variants ───────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.92,
  }),
};

const springTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.35 },
  scale: { duration: 0.35 },
};

// ─── Component ────────────────────────────────────────────────
export default function TestimonialsCarousel() {
  const [[current, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const t = testimonials[current];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + testimonials.length) % testimonials.length;
        return [next, newDirection];
      });
    },
    []
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paginate]);

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Previous / Next Buttons ── */}
      <button
        onClick={() => paginate(-1)}
        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Card ── */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springTransition}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-100"
          >
            {/* Quote icon */}
            <Quote className="w-8 h-8 text-blue-100 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                </motion.div>
              ))}
            </div>

            {/* Quote text */}
            <p className="text-lg text-slate-700 leading-relaxed mb-8 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {t.name.split(' ').map((n) => n[0]).join('')}
              </motion.div>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage([i, i > current ? 1 : -1])}
            className="rounded-full"
            animate={{
              width: i === current ? '2rem' : '0.625rem',
              height: '0.625rem',
              backgroundColor: i === current ? '#2563eb' : '#cbd5e1',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            whileHover={{ scale: 1.2, backgroundColor: i === current ? '#2563eb' : '#94a3b8' }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* ���─ Progress bar ── */}
      <motion.div
        className="h-0.5 bg-blue-100 rounded-full mt-4 mx-auto max-w-xs overflow-hidden"
        initial={false}
      >
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          key={current}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
