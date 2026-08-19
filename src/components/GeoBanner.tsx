// GeoBanner.tsx
// Lightweight geo-aware banner — fetches /api/geo (Cloudflare edge function),
// shows a dismissible banner linking the visitor to their matched regional location page.
// Uses localStorage to suppress banner once dismissed (7 days).

import { useState, useEffect } from 'react';

interface GeoData {
  matched: boolean;
  slug?: string;
  name?: string;
  state?: string;
  url?: string;
  whatsappText?: string;
  city?: string | null;
  region?: string | null;
}

const DISMISS_KEY = 'geo_banner_dismissed';
const DISMISS_DAYS = 7;

function isDismissed(): boolean {
  try {
    const val = localStorage.getItem(DISMISS_KEY);
    if (!val) return false;
    const dismissedAt = parseInt(val, 10);
    if (isNaN(dismissedAt)) return false;
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince < DISMISS_DAYS;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  } catch {}
}

export default function GeoBanner() {
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isDismissed()) {
      setLoaded(true);
      return;
    }

    // Check if already on the matched location page — don't show banner
    const path = window.location.pathname;
    if (path.startsWith('/locations/')) {
      setLoaded(true);
      return;
    }

    fetch('/api/geo')
      .then(r => r.json())
      .then((data: GeoData) => {
        setGeo(data);
        if (data.matched) {
          setDismissed(false);
        }
      })
      .catch(() => {}) // silently fail — no banner shown
      .finally(() => setLoaded(true));
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    markDismissed();
  };

  // Don't render anything until loaded or if dismissed/no match
  if (!loaded || dismissed || !geo?.matched || !geo.url || !geo.name) {
    return null;
  }

  const whatsappUrl = geo.whatsappText
    ? `https://wa.me/919986634506?text=${encodeURIComponent(geo.whatsappText)}`
    : '#';

  return (
    <div
      role="status"
      aria-label={`Insurance advisor available in ${geo.name}`}
      className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg animate-slideDown"
      style={{ animation: 'slideDown 0.4s ease-out' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
        {/* Left: text + link */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Location pin icon */}
          <svg className="w-4 h-4 text-amber-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-blue-100 hidden sm:inline">
            Serving families in {geo.name} —
          </span>
          <a
            href={geo.url}
            className="font-bold text-white underline underline-offset-2 decoration-amber-300/70 hover:decoration-amber-300 transition-colors whitespace-nowrap"
          >
            View Local Advisor Page →
          </a>
        </div>

        {/* Right: WhatsApp CTA + dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full transition-colors"
          >
            {/* WhatsApp icon */}
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat Now
          </a>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss location banner"
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-blue-200 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      `}</style>
    </div>
  );
}
