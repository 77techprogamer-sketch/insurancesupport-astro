import { motion } from 'framer-motion'

// AuroraHero — design-studio-style hero with video background.
// Navbar is provided by the parent layout (Header.astro); this component
// only renders the hero content area.

const socials = [
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266-.408 2.77-1.39 3.591-.8 1.104-2.058 1.85-3.601 2.111-1.158.195-2.246.195-3.399.195H4.223c-3.2 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.266.408-2.77 1.39-3.591.8-1.104 2.058-1.85 3.601-2.111 1.158-.195 2.246-.195 3.399-.195h1.868c3.2 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266-.408 2.77-1.39 3.591.758.747 2.016 1.542 3.189 1.796l.223.028c.291.035.468.138.522.396.064.305-.068.556-.368.655-.228.077-.494.147-.803.211-.24.049-.441.13-.635.237-.219.124-.39.293-.522.565-.162.339-.223.708-.223 1.148 0 .525.126 1.027.376 1.458.25.432.632.792 1.158 1.066.306.152.634.28 1.001.363.37.084.743.119 1.115.1.226-.026.44-.072.638-.134.58-.167 1.03-.476 1.306-.856.277-.38.406-.8.406-1.263-.002-.428-.124-.83-.33-1.148-.197-.304-.504-.487-.921-.487-.393-.002-.78.145-1.05.417-.203.206-.34.48-.394.796-.042.247-.065.51-.065.765 0 .726.188 1.324.522 1.746.305.38.717.62 1.206.62.188 0 .376-.02.557-.06.36-.07.67-.18.911-.32.36-.224.6-.492.712-.8.162-.417.18-1.047.18-1.884v-2.13c.043 1.647.715 3.138 1.813 4.219.3.3.671.556 1.083.749.474.227.971.311 1.464.26.493-.052.873-.242 1.14-.521.268-.28.398-.638.432-1.041.257-.257.6-.692.876-1.2.068-.13.13-.278.19-.433.078-.202.156-.404.225-.61.078-.25.078-.41.078-.48z',
  },
]

export default function AuroraHero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', background: '#000', overflow: 'hidden' }}>
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

      {/* Trusted-by avatar badge -- bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '10px' }}
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
          We&apos;re trusted by <strong style={{ color: '#fff', fontWeight: 600 }}>teams worldwide</strong>
        </span>
      </motion.div>

      {/* Hero content -- top-left anchored */}
      <div style={{ position: 'absolute', top: '24vh', left: '64px', zIndex: 10, maxWidth: '480px' }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
          style={{
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Design Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
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
          }}
        >
          Design That<br />Lights the Way
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{
            marginTop: '16px',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Inter', sans-serif",
            maxWidth: '340px',
          }}
        >
          Aurora helps modern brands craft interfaces that feel effortless and alive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px' }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 26px',
              borderRadius: '999px',
              background: '#0a0a0a',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="#work"
            aria-label="Watch demo"
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

      {/* Social icons -- bottom-left corner */}
      <div style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', gap: '10px' }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  )
}
