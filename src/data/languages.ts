// src/data/languages.ts
// Shared language configuration used across blog routes.
// Exported as a plain object so both getStaticPaths (hoisted) and page body can use it.

export const INDIAN_LANGUAGES: readonly ['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml'] = [
  'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml'
];

export const DEFAULT_LANG = 'en';