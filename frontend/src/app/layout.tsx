import type { Metadata } from "next";
import { Cinzel, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { CustomerAuthProvider } from "@/context/CustomerAuthContext";
import { SITE } from "@/data/menu";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${SITE.name} | ${SITE.shortName}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: `Stone-baked pizza, subs, wings, and pastas in Georgetown since ${SITE.established}. ${SITE.address.full}.`,
  openGraph: {
    title: `${SITE.name} / ${SITE.shortName}`,
    description:
      "Historic Georgetown landmark — eat well, drink well, live Royal.",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${cinzel.variable} ${sourceSerif.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-charcoal font-body">
        <CustomerAuthProvider>
          <CartProvider>
            <JsonLd />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-charcoal"
            >
              Skip to main content
            </a>
            <Header />
            <CartDrawer />
            <main id="main-content" className="pb-24 md:pb-0" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <MobileOrderBar />
          </CartProvider>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}
