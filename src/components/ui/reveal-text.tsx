"use client";

import { useEffect, useRef, type ElementType, type ReactNode, createElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the reveal kicks in. */
  delay?: number;
  /** Stagger between words. */
  stagger?: number;
  /** Duration of each word reveal. */
  duration?: number;
};

/**
 * Splits children text into word-spans with a clipping mask, then GSAP
 * reveals them on scroll for a cinematic typography feel.
 *
 * Renders any tag via `as`. Children must be a plain string.
 */
export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 1.1,
}: Props) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll("[data-word]");
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, duration]);

  // Coerce to string and split into words preserving spaces.
  const text = typeof children === "string" ? children : String(children);
  const words = text.split(" ");

  return createElement(
    Tag,
    {
      ref: ref as any,
      className: cn("inline-block", className),
    },
    words.map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden align-bottom"
      >
        <span data-word className="inline-block will-change-transform">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ))
  );
}
