"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SideCart } from "@/components/ui/side-cart";
import { SideWishlist } from "@/components/ui/side-wishlist";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ClerkErrorBoundary } from "@/components/providers/clerk-error-boundary";

function ClerkAuthButtons() {
  const { isSignedIn } = useUser();

  return !isSignedIn ? (
    <div className="hidden md:block">
      <SignInButton>
        <MagneticButton variant="outline">Sign In</MagneticButton>
      </SignInButton>
    </div>
  ) : (
    <div className="hidden md:block">
      <Link href="/account">
        <MagneticButton variant="outline">Account</MagneticButton>
      </Link>
    </div>
  );
}

function MobileClerkLink() {
  const { isSignedIn } = useUser();

  return !isSignedIn ? (
    <SignInButton>
      <button className="font-display text-2xl tracking-tight text-cream transition-colors hover:text-gold">
        Sign In
      </button>
    </SignInButton>
  ) : (
    <Link href="/account" className="font-display text-2xl tracking-tight text-cream transition-colors hover:text-gold">
      Account
    </Link>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const [badgePop, setBadgePop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prevCount = itemCount - (badgePop ? 1 : 0);
    if (itemCount > prevCount && prevCount >= 0) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 400);
      return () => clearTimeout(t);
    }
  }, [itemCount, badgePop]);

  // Scroll-spy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll-lock when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 backdrop-blur-xl bg-espresso/70 border-b border-gold/10"
            : "py-6"
        )}
      >
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-6 md:px-10">
          {/* Wordmark */}
          <Link href="/" className="group relative flex items-center gap-3">
            <span
              className={cn(
                "font-display text-cream transition-all duration-500 tracking-[0.18em]",
                scrolled ? "text-xl" : "text-2xl md:text-3xl"
              )}
            >
              {BRAND.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-gold-deep md:block">
              {BRAND.est}
            </span>
          </Link>

          {/* Center links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group relative inline-block text-sm tracking-wide transition-colors duration-300",
                      isActive ? "text-cream" : "text-cream/75 hover:text-cream"
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-500",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            {/* Wishlist — visible on all sizes */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative inline-flex glass h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-gold"
            >
              <Heart size={16} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={false}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: "#d4af88", color: "#0c0a08" }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            {/* Cart — visible on all sizes */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative inline-flex glass h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-gold"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {itemCount > 0 && (
                <motion.span
                  initial={false}
                  animate={badgePop ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: "#d4af88", color: "#0c0a08" }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Desktop auth — wrapped in error boundary for Clerk ssr:false */}
            <ClerkErrorBoundary fallback={
              <div className="hidden md:block">
                <Link href="/account">
                  <MagneticButton variant="outline">Sign In</MagneticButton>
                </Link>
              </div>
            }>
              <ClerkAuthButtons />
            </ClerkErrorBoundary>

            <div className="hidden md:block">
              <MagneticButton variant="gold" href="#membership">
                Join Atelier
              </MagneticButton>
            </div>

            {/* Hamburger — mobile only */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="glass relative inline-flex h-11 w-11 items-center justify-center rounded-full text-cream lg:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — full-screen fixed overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 px-6 lg:hidden"
            style={{ backgroundColor: "rgba(12, 10, 8, 0.98)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-cream"
              style={{ backgroundColor: "rgba(212, 175, 136, 0.1)" }}
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl tracking-tight text-cream transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6"
            >
              <MagneticButton href="#membership" variant="gold" onClick={() => setOpen(false)}>
                Join Atelier
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <ClerkErrorBoundary fallback={
                <Link href="/account" onClick={() => setOpen(false)} className="font-display text-2xl tracking-tight text-cream transition-colors hover:text-gold">
                  Sign In
                </Link>
              }>
                <MobileClerkLink />
              </ClerkErrorBoundary>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Cart */}
      <SideCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Side Wishlist */}
      <SideWishlist isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
