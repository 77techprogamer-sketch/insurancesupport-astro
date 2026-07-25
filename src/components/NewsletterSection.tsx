import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left: Copy */}
            <div className="text-left space-y-4 reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold tracking-wider uppercase border border-amber-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Stay Informed
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Don't let a small mistake ruin your claim.
              </h2>
              <p className="text-blue-200/80 text-lg">
                Join thousands of subscribers getting weekly tips on navigating complex insurance claims and avoiding rejections.
              </p>
              <ul className="space-y-2 mt-6">
                {['Insider claim settlement tactics', 'Alerts on IRDAI rule changes', 'Free downloadable checklists'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-blue-100/70 text-sm font-medium">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Form */}
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
                {status === 'success' ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">You're on the list!</h3>
                    <p className="text-slate-500">Keep an eye on your inbox for our next insider update.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2 text-left">
                      <label htmlFor="newsletter-email" className="text-sm font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <input
                          type="email"
                          id="newsletter-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-2 group transition-all disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Me Updates
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                    <p className="text-xs text-slate-400 text-center mt-2">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
