import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function RoasteryToursPage() {
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
              Roastery Tours
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Experience the Craft
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Join us for an exclusive tour of our Lisbon roastery. See where the magic happens — from green beans to perfectly roasted coffee.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  What You&apos;ll Experience
                </h2>
                <ul className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>• Guided tour of our roasting facility</li>
                  <li>• Meet our head roaster</li>
                  <li>• Learn about our sourcing process</li>
                  <li>• Live roasting demonstration</li>
                  <li>• Cupping session with fresh coffee</li>
                  <li>• Take home a complimentary bag</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Tour Details
                </h2>
                <div className="space-y-2" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <p>Duration: 2 hours</p>
                  <p>Group size: Maximum 8 people</p>
                  <p>Days: Saturday & Sunday</p>
                  <p>Time: 10:00 AM</p>
                  <p>Location: Lisbon, Portugal</p>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Pricing
                </h2>
                <div className="space-y-4">
                  <div className="border-b pb-4" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <p className="font-display text-xl mb-1" style={{ color: "#f5ede4" }}>Standard Tour</p>
                    <p className="text-2xl mb-2" style={{ color: "#d4af88" }}>€25 per person</p>
                    <p style={{ color: "rgba(245, 237, 228, 0.6)" }}>Includes tour, cupping, and coffee bag</p>
                  </div>
                  <div className="border-b pb-4" style={{ borderColor: "rgba(212, 175, 136, 0.15)" }}>
                    <p className="font-display text-xl mb-1" style={{ color: "#f5ede4" }}>Private Tour</p>
                    <p className="text-2xl mb-2" style={{ color: "#d4af88" }}>€150 for up to 4 people</p>
                    <p style={{ color: "rgba(245, 237, 228, 0.6)" }}>Exclusive experience with personalized attention</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Book Your Tour
                </h2>
                <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  To book a tour, email us at tours@bodrin.coffee with your preferred date and group size. We will confirm availability within 24 hours.
                </p>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Tours are available in English and Portuguese. Please specify your language preference when booking.
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
