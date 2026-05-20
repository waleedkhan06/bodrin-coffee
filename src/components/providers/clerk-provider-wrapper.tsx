"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// Code-split Clerk out of initial bundle — loads after hydration
const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((m) => m.ClerkProvider),
  { ssr: false }
);

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
