import { COLLECTION } from "./constants";

export type ProductDetail = {
  id: string;
  name: string;
  origin: string;
  altitude: string;
  region: string;
  farm: string;
  process: string;
  roast: string;
  price: number;
  image: string;
  badge?: string;
  notes: string[];
  description: string;
  story: string;
  brewTemp: string;
  brewTime: string;
  grindSize: string;
  pairings: string[];
  images: string[];
};

const COLLECTION_DETAILS: Record<string, Partial<ProductDetail>> = {
  "etiopia-yirgacheffe": {
    region: "Yirgacheffe, SNNPR",
    farm: "Worka Sakaro Cooperative",
    process: "Washed",
    description:
      "A luminous, tea-like coffee with pronounced floral aromatics and a silky body. Grown in the birthplace of coffee itself.",
    story:
      "Sourced from smallholder farmers in the misty highlands of Yirgacheffe, where coffee has been cultivated for centuries. The Worka Sakaro Cooperative represents 650 families who practise traditional shade-grown cultivation under native acacia trees.",
    brewTemp: "93°C",
    brewTime: "3:00 – 3:30",
    grindSize: "Medium-fine",
    pairings: ["Lemon tart", "Jasmine tea", "Almond biscotti"],
    images: ["/Yirgacheffe Reserve.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
  "colombia-huila": {
    region: "Huila, Colombia",
    farm: "Finca El Geisha",
    process: "Washed",
    description:
      "A rare Geisha varietal with an extraordinarily complex cup — honey sweetness, vibrant citrus, and a silky cocoa finish.",
    story:
      "Geisha coffee originated in Ethiopia but found its second home in Colombia. This lot comes from a single 3-hectare plot in Huila, where the cool mountain nights and mineral-rich volcanic soil produce beans of exceptional clarity.",
    brewTemp: "94°C",
    brewTime: "3:00 – 3:30",
    grindSize: "Medium-fine",
    pairings: ["Orange madeleines", "Dark chocolate 72%", "Fresh berries"],
    images: ["/Huila Geisha.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
  "panama-boquete": {
    region: "Boquete, Chiriquí",
    farm: "Finca Lérida Estate",
    process: "Natural",
    description:
      "An auction-grade Geisha with explosive fruit notes — peach jam, honeysuckle, and demerara sugar. A trophy coffee.",
    story:
      "Boquete's cool, misty slopes at 1,950 metres create the perfect microclimate for Geisha. This lot was awarded 92 points at the Best of Panama auction and is limited to only 180 kg annually.",
    brewTemp: "92°C",
    brewTime: "3:30 – 4:00",
    grindSize: "Medium-coarse",
    pairings: ["Peach crumble", "Honeycomb", "Camembert"],
    images: ["/Boquete Auction Lot.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
  "kenya-nyeri": {
    region: "Nyeri, Central Kenya",
    farm: "Gichithia Factory",
    process: "Washed (Kenyan double fermentation)",
    description:
      "A bold, wine-like Kenyan with intense blackcurrant acidity, citrus zest, and a long, savoury finish.",
    story:
      "Kenyan coffee is processed using a unique double-fermentation method that amplifies its signature brightness. This lot from the Gichithia Factory in Nyeri is SL28 and SL34 varietals grown deep in the Aberdare range.",
    brewTemp: "94°C",
    brewTime: "3:00 – 3:30",
    grindSize: "Medium-fine",
    pairings: ["Grilled steak", "Black forest cake", "Aged gouda"],
    images: ["/Nyeri AA.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
  "guatemala-acatenango": {
    region: "Acatenango Valley, Chimaltenango",
    farm: "Finca El Injerto",
    process: "Washed",
    description:
      "A volcano-grown classic with deep chocolate richness, toasted walnut, and a silky vanilla sweetness.",
    story:
      "Grown on the volcanic slopes of Volcán Acatenango, one of Guatemala's tallest peaks. The mineral-rich ash soil and high-altitude microclimate produce beans with remarkable body and a creamy mouthfeel.",
    brewTemp: "93°C",
    brewTime: "3:00 – 3:30",
    grindSize: "Medium",
    pairings: ["Chocolate mousse", "Roasted almonds", "Cinnamon pastry"],
    images: ["/Acatenango Volcán.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
  "house-noir": {
    region: "Multiple origins (house blend)",
    farm: "Bodrin Atelier",
    process: "Blended & slow-roasted",
    description:
      "Our signature house blend — a dark, velvety espresso with bittersweet smoke notes and a lingering hazelnut finish.",
    story:
      "The Bodrin Noir blend is the result of a decade of trial. Combining Brazilian Cerrado, Sumatran Mandheling, and a touch of Ethiopian Yirgacheffe, it is roasted on cast iron drums over 14 minutes to achieve its signature opacity and crema.",
    brewTemp: "90°C",
    brewTime: "2:30 – 3:00",
    grindSize: "Fine (espresso)",
    pairings: ["Dark chocolate", "Cream-filled pastries", "Aged rum"],
    images: ["/Maison Noir.jpg", "/ANVUO.jpg", "/prkED.jpg"],
  },
};

const FEATURED_DETAILS: Record<string, ProductDetail> = {
  "featured-noir": {
    id: "featured-noir",
    name: "Maison Noir — Dark Noir Edition",
    origin: "House Blend",
    altitude: "Curated",
    region: "Bodrin Atelier, Lisbon",
    farm: "Multi-origin selection",
    process: "Blended & cast-iron roasted",
    roast: "Dark",
    price: 42,
    image: "/Maison Noir – Dark Noir Edition.jpg",
    badge: "Signature",
    notes: ["Bittersweet", "Smoke", "Hazelnut"],
    description:
      "The Bodrin signature: a deep, bittersweet espresso roast wrapped in our archival noir sleeve.",
    story:
      "Our flagship expression. The Dark Noir Edition is roasted in small batches to unlock a dense, syrupy body with layers of dark chocolate and toasted hazelnut. The matte black sleeve is inspired by archival bookbinding.",
    brewTemp: "90°C",
    brewTime: "2:30 – 3:00",
    grindSize: "Fine (espresso)",
    pairings: ["Dark chocolate truffles", "Affogato", "Cigar"],
    images: ["/Maison Noir – Dark Noir Edition.jpg", "/Maison Noir – Reserve Gold.jpg", "/Maison Noir – Cream Edition.jpg"],
  },
  "featured-cream": {
    id: "featured-cream",
    name: "Maison Noir — Cream Edition",
    origin: "Ethiopia",
    altitude: "2,100 m",
    region: "Yirgacheffe, SNNPR",
    farm: "Worka Sakaro Cooperative",
    process: "Washed",
    roast: "Light",
    price: 46,
    image: "/Maison Noir – Cream Edition.jpg",
    badge: "Limited Edition",
    notes: ["Bergamot", "Jasmine", "Stone Fruit"],
    description:
      "A lighter expression — bergamot-led Yirgacheffe in our limited cream-paper edition.",
    story:
      "The Cream Edition showcases the delicate florals of Ethiopian Yirgacheffe in a lighter roast that preserves its tea-like clarity. The cream-coloured sleeve is crafted from 100% recycled cotton paper, embossed with gold foil.",
    brewTemp: "94°C",
    brewTime: "3:00 – 3:30",
    grindSize: "Medium-fine",
    pairings: ["Lemon madeleines", "Earl Grey tea", "Fresh apricots"],
    images: ["/Maison Noir – Cream Edition.jpg", "/Maison Noir – Dark Noir Edition.jpg", "/Maison Noir – Reserve Gold.jpg"],
  },
  "featured-gold": {
    id: "featured-gold",
    name: "Maison Noir — Reserve Gold",
    origin: "Panama",
    altitude: "1,950 m",
    region: "Boquete, Chiriquí",
    farm: "Finca Lérida Estate",
    process: "Natural",
    roast: "Light",
    price: 120,
    image: "/Maison Noir – Reserve Gold.jpg",
    badge: "Auction Lot",
    notes: ["Honey", "Tangerine", "Velvet"],
    description:
      "Hand-numbered auction lot. 200 cups per harvest. Wrapped in 23k matte gold leaf detailing.",
    story:
      "The Reserve Gold is our most exclusive offering — a competition-grade Geisha from Boquete that scored 93 points at auction. Each sleeve is hand-numbered and finished with 23k matte gold leaf. Only 200 sleeves are produced per harvest.",
    brewTemp: "92°C",
    brewTime: "3:30 – 4:00",
    grindSize: "Medium-coarse",
    pairings: ["Champagne", "White peach", "Manchego"],
    images: ["/Maison Noir – Reserve Gold.jpg", "/Maison Noir – Dark Noir Edition.jpg", "/Maison Noir – Cream Edition.jpg"],
  },
};

export function getProductById(id: string): ProductDetail | undefined {
  const collectionItem = COLLECTION.find((p) => p.id === id);
  if (collectionItem) {
    const detail = COLLECTION_DETAILS[id];
    return {
      id: collectionItem.id,
      name: collectionItem.name,
      origin: collectionItem.origin,
      altitude: collectionItem.altitude,
      region: detail?.region ?? collectionItem.origin,
      farm: detail?.farm ?? "Direct trade",
      process: detail?.process ?? "Washed",
      roast: collectionItem.roast,
      price: collectionItem.price,
      image: collectionItem.image,
      badge: collectionItem.badge,
      notes: collectionItem.notes,
      description: detail?.description ?? "A premium single-origin coffee from our curated collection.",
      story: detail?.story ?? "Sourced directly from producers who share our dedication to quality.",
      brewTemp: detail?.brewTemp ?? "93°C",
      brewTime: detail?.brewTime ?? "3:00 – 3:30",
      grindSize: detail?.grindSize ?? "Medium",
      pairings: detail?.pairings ?? ["Dark chocolate", "Pastries"],
      images: detail?.images ?? [collectionItem.image, "/ANVUO.jpg", "/prkED.jpg"],
    };
  }

  return FEATURED_DETAILS[id];
}

export function getAllProducts(): ProductDetail[] {
  const collection = COLLECTION.map((p) => getProductById(p.id)).filter(Boolean) as ProductDetail[];
  const featured = Object.values(FEATURED_DETAILS);
  return [...collection, ...featured];
}

export function getRelatedProducts(id: string, count = 3): ProductDetail[] {
  const current = getProductById(id);
  if (!current) return [];
  const all = getAllProducts().filter((p) => p.id !== id);
  return all.slice(0, count);
}
