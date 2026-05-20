import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-40">
          <header className="mb-16">
            <h1 className="font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ color: "#f5ede4" }}>
              Terms of Service
            </h1>
            <p className="mt-4 text-sm" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Acceptance of Terms
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                By accessing or using BODRIN&apos;s website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Orders and Payment
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order for any reason. Payment must be received before orders are processed.
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                Prices are listed in Euros and include applicable taxes. Shipping costs are calculated at checkout based on your location.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Shipping and Delivery
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We ship orders within 48 hours of roasting. Delivery times vary by destination. Risk of loss transfers to you upon delivery to the shipping carrier. We are not responsible for delays caused by shipping carriers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Returns and Refunds
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We offer a 30-day satisfaction guarantee. If you&apos;re not satisfied with your purchase, contact us for a refund or replacement. Damaged products will be replaced at no additional cost. See our Returns page for full details.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Product Information
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We strive to provide accurate product descriptions and images. However, we do not warrant that descriptions are error-free. Coffee characteristics may vary slightly between batches due to the nature of the product.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Intellectual Property
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                All content on this website, including text, images, logos, and design, is owned by BODRIN and protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Limitation of Liability
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                BODRIN shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Governing Law
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                These terms are governed by the laws of Portugal. Any disputes shall be resolved in the courts of Lisbon, Portugal.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Changes to Terms
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Contact Us
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                For questions about these terms, contact us at legal@bodrin.coffee.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
