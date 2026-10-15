declare module 'react-i18next' {
  import { ReactNode } from 'react';

  interface UseTranslationHandler {
    (options?: any): {
      t: (key: string, options?: any) => string;
      i18n: any;
    };
  }

  const useTranslation: UseTranslationHandler;
  
  export { useTranslation };
  export type { UseTranslationHandler };
}

// Type shim for @/lib/utilsdeclare module '@/lib/utils' {
  export function cn(...classes: (string | undefined | null | false)[]): string;
  export function formatCurrency(amount: number, currency?: string): string;
  export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string;
  export function slugToTitle(slug: string): string;
  export function truncate(text: string, maxLength: number): string;
  export function getInitials(name: string, maxLength?: number): string;
}

declare module '@/lib/utils' {
  export function cn(...classes: (string | undefined | null | false)[]): string;
  export function formatCurrency(amount: number, currency?: string): string;
  export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string;
  export function slugToTitle(slug: string): string;
  export function truncate(text: string, maxLength: number): string;
  export function getInitials(name: string, maxLength?: number): string;
}
