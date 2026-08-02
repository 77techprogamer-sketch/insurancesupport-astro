"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Bengaluru',
    text: 'Hari Kotian helped me recover a rejected claim of ₹8 Lakhs. His team handled everything — from documentation to follow-ups with the insurer. Absolutely professional!',
    rating: 5
  },
  {
    name: 'Sumantha Malu',
    location: 'Whitefield, Bengaluru',
    text: 'Excellent service for our two-wheeler insurance. The claim process was quick and hassle-free. Highly recommended for anyone in need of genuine insurance advice.',
    rating: 5
  },
  {
    name: 'Priya Agarwal',
    location: 'Electronic City, Bengaluru',
    text: 'The term insurance plan I got is perfect for my family. Premium is affordable and coverage is comprehensive. The annual review system keeps our portfolio updated.',
    rating: 5
  },
  {
    name: 'Venkatesh S.',
    location: 'Hyderabad',
    text: "Outstanding support for my father's LIC maturity claim. We had lost the original policy bond, but Hari helped us navigate the process smoothly.",
    rating: 5
  },
  {
    name: 'Meera Nair',
    location: 'Bangalore',
    text: 'My LIC death claim was stuck for over a year. Insurance Support resolved it in 3 weeks. Cannot thank them enough.',
    rating: 5
  },
  {
    name: 'Ravi Kumar',
    location: 'Mumbai',
    text: 'Doorstep service is a game changer. They handled my entire policy revival without me visiting any office.',
    rating: 5
  },
];

const cardVariants = {
  enter: { opacity: 0, x: 60, scale: 0.95 },
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const starVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.1 + i * 0.08, type: "spring", stiffness: 300, damping: 10 },
  }),
};

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const t = testimonials[current];

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-100"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <motion.svg
                key={i}
                custom={i}
                variants={starVariants}
                initial="initial"
                animate="animate"
                className="w-5 h-5 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            className="text-lg text-slate-700 leading-relaxed mb-8 italic"
          >
            &ldquo;{t.text}&rdquo;
          </motion.p>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.5 } }}
            className="flex items-center gap-3"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, type: "spring", stiffness: 200 } }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm"
            >
              {t.name.split(' ').map(n => n[0]).join('')}
            </motion.div>
            <div>
              <p className="font-semibold text-slate-900">{t.name}</p>
              <p className="text-sm text-slate-500">{t.location}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'}`}
            style={{ width: i === current ? '2rem' : '0.625rem', height: '0.625rem' }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ width: i === current ? '2rem' : '0.625rem' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}