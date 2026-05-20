"use client";

import { useState, useEffect } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth < 768;
    setReduced(media.matches || isLowEnd || isMobile);

    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
