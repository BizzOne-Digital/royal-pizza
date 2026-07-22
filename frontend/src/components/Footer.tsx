"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/data/menu";
import { Reveal } from "@/components/motion/Reveal";

const quick = [
  { href: "/menu", label: "Menu" },
  { href: "/pizza-deals", label: "Pizza Deals" },
  { href: "/why-were-better", label: "Why We’re Better" },
  { href: "/contact", label: "Visit Us" },
];

const linkMotion = {
  whileHover: { x: 4 },
  transition: { type: "spring" as const, stiffness: 400, damping: 28 },
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-gold/25 bg-charcoal">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-royal-red/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ scaleX: 0.3, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-0 h-px max-w-6xl origin-center exotic-shimmer-line"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <Reveal delay={0}>
          <motion.p
            className="font-display text-lg text-gold"
            whileHover={{ letterSpacing: "0.04em" }}
            transition={{ duration: 0.35 }}
          >
            Visit the Royal
          </motion.p>
          <p className="mt-2 text-sm text-cream/90">{SITE.address.full}</p>
          <div className="mt-2 text-sm text-cream/80">
            <span className="text-gold/90">Hours:</span>
            <ul className="mt-1 space-y-0.5">
              {SITE.hoursDetailed.map((h) => (
                <li key={h.day} className="flex gap-2">
                  <span className="w-24 shrink-0 text-cream/50">{h.day}</span>
                  <span>{h.open} – {h.close}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display text-lg text-gold">Call us</p>
          <ul className="mt-2 space-y-2 text-sm">
            {SITE.phones.map((p) => (
              <li key={p.href}>
                <motion.a
                  href={p.href}
                  className="inline-block text-cream underline-offset-4 hover:underline"
                  {...linkMotion}
                >
                  {p.display}
                </motion.a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="font-display text-lg text-gold">Quick links</p>
          <ul className="mt-2 space-y-2 text-sm">
            {quick.map((q) => (
              <li key={q.href}>
                <motion.div {...linkMotion}>
                  <Link
                    href={q.href}
                    className="inline-block text-cream/90 underline-offset-4 hover:underline"
                  >
                    {q.label}
                  </Link>
                </motion.div>
              </li>
            ))}
            <li>
              <motion.a
                href={SITE.orderUrl}
                className="inline-block text-cream/90 underline-offset-4 hover:underline"
                {...linkMotion}
              >
                Order online
              </motion.a>
            </li>
          </ul>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative border-t border-gold/15 py-4 text-center text-xs text-cream/55"
      >
        © {year} {SITE.name} / {SITE.shortName}. All rights reserved.
      </motion.div>
    </footer>
  );
}