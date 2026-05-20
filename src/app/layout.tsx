import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { OrderProvider } from "@/contexts/order-context";
import { ToastProvider } from "@/contexts/toast-context";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider-wrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bodrin.coffee"),
  title: {
    default: "BODRIN — Crafted Coffee, Cinematic Experience",
    template: "%s · BODRIN",
  },
  description:
    "Discover the supreme taste in every sip. BODRIN is a premium coffee atelier — single-origin beans, slow-roasted craft, and a cinematic ritual.",
  keywords: [
    "luxury coffee",
    "premium coffee",
    "specialty coffee",
    "single origin",
    "BODRIN",
    "craft coffee",
  ],
  openGraph: {
    type: "website",
    title: "BODRIN — Crafted Coffee, Cinematic Experience",
    description:
      "Discover the supreme taste in every sip. BODRIN is a premium coffee atelier — single-origin beans, slow-roasted craft, and a cinematic ritual.",
    siteName: "BODRIN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BODRIN — Crafted Coffee, Cinematic Experience" }],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "BODRIN — Crafted Coffee",
    description: "Premium single-origin coffee. Cinematic ritual.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0a08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html
        lang="en"
        className={`${inter.variable} ${playfair.variable}`}
        suppressHydrationWarning
      >
        <body>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-espresso focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <ToastProvider>
            <OrderProvider>
              <WishlistProvider>
                <CartProvider>
                  <LenisProvider>{children}</LenisProvider>
                </CartProvider>
              </WishlistProvider>
            </OrderProvider>
          </ToastProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
