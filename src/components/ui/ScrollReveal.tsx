"use client";

import React, { useRef } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale" | "pop-up" | "rotate-in" | "elastic" | "blur-in" | "bounce-in";
  enableAnimation?: boolean;
}

const animations: Record<string, { hidden: Variant; visible: Variant }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  "scale": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "pop-up": {
    hidden: { opacity: 0, scale: 0.6, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
  "elastic": {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  },
  "blur-in": {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0)" },
  },
  "bounce-in": {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  },
};

export const ScrollReveal = ({
  children,
  width = "fit-content",
  className = "",
  delay = 0,
  animation = "fade-up",
  enableAnimation = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const mainControls = useAnimation();

  React.useEffect(() => {
    if (isInView && enableAnimation) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls, enableAnimation]);

  return (
    <motion.div
      ref={ref}
      variants={enableAnimation ? animations[animation] : {}}
      initial={enableAnimation ? "hidden" : "visible"}
      animate={enableAnimation ? mainControls : "visible"}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;