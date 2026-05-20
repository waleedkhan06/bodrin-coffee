"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_CHAPTERS } from "@/lib/constants";
import { RevealText } from "@/components/ui/reveal-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((el) => {
        const img = el.querySelector("[data-chapter-image]");
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 75%" },
            }
          );
        }
        const num = el.querySelector("[data-chapter-num]");
        if (num) {
          gsap.fromTo(
            num,
            { scale: 0.7, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 75%" },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso py-28 md:py-40"
    >
      {/* Marquee overline */}
      <div className="overflow-hidden border-y border-gold/10 py-4">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <span>The Craft</span>
              <span aria-hidden>✦</span>
              <span>Source · Roast · Ritual</span>
              <span aria-hidden>✦</span>
              <span>Roasted in Lisbon</span>
              <span aria-hidden>✦</span>
              <span>120+ Micro-Lots</span>
              <span aria-hidden>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Chapters */}
      <div className="mx-auto mt-24 flex max-w-[1480px] flex-col gap-32 px-6 md:gap-48 md:px-10">
        {STORY_CHAPTERS.map((c, i) => (
          <Chapter key={c.chapter} chapter={c} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  flip,
}: {
  chapter: (typeof STORY_CHAPTERS)[number];
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <article
      ref={ref}
      data-chapter
      className={`relative grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image column */}
      <motion.div
        style={{ y }}
        data-chapter-image
        className="relative col-span-1 md:col-span-7"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] md:aspect-[5/6]">
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
          {/* Floating chapter number */}
          <span
            data-chapter-num
            className="font-display absolute -bottom-6 -right-2 select-none overflow-hidden text-[18vw] leading-none italic text-gold/15 md:-bottom-12 md:-right-6 md:text-[14vw]"
          >
            {chapter.chapter}
          </span>
        </div>
      </motion.div>

      {/* Text column */}
      <div className="col-span-1 md:col-span-5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          Chapter {chapter.chapter}
        </p>
        <h3 className="mt-3 font-display text-5xl tracking-tight text-cream md:text-6xl">
          <RevealText as="span" className="block">
            {chapter.title}
          </RevealText>
        </h3>
        <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-cream/65 md:text-lg">
          {chapter.body}
        </p>
      </div>
    </article>
  );
}
