"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/ui/reveal-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-overlay]", {
        yPercent: -18,
        opacity: 0.0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-espresso"
    >
      {/* ─── Video Background ─── */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.1)" }}
        >
          <source src="/herocompress.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient veil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,10,8,0.3) 0%, rgba(12,10,8,0.15) 40%, rgba(12,10,8,0.6) 80%, #0c0a08 100%)",
          }}
        />
      </div>

      {/* Film grain */}
      <div className="noise pointer-events-none absolute inset-0 -z-10" />

      {/* ─── Text Overlay ─── */}
      <div
        data-hero-overlay
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-between px-6 pb-10 pt-32 md:px-12 md:pb-16 md:pt-36"
      >
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "#a8845e" }}
        >
          <span className="inline-block h-px w-10" style={{ backgroundColor: "#a8845e" }} />
          Atelier de Café · Lisbon — Tokyo — New York
          <span className="inline-block h-px w-10" style={{ backgroundColor: "#a8845e" }} />
        </motion.div>

        {/* Center headline */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <h1 className="font-display max-w-[16ch] text-balance text-[12vw] leading-[0.95] tracking-tight md:text-[6.4vw] lg:max-w-[18ch] lg:text-[5.4rem] xl:text-[6.4rem]" style={{ color: "#f5ede4" }}>
            <RevealText as="span" delay={0.8} stagger={0.07} className="block">
              The Definitive Taste
            </RevealText>
            <RevealText
              as="span"
              delay={1.2}
              stagger={0.07}
              className="block italic"
            >
              in every sip.
            </RevealText>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="font-display max-w-lg text-balance text-base italic md:text-lg"
            style={{ color: "rgba(245, 237, 228, 0.6)" }}
          >
            An unhurried ritual, brewed without compromise since 2014.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton variant="gold" href="#collection">
              Discover the Collection
              <ArrowRight size={16} strokeWidth={1.6} />
            </MagneticButton>
            <MagneticButton variant="ghost" href="#story">
              Read the Story
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="flex w-full max-w-6xl flex-col items-center justify-between gap-6 border-t pt-6 text-[11px] uppercase tracking-[0.3em] md:flex-row"
          style={{ color: "rgba(245, 237, 228, 0.55)", borderColor: "rgba(212, 175, 136, 0.1)" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  fill="#d4af88"
                  strokeWidth={0}
                />
              ))}
            </span>
            <span>SCA Cup of Excellence</span>
          </div>

          <div className="flex items-center gap-6">
            <span>EST · 2014</span>
            <span aria-hidden className="h-3 w-px bg-gold/20" />
            <span>120+ Micro-Lots</span>
            <span aria-hidden className="hidden h-3 w-px bg-gold/20 md:inline-block" />
            <span className="hidden md:inline">Carbon-Neutral Roastery</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Scroll to explore
          </div>
        </motion.div>
      </div>
    </section>
  );
}
