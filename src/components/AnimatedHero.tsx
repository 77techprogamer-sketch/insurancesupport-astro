import { motion } from 'framer-motion';
import { useRef } from 'react';

// ─── Aurora Hero - dark video background, emerald accents ──

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const slideLeft: any = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const statEnter: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-[10%] right-[10%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[8%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
}

export default function AnimatedHero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100svh',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.10)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.19)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.07)', zIndex: 1 }} />

      {/* Emerald glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.05) 60%, transparent 80%)',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <FloatingOrbs />

      <motion.div
        style={{ position: 'absolute', top: '24vh', left: '64px', zIndex: 10, maxWidth: '480px', width: '100%' }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Label */}
        <motion.div variants={fadeUp} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
          Insurance Advisory
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff', marginTop: '22px', maxWidth: '560px' }}
        >
          Claim Rejection{' '}
          <span style={{ color: '#10b981' }}>Recovery Experts</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", maxWidth: '340px' }}
        >
          Insurance Support, led by Hari Kotian, helps people understand policy options, prepare claim documents, and navigate insurer follow-up.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px', flexWrap: 'wrap' }}
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 26px', borderRadius: '999px', background: '#0a0a0a', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Request Free Case Assessment
          </motion.a>
          <motion.a
            href="tel:+919986634506"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{ width: '44px', height: '44px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            aria-label="Call now"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
          </motion.a>
        </motion.div>

        {/* Trust signature */}
        <motion.div
          variants={slideLeft}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px', fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 12px rgba(16,185,129,0.3)', flexShrink: 0 }}>
            HK
            <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '2px solid #000' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>Hari Kotian</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", marginTop: '2px' }}>IRDAI-Registered Insurance Advisor</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom-left avatar badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{ display: 'flex' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '999px',
                border: '2px solid rgba(255,255,255,0.25)',
                background: i === 1 ? 'linear-gradient(135deg, #10b981, #047857)' : i === 2 ? '#1a1a2e' : '#16213e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: i === 1 ? '0' : '-12px',
                zIndex: 3 - i + 1,
                position: 'relative',
              }}
            >
              <span style={{ color: i === 1 ? '#fff' : 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                {String.fromCharCode(64 + i)}
              </span>
            </div>
          ))}
        </div>

        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" }}>
          We&apos;re trusted by <strong style={{ color: '#fff', fontWeight: 600 }}>teams across India</strong>
        </span>
      </motion.div>

      {/* Social icons */}
      <div style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', gap: '10px' }}>
        {['X', 'LinkedIn', 'Instagram'].map((label) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            style={{ width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.75)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
