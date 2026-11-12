// src/lib/utils.ts
// Small shared helpers. `@/lib/utils` is referenced by React components, so the
// module has to exist (it previously only lived in an ambient type shim).

/** Join truthy class names. Minimal `cn` helper (no tailwind-merge dependency). */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** ₹12,34,567 (en-IN by default). */
export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', options ?? { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

export function slugToTitle(slug: string): string {
  return slug
    .replace(/^\/+|\/+$/g, '')
    .split(/[-_/]/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text ?? '';
  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function getInitials(name: string, maxLength = 2): string {
  return (name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxLength)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');
}
