"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/menu";

const ease = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  variant?: "home" | "inner";
  title?: string;
  subtitle?: string;
  bgImage?: string;
  bgAlt?: string;
};

export function Hero({
  variant = "home",
  title,
  subtitle,
  bgImage,
  bgAlt = "Background",
}: HeroProps) {
  if (variant === "inner") {
    return (
      <section className="relative overflow-hidden border-b border-gold/20" style={{ minHeight: 320 }}>
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgImage ?? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"}
            alt={bgAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* layered overlays — heavy bottom + left so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
          {/* subtle gold shimmer */}
          <div className="absolute inset-0 bg-gold-shine opacity-20" />
        </div>

        {/* Animated glow orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-royal-red/20 blur-3xl"
          animate={{ opacity: [0.15, 0.35, 0.15], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* eyebrow tag */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/80"
          >
            Royal Pizzeria & Bar — Georgetown since {SITE.established}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-4 font-display text-4xl font-semibold tracking-wide text-cream text-engraved md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease }}
              className="mt-4 max-w-2xl text-base text-cream/80 md:text-lg leading-relaxed"
            >
              {subtitle}
            </motion.p>
          ) : null}

          {/* gold shimmer rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease }}
            className="mt-8 h-px max-w-sm origin-left exotic-shimmer-line"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-gold/25 flex items-center">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="https://i.postimg.cc/pr3MMxZS/Chat-GPT-Image-May-13-2026-10-10-54-AM.png"
          alt="Royal Pizzeria and Bar interior"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/80 to-charcoal/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
        <div className="absolute inset-0 bg-gold-shine opacity-30" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[5%] top-[25%] h-48 w-48 rounded-full bg-gold/15 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] bottom-[20%] h-64 w-64 rounded-full bg-royal-red/15 blur-3xl"
        animate={{ y: [0, 16, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/90"
          >
            Homemade taste, Georgetown proud  | since {SITE.established}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="mt-5 font-display text-4xl font-semibold leading-tight tracking-wide text-cream text-engraved md:text-5xl lg:text-6xl"
          >
            A Legacy of Great Taste Built on Flavour and Quality
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="mt-5 max-w-xl text-base text-cream/85 md:text-lg leading-relaxed"
          >
            Real food, made to order. Pizzas, subs, wings, pastas 
             the kind of meal Georgetown keeps coming back for.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a
              href={SITE.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(201,154,58,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="ribbon-red inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Order Now
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-md border-2 border-gold bg-transparent px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                View Menu
              </Link>
            </motion.div>
            <motion.a
              href={SITE.phones[0].href}
              whileHover={{ scale: 1.03, borderColor: "rgba(201,154,58,0.7)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-md border border-cream/25 px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Call Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}