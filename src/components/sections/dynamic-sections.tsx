"use client";

import dynamic from "next/dynamic";

// Code-split heavy animation sections — loads after initial paint
export const Hero = dynamic(() => import("@/components/sections/hero/hero").then((m) => ({ default: m.Hero })), { ssr: false });
export const CollectionSection = dynamic(() => import("@/components/sections/collection").then((m) => ({ default: m.CollectionSection })), { ssr: false });
export const CraftsmanshipSection = dynamic(() => import("@/components/sections/craftsmanship").then((m) => ({ default: m.CraftsmanshipSection })), { ssr: false });
export const FeaturedProductSection = dynamic(() => import("@/components/sections/featured-product").then((m) => ({ default: m.FeaturedProductSection })), { ssr: false });
export const BrewingSection = dynamic(() => import("@/components/sections/brewing").then((m) => ({ default: m.BrewingSection })), { ssr: false });
export const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials").then((m) => ({ default: m.TestimonialsSection })), { ssr: false });
export const SubscriptionSection = dynamic(() => import("@/components/sections/subscription").then((m) => ({ default: m.SubscriptionSection })), { ssr: false });
