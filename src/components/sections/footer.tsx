"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { useToast } from "@/contexts/toast-context";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
      setEmail("");
      toast("Welcome to the table — check your inbox.", "success");
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-espresso pt-28">
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        {/* Newsletter band */}
        <div className="grid grid-cols-1 gap-12 border-b border-gold/10 pb-20 md:grid-cols-12 md:gap-16 md:pb-28">
          <div className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Stay close
            </p>
            <h3 className="mt-3 font-display text-balance text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-[4rem]">
              Letters from the roastery, twice a month — never more.
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 self-end md:col-span-5"
          >
            <label className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Your email
            </label>
            <div className="flex items-center gap-2 border-b border-gold/20 pb-3 transition-colors focus-within:border-gold">
              <input
                type="email"
                required
                placeholder="you@bodrin.coffee"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-base text-cream outline-none placeholder:text-cream/30 md:text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Subscribe"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-espresso transition-all duration-500 hover:bg-gold-bright hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso" />
                ) : sent ? (
                  <Send size={14} strokeWidth={1.8} />
                ) : (
                  <ArrowRight size={16} strokeWidth={1.8} />
                )}
              </button>
            </div>
            <motion.p
              initial={false}
              animate={{ opacity: sent ? 1 : 0, y: sent ? 0 : -4 }}
              className="text-xs text-gold"
            >
              Welcome to the table — check your inbox.
            </motion.p>
            <p className="text-[11px] tracking-wide text-cream/40">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="text-cream/60 underline underline-offset-2 hover:text-cream">
                privacy policy
              </Link>
              . Unsubscribe in one click.
            </p>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-12 md:py-20">
          <div className="col-span-2 md:col-span-4">
            <div className="flex flex-col gap-2">
              <span className="font-display text-3xl tracking-[0.18em] text-cream">
                {BRAND.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                {BRAND.est} · {BRAND.tagline}
              </span>
            </div>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-cream/60">
              An atelier of single-origin coffee. Slow-roasted in Lisbon,
              shared with a small circle of devoted drinkers.
            </p>
          </div>

          <FooterCol
            title="Explore"
            links={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))}
          />
          <FooterCol
            title="Atelier"
            links={[
              { label: "Roastery tours", href: "/roastery-tours" },
              { label: "Wholesale", href: "/wholesale" },
              { label: "Press kit", href: "/press-kit" },
              { label: "Sustainability", href: "/sustainability" },
            ]}
          />
          <FooterCol
            title="Service"
            links={[
              { label: "Shipping", href: "/shipping" },
              { label: "Returns", href: "/returns" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* Massive wordmark */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="select-none overflow-hidden pb-6"
          aria-hidden
        >
          <span className="font-display block text-[22vw] leading-none tracking-[-0.02em] text-gradient-gold md:text-[18vw]">
            BODRIN
          </span>
        </motion.div>

        {/* Bottom strip */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-gold/10 py-8 text-[11px] uppercase tracking-[0.3em] text-cream/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} BODRIN Atelier · Lisbon</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-cream">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/bodrin.coffee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="glass flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[10px] tracking-[0.3em] text-cream transition-colors hover:text-gold"
            >
              IG
            </a>
            <a
              href="https://youtube.com/@bodrin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="glass flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[10px] tracking-[0.3em] text-cream transition-colors hover:text-gold"
            >
              YT
            </a>
            <a
              href="https://open.spotify.com/bodrin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="glass flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[10px] tracking-[0.3em] text-cream transition-colors hover:text-gold"
            >
              SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
        {title}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("#") ? (
              <a
                href={l.href}
                className="text-sm text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-sm text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
