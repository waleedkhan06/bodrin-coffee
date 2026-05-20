"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  /** CSS selector inside the container. Default: ".reveal-up". */
  selector?: string;
  /** Additional GSAP "from" overrides. */
  from?: gsap.TweenVars;
  /** Stagger between elements. Default: 0.08. */
  stagger?: number;
  /** Where the trigger fires. Default: "top 80%". */
  start?: string;
};

/**
 * Hook: reveal child elements with a stagger when they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref}>
 *     <h2 className="reveal-up">…</h2>
 *     <p className="reveal-up">…</p>
 *   </section>
 */
export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null);
  const {
    selector = ".reveal-up",
    from,
    stagger = 0.08,
    start = "top 80%",
  } = opts;

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) return;

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
        },
        ...from,
      });
    }, el);

    return () => ctx.revert();
  }, [selector, stagger, start, from]);

  return ref;
}
