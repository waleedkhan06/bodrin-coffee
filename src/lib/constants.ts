/**
 * BODRIN — Brand copy, product data, and content constants.
 * Centralized so sections stay declarative.
 */

export const BRAND = {
  name: "BODRIN",
  tagline: "Crafted Coffee, Cinematic Experience",
  est: "EST. 2014",
  domain: "bodrin.coffee",
} as const;

export const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#story", label: "Craft" },
  { href: "#product", label: "Featured" },
  { href: "#brewing", label: "Brewing" },
  { href: "#membership", label: "Membership" },
] as const;

/** Coffee collection — used in horizontal scroll section */
export type CoffeeProduct = {
  id: string;
  name: string;
  origin: string;
  altitude: string;
  notes: string[];
  roast: "Light" | "Medium" | "Medium-Dark" | "Dark";
  price: number;
  image: string;
  badge?: string;
};

export const COLLECTION: CoffeeProduct[] = [
  {
    id: "etiopia-yirgacheffe",
    name: "Yirgacheffe Reserve",
    origin: "Ethiopia",
    altitude: "2,100 m",
    notes: ["Bergamot", "Jasmine", "Stone Fruit"],
    roast: "Light",
    price: 38,
    image: "/Yirgacheffe Reserve.jpg",
    badge: "Single Origin",
  },
  {
    id: "colombia-huila",
    name: "Huila Geisha",
    origin: "Colombia",
    altitude: "1,850 m",
    notes: ["Honey", "Tangerine", "Cocoa Nib"],
    roast: "Medium",
    price: 46,
    image: "/Huila Geisha.jpg",
    badge: "Limited",
  },
  {
    id: "panama-boquete",
    name: "Boquete Auction Lot",
    origin: "Panama",
    altitude: "1,950 m",
    notes: ["Peach", "Floral", "Brown Sugar"],
    roast: "Light",
    price: 72,
    image: "/Boquete Auction Lot.jpg",
    badge: "Auction",
  },
  {
    id: "kenya-nyeri",
    name: "Nyeri AA",
    origin: "Kenya",
    altitude: "1,780 m",
    notes: ["Blackcurrant", "Citrus", "Wine"],
    roast: "Medium",
    price: 42,
    image: "/Nyeri AA.jpg",
  },
  {
    id: "guatemala-acatenango",
    name: "Acatenango Volcán",
    origin: "Guatemala",
    altitude: "1,650 m",
    notes: ["Dark Chocolate", "Walnut", "Vanilla"],
    roast: "Medium-Dark",
    price: 36,
    image: "/Acatenango Volcán.jpg",
  },
  {
    id: "house-noir",
    name: "Maison Noir",
    origin: "House Blend",
    altitude: "Curated",
    notes: ["Bittersweet", "Smoke", "Hazelnut"],
    roast: "Dark",
    price: 32,
    image: "/Maison Noir.jpg",
    badge: "Signature",
  },
];

/** Story chapters for craftsmanship section */
export const STORY_CHAPTERS = [
  {
    chapter: "01",
    title: "Source",
    russian: "Источник",
    body: "We travel to micro-lots above 1,800 meters, hand-picking cherries with farmers who treat coffee as heritage, not commodity.",
    image: "/wfzkr.jpg",
  },
  {
    chapter: "02",
    title: "Roast",
    russian: "Обжарка",
    body: "Slow-roasted in small batches on cast iron drums. Every profile is dialed in over weeks — a single-degree difference reshapes the cup.",
    image: "/qBtrJ.jpg",
  },
  {
    chapter: "03",
    title: "Ritual",
    russian: "Ритуал",
    body: "From the grind to the pour, every gesture is choreographed. BODRIN is not a beverage. It is a fifteen-minute meditation.",
    image: "/rlvkr.jpg",
  },
] as const;

/** Brewing experience steps */
export const BREWING_STEPS = [
  {
    step: "I",
    title: "Grind",
    detail: "18g of beans, ground to coarse sea salt 30 seconds before extraction.",
    temp: "—",
  },
  {
    step: "II",
    title: "Bloom",
    detail: "Pour 50g of 94°C water in slow circular motion. Let the coffee breathe for 35 seconds.",
    temp: "94°C",
  },
  {
    step: "III",
    title: "Pulse",
    detail: "Three pulse pours of 80g each. Maintain gentle agitation. Total brew: 3:30.",
    temp: "92°C",
  },
  {
    step: "IV",
    title: "Serve",
    detail: "Decant into a pre-warmed Bodrin tasse. Inhale before sipping.",
    temp: "68°C",
  },
] as const;

/** Testimonials */
export const TESTIMONIALS = [
  {
    quote:
      "The Yirgacheffe Reserve is the closest I've come to drinking sunlight. BODRIN has rewritten what I expect from a morning cup.",
    author: "Anya Volkova",
    role: "Editor-at-Large, Atelier Magazine",
    image: "/t8rvl.jpg",
  },
  {
    quote:
      "I source coffee for three Michelin kitchens. BODRIN is the only roaster I serve without a blind tasting first.",
    author: "Marcus Lindqvist",
    role: "Head Sommelier, Maison Vert",
    image: "/wfzkr.jpg",
  },
  {
    quote:
      "Every parcel arrives like a private letter. The story, the dialed-in roast date, the ritual — it is theatre, in the best way.",
    author: "Hideki Tanaka",
    role: "Architect, Tokyo",
    image: "/e4IHS (3).jpg",
  },
  {
    quote:
      "The Reserve Gold edition changed my morning ritual entirely. The gold leaf packaging alone makes it worth every euro. Pure luxury.",
    author: "Elena Rossi",
    role: "Creative Director, Milano",
    image: "/E3J99.jpg",
  },
  {
    quote:
      "As a barista for 15 years, I thought I'd tasted everything. BODRIN's Huila Geisha proved me wrong. It's not coffee — it's art.",
    author: "James Chen",
    role: "Head Barista, The Fifth Floor",
    image: "/f3UX4.jpg",
  },
  {
    quote:
      "I gift BODRIN to all my VIP clients. The unboxing experience alone is worth the price. They always ask for more.",
    author: "Sophie Laurent",
    role: "Luxury Concierge, Paris",
    image: "/lXoYs.jpg",
  },
] as const;

/** Membership tiers */
export const MEMBERSHIP = [
  {
    id: "essence",
    name: "Essence",
    price: 48,
    cadence: "monthly",
    description: "Two house lots delivered fresh, with tasting notes.",
    benefits: [
      "2 × 250g bags / month",
      "Roasted within 48h of dispatch",
      "Brew guide booklet",
      "Free shipping in EU",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    price: 96,
    cadence: "monthly",
    description: "Curator's choice, including limited micro-lots.",
    benefits: [
      "3 × 250g bags / month",
      "1 limited micro-lot per quarter",
      "Private barista consultation",
      "Member-only roastery events",
      "Free express shipping worldwide",
    ],
    featured: true,
  },
  {
    id: "reserve",
    name: "Reserve",
    price: 240,
    cadence: "monthly",
    description: "Auction-grade lots, hand-numbered, fully bespoke.",
    benefits: [
      "Bespoke selection consultation",
      "Auction & competition lots",
      "Full Bodrin equipment kit",
      "Annual private cupping in Lisbon",
      "Concierge support",
    ],
  },
] as const;
