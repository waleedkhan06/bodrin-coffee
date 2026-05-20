"use client";

import { useEffect, useRef, type ElementType, type ReactNode, createElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  duration = 1.1,
}: Props) {
  const ref = useRef<any>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
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
  }, [delay, stagger, duration, reducedMotion]);

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
        <span data-word className={cn("inline-block", reducedMotion ? "" : "will-change-transform")}>
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ))
  );
}
