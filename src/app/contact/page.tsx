"use client";

import { useState } from "react";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import { useToast } from "@/contexts/toast-context";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    toast("Message sent! We'll respond within 24 hours.", "success");
    setTimeout(() => setSent(false), 4000);
  };

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
              Contact
            </h1>
          </header>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Get in Touch
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  Have questions about our coffee, orders, or partnerships? We&apos;d love to hear from you.
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-wider mb-1" style={{ color: "#a8845e" }}>Email</p>
                    <a href="mailto:hello@bodrin.coffee" className="transition-colors hover:text-gold" style={{ color: "#f5ede4" }}>
                      hello@bodrin.coffee
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider mb-1" style={{ color: "#a8845e" }}>Location</p>
                    <p style={{ color: "#f5ede4" }}>Lisbon, Portugal</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4" style={{ color: "#d4af88" }}>
                  Business Hours
                </h2>
                <div className="space-y-2" style={{ color: "rgba(245, 237, 228, 0.7)" }}>
                  <p>Monday - Friday: 9:00 - 18:00</p>
                  <p>Saturday: 10:00 - 16:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </section>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block" style={{ color: "#a8845e" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b pb-3 outline-none transition-colors focus:border-gold"
                    style={{ borderColor: "rgba(212, 175, 136, 0.2)", color: "#f5ede4" }}
                  />
                </div>

                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block" style={{ color: "#a8845e" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b pb-3 outline-none transition-colors focus:border-gold"
                    style={{ borderColor: "rgba(212, 175, 136, 0.2)", color: "#f5ede4" }}
                  />
                </div>

                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block" style={{ color: "#a8845e" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b pb-3 outline-none transition-colors focus:border-gold"
                    style={{ borderColor: "rgba(212, 175, 136, 0.2)", color: "#f5ede4" }}
                  />
                </div>

                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block" style={{ color: "#a8845e" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b pb-3 outline-none transition-colors focus:border-gold resize-none"
                    style={{ borderColor: "rgba(212, 175, 136, 0.2)", color: "#f5ede4" }}
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full border px-8 py-3 text-sm uppercase tracking-wider transition-all hover:scale-105"
                  style={{ borderColor: "#d4af88", color: "#d4af88" }}
                >
                  {sent ? "Sent ✓" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
