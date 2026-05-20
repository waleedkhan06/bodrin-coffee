"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { MEMBERSHIP } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealText } from "@/components/ui/reveal-text";
import { cn } from "@/lib/utils";
import { useToast } from "@/contexts/toast-context";

export function SubscriptionSection() {
  const toast = useToast();

  const handleSelect = (name: string) => {
    toast(`${name} tier selected — coming soon`, "info");
  };

  return (
    <section
      id="membership"
      className="relative bg-espresso py-28 md:py-40"
    >
      {/* Header */}
      <header className="mx-auto mb-16 flex max-w-[1480px] flex-col items-center gap-6 px-6 text-center md:mb-24 md:px-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          <span className="inline-block h-px w-8 bg-gold-deep" />
          06 — The Atelier
          <span className="inline-block h-px w-8 bg-gold-deep" />
        </div>
        <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-tight text-cream md:text-7xl lg:text-[5rem]">
          <RevealText as="span" className="block">
            Become a
          </RevealText>
          <RevealText
            as="span"
            delay={0.15}
            className="block italic text-gradient-gold"
          >
            member.
          </RevealText>
        </h2>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-cream/60 md:text-lg">
          A standing invitation to the Bodrin atelier. Curated micro-lots, a
          private barista on call, and access to events you won&rsquo;t find
          on the public calendar.
        </p>
      </header>

      {/* Tiers */}
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-6 px-6 md:grid-cols-3 md:gap-8 md:px-10">
        {MEMBERSHIP.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} onSelect={handleSelect} />
        ))}
      </div>

      {/* Trust strip */}
      <div className="mx-auto mt-20 flex max-w-[1480px] flex-col items-center justify-center gap-6 px-6 text-center text-xs uppercase tracking-[0.3em] text-cream/55 md:flex-row md:gap-10 md:px-10">
        <span>Pause or cancel anytime</span>
        <span aria-hidden className="hidden h-3 w-px bg-gold/20 md:inline-block" />
        <span>Free shipping in EU & UK</span>
        <span aria-hidden className="hidden h-3 w-px bg-gold/20 md:inline-block" />
        <span>Carbon-neutral fulfilment</span>
        <span aria-hidden className="hidden h-3 w-px bg-gold/20 md:inline-block" />
        <span>2,400+ members worldwide</span>
      </div>
    </section>
  );
}

type Tier = (typeof MEMBERSHIP)[number];

function TierCard({ tier, index, onSelect }: { tier: Tier; index: number; onSelect: (name: string) => void }) {
  const featured = "featured" in tier && tier.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] p-8 md:p-10",
        featured
          ? "glass-gold ring-1 ring-gold/40 shadow-[0_24px_60px_-20px_rgba(212,175,136,0.4)] md:-translate-y-4"
          : "glass"
      )}
    >
      {/* Featured ribbon */}
      {featured && (
        <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-espresso">
          <Sparkles size={11} strokeWidth={1.6} />
          Most loved
        </span>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
          Tier · {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display text-4xl tracking-tight text-cream md:text-5xl">
          {tier.name}
        </h3>
        <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-cream/65">
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mt-8 flex items-baseline gap-2">
        <span className="font-display text-6xl tracking-tight text-gradient-gold">
          €{tier.price}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/55">
          / {tier.cadence}
        </span>
      </div>

      {/* Benefits */}
      <ul className="mt-8 flex flex-col gap-3 border-t border-gold/10 pt-6">
        {tier.benefits.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.4 + i * 0.06, duration: 0.6 }}
            className="flex items-start gap-3 text-sm text-cream/80"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Check size={11} strokeWidth={2} />
            </span>
            {b}
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-10">
        <MagneticButton
          variant={featured ? "gold" : "outline"}
          className="w-full"
          onClick={() => onSelect(tier.name)}
        >
          {featured ? "Join the Atelier" : `Choose ${tier.name}`}
        </MagneticButton>
      </div>
    </motion.div>
  );
}
