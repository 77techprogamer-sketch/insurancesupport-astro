import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe2, Instagram, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react';

const MEDIA = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P';
const HERO_VIDEO = `${MEDIA}/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4`;
const APPROACH_VIDEO = `${MEDIA}/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4`;
const VISION_VIDEO = `${MEDIA}/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4`;

type Faq = { question: string; answer: string };

const services = [
  {
    tag: 'Protection',
    title: 'Health & life cover',
    description: 'Compare policy terms, understand exclusions, and choose cover that fits your family and budget.',
    href: '/services/health-insurance/',
    video: `${MEDIA}/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`,
  },
  {
    tag: 'Claim support',
    title: 'A clearer path through a claim',
    description: 'Get help understanding a rejection, organizing evidence, and following the insurer’s grievance process.',
    href: '/claim-recovery/',
    video: `${MEDIA}/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4`,
  },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.75, ease: [0.2, 0.75, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function LandingHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number | null>(null);
  const loopTimer = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let fadingOut = false;

    const fadeTo = (target: number, duration: number, done?: () => void) => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      const start = performance.now();
      const initial = Number.parseFloat(video.style.opacity || '0');
      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        video.style.opacity = String(initial + (target - initial) * progress);
        if (progress < 1) animationRef.current = requestAnimationFrame(frame);
        else { animationRef.current = null; done?.(); }
      };
      animationRef.current = requestAnimationFrame(frame);
    };

    const startPlayback = () => {
      void video.play().then(() => {
        fadingOut = false;
        fadeTo(1, 500);
      }).catch(() => { video.style.opacity = '0'; });
    };
    const onCanPlay = () => startPlayback();
    const onTimeUpdate = () => {
      if (!fadingOut && Number.isFinite(video.duration) && video.duration - video.currentTime <= 0.55) {
        fadingOut = true;
        fadeTo(0, 500);
      }
    };
    const onEnded = () => {
      video.style.opacity = '0';
      loopTimer.current = window.setTimeout(() => {
        video.currentTime = 0;
        startPlayback();
      }, 100);
    };
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    if (video.readyState >= 3) onCanPlay();
    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      if (loopTimer.current !== null) window.clearTimeout(loopTimer.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black" aria-labelledby="landing-title">
      <video ref={videoRef} className="landing-video absolute inset-0 h-full w-full object-cover object-center opacity-0" src={HERO_VIDEO} muted autoPlay playsInline preload="auto" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/15" aria-hidden="true" />

      <header className="relative z-20 w-full px-4 pt-5 sm:px-6 sm:pt-7">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-3 sm:px-6" aria-label="Main navigation">
          <a href="/" className="flex shrink-0 items-center gap-2.5 text-white" aria-label="Insurance Support home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10"><Globe2 size={19} strokeWidth={1.5} /></span>
            <span className="text-base font-semibold tracking-tight sm:text-lg">Insurance Support</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a className="text-sm font-medium text-white/75 transition hover:text-white" href="#services">Services</a>
            <a className="text-sm font-medium text-white/75 transition hover:text-white" href="#claim-help">Claim help</a>
            <a className="text-sm font-medium text-white/75 transition hover:text-white" href="#about">About</a>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <a href="tel:+919986634506" className="px-2 text-sm font-medium text-white/85 transition hover:text-white">Call Hari</a>
            <a href="/get-started/" className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10">Free review <ArrowRight size={15} /></a>
          </div>
          <button type="button" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {menuOpen && <div className="liquid-glass mx-auto mt-2 grid max-w-5xl gap-1 rounded-3xl p-3 text-white sm:hidden">
          <a onClick={closeMenu} href="#services" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">Services</a>
          <a onClick={closeMenu} href="#claim-help" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">Claim help</a>
          <a onClick={closeMenu} href="#about" className="rounded-xl px-4 py-3 text-sm hover:bg-white/10">About Hari</a>
          <a href="/get-started/" className="mt-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black">Request a free review</a>
        </div>}
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 -translate-y-5 flex-col items-center justify-center px-5 py-20 text-center sm:-translate-y-8 sm:px-8">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[11px] font-medium uppercase tracking-[.2em] text-white/75 backdrop-blur-md sm:text-xs">
          <ShieldCheck size={15} /> IRDAI registration 0149161D <span className="text-white/35">·</span> Bengaluru
        </motion.p>
        <motion.h1 id="landing-title" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }} className="landing-display max-w-5xl text-balance text-6xl leading-[.93] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          Insurance, made <em className="text-white/70">clear.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-7 max-w-2xl px-2 text-sm leading-7 text-white/80 sm:text-base md:text-lg">
          Thoughtful policy guidance and practical claim support for families. Talk with Hari Kotian, an IRDAI-registered advisor with 25+ years of experience.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
          <a href="/get-started/" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90">Request a free policy review <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
          <a href="/claim-recovery/" className="liquid-glass inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">I need claim help</a>
        </motion.div>
        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-8 text-xs tracking-wide text-white/55 transition hover:text-white/90">Independent guidance · Clear next steps · Bengaluru and across India</motion.a>
      </div>

      <div className="relative z-10 flex justify-center gap-3 px-6 pb-8 sm:pb-10" aria-label="Contact links">
        <a href="https://g.page/r/CRDgJanrKjRhEBM/review" target="_blank" rel="noopener noreferrer" className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white" aria-label="Read Google reviews"><Globe2 size={19} /></a>
        <a href="tel:+919986634506" className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white" aria-label="Call Insurance Support"><Phone size={18} /></a>
        <a href="mailto:desksuhas@gmail.com" className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white" aria-label="Email Insurance Support"><Mail size={18} /></a>
      </div>
    </section>
  );
}

