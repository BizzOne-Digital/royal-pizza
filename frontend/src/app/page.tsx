import { Hero } from "@/components/Hero";
import { HomePageSections } from "@/components/home/HomePageSections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The Royal Pizzeria and Bar — stone-baked pizza, subs, wings, and local favourites on Guelph Street, Georgetown since 1973.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomePageSections />
    </>
  );
}
