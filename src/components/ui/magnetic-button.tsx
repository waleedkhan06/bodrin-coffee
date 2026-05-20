"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Variant = "gold" | "ghost" | "outline";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  variant = "gold",
  className,
  onClick,
  href,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.6 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 select-none rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform";

  const variants: Record<Variant, string> = {
    gold:
      "bg-gradient-to-b from-gold-bright via-gold to-gold-deep text-espresso shadow-[0_8px_30px_rgba(212,175,136,0.25)] hover:shadow-[0_12px_44px_rgba(212,175,136,0.45)]",
    ghost:
      "glass text-cream hover:text-gold-bright",
    outline:
      "border border-gold/30 text-cream hover:border-gold hover:text-gold-bright",
  };

  const Inner = (
    <motion.div
      ref={ref}
      style={reducedMotion ? {} : { x: springX, y: springY }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(baseClasses, variants[variant], className)}
    >
      <motion.span
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>

      {variant === "gold" && (
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.45),transparent_60%)]"
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
