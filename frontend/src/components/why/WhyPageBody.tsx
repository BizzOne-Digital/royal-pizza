"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WhyBetterCard } from "@/components/WhyBetterCard";
import { Reveal } from "@/components/motion/Reveal";
import { WHY_EXTRA } from "@/data/site-content";
import { COMPARISON_ROWS, SITE, WHY_SECTIONS } from "@/data/menu";

export function WhyPageBody() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
     <Reveal>
  <div className="max-w-3xl">
    
    <h2 className="font-display text-2xl text-gold md:text-3xl">
  Built on Taste, Not Trends
</h2>

    <div className="mt-4 space-y-4 text-cream/80">
      {WHY_EXTRA.introParas.map((p, i) => (
        <p key={i} className="text-base md:text-lg">
          {p}
        </p>
      ))}
    </div>

  </div>
</Reveal>

      <Reveal className="mt-12" delay={0.05}>
        <h2 className="font-display text-2xl text-gold md:text-3xl">
          {WHY_EXTRA.promiseTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-cream/80">{WHY_EXTRA.promiseBody}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {WHY_SECTIONS.map((s, i) => (
          <Reveal key={s.id} delay={0.04 * (i % 4)}>
            <WhyBetterCard section={s} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
  <h2 className="font-display text-2xl text-gold md:text-3xl">
    Royal Pizza and Subs vs ordinary chain pizza
  </h2>

  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mt-6 overflow-x-auto rounded-lg border border-gold/25 bg-charcoal/80"
  >
    <table className="min-w-full text-left text-sm text-cream">
      <thead className="border-b border-gold/25 bg-umber/50">
        <tr>
          {/* YE 3 HEADINGS ADD KI HAIN */}
          <th className="px-4 py-3 font-display text-gold">
            When you order...
          </th>

          <th className="px-4 py-3 font-display text-gold">
            At The Royal
          </th>

          <th className="px-4 py-3 font-display text-cream/70">
            At other Pizzerias
          </th>
        </tr>
      </thead>

      <tbody>
        {COMPARISON_ROWS.map((row, i) => (
          <motion.tr
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
            className="border-b border-gold/10 align-top"
          >
            {/* LEFT LABEL COLUMN */}
            <td className="px-4 py-4 text-cream/90">
              {[
                "Your first bite",
                "Your options",
                "Feeding a group",
                "Customizing",
                "The experience",
              ][i]}
            </td>

            {/* ROYAL */}
            <td className="px-4 py-4 text-cream/90">
              {row.royal}
            </td>

            {/* OTHER */}
            <td className="px-4 py-4 text-cream/60">
              {row.chain}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
</Reveal>

      <Reveal className="mt-14 text-center">
        <p className="font-display text-2xl text-cream md:text-3xl">
          Taste the Royal difference
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <motion.a
            href={SITE.orderUrl}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="ribbon-red rounded-md px-8 py-3 font-semibold text-cream"
          >
            Order Now
          </motion.a>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/menu"
              className="inline-block rounded-md border-2 border-gold px-8 py-3 font-semibold text-gold hover:bg-gold/10"
            >
              Browse the menu
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
}
