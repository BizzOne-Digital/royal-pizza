import { Hero } from "@/components/Hero";
import { MenuPageClient } from "@/components/MenuPageClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full menu — specialty pizzas, build your own, subs, pastas, garlic breads, wings, salads, sides, desserts, drinks, and dips at The Royal Pizzeria and Bar, Georgetown.",
};

export default function MenuPage() {
  return (
    <>
      <Hero
        variant="inner"
        title="Our Menu"
        subtitle="Stone-baked pizzas, loaded subs, saucy wings, rich pastas, and more — filter by category or search to plan your perfect pickup."
        bgImage="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80"
        bgAlt="Royal Pizzeria and Bar kitchen and food spread"
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-16 text-center text-cream/70">
            Loading menu…
          </div>
        }
      >
        <MenuPageClient />
      </Suspense>
    </>
  );
}
