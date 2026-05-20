"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  perspective?: number;
};

export function TiltCard({
  children,
  className,
  max = 8,
  perspective = 1000,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.5 });

  const rotateY = useTransform(sx, (v) => v * max);
  const rotateX = useTransform(sy, (v) => -v * max);

  const sheenX = useTransform(sx, (v) => (v + 0.5) * 100);
  const sheenY = useTransform(sy, (v) => (v + 0.5) * 100);
  const sheenBg = useMotionTemplate`radial-gradient(420px circle at ${sheenX}px ${sheenY}px, rgba(212,175,136,0.18), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: perspective }}
      className={cn(
        "relative will-change-transform [transform-style:preserve-3d]",
        className
      )}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background: sheenBg } as never}
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
      />
    </motion.div>
  );
}
