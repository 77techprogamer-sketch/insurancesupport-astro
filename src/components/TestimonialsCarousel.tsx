"use client";

import React, { useState, useEffect } from 'react';
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

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const t = testimonials[current];

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div key={current} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-100">
        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg text-slate-700 leading-relaxed mb-8 italic">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {t.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{t.name}</p>
            <p className="text-sm text-slate-500">{t.location}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'}`}
            style={{ width: i === current ? '2rem' : '0.625rem', height: '0.625rem' }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}