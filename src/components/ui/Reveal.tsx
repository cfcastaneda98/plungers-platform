"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms before the transition starts once triggered. Use to stagger siblings. */
  delay?: number;
  /** How far the element travels on reveal, in px. Kept subtle per design brief. */
  distance?: number;
  /** Re-hide when scrolled out of view and re-animate on re-entry. Default false (animate once). */
  repeat?: boolean;
  /** IntersectionObserver threshold — how much of the element must be visible to trigger. */
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps content that should fade + slide up into place as it enters the viewport.
 *
 * Safe by default: renders fully visible (opacity: 1) via CSS, so there is no
 * flash of hidden content if JavaScript is disabled or hasn't hydrated yet.
 * Only elements confirmed to start off-screen get animated in; anything already
 * in view on mount is left alone (no pointless reveal-on-load for above-the-fold content).
 * Also no-ops under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 20,
  repeat = false,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"settled" | "pending" | "visible">("settled");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // stays "settled" (visible), no motion

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.9;
    if (alreadyInView && !repeat) return; // already on screen, no reveal-on-load needed

    setState("pending");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("visible");
            if (!repeat) observer.unobserve(el);
          } else if (repeat) {
            setState("pending");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, threshold]);

  const hidden = state === "pending";

  return (
    <div
      ref={ref}
      className={`reveal-el${className ? ` ${className}` : ""}`}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${distance}px)` : "translateY(0)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}