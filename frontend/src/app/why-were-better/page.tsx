import { Hero } from "@/components/Hero";
import { WhyPageBody } from "@/components/why/WhyPageBody";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why We’re Better",
  description:
    "Local roots since 1973, stone-baked pizza, full-menu variety, and Georgetown-first service — Royal Pizza and Subs vs ordinary chain pizza.",
};

export default function WhyPage() {
  return (
    <>
      <Hero
        variant="inner"
        title="Where Quality Stays Consistent"
        subtitle="Authentic Italian-inspired food, made the same way every time. Just steady flavour and reliable results in every order."
      />
      <WhyPageBody />
    </>
  );
}
