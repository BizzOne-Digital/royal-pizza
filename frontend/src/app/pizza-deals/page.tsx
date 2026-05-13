import { Hero } from "@/components/Hero";
import { PizzaDealsPageBody } from "@/components/pizza-deals/PizzaDealsPageBody";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizza Deals",
  description:
    "Pickup specials and family bundles — 2-pizza deals, Royal Game Special, wings combos, and more at The Royal Pizzeria and Bar.",
};

export default function PizzaDealsPage() {
  return (
    <>
      <Hero
        variant="inner"
        title="Pizza deals & specials"
        subtitle="Pickup bundles crafted for families, teams, and celebrations — always made fresh in Georgetown."
      />
      <PizzaDealsPageBody />
    </>
  );
}
