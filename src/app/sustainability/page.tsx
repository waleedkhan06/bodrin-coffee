import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function SustainabilityPage() {
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
              Sustainability
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Our Commitment
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We believe great coffee should be good for the planet and the people who produce it. Sustainability is woven into every decision we make.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Ethical Sourcing
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Direct trade with farmers</li>
                  <li>• Fair prices above market rates</li>
                  <li>• Long-term partnerships</li>
                  <li>• Transparent supply chain</li>
                  <li>• Support for local communities</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Environmental Impact
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Carbon-neutral shipping</li>
                  <li>• Recyclable packaging</li>
                  <li>• Solar-powered roastery</li>
                  <li>• Water conservation</li>
                  <li>• Waste reduction program</li>
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Packaging
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Our coffee bags are made from recyclable materials with a one-way degassing valve to preserve freshness. We&apos;re constantly exploring more sustainable options.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We encourage customers to recycle or repurpose their empty bags. Share your creative reuse with #BODRINReuse.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Community Impact
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We invest in the communities that grow our coffee. A portion of every sale goes back to fund education, healthcare, and infrastructure projects.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Our farmers are partners, not suppliers. We visit each farm annually to ensure fair treatment and sustainable practices.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Our Goals
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• 100% recyclable packaging by 2025</li>
                  <li>• Carbon-neutral operations by 2026</li>
                  <li>• 50% increase in farmer premiums</li>
                  <li>• Zero waste to landfill</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
