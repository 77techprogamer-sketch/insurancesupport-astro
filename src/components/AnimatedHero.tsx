import React, { useEffect, useState } from 'react';

const typingTexts = [
  'Claim Rejection Recovery',
  'Life Insurance Advisory',
  'Health Insurance Planning',
  'Motor Insurance Claims',
];

export default function AnimatedHero() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="hero-gradient min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Simplified background - single subtle gradient blob */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 reveal">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-amber-300 backdrop-blur-md">
                <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                Insurance Concierge & Claim Expert
             </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-300 backdrop-blur-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                IRDAI Certified | Reg: 0149161D
             </span>
           </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="text-gradient-hero">
                Claim Rejection Recovery Experts
             </span>
           </h1>

            <div className="h-8 mb-8 reveal" style={{ transitionDelay: '0.15s' }}>
              <p className="text-lg md:text-xl text-blue-200/80">
                Trusted for{' '}
                <span className="text-amber-300 font-bold typing-cursor">{displayText}</span>
              </p>
           </div>

            <p className="text-lg text-blue-200/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
              Has your insurance claim been rejected? We've helped thousands of families recover their rightful claims. Free consultation, no obligation.
           </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal" style={{ transitionDelay: '0.3s' }}>
              <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full text-lg shadow-[0_8px_30px_-8px_rgba(251,191,36,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 btn-glow">
                Request Free Case Assessment
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="tel:+919****4506" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +91-99866 34506
              </a>
           </div>

            <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start reveal" style={{ transitionDelay: '0.4s' }}>
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 btn-glow">
                HK
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white">Hari Kotian</p>
                <p className="text-sm text-blue-200/80 font-medium">IRDAI Certified Advisor - 25+ Years</p>
                <div className="flex items-center gap-2 mt-1">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-amber-300">4.2 stars (23 reviews)</span>
               </div>
             </div>
           </div>
         </div>

          <div className="w-full lg:w-2/5 reveal-right" style={{ transitionDelay: '0.3s' }}>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-extrabold text-amber-400 glow-pulse">INR 50+ Cr</div>
                  <div className="text-sm text-blue-200 mt-1">Claims Successfully Recovered</div>
               </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-bold text-white">25+</div>
                    <div className="text-xs text-blue-300 mt-1">Years Experience</div>
                 </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-xs text-blue-300 mt-1">Families Served</div>
                 </div>
               </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-200/80">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span>95% Success Rate</span>
                 </div>
               </div>
             </div>

              {/* Subtle decorative accents */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
           </div>
         </div>

       </div>
     </div>
   </section>
  );
}