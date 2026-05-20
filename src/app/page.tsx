import { Navigation } from "@/components/nav/navigation";
import { Hero } from "@/components/sections/hero/hero";
import { CollectionSection } from "@/components/sections/collection";
import { CraftsmanshipSection } from "@/components/sections/craftsmanship";
import { FeaturedProductSection } from "@/components/sections/featured-product";
import { BrewingSection } from "@/components/sections/brewing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { SubscriptionSection } from "@/components/sections/subscription";
import { Footer } from "@/components/sections/footer";

/**
 * BODRIN — single-page luxury coffee brand site.
 *
 * Composition (top to bottom):
 *   • Sticky navigation (shrinks past 80px scroll, glassmorphic)
 *   • Cinematic Hero  — bilingual headline + CTAs
 *   • Collection      — premium grid layout of single-origin lots
 *   • Craftsmanship   — three-chapter parallax storytelling
 *   • Featured Product — interactive product with variant swap
 *   • Brewing Ritual  — sticky-illustration step-by-step guide
 *   • Testimonials    — cross-fade quotes with portrait grid
 *   • Membership      — three subscription tiers
 *   • Footer          — newsletter + massive wordmark
 *
 * The whole page is wrapped by `LenisProvider` (in the root layout) which
 * synchronizes Lenis smooth scroll with GSAP's ScrollTrigger so every
 * scroll-driven animation feels native and buttery.
 */
export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen w-full bg-espresso text-cream font-sans" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <Navigation />
        <Hero />
        <CollectionSection />
        <CraftsmanshipSection />
        <FeaturedProductSection />
        <BrewingSection />
        <TestimonialsSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </>
  );
}
