import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function FAQPage() {
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
              FAQ
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  What makes BODRIN coffee special?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We source single-origin micro-lots from farms above 1,800 meters, roast within 48 hours of dispatch, and ship directly to you. Our coffee is never stale.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  How should I store my coffee?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Store in a cool, dark place in the original valve-sealed bag. Avoid the fridge or freezer. Use within 4-6 weeks of the roast date for optimal flavor.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Do you offer subscriptions?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Yes, we offer monthly coffee subscriptions. Choose your favorite origins or let us curate a selection for you. Skip or cancel anytime.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  What grind options do you offer?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We offer whole bean, espresso, filter, and French press grinds. For the freshest taste, we recommend whole beans and grinding just before brewing.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Where do you ship?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We ship worldwide from our roastery in Lisbon. Shipping times vary by destination, with most orders arriving within 5-14 business days.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Can I visit your roastery?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Yes! We offer roastery tours in Lisbon. Book a tour through our website to experience our craft firsthand and taste fresh coffee.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Do you sell wholesale?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We work with select cafes, restaurants, and retailers. Contact us at wholesale@bodrin.coffee for wholesale pricing and partnership opportunities.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  How do I contact customer service?
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Email us at hello@bodrin.coffee or use the contact form on our website. We respond to all inquiries within 24 hours.
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
