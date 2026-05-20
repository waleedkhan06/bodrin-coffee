import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function WholesalePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-40">
          <header className="mb-16">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
              <span className="inline-block h-px w-8" style={{ backgroundColor: "#a8845e" }} />
              Atelier
            </div>
            <h1 className="mt-6 font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ color: "#f5ede4" }}>
              Wholesale
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Partner With Us
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We work with select cafes, restaurants, hotels, and retailers who share our passion for exceptional coffee. Join our network of partners.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  What We Offer
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Competitive wholesale pricing</li>
                  <li>• Fresh-roasted coffee delivered weekly</li>
                  <li>• Training and brewing support</li>
                  <li>• Marketing materials and branding</li>
                  <li>• Exclusive access to limited micro-lots</li>
                  <li>• Consistent quality and availability</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Our Coffee
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Our single-origin coffees are sourced from micro-lots above 1,800 meters and roasted within 48 hours of delivery. Each origin is carefully selected for its unique profile.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Requirements
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Minimum order: 5kg per origin</li>
                  <li>• Regular weekly or bi-weekly orders</li>
                  <li>• Commitment to quality preparation</li>
                  <li>• Location in Portugal or Spain</li>
                  <li>• Existing food service business</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Get Started
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  To apply for a wholesale partnership, email us at wholesale@bodrin.coffee with:
                </p>
                <ul className="space-y-2 mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Your business name and location</li>
                  <li>• Type of establishment</li>
                  <li>• Current coffee setup</li>
                  <li>• Estimated weekly volume</li>
                </ul>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We will review your application and respond within 48 hours with pricing and next steps.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
