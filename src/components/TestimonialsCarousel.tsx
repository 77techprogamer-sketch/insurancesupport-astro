import React, { useState, useEffect } from 'react';

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
    text: 'Outstanding support for my father\'s LIC maturity claim. We had lost the original policy bond, but Hari helped us navigate the process smoothly.',
    rating: 5
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const t = testimonials[current];

  return (
    <div
      class="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div class="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-100 card-hover">
        {/* Stars */}
        <div class="flex gap-1 mb-5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <svg key={i} class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p class="text-lg text-slate-700 leading-relaxed mb-8 italic">"{t.text}"</p>

        {/* Author */}
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {t.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p class="font-semibold text-slate-900">{t.name}</p>
            <p class="text-sm text-slate-500">{t.location}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div class="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            class={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600 w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}