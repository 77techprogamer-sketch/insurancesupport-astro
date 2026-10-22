import { motion } from 'framer-motion'

// AuroraHero — insurance-specific hero with video background.
// Navbar is provided by the parent layout (Header.astro / AuroraNavbar);
// this component only renders the hero content area.

export default function AuroraHero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', background: '#000', overflow: 'hidden' }}>
      {/* Background video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/og-image.png"
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

      {/* Trusted-by avatar badge — bottom-left */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
              style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '10px', opacity: 1, transform: 'translateY(0)' }}
            >
        {/* Avatar stack */}
        <div style={{ display: 'flex' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '999px',
                border: '2px solid rgba(255,255,255,0.25)',
                background: i === 1
                  ? 'linear-gradient(135deg, #10b981, #047857)'
                  : i === 2
                    ? '#1a1a2e'
                    : '#16213e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: i === 1 ? '0' : '-12px',
                zIndex: 3 - i + 1,
                position: 'relative',
              }}
            >
              <span style={{
                color: i === 1 ? '#fff' : 'rgba(255,255,255,0.85)',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}>
                {String.fromCharCode(64 + i)}
              </span>
            </div>
          ))}
        </div>

        <span style={{
          fontSize: '12.5px',
          color: 'rgba(255,255,255,0.75)',
          fontFamily: "'Inter', sans-serif",
        }}>
          25+ years guiding <strong style={{ color: '#fff', fontWeight: 600 }}>families through claims</strong>
        </span>
      </motion.div>

      {/* Hero content — top-left anchored */}
            <div style={{ position: 'absolute', top: '24vh', left: '64px', zIndex: 10, maxWidth: '480px' }}>
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Inter', sans-serif",
                  opacity: 1,
                  transform: 'translateY(0)',
                }}
              >
                Insurance Advisor · Bengaluru
              </motion.div>

        <motion.h1
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    color: '#fff',
                    marginTop: '22px',
                    maxWidth: '560px',
                    opacity: 1,
                    transform: 'translateY(0)',
                  }}
                >
          Claims Denied?<br />
          <span style={{ color: '#10b981' }}>We Help You Recover.</span>
        </motion.h1>

        <motion.p
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
                  style={{
                    marginTop: '16px',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: "'Inter', sans-serif",
                    maxWidth: '380px',
                    opacity: 1,
                    transform: 'translateY(0)',
                  }}
                >
          LIC • ICICI Lombard • Care Health — 25+ years navigating rejections, 
          documentation gaps, and insurer grievance processes. No jargon, just results.
        </motion.p>

        <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.58, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px', opacity: 1, transform: 'translateY(0)' }}
                >
          <motion.a
            href="#free-claim-tools"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 26px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #10b981, #047857)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(16,185,129,0.3)',
            }}
          >
            Start Your Recovery
          </motion.a>
          <motion.a
            href="#faq"
            aria-label="How it works"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* IRDAI badge — bottom-right */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: 'easeOut' }}
              style={{ position: 'absolute', bottom: '34px', right: '64px', zIndex: 10, opacity: 1, transform: 'translateY(0)' }}
            >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(16,185,129,0.35)',
          background: 'rgba(16,185,129,0.08)',
          backdropFilter: 'blur(6px)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#10b981',
            fontFamily: "'Inter', sans-serif",
          }}>
            IRDAI Reg: 0149161D
          </span>
        </div>
      </motion.div>
    </section>
  )
}
