import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx + tailwind-merge.
 * Used across all components for conditional styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp value between min and max */
export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Map a value from one range to another */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((v - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * Deterministic pseudo-random in [0, 1).
 *
 * Used in 3D scene init so we get stable "random looking" values without
 * actually calling Math.random() (which React 19's compiler flags as impure
 * during render and which also breaks SSR hydration). Seeded by an index
 * + an optional salt so different attribute streams don't correlate.
 */
export function rand(i: number, salt = 0): number {
  let n = ((i + 1) | 0) * 2654435761 + ((salt + 1) | 0) * 40503;
  n = Math.imul(n ^ (n >>> 15), 2246822507);
  n = Math.imul(n ^ (n >>> 13), 3266489909);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

/** Random in [a, b) using the seeded `rand`. */
export const randRange = (i: number, a: number, b: number, salt = 0) =>
  a + rand(i, salt) * (b - a);
