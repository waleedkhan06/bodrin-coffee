import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-40">
          <header className="mb-16">
            <h1 className="font-display text-balance text-5xl leading-[0.95] tracking-tight md:text-7xl" style={{ color: "#f5ede4" }}>
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Information We Collect
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We collect information you provide directly, including:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                <li>• Name and contact information</li>
                <li>• Shipping and billing addresses</li>
                <li>• Payment information (processed securely)</li>
                <li>• Order history and preferences</li>
                <li>• Email subscriptions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We use your information to:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                <li>• Process and fulfill your orders</li>
                <li>• Send order confirmations and shipping updates</li>
                <li>• Provide customer support</li>
                <li>• Send marketing emails (with your consent)</li>
                <li>• Improve our products and services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Data Security
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We implement industry-standard security measures to protect your personal information. Payment data is processed through secure, PCI-compliant payment processors. We do not store complete credit card numbers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Third-Party Services
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We use third-party services to operate our website, including payment processors, shipping providers, and email services. These services have access to your information only as necessary to perform their functions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Your Rights
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                You have the right to:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                <li>• Access your personal information</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Cookies
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                Contact Us
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                For questions about this privacy policy or your personal information, contact us at privacy@bodrin.coffee.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
