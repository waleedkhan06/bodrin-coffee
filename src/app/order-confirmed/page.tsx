"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check, Package, ArrowRight, Clock, Mail } from "lucide-react";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessCheckmark() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute h-32 w-32 rounded-full"
        style={{ border: "2px solid rgba(212,175,136,0.4)" }}
      />
      {/* Background circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,136,0.2) 0%, rgba(212,175,136,0.05) 100%)",
          border: "1px solid rgba(212,175,136,0.3)",
        }}
      >
        {/* Checkmark SVG */}
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12 24L20 32L36 16"
            stroke="#d4af88"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <OrderContent />
    </Suspense>
  );
}

function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "BDR-XXXXXX";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 py-24 sm:px-6 sm:py-28 md:px-10 md:py-40">
          {/* Success animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <SuccessCheckmark />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-display text-balance text-center text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "#f5ede4" }}
          >
            Order confirmed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="mt-4 text-center text-sm sm:text-base md:text-lg"
            style={{ color: "rgba(245, 237, 228, 0.6)" }}
          >
            Thank you for your purchase. Your order is being prepared with care.
          </motion.p>

          {/* Order details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="mt-10 w-full max-w-md rounded-[24px] p-6 sm:p-8"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(212, 175, 136, 0.12)",
            }}
          >
            {/* Order ID */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
                Order ID
              </span>
              <span className="font-mono text-sm tracking-widest" style={{ color: "#d4af88" }}>
                {orderId}
              </span>
            </div>

            {/* Info rows */}
            <div className="space-y-4">
              <InfoRow
                icon={<Package size={16} strokeWidth={1.6} />}
                label="Status"
                value="Processing"
              />
              <InfoRow
                icon={<Clock size={16} strokeWidth={1.6} />}
                label="Estimated delivery"
                value="5–10 business days"
              />
              <InfoRow
                icon={<Mail size={16} strokeWidth={1.6} />}
                label="Confirmation email"
                value="Sent to your inbox"
              />
            </div>

            {/* Hairline */}
            <div className="my-6 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,136,0.3), transparent)" }} />

            {/* Tracking note */}
            <p className="text-center text-xs leading-relaxed" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
              A tracking number will be sent to your email once your order ships.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/">
              <MagneticButton variant="gold">
                Continue Shopping
                <ArrowRight size={16} strokeWidth={1.6} />
              </MagneticButton>
            </Link>
            <Link href="/contact">
              <MagneticButton variant="outline">
                Need Help?
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: "#f5ede4" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0c0a08" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </main>
      <Footer />
    </>
  );
}
