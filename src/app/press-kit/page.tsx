import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function PressKitPage() {
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
              Press Kit
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  About BODRIN
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  BODRIN is a luxury coffee atelier based in Lisbon, Portugal. We source single-origin micro-lots from farms above 1,800 meters and roast within 48 hours of dispatch.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Founded in 2024, BODRIN represents a new standard in specialty coffee — where every cup is a curated experience of origin, craft, and ritual.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Brand Assets
                </h2>
                <div className="space-y-4">
                  <div className="border-b pb-4" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <p className="font-display text-lg mb-1" style={{ color: "#f5ede4" }}>Logo</p>
                    <p style={{ color: "rgba(245, 237, 228, 0.6)" }}>SVG, PNG formats available</p>
                  </div>
                  <div className="border-b pb-4" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <p className="font-display text-lg mb-1" style={{ color: "#f5ede4" }}>Brand Guidelines</p>
                    <p style={{ color: "rgba(245, 237, 228, 0.6)" }}>Colors, typography, usage</p>
                  </div>
                  <div className="border-b pb-4" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <p className="font-display text-lg mb-1" style={{ color: "#f5ede4" }}>Product Photography</p>
                    <p style={{ color: "rgba(245, 237, 228, 0.6)" }}>High-resolution images</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Media Contact
                </h2>
                <div className="space-y-2" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <p>For press inquiries:</p>
                  <p style={{ color: "#f5ede4" }}>press@bodrin.coffee</p>
                  <p className="mt-4">For interview requests:</p>
                  <p style={{ color: "#f5ede4" }}>media@bodrin.coffee</p>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Download Assets
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  To access our full press kit including logos, images, and brand guidelines, please contact us at press@bodrin.coffee.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  All assets are provided for editorial use only. Commercial use requires prior written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Quick Facts
                </h2>
                <ul className="space-y-2" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Founded: 2024</li>
                  <li>• Headquarters: Lisbon, Portugal</li>
                  <li>• Roastery: Lisbon, Portugal</li>
                  <li>• Origins: 6 micro-lots</li>
                  <li>• Altitude: 1,800m+ farms</li>
                  <li>• Roast-to-order: Within 48 hours</li>
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
