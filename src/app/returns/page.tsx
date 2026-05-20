import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function ReturnsPage() {
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
              Returns
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Our Policy
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  We want you to be completely satisfied with your BODRIN coffee. If you&apos;re not happy with your purchase, we&apos;ll make it right.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  30-Day Satisfaction Guarantee
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  If you&apos;re not satisfied with your coffee within 30 days of purchase, contact us for a full refund or replacement. No questions asked.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Damaged or Defective Products
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  If your order arrives damaged or there&apos;s a quality issue, please contact us within 48 hours of delivery with photos. We&apos;ll send a replacement immediately.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  How to Request a Return
                </h2>
                <ol className="space-y-3" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <li>1. Contact us at returns@bodrin.coffee</li>
                  <li>2. Include your order number and reason for return</li>
                  <li>3. We&apos;ll respond within 24 hours</li>
                  <li>4. Receive your refund or replacement</li>
                </ol>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Refund Process
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Refunds are processed within 5-7 business days to your original payment method. You&apos;ll receive an email confirmation when your refund is processed.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Exceptions
                </h2>
                <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Coffee that has been opened or used beyond 30 days cannot be returned. This policy applies to all coffee purchases, including subscription boxes.
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
