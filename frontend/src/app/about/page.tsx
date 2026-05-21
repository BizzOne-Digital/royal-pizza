import { Hero } from "@/components/Hero";
import { SITE } from "@/data/menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name} — serving Georgetown on Guelph Street since ${SITE.established}.`,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        variant="inner"
        title="Our story"
        subtitle="Not built to impress once, built to be chosen again. What started with honest recipes and real flavour grew into a Georgetown staple people rely on.
 The kind of place where the food doesn’t need explaining; it shows up hot, full, and exactly how it should be."
<<<<<<< HEAD
         bgImage="https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?q=80"
=======
 bgImage="https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?q=80"
>>>>>>> a26a227 (menuupdate)
      />
      <AboutPageBody />
    </>
  );
}
