export default function TrustStrip() {
  return (
    <section style={{ background: '#0a0a0a', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        {/* Advisor photo + trust text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '280px' }}>
          <img
            src="/placeholder.svg"
            alt="Advisor photo"
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(16,185,129,0.3)',
              background: '#1a1a2e',
            }}
          />
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>Advised by</p>
            <p style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 600, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Suhas K.</p>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>25+ years · LIC · ICICI Lombard · Care Health</p>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'center', flex: 2 }}>
          {/* IRDAI */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.35)', background: 'rgba(16,185,129,0.08)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#10b981', fontFamily: "'Inter', sans-serif" }}>IRDAI Reg: 0149161D</span>
          </div>

          {/* Insurer badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} aria-label="Partner insurers">
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>Partner insurers</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: "'Inter', sans-serif" }}>LIC</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: "'Inter', sans-serif" }}>ICICI Lombard</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: "'Inter', sans-serif" }}>Care Health</span>
          </div>

          {/* Response time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', fontFamily: "'Inter', sans-serif" }}>First response <strong style={{ color: '#fff' }}>{"< 4 hrs"}</strong> (business hours)</span>
          </div>
        </div>

        {/* Review count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px', justifyContent: 'flex-end' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter', sans-serif" }}>
            <strong style={{ color: '#fff' }}>{"4.8"}</strong>/5 from <strong style={{ color: '#fff' }}>{"127"}</strong> Google reviews
          </span>
        </div>
      </div>
    </section>
  )
}