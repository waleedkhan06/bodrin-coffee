"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Leaf, MapPin, Award, Eye } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealText } from "@/components/ui/reveal-text";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";

const GRAM_SIZES = [
  { grams: "150g", price: 28 },
  { grams: "250g", price: 42 },
  { grams: "500g", price: 76 },
] as const;

const VARIANTS = [
  {
    id: "noir",
    name: "Maison Noir",
    sleeveColor: "#2c2118",
    bandColor: "#a8845e",
    description:
      "The Bodrin signature: a deep, bittersweet espresso roast wrapped in our archival noir sleeve.",
    notes: ["Bittersweet", "Smoke", "Hazelnut"],
    icon: Coffee,
    image: "/Maison Noir – Dark Noir Edition.jpg",
  },
  {
    id: "cream",
    name: "Cream Edition",
    sleeveColor: "#e3d4be",
    bandColor: "#a8845e",
    description:
      "A lighter expression — bergamot-led Yirgacheffe in our limited cream-paper edition.",
    notes: ["Bergamot", "Jasmine", "Stone Fruit"],
    icon: Leaf,
    image: "/Maison Noir – Cream Edition.jpg",
  },
  {
    id: "gold",
    name: "Reserve Gold",
    sleeveColor: "#1a1410",
    bandColor: "#d4af88",
    description:
      "Hand-numbered auction lot. 200 cups per harvest. Wrapped in 23k matte gold leaf detailing.",
    notes: ["Honey", "Tangerine", "Velvet"],
    icon: Award,
    image: "/Maison Noir – Reserve Gold.jpg",
  },
] as const;

export type ProductVariant = (typeof VARIANTS)[number];

export function FeaturedProductSection() {
  const [variant, setVariant] = useState<ProductVariant>(VARIANTS[0]);
  const [selectedGram, setSelectedGram] = useState<(typeof GRAM_SIZES)[number]>(GRAM_SIZES[1]);
  const { addItem } = useCart();
  const toast = useToast();

  const handleAddToCart = () => {
    addItem({
      id: variant.id,
      name: variant.name,
      price: selectedGram.price,
      variant: `${selectedGram.grams} · ${variant.name}`,
    });
    toast(`${variant.name} (${selectedGram.grams}) added to cart`, "success");
  };

  return (
    <section
      id="product"
      className="relative bg-espresso py-28 md:py-40"
    >
      {/* Section header */}
      <header className="mx-auto mb-14 flex max-w-[1480px] flex-col gap-6 px-6 md:mb-20 md:px-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
          <span className="inline-block h-px w-8" style={{ backgroundColor: "#a8845e" }} />
          03 — Featured Object
        </div>
        <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5rem]" style={{ color: "#f5ede4" }}>
          <RevealText as="span" className="block">
            Touch it.
          </RevealText>
          <span
            className="block italic"
            style={{
              background: "linear-gradient(135deg, #d4af88 0%, #e6c8a3 50%, #d4af88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            <RevealText as="span" delay={0.15}>
              Spin it. Own it.
            </RevealText>
          </span>
        </h2>
      </header>

      {/* Body grid */}
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        {/* Product image */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square w-full overflow-hidden rounded-[28px] glass">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,136,0.18) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    fill
                    className="object-cover"
                    priority={variant.id === VARIANTS[0].id}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* HUD chip */}
            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md" style={{ backgroundColor: "rgba(12, 10, 8, 0.6)", color: "rgba(245, 237, 228, 0.7)" }}>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#d4af88" }} />
              Select your edition
            </div>
          </div>
        </div>

        {/* Spec column */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          {/* Variant pills */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
              Choose your edition
            </p>
            <div className="flex flex-wrap gap-2">
              {VARIANTS.map((v) => {
                const Icon = v.icon;
                const active = variant.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariant(v)}
                    className="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-500"
                    style={{
                      borderColor: active ? "#d4af88" : "rgba(212, 175, 136, 0.15)",
                      backgroundColor: active ? "rgba(212, 175, 136, 0.1)" : "transparent",
                      color: active ? "#f5ede4" : "rgba(245, 237, 228, 0.65)",
                      boxShadow: active ? "0 8px 24px rgba(212, 175, 136, 0.18)" : "none"
                    }}
                  >
                    <Icon size={14} strokeWidth={1.6} />
                    {v.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Variant detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display text-4xl leading-tight tracking-tight md:text-5xl" style={{ color: "#f5ede4" }}>
                  {variant.name}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.65)" }}>
                  {variant.description}
                </p>
              </div>

              {/* Tasting notes */}
              <div className="flex flex-wrap gap-2">
                {variant.notes.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border px-3 py-1 text-[11px] tracking-wide"
                    style={{ borderColor: "rgba(212, 175, 136, 0.15)", color: "rgba(245, 237, 228, 0.75)" }}
                  >
                    {n}
                  </span>
                ))}
              </div>

              {/* Spec rows */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 text-sm" style={{ borderColor: "rgba(212, 175, 136, 0.1)" }}>
                <SpecRow label="Format" value={selectedGram.grams} />
                <SpecRow
                  label="Origin"
                  value="Single-Estate"
                  icon={<MapPin size={12} strokeWidth={1.6} />}
                />
                <SpecRow label="Roast Date" value="Within 48h" />
                <SpecRow label="Shipping" value="Free · EU & UK" />
              </dl>

              {/* Gram size selector — moved ABOVE price */}
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
                  Select size:
                </p>
                <div className="flex flex-wrap gap-2">
                  {GRAM_SIZES.map((size) => (
                    <button
                      key={size.grams}
                      onClick={() => setSelectedGram(size)}
                      className="rounded-full px-4 py-2 text-sm transition-all hover:scale-105"
                      style={{
                        backgroundColor: selectedGram.grams === size.grams ? "#d4af88" : "rgba(212, 175, 136, 0.1)",
                        color: selectedGram.grams === size.grams ? "#0c0a08" : "#d4af88",
                        border: "1px solid rgba(212, 175, 136, 0.3)"
                      }}
                    >
                      {size.grams} — €{size.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price — now below size selector */}
              <div className="flex items-baseline gap-4">
                <p
                  className="font-display text-5xl tracking-tight md:text-6xl"
                  style={{
                    background: "linear-gradient(135deg, #d4af88 0%, #e6c8a3 50%, #d4af88 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  €{selectedGram.price}
                </p>
                <span className="text-xs" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                  or 4 × €{(selectedGram.price / 4).toFixed(2)} interest-free
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton variant="gold" onClick={handleAddToCart}>
                  Add to Cart
                </MagneticButton>
                <Link href={`/product/featured-${variant.id}`}>
                  <MagneticButton variant="outline">
                    <Eye size={16} strokeWidth={1.6} />
                    View Details
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#a8845e" }}>
        {label}
      </dt>
      <dd className="flex items-center gap-2" style={{ color: "#f5ede4" }}>
        {icon}
        {value}
      </dd>
    </div>
  );
}
