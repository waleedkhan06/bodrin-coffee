import { Navigation } from "@/components/nav/navigation";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero/hero";
import { CollectionSection } from "@/components/sections/collection";
import { CraftsmanshipSection } from "@/components/sections/craftsmanship";
import { FeaturedProductSection } from "@/components/sections/featured-product";
import { SubscriptionSection } from "@/components/sections/subscription";
import { Footer } from "@/components/sections/footer";

const BrewingSection = dynamic(() => import("@/components/sections/brewing").then((m) => ({ default: m.BrewingSection })));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials").then((m) => ({ default: m.TestimonialsSection })));

export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen w-full bg-espresso text-cream font-sans" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <Navigation />
        <Hero />
        <CollectionSection />
        <CraftsmanshipSection />
        <FeaturedProductSection />
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
          <BrewingSection />
        </div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
          <TestimonialsSection />
        </div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}>
          <SubscriptionSection />
        </div>
      </main>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 1000px" }}>
        <Footer />
      </div>
    </>
  );
}
