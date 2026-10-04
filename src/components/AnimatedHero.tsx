import { motion } from 'framer-motion';
import { useRef } from 'react';

// ─── Stagger Animation Variants ───────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUpScale = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const statCard = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
};

const glowPulseVariants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(251,191,36,0.15)',
      '0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.1)',
      '0 0 20px rgba(251,191,36,0.15)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Floating Background Orbs ─────────────────────────────��───
function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.25), transparent 70%)' }}
        animate={{ x: [0, 30, -20, 10, 0], y: [0, -40, 20, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[8%] w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)' }}
        animate={{ x: [0, -40, 30, -20, 0], y: [0, 30, -50, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)' }}
        animate={{ scale: [1, 1.3, 0.9, 1.1, 1], opacity: [0.1, 0.2, 0.08, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function AnimatedHero() {
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden hero-gradient">
      <FloatingOrbs />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12">
          {/* ─── LEFT: Main Content ────────────────────────── */}
          <div className="w-full lg:w-3/5 text-center lg:text-left lg:self-center">
            {/* Badges */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-amber-300 backdrop-blur-md">
                <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Insurance Concierge & Claim Expert
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-300 backdrop-blur-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                IRDAI Certified | Reg: 0149161D
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6 text-white"
              variants={fadeUp}
            >
              Claim Rejection{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Recovery Experts
              </span>
            </motion.h1>

            {/* Keep the service description in the server-rendered HTML. */}
            <motion.div variants={fadeUp} className="mb-8 min-h-[3rem]">
              <p className="text-lg text-blue-200/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Over 25 years helping families across Bengaluru navigate life, health, motor and term insurance — and recover rejected claims.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeUp}
            >
              <motion.a
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Free Case Assessment
                <motion.svg
                  className="w-5 h-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
              <motion.a
                href="tel:+919986634506"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +91-99866 34506
              </motion.a>
            </motion.div>

            {/* Trust signature */}
            <motion.div
              className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
              variants={slideLeft}
            >
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                HK
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white">Hari Kotian</p>
                <p className="text-sm text-blue-200/80 font-medium">IRDAI Certified Advisor — 25+ Years</p>
                <div className="flex items-center gap-2 mt-1">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span className="text-xs font-semibold text-amber-300">4.2 stars (23 reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: Stat Card ──────────────────────────── */}
          <div className="w-full lg:w-2/5 lg:self-center">
            <motion.div className="relative" variants={statCard}>
              <motion.div
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl gradient-border"
                variants={glowPulseVariants}
                animate="animate"
              >
                {/* Main stat */}
                <div className="text-center mb-6">
                  <motion.div
                    className="text-5xl font-extrabold text-amber-400 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    ₹50 Cr+
                  </motion.div>
                  <div className="text-sm text-blue-200 mt-1">Claims Successfully Recovered</div>
                </div>

                {/* Sub-stats */}
                <div className="grid grid-cols-2 gap-6 text-center">
                  <motion.div
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <div className="text-3xl font-bold text-white">25+</div>
                    <div className="text-xs text-blue-300 mt-1">Years Experience</div>
                  </motion.div>
                  <motion.div
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.7 }}
                  >
                    <div className="text-3xl font-bold text-white">1,000+</div>
                    <div className="text-xs text-blue-300 mt-1">Happy Families Served</div>
                  </motion.div>
                </div>

                {/* Success rate */}
                <motion.div
                  className="mt-6 pt-4 border-t border-white/10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-200/80">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span>95% Success Rate</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
