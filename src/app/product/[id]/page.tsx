"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ShoppingBag, Heart, Thermometer, Clock, Maximize2, MapPin, Award, Leaf } from "lucide-react";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useToast } from "@/contexts/toast-context";
import { getProductById, getRelatedProducts } from "@/lib/product-data";

const BEAN_SIZES = [
  { label: "150g", price: 28 },
  { label: "250g", price: 42 },
  { label: "500g", price: 76 },
];

const CUP_SIZES = [
  { label: "Single Cup", price: 6 },
  { label: "Box of 6", price: 32 },
  { label: "Box of 12", price: 56 },
];

const ROAST_COLORS: Record<string, string> = {
  Light: "#c4956a",
  Medium: "#8b6914",
  "Medium-Dark": "#5c3a1e",
  Dark: "#2c1810",
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const toast = useToast();
  const related = getRelatedProducts(id, 3);

  useEffect(() => {
    if (!product) {
      router.replace("/");
    }
  }, [product, router]);

  if (!product) return null;

  const isFeatured = id.startsWith("featured-");
  const sizes = isFeatured ? BEAN_SIZES : CUP_SIZES;
  const displayPrice = sizes[selectedSize].price;
  const sizeLabel = sizes[selectedSize].label;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      variant: sizeLabel,
    });
    toast(`${product.name} (${sizeLabel}) added to cart`, "success");
  };

  const handleToggleWishlist = () => {
    const added = toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      variant: product.origin,
    });
    toast(added ? `${product.name} added to wishlist` : `${product.name} removed`, added ? "success" : "info");
  };

  const wishlisted = isInWishlist(product.id);

  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        {/* Back navigation */}
        <div className="mx-auto max-w-[1480px] px-6 pt-24 md:px-10 md:pt-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm tracking-wide transition-colors hover:text-gold"
            style={{ color: "rgba(245, 237, 228, 0.5)" }}
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
            Back to collection
          </Link>
        </div>

        {/* Product hero */}
        <div className="mx-auto mt-6 grid max-w-[1480px] grid-cols-1 gap-10 px-6 pb-16 md:grid-cols-2 md:gap-14 md:px-10 md:pb-24">
          {/* Image gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, #0c0a08 0%, rgba(12,10,8,0.4) 50%, transparent 100%)",
                }}
              />
              {product.badge && (
                <span
                  className="absolute left-5 top-5 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md"
                  style={{ backgroundColor: "rgba(12, 10, 8, 0.7)", color: "#d4af88" }}
                >
                  {product.badge}
                </span>
              )}
              <span
                className="absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  backgroundColor: ROAST_COLORS[product.roast],
                  color: "#f5ede4",
                }}
              >
                {product.roast} Roast
              </span>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300"
                  style={{
                    border: selectedImage === i ? "2px solid #d4af88" : "2px solid rgba(212,175,136,0.1)",
                    opacity: selectedImage === i ? 1 : 0.5,
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                {product.origin} · {product.altitude}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl" style={{ color: "#f5ede4" }}>
                {product.name}
              </h1>
            </div>

            <p className="max-w-prose text-base leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.65)" }}>
              {product.description}
            </p>

            {/* Specs grid */}
            <div
              className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px]"
              style={{ backgroundColor: "rgba(212, 175, 136, 0.1)" }}
            >
              {[
                { label: "Origin", value: product.origin, icon: MapPin },
                { label: "Region", value: product.region, icon: MapPin },
                { label: "Farm", value: product.farm, icon: Award },
                { label: "Process", value: product.process, icon: Leaf },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 p-4"
                  style={{ backgroundColor: "rgba(12, 10, 8, 0.8)" }}
                >
                  <spec.icon size={14} strokeWidth={1.6} style={{ color: "#d4af88" }} />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
                      {spec.label}
                    </p>
                    <p className="text-sm" style={{ color: "#f5ede4" }}>
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasting notes */}
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                Tasting Notes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
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

            {/* Price */}
            <p
              className="font-display text-5xl tracking-tight md:text-6xl"
              style={{
                background: "linear-gradient(135deg, #d4af88 0%, #e6c8a3 50%, #d4af88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              €{displayPrice}
            </p>

            {/* Size selector */}
            <div className="space-y-3">
              <p className="text-sm" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
                {isFeatured ? "Select size:" : "Select quantity:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className="rounded-full px-5 py-2.5 text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: selectedSize === i ? "#d4af88" : "rgba(212, 175, 136, 0.1)",
                      color: selectedSize === i ? "#0c0a08" : "#d4af88",
                      border: "1px solid rgba(212, 175, 136, 0.3)",
                    }}
                  >
                    {size.label} — €{size.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton variant="gold" onClick={handleAddToCart}>
                <ShoppingBag size={16} strokeWidth={1.6} />
                Add to Cart
              </MagneticButton>
              <button
                onClick={handleToggleWishlist}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: wishlisted ? "rgba(212, 175, 136, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  color: wishlisted ? "#d4af88" : "rgba(245, 237, 228, 0.5)",
                  border: "1px solid rgba(212, 175, 136, 0.2)",
                }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} strokeWidth={1.6} fill={wishlisted ? "#d4af88" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Story section */}
        <section className="border-y" style={{ borderColor: "rgba(212, 175, 136, 0.08)" }}>
          <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                Origin Story
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-tight md:text-5xl" style={{ color: "#f5ede4" }}>
                The journey to your cup
              </h2>
              <p className="mt-8 text-base leading-relaxed md:text-lg" style={{ color: "rgba(245, 237, 228, 0.65)" }}>
                {product.story}
              </p>
            </div>
          </div>
        </section>

        {/* Brewing recommendations */}
        <section>
          <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10 md:py-28">
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
              Brewing Guide
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-tight md:text-5xl" style={{ color: "#f5ede4" }}>
              How to brew
            </h2>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: Thermometer, label: "Temperature", value: product.brewTemp },
                { icon: Clock, label: "Brew Time", value: product.brewTime },
                { icon: Maximize2, label: "Grind Size", value: product.grindSize },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] p-6 md:p-8"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.1)" }}
                >
                  <item.icon size={20} strokeWidth={1.4} style={{ color: "#d4af88" }} />
                  <p className="mt-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-2xl tracking-tight" style={{ color: "#f5ede4" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Pairings */}
            <div className="mt-12">
              <p className="mb-4 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                Recommended Pairings
              </p>
              <div className="flex flex-wrap gap-2">
                {product.pairings.map((pairing) => (
                  <span
                    key={pairing}
                    className="rounded-full border px-4 py-2 text-sm tracking-wide"
                    style={{ borderColor: "rgba(212, 175, 136, 0.15)", color: "rgba(245, 237, 228, 0.75)" }}
                  >
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="border-t" style={{ borderColor: "rgba(212, 175, 136, 0.08)" }}>
            <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10 md:py-28">
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                Explore More
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-tight md:text-5xl" style={{ color: "#f5ede4" }}>
                You might also like
              </h2>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/product/${r.id}`} className="group">
                    <div
                      className="overflow-hidden rounded-[20px] transition-all duration-500 group-hover:-translate-y-1"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 80vw"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c0a08 0%, rgba(12,10,8,0.3) 50%, transparent 100%)" }} />
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
                          {r.origin}
                        </p>
                        <h3 className="mt-1 font-display text-xl tracking-tight" style={{ color: "#f5ede4" }}>
                          {r.name}
                        </h3>
                        <p className="mt-2 font-display text-lg" style={{ color: "#d4af88" }}>
                          €{r.id.startsWith("featured-") ? r.price : 6}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
