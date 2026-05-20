"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thermometer, Timer, Droplet } from "lucide-react";
import { BREWING_STEPS } from "@/lib/constants";
import { RevealText } from "@/components/ui/reveal-text";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BrewingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const triggers = BREWING_STEPS.map((_, i) =>
        ScrollTrigger.create({
          trigger: `[data-brew-step="${i}"]`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(i),
        })
      );
      return () => triggers.forEach((t) => t.kill());
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brewing"
      ref={sectionRef}
      className="relative bg-espresso py-20 md:py-28 lg:py-40"
    >
      {/* Section header */}
      <header className="mx-auto mb-12 flex max-w-[1480px] flex-col gap-5 px-5 md:mb-16 md:px-10 lg:mb-24">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          <span className="inline-block h-px w-8 bg-gold-deep" />
          04 — The Ritual
        </div>
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <h2 className="font-display text-balance text-4xl leading-[0.95] tracking-tight text-cream md:text-5xl lg:text-7xl xl:text-[5rem]">
            <RevealText as="span" className="block">
              A fifteen-minute
            </RevealText>
            <RevealText
              as="span"
              delay={0.15}
              className="block italic text-gradient-gold"
            >
              meditation.
            </RevealText>
          </h2>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-cream/60 md:text-base">
            The Bodrin pour-over protocol. Four moves, refined over a decade,
            tuned to coax the brightest cup from any single-origin lot.
          </p>
        </div>
      </header>

      {/* ─── Mobile: horizontal swipe carousel ─── */}
      <div className="md:hidden">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {BREWING_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="snap-center w-[85vw] flex-shrink-0"
              onTouchStart={() => setActive(i)}
            >
              <MobileStepCard step={step} index={i} isActive={i === active} />
            </div>
          ))}
        </div>
        {/* Step dots */}
        <div className="flex justify-center gap-2 pt-3">
          {BREWING_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                const container = document.querySelector(".snap-x");
                if (container) {
                  const child = container.children[i] as HTMLElement;
                  child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }
              }}
              aria-label={`Go to step ${i + 1}`}
              className="h-4 w-4 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === active ? "#d4af88" : "rgba(212,175,136,0.2)",
                transform: i === active ? "scaleX(1.5)" : "scaleX(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Desktop: two-column layout ─── */}
      <div className="mx-auto hidden max-w-[1480px] grid-cols-1 gap-16 px-6 md:px-10 md:grid lg:grid-cols-12 lg:gap-24">
        {/* Sticky illustration */}
        <div className="lg:sticky lg:top-32 lg:col-span-6 lg:h-fit">
          <div className="relative flex h-[50vh] items-center justify-center overflow-hidden rounded-[28px] glass lg:h-[60vh]">
            <BrewIllustration step={active} />
            <div className="absolute left-5 top-5 flex flex-col gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/60">
              <span className="flex items-center gap-2">
                <Thermometer size={12} strokeWidth={1.5} />
                {BREWING_STEPS[active].temp}
              </span>
              <span className="flex items-center gap-2">
                <Timer size={12} strokeWidth={1.5} />
                Step {active + 1} / {BREWING_STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <ol className="lg:col-span-6">
          {BREWING_STEPS.map((step, i) => (
            <BrewStepDesktop key={step.step} step={step} index={i} active={active} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function MobileStepCard({
  step,
  index,
  isActive,
}: {
  step: (typeof BREWING_STEPS)[number];
  index: number;
  isActive: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.1)" }}
    >
      {/* Illustration area */}
      <div className="relative flex h-[40vh] items-center justify-center overflow-hidden" style={{ backgroundColor: "rgba(212, 175, 136, 0.03)" }}>
        <BrewIllustration step={index} />
        {/* HUD */}
        <div className="absolute left-4 top-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-cream/60">
          <span className="flex items-center gap-1.5">
            <Thermometer size={10} strokeWidth={1.5} />
            {step.temp}
          </span>
          <span className="flex items-center gap-1.5">
            <Timer size={10} strokeWidth={1.5} />
            {index + 1} / {BREWING_STEPS.length}
          </span>
        </div>
        {/* Step number */}
        <span className="absolute right-4 top-4 font-display text-5xl italic text-gold/20">
          {step.step}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-2xl tracking-tight text-cream">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/65">
          {step.detail}
        </p>
        <div className="mt-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-gold-deep">
          <span className="flex items-center gap-1.5">
            <Droplet size={10} strokeWidth={1.5} />
            Stage {index + 1}
          </span>
          <span className="h-2.5 w-px bg-gold/20" />
          <span>Temp · {step.temp}</span>
        </div>
      </div>
    </div>
  );
}

function BrewStepDesktop({
  step,
  index,
  active,
}: {
  step: (typeof BREWING_STEPS)[number];
  index: number;
  active: number;
}) {
  return (
    <li
      data-brew-step={index}
      className={cn(
        "relative flex flex-col gap-4 border-l border-gold/10 py-12 pl-8 transition-opacity duration-700 first:pt-0 md:py-20 md:pl-10",
        active === index ? "opacity-100" : "opacity-60"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -left-[6px] top-12 h-3 w-3 rounded-full border border-gold transition-all duration-500 md:top-20",
          active === index
            ? "bg-gold scale-110 shadow-[0_0_20px_rgba(212,175,136,0.6)]"
            : "bg-espresso"
        )}
      />
      <span className="font-display text-7xl italic text-gold/30 md:text-8xl">
        {step.step}
      </span>
      <h3 className="font-display text-3xl tracking-tight text-cream md:text-4xl">
        {step.title}
      </h3>
      <p className="max-w-prose text-base leading-relaxed text-cream/65 md:text-lg">
        {step.detail}
      </p>
      <div className="mt-2 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-gold-deep">
        <span className="flex items-center gap-2">
          <Droplet size={12} strokeWidth={1.5} />
          Stage {index + 1}
        </span>
        <span aria-hidden className="h-3 w-px bg-gold/20" />
        <span>Temp · {step.temp}</span>
      </div>
    </li>
  );
}

function BrewIllustration({ step }: { step: number }) {
  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {step === 0 && <GrinderIllo />}
          {step === 1 && <BloomIllo />}
          {step === 2 && <PulseIllo />}
          {step === 3 && <ServeIllo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GrinderIllo() {
  return (
    <svg viewBox="0 0 400 400" className="h-[75%] w-[75%]">
      <defs>
        <radialGradient id="grad-grinder" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#d4af88" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4af88" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="160" fill="url(#grad-grinder)" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="200" y1="80" x2="200" y2="120" stroke="#d4af88" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 30} 200 200)`} opacity={0.6} />
        ))}
        <circle cx="200" cy="200" r="80" fill="none" stroke="#d4af88" strokeWidth="1" opacity="0.5" />
      </motion.g>
      <circle cx="200" cy="200" r="14" fill="#d4af88" />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.circle key={i} cx={170 + i * 8} cy="280" r="2" fill="#3b1f10" animate={{ y: [0, 60], opacity: [1, 0] }} transition={{ duration: 1.4, delay: i * 0.12, repeat: Infinity, ease: "easeIn" }} />
      ))}
    </svg>
  );
}

