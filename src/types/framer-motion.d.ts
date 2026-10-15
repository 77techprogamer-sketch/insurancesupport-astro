import * as motion from 'framer-motion';

// Extend Variants type to accept any animation configuration
export type Anim = motion.Anim
export type Variants = Record<string, motion.RecursiveDig<motion.Variant<motion.AnimValueType>>>;

// Type shim - use variant as any to avoid strict type checks
declare module 'framer-motion' {
  interface motionVariants {
    // Allow any object shape for variants
  }
}

export {};