function AboutSection() {
  return <section id="about" className="relative overflow-hidden bg-black px-6 pb-14 pt-28 md:pb-20 md:pt-40">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
    <div className="relative mx-auto max-w-6xl">
      <Reveal><p className="mb-6 text-xs uppercase tracking-[.24em] text-white/45">About Hari Kotian</p></Reveal>
      <Reveal><h2 className="landing-display max-w-5xl text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-[5.5rem]">Helping families make <em className="text-white/55">informed choices</em> about protection, claims, and what comes next.</h2></Reveal>
      <Reveal className="mt-8 flex flex-col gap-7 border-t border-white/10 pt-7 text-sm leading-7 text-white/60 md:flex-row md:items-end md:justify-between md:text-base">
        <p className="max-w-2xl">Insurance can be hard to compare and harder to navigate when a claim is delayed or rejected. Hari helps people understand their policy, organize their options, and prepare clear next steps. The insurer remains responsible for every claim decision.</p>
        <a href="/about-hari-kotian/" className="inline-flex shrink-0 items-center gap-2 text-sm text-white transition hover:text-white/70">Meet your advisor <ArrowUpRight size={16} /></a>
      </Reveal>
    </div>
  </section>;
}

function FeaturedVideoSection() {
  return <section className="bg-black px-5 pb-20 pt-4 md:px-6 md:pb-32">
    <Reveal className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl border border-white/10">
      <video className="h-full w-full object-cover" src={APPROACH_VIDEO} muted autoPlay loop playsInline preload="metadata" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-5 p-5 sm:p-8 md:flex-row md:items-end md:p-10">
        <div className="liquid-glass max-w-lg rounded-2xl p-5 sm:p-7">
          <p className="mb-3 text-[10px] uppercase tracking-[.22em] text-white/50">Our approach</p>
          <p className="text-sm leading-6 text-white/90 sm:text-base sm:leading-7">Start with your real needs. Read the policy carefully. Make the next step clear, whether you’re choosing cover or seeking help with a claim.</p>
        </div>
        <motion.a href="/claim-recovery/" whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} className="liquid-glass inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white">Explore claim support <ArrowUpRight size={16} /></motion.a>
      </div>
    </Reveal>
  </section>;
}

function PhilosophySection() {
  return <section id="claim-help" className="overflow-hidden bg-black px-6 py-24 md:py-36">
    <div className="mx-auto max-w-6xl">
      <Reveal><h2 className="landing-display mb-12 text-5xl leading-none tracking-tight text-white sm:text-6xl md:mb-20 md:text-8xl">Clarity <em className="text-white/40">×</em> confidence</h2></Reveal>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className="overflow-hidden rounded-3xl border border-white/10">
          <video className="aspect-[4/3] h-full w-full object-cover" src={VISION_VIDEO} muted autoPlay loop playsInline preload="metadata" aria-hidden="true" />
        </Reveal>
        <Reveal className="flex flex-col justify-center">
          <div className="pb-8"><p className="mb-4 text-[10px] uppercase tracking-[.22em] text-white/40">Choose with context</p><p className="text-base leading-7 text-white/70 md:text-lg">Understand what a policy covers, what it excludes, and how its terms fit your circumstances—before you commit.</p></div>
          <div className="border-t border-white/10 py-8"><p className="mb-4 text-[10px] uppercase tracking-[.22em] text-white/40">Find the next step</p><p className="text-base leading-7 text-white/70 md:text-lg">When a claim becomes difficult, careful records and a clear explanation can help you raise the right questions with the insurer.</p></div>
          <a href="/get-started/" className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-white transition hover:text-white/70">Talk through your situation <ArrowRight size={16} /></a>
        </Reveal>
      </div>
    </div>
  </section>;
}

function ServicesSection() {
  return <section id="services" className="relative overflow-hidden bg-black px-6 py-24 md:py-36">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.035)_0%,_transparent_60%)]" />
    <div className="relative mx-auto max-w-6xl">
      <Reveal className="mb-9 flex items-end justify-between gap-5 md:mb-12"><h2 className="landing-display text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">Support for the decisions that matter</h2><span className="hidden pb-2 text-xs uppercase tracking-[.2em] text-white/40 sm:block">How we can help</span></Reveal>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
        {services.map((service, index) => <Reveal key={service.title} className="group liquid-glass rounded-3xl">
          <a href={service.href} className="block h-full">
            <div className="relative aspect-video overflow-hidden rounded-t-3xl"><video className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={service.video} muted autoPlay loop playsInline preload="metadata" aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" /></div>
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.22em] text-white/45">{service.tag}</span><span className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition group-hover:bg-white/10"><ArrowUpRight size={16} /></span></div>
              <h3 className="mb-2 text-xl tracking-tight text-white sm:text-2xl">{service.title}</h3>
              <p className="max-w-lg text-sm leading-6 text-white/55">{service.description}</p>
            </div>
          </a>
        </Reveal>)}
      </div>
      <Reveal className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a href="/services/term-insurance/" className="liquid-glass flex items-center justify-between rounded-2xl p-5 text-sm text-white/75 transition hover:bg-white/10"><span>Term & life insurance guidance</span><ArrowUpRight size={16} /></a>
        <a href="/blog/" className="liquid-glass flex items-center justify-between rounded-2xl p-5 text-sm text-white/75 transition hover:bg-white/10"><span>Read practical insurance guides</span><ArrowUpRight size={16} /></a>
      </Reveal>
    </div>
  </section>;
}

function FaqSection({ faqs }: { faqs: Faq[] }) {
  return <section id="faqs" className="bg-black px-6 py-24 md:py-32">
    <div className="mx-auto max-w-4xl">
      <Reveal><p className="mb-4 text-[10px] uppercase tracking-[.22em] text-white/40">A few useful answers</p><h2 className="landing-display mb-10 text-5xl text-white sm:text-6xl">Frequently asked</h2></Reveal>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {faqs.map(faq => <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white/90 marker:content-none">{faq.question}<span className="liquid-glass flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition group-open:rotate-45"><span className="text-xl leading-none">+</span></span></summary>
          <p className="max-w-3xl pt-4 pr-8 text-sm leading-7 text-white/60">{faq.answer}</p>
        </details>)}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-white/45">Need an answer for your policy or claim?</p><a href="/faq/" className="inline-flex items-center gap-2 text-sm text-white hover:text-white/70">Visit all FAQs <ArrowRight size={15} /></a></div>
    </div>
  </section>;
}

export default function InsuranceLanding({ faqs }: { faqs: Faq[] }) {
  return <>
    <LandingHero />
    <AboutSection />
    <FeaturedVideoSection />
    <PhilosophySection />
    <ServicesSection />
    <FaqSection faqs={faqs} />
    <footer className="border-t border-white/10 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div><a href="/" className="text-sm font-semibold text-white">Insurance Support</a><p className="mt-1 text-xs text-white/40">Hari Kotian · IRDAI Registration 0149161D · Bengaluru</p></div>
        <div className="flex items-center gap-3">
          <a href="https://g.page/r/CRDgJanrKjRhEBM/review" target="_blank" rel="noopener noreferrer" aria-label="Google reviews" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white"><Globe2 size={16} /></a>
          <a href="tel:+919986634506" aria-label="Call" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white"><Phone size={16} /></a>
          <a href="mailto:desksuhas@gmail.com" aria-label="Email" className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white"><Mail size={16} /></a>
          <a href="/contact/" className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white/85">Contact <ArrowRight size={14} /></a>
        </div>
      </div>
      <p className="mx-auto mt-7 max-w-6xl text-[11px] leading-5 text-white/30">Insurance Support provides insurance guidance and claim assistance. Policy and claim decisions are made by insurers under the applicable policy terms. <a className="underline underline-offset-2 hover:text-white/60" href="/privacy/">Privacy</a> · <a className="underline underline-offset-2 hover:text-white/60" href="/terms/">Terms</a></p>
    </footer>
  </>;
}