function BloomIllo() {
  return (
    <svg viewBox="0 0 400 400" className="h-[75%] w-[75%]">
      <defs>
        <radialGradient id="grad-bloom" cx="50%" cy="55%">
          <stop offset="0%" stopColor="#d4af88" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4af88" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="220" r="150" fill="url(#grad-bloom)" />
      <motion.path d="M 100 60 Q 200 0 300 60 Q 250 200 200 260" stroke="#d4af88" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }} />
      {[0, 0.4, 0.8].map((d, i) => (
        <motion.circle key={i} cx="200" cy="280" r="40" stroke="#d4af88" strokeWidth="1.5" fill="none" initial={{ scale: 0.4, opacity: 0.8 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 2.2, delay: d, repeat: Infinity }} style={{ transformOrigin: "200px 280px" }} />
      ))}
      <path d="M 130 280 L 270 280 L 255 360 Q 200 380 145 360 Z" fill="#1a120c" stroke="#3a2c20" />
    </svg>
  );
}

function PulseIllo() {
  return (
    <svg viewBox="0 0 400 400" className="h-[75%] w-[75%]">
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx="200" cy="200" r="40" stroke="#d4af88" strokeWidth="1.5" fill="none" initial={{ scale: 0.5, opacity: 0.9 }} animate={{ scale: 4.2, opacity: 0 }} transition={{ duration: 2.4, delay: i * 0.7, repeat: Infinity }} style={{ transformOrigin: "200px 200px" }} />
      ))}
      <circle cx="200" cy="200" r="36" fill="#d4af88" opacity="0.85" />
      <circle cx="200" cy="200" r="20" fill="#0c0a08" />
    </svg>
  );
}

function ServeIllo() {
  return (
    <svg viewBox="0 0 400 400" className="h-[75%] w-[75%]">
      <defs>
        <radialGradient id="grad-serve" cx="50%" cy="55%">
          <stop offset="0%" stopColor="#d4af88" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4af88" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="220" r="160" fill="url(#grad-serve)" />
      {[0, 1, 2].map((i) => (
        <motion.path key={i} d={`M ${180 + i * 20} 100 Q ${190 + i * 20} 60 ${175 + i * 20} 30 Q ${165 + i * 20} 15 ${185 + i * 20} -5`} stroke="#f5ede4" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" animate={{ y: [0, -40], opacity: [0.4, 0] }} transition={{ duration: 2.6, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }} />
      ))}
      <path d="M 130 200 L 270 200 L 250 340 Q 200 360 150 340 Z" fill="#f1e6d6" stroke="#a8845e" strokeWidth="2" />
      <ellipse cx="200" cy="200" rx="70" ry="14" fill="#1a0e07" />
      <ellipse cx="200" cy="200" rx="58" ry="9" fill="#3b1f10" />
      <rect x="135" y="240" width="130" height="40" fill="#2c2118" />
      <text x="200" y="265" fill="#d4af88" fontSize="14" textAnchor="middle" letterSpacing="3" fontFamily="serif">BODRIN</text>
    </svg>
  );
}
