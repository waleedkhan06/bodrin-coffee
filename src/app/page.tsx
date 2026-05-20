import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import {
  Hero,
  CollectionSection,
  CraftsmanshipSection,
  FeaturedProductSection,
  BrewingSection,
  TestimonialsSection,
  SubscriptionSection,
} from "@/components/sections/dynamic-sections";

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
