"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import { COLLECTION } from "@/lib/constants";
import { TiltCard } from "@/components/ui/tilt-card";
import { RevealText } from "@/components/ui/reveal-text";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useToast } from "@/contexts/toast-context";

export function CollectionSection() {
  return (
    <section id="collection" className="relative bg-espresso pt-28 pb-16 md:pt-40 md:pb-20">
      {/* Section header */}
      <header className="mx-auto mb-14 flex max-w-[1480px] flex-col gap-6 px-6 md:mb-20 md:px-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
          <span className="inline-block h-px w-8" style={{ backgroundColor: "#a8845e" }} />
          01 — Collection
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5rem]" style={{ color: "#f5ede4" }}>
            <RevealText as="span" className="block">
              Single-origin
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
                micro-lots.
              </RevealText>
            </span>
          </h2>
          <p className="max-w-md text-pretty text-base leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
            Six expressions, each from a single farm, roasted within 48 hours
            of dispatch.
          </p>
        </div>
      </header>

      {/* Premium Grid Layout */}
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COLLECTION.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <ProductCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  item,
  index,
}: {
  item: (typeof COLLECTION)[number];
  index: number;
}) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const toast = useToast();
  const wishlisted = isInWishlist(item.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: `${item.origin} · ${item.altitude}`,
    });
    toast(`${item.name} added to cart`, "success");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleItem({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: `${item.origin} · ${item.altitude}`,
    });
    toast(added ? `${item.name} added to wishlist` : `${item.name} removed from wishlist`, added ? "success" : "info");
  };

  return (
    <Link href={`/product/${item.id}`} className="block">
      <TiltCard>
        <motion.div
          className="group relative overflow-hidden rounded-[28px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 768px) 42vw, 80vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              priority={index < 3}
            />
            {/* Gradient veil */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #0c0a08 0%, rgba(12, 10, 8, 0.4) 50%, transparent 100%)"
              }}
            />
            {/* Wishlist heart */}
            <button
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110"
              style={{
                backgroundColor: wishlisted ? "rgba(212, 175, 136, 0.2)" : "rgba(12, 10, 8, 0.5)",
                color: wishlisted ? "#d4af88" : "rgba(245, 237, 228, 0.7)",
              }}
            >
              <Heart size={14} strokeWidth={1.6} fill={wishlisted ? "#d4af88" : "none"} />
            </button>
            {/* Badge */}
            {item.badge && (
              <span
                className="absolute left-16 top-5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md"
                style={{ backgroundColor: "rgba(12, 10, 8, 0.7)", color: "#d4af88" }}
              >
                {item.badge}
              </span>
            )}
            {/* Roast pill */}
            <span
              className="absolute right-5 top-5 rounded-full glass-gold px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "#f5ede4" }}
            >
              {item.roast}
            </span>

            {/* Floating add button */}
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${item.name} to cart`}
              className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundColor: "#d4af88",
                color: "#0c0a08",
                boxShadow: "0 8px 24px rgba(212, 175, 136, 0.35)"
              }}
            >
              <Plus size={18} strokeWidth={1.6} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 p-6 md:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: "#a8845e" }}>
                  {item.origin} · {item.altitude}
                </p>
                <h3 className="mt-1 font-display text-2xl tracking-tight md:text-3xl" style={{ color: "#f5ede4" }}>
                  {item.name}
                </h3>
              </div>
              <p
                className="font-display text-2xl"
                style={{
                  background: "linear-gradient(135deg, #d4af88 0%, #e6c8a3 50%, #d4af88 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                €{item.price}
              </p>
            </div>

            {/* Tasting notes */}
            <div className="flex flex-wrap gap-2 pt-1">
              {item.notes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border px-3 py-1 text-[11px] tracking-wide"
                  style={{ borderColor: "rgba(212, 175, 136, 0.15)", color: "rgba(245, 237, 228, 0.75)" }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Hairline at bottom */}
          <span
            className="absolute inset-x-6 bottom-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent, rgba(212, 175, 136, 0.3), transparent)"
            }}
          />
        </motion.div>
      </TiltCard>
    </Link>
  );
}
