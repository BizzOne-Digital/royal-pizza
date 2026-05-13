"use client";

import type { PizzaDeal } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { motion } from "framer-motion";
import Image from "next/image";

export function DealCard({ deal }: { deal: PizzaDeal }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(201,154,58,0.15)",
      }}
      className="card-lift bg-parchment-light overflow-hidden rounded-lg border border-umber/30 shadow-md text-umber"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={deal.image}
          alt={deal.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* dark gradient so badge + price are readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

        {/* Badge top-left */}
        {deal.badge && (
          <span className="absolute left-3 top-3 rounded bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-charcoal shadow">
            {deal.badge}
          </span>
        )}

        {/* Price bottom-right over image */}
        <motion.p
          layout
          className="absolute bottom-3 right-3 rounded border border-gold/60 bg-charcoal/80 px-3 py-1 text-lg font-bold text-gold backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          {formatCurrency(deal.price)}
        </motion.p>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="font-display text-xl text-charcoal">{deal.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-umber/90">{deal.description}</p>
      </div>
    </motion.article>
  );
}
