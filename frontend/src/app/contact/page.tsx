import { ContactPageBody } from "@/components/contact/ContactPageBody";
import { Hero } from "@/components/Hero";
import { SITE } from "@/data/menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact / Visit Us",
  description: `Visit ${SITE.name} at ${SITE.address.full}. Hours ${SITE.hours}. Call (905) 877-2277 or (905) 877-2278.`,
};

export default function ContactPage() {
  return (
    <>
      <Hero
        variant="inner"
        title="Contact & visit"
        subtitle="You’ll find us right on Guelph Street;  no detours, no confusion.
 Place your order online in advance or just give us a call, and we’ll have it ready when you arrive......Simple, quick, and always open for your next meal"
      />
      <ContactPageBody />
    </>
  );
}
