import { motion } from 'framer-motion'

// AuroraHero - high-conversion insurance advisor hero.
// Light, fast, positive framing. No heavy video. Interactive claim checker inline.

export default function AuroraHero() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100svh', background: '#fafafa', overflow: 'hidden' }}>
      {/* Subtle gradient mesh background - CSS only, no heavy assets */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #fafafa 0%, #f0fdf4 50%, #ecfdf5 100%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Trust badges bar - top */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 16px',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>TRUSTED BY</span>
        <img src="/logos/lic.svg" alt="LIC of India" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <img src="/logos/icici-lombard.svg" alt="ICICI Lombard" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <img src="/logos/care-health.svg" alt="Care Health Insurance" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <img src="/logos/hdfc-life.svg" alt="HDFC Life" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <img src="/logos/star-health.svg" alt="Star Health" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <img src="/logos/bajaj-allianz.svg" alt="Bajaj Allianz" style={{ height: '20px', opacity: 0.5, filter: 'grayscale(100%)' }} loading="lazy" />
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>IRDAI REG. 0149161D</span>
      </div>

      {/* Hero content - centered, above fold */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '140px 24px 80px', textAlign: 'center' }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#10b981',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
          }}
        >
          Expert Claim Assistance . Bengaluru
        </motion.div>

        {/* Main H1 - positive, outcome-focused */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#111827',
            marginBottom: '20px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Get Your Insurance Claim
          <br />
          <span style={{ color: '#10b981' }}>Approved & Paid</span>
        </motion.h1>

        {/* Subheadline - specific, credible */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            lineHeight: 1.6,
            color: '#4b5563',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '32px',
          }}
        >
          LIC . ICICI Lombard . Care Health . HDFC Life . Star Health -- 25+ years turning rejections into payouts.
          <br />
          <strong style={{ color: '#111827' }}>No fee unless we recover.</strong>
        </motion.p>

        {/* Interactive Claim Checker - the key differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #e5e7eb',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Check Your Claim Eligibility</span>
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: '20px', lineHeight: 1.5 }}>
            Select your insurer and claim type -- get instant guidance on documents, timelines & next steps.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <select style={{
                flex: 1,
                minWidth: '160px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                background: '#fff',
                color: '#111827',
                cursor: 'pointer',
                outline: 'none',
              }} aria-label="Select insurer">
                <option value="">Select Insurer</option>
                <option value="lic">LIC of India</option>
                <option value="icici-lombard">ICICI Lombard</option>
                <option value="care-health">Care Health</option>
                <option value="hdfc-life">HDFC Life</option>
                <option value="star-health">Star Health</option>
                <option value="bajaj-allianz">Bajaj Allianz</option>
                <option value="other">Other</option>
              </select>
              <select style={{
                flex: 1,
                minWidth: '160px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                background: '#fff',
                color: '#111827',
                cursor: 'pointer',
                outline: 'none',
              }} aria-label="Select claim type">
                <option value="">Claim Type</option>
                <option value="health">Health / Hospitalization</option>
                <option value="motor">Motor / Vehicle</option>
                <option value="term">Term Life / Death</option>
                <option value="property">Property / Fire</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>
            <motion.a
              href="/get-started"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '14px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              Check Eligibility Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.a>
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginTop: '14px', textAlign: 'center' }}>
            Secure . No spam . Callback within 4 hours
          </p>
        </motion.div>

        {/* Secondary CTAs - below checker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}
        >
          <motion.a
            href="/services/claim-support"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px 22px',
              borderRadius: '999px',
              border: '1px solid #d1d5db',
              background: '#fff',
              color: '#374151',
              fontSize: '13.5px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            How Claim Recovery Works
          </motion.a>
          <motion.a
            href="/blog/insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px 22px',
              borderRadius: '999px',
              background: '#111827',
              color: '#fff',
              fontSize: '13.5px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Read the Complete Guide
          </motion.a>
        </motion.div>

        {/* Trust metrics - social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', marginTop: '40px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1 }}>500+ Cr</div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Claims Assisted</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1 }}>2,800+</div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Families Helped</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1 }}>94%</div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1 }}>&lt; 4 hrs</div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg. Response</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#9ca3af',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll for services</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  )
}
