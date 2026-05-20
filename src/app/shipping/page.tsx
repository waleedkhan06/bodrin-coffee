import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function ShippingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-40">
          <header className="mb-16">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
              <span className="inline-block h-px w-8" style={{ backgroundColor: "#a8845e" }} />
              Service
            </div>
            <h1 className="mt-6 font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ color: "#f5ede4" }}>
              Shipping
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Worldwide Delivery
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We ship BODRIN coffee worldwide from our roastery in Lisbon. Orders are dispatched within 48 hours of roasting to ensure peak freshness.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Shipping Rates
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li className="flex justify-between border-b pb-3" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <span>Portugal</span>
                    <span>Free on orders over €30</span>
                  </li>
                  <li className="flex justify-between border-b pb-3" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <span>Europe</span>
                    <span>€8.00 (Free on orders over €80)</span>
                  </li>
                  <li className="flex justify-between border-b pb-3" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <span>United States</span>
                    <span>€15.00 (Free on orders over €120)</span>
                  </li>
                  <li className="flex justify-between pb-3">
                    <span>Rest of World</span>
                    <span>€20.00 (Free on orders over €150)</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Delivery Times
                </h2>
                <ul className="space-y-2" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Portugal: 1-2 business days</li>
                  <li>• Europe: 3-5 business days</li>
                  <li>• United States: 5-7 business days</li>
                  <li>• Rest of World: 7-14 business days</li>
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Freshness Guarantee
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Every bag is stamped with the roast date. We recommend consuming within 4-6 weeks of roasting for optimal flavor. Coffee is best enjoyed fresh.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Packaging
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Our coffee is packed in valve-sealed bags with one-way degassing valves to preserve freshness. We use sustainable, recyclable packaging materials.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Tracking
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  You&apos;ll receive a tracking number via email once your order ships. Track your package&apos;s journey from Lisbon to your doorstep.
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
