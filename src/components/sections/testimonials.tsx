"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { RevealText } from "@/components/ui/reveal-text";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 10000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const current = TESTIMONIALS[active];

  return (
    <section
      className="relative overflow-hidden bg-espresso py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,136,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Header */}
      <header className="mx-auto mb-14 flex max-w-[1480px] flex-col gap-6 px-6 md:mb-20 md:px-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          <span className="inline-block h-px w-8 bg-gold-deep" />
          05 — In their words
        </div>
        <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-tight text-cream md:text-7xl lg:text-[5rem]">
          <RevealText as="span" className="block">
            From the
          </RevealText>
          <RevealText
            as="span"
            delay={0.15}
            className="block italic text-gradient-gold"
          >
            people who notice.
          </RevealText>
        </h2>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Quote */}
        <div className="relative lg:col-span-7">
          <Quote size={56} strokeWidth={1.2} className="text-gold/40" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.author}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="font-display text-pretty text-3xl leading-[1.15] tracking-tight text-cream md:text-5xl lg:text-[3.6rem]">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="inline-block h-px w-12 bg-gold" />
                <div>
                  <p className="text-base text-cream">{current.author}</p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold-deep">
                    {current.role}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-14 flex items-center gap-6">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="glass flex h-12 w-12 items-center justify-center rounded-full text-cream transition-colors hover:text-gold"
            >
              <ArrowLeft size={16} strokeWidth={1.6} />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="glass flex h-12 w-12 items-center justify-center rounded-full text-cream transition-colors hover:text-gold"
            >
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
            <span className="font-mono text-xs tracking-widest text-cream/55">
              {String(active + 1).padStart(2, "0")} ·{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Portrait grid — clean 2x3 layout */}
        <div className="grid grid-cols-3 gap-3 self-start lg:col-span-5">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.author}
                onClick={() => setActive(i)}
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-[20px] transition-all duration-700",
                  isActive
                    ? "ring-2 ring-gold/60 brightness-110"
                    : "brightness-50 hover:brightness-75"
                )}
              >
                <Image
                  src={t.image}
                  alt={t.author}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
