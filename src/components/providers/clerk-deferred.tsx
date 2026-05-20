"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ClerkDeferred({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [ClerkProvider, setClerkProvider] = useState<React.ComponentType<{ children: ReactNode }> | null>(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(async () => {
      const { ClerkProvider: CP } = await import("@clerk/nextjs");
      setClerkProvider(() => CP);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // During SSG (server), render ClerkProvider immediately so pages using Clerk hooks work
  if (!isClient) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ClerkProvider } = require("@clerk/nextjs");
    return <ClerkProvider>{children}</ClerkProvider>;
  }

  // On client, defer Clerk loading for mobile perf
  if (!ClerkProvider) return <>{children}</>;
  return <ClerkProvider>{children}</ClerkProvider>;
}
