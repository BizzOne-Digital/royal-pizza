"use client";

import { motion } from "framer-motion";
import { DealCard } from "@/components/DealCard";
import { Reveal } from "@/components/motion/Reveal";
import { DEALS } from "@/data/site-content";
import { SITE } from "@/data/menu";
import { useDeals } from "@/lib/useDeals";

const STATIC_BUNDLE_IDS = ["d2s", "d2m", "d2l", "d2j", "d2p"];

export function PizzaDealsPageBody() {
  const { deals, source } = useDeals();

  const bundleDeals = deals.filter((d) =>
    source === "api" ? d.group === "bundle" : STATIC_BUNDLE_IDS.includes(d.id)
  );
  const weekdayDeals = deals.filter((d) => source === "api" && d.group === "weekday");
  const comboDeals = deals.filter((d) =>
    source === "api"
      ? d.group === "combo"
      : !STATIC_BUNDLE_IDS.includes(d.id)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      {/* Intro */}
      <Reveal>
        <h2 className="font-display text-2xl text-gold md:text-3xl">{DEALS.introTitle}</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-cream/80">
          {DEALS.introParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      {/* Weekday Specials Section */}
      {weekdayDeals.length > 0 && (
        <Reveal className="mt-14" delay={0.04}>
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-display text-xl text-cream">Weekday Specials</h3>
            <div className="h-px flex-1 bg-gold/25" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {weekdayDeals.map((d, i) => (
              <Reveal key={d.id} delay={0.04 * (i % 3)}>
                <DealCard deal={d} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      )}

      {/* Pizza Bundles Section */}
      <Reveal className="mt-14" delay={0.04}>
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-display text-xl text-cream">Pizza Bundles</h3>
          <div className="h-px flex-1 bg-gold/25" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bundleDeals.map((d, i) => (
            <Reveal key={d.id} delay={0.04 * (i % 3)}>
              <DealCard deal={d} />
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Combo Deals Section */}
      <Reveal className="mt-14" delay={0.04}>
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-display text-xl text-cream">Royal Combo Deals</h3>
          <div className="h-px flex-1 bg-gold/25" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {comboDeals.map((d, i) => (
            <Reveal key={d.id} delay={0.04 * (i % 3)}>
              <DealCard deal={d} />
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Ordering & Flexibility */}
      <Reveal className="mt-14" delay={0.06}>
        <div className="rounded-lg border border-gold/20 bg-charcoal/40 p-6">
          <h3 className="font-display text-xl text-cream">{DEALS.policyTitle}</h3>
          <ul className="mt-4 max-w-3xl list-inside list-disc space-y-2 text-sm text-cream/75">
            {DEALS.policyBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Bottom CTA */}
      <div className="mb-4 mt-10 flex flex-wrap items-center justify-between gap-4">
        <Reveal className="max-w-2xl text-sm text-cream/75">
          Prices and offers may change — confirm when you order online or by phone. Our
          crew can suggest the cleanest swap if an item is temporarily unavailable.
        </Reveal>
        <motion.a
          href={SITE.orderUrl}
          whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(201,154,58,0.3)" }}
          whileTap={{ scale: 0.97 }}
          className="ribbon-red rounded-md px-6 py-3 text-sm font-semibold text-cream"
        >
          Order deals online
        </motion.a>
      </div>

    </div>
  );
}
