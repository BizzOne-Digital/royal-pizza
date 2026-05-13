"use client";

import type { WhySection } from "@/data/menu";
import { motion } from "framer-motion";

export function WhyBetterCard({ section }: { section: WhySection }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 18px 45px rgba(0,0,0,0.45), 0 0 36px rgba(201,154,58,0.12)",
      }}
      className="card-lift border-gold-double rounded-lg bg-charcoal/85 p-6 shadow-lg"
    >
      <h3 className="font-display text-xl text-gold">{section.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/85 md:text-base">
        {section.body}
      </p>
    </motion.article>
  );
}
