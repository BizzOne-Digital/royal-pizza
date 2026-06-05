"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DealCard } from "@/components/DealCard";
import { HOME } from "@/data/site-content";
import { HOME_FEATURED_CATEGORIES, PIZZA_DEALS, SITE } from "@/data/menu";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── FOOD DOODLE SVGs ────────────────────────────────────────────────────── */
function DoodlePizza() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 2" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Slice lines */}
      <line x1="100" y1="28" x2="100" y2="172" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <line x1="28" y1="100" x2="172" y2="100" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <line x1="49" y1="49" x2="151" y2="151" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <line x1="151" y1="49" x2="49" y2="151" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      {/* Pepperoni */}
      <circle cx="80" cy="72" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="120" cy="85" r="7" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="90" cy="115" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="115" cy="128" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="75" cy="95" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="130" cy="108" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      {/* Mushroom */}
      <path d="M108 62c3-6 12-6 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="115" y1="62" x2="115" y2="70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Steam */}
      <path d="M85 22c0-4 4-6 4-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M100 18c0-4 4-6 4-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M115 22c0-4 4-6 4-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function DoodleSub() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bread top */}
      <path d="M30 105c0 0 10-40 70-40s70 40 70 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.06" />
      {/* Bread bottom */}
      <path d="M30 110c0 0 10 35 70 35s70-35 70-35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.06" />
      {/* Fillings */}
      <path d="M38 105c5 3 12-2 20 2s15-3 22 1 14-2 20 2 16-3 22 1 14-2 18 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Lettuce wave */}
      <path d="M35 100c8-6 16 4 24-3s16 5 24-2 16 4 24-3 16 5 22-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* Sesame seeds */}
      <ellipse cx="60" cy="82" rx="3" ry="1.5" transform="rotate(-20 60 82)" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="90" cy="74" rx="3" ry="1.5" transform="rotate(15 90 74)" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="120" cy="78" rx="3" ry="1.5" transform="rotate(-10 120 78)" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="140" cy="84" rx="3" ry="1.5" transform="rotate(20 140 84)" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      {/* Steam */}
      <path d="M80 55c-2-8 6-10 4-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M100 50c-2-8 6-10 4-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M120 55c-2-8 6-10 4-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function DoodleWings() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Wing 1 */}
      <path d="M55 90c-8-20 5-35 25-30 15 4 20 18 15 32-3 10-12 16-22 14s-15-8-18-16z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M50 95c-5 2-12 8-15 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Wing 2 */}
      <path d="M110 85c-5-22 10-38 30-30 14 6 17 22 10 35-5 10-15 14-24 10s-13-8-16-15z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M108 92c-4 3-8 10-8 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Sauce drops */}
      <circle cx="75" cy="130" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="90" cy="138" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="120" cy="132" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      {/* Heat lines */}
      <path d="M70 52c0-5 4-7 3-12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M95 48c0-5 4-7 3-12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M125 52c0-5 4-7 3-12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Fire icon */}
      <path d="M155 70c-3-8 2-15 8-12 4 2 5 8 2 13s-6 6-8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DoodlePasta() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bowl */}
      <path d="M35 105c0 0 8 55 65 55s65-55 65-55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.05" />
      <path d="M30 105h140" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bowl base */}
      <path d="M75 160c0 5 10 10 25 10s25-5 25-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Spaghetti swirls */}
      <path d="M55 95c10-15 25-5 35-18s25 5 35-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M60 100c12-10 20 2 32-10s22 5 30-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M65 90c8-12 18-2 28-14s20 3 28-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Fork */}
      <line x1="130" y1="45" x2="110" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="47" x2="115" y2="72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="45" x2="118" y2="70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="135" y1="43" x2="121" y2="68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Steam */}
      <path d="M75 68c-2-8 5-10 3-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M95 62c-2-8 5-10 3-18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function DoodleGarlicBread() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bread slices */}
      <rect x="40" y="70" width="45" height="65" rx="8" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.06" transform="rotate(-8 62 102)" />
      <rect x="80" y="68" width="45" height="65" rx="8" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.06" transform="rotate(4 102 100)" />
      <rect x="115" y="72" width="45" height="65" rx="8" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.06" transform="rotate(12 137 104)" />
      {/* Cheese drizzle */}
      <path d="M50 85c3 5 8 2 12 6s7-1 10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M90 82c3 5 8 2 12 6s7-1 10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M125 88c3 5 8 2 12 6s7-1 10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Herb flecks */}
      <circle cx="55" cy="95" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="70" cy="105" r="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="95" cy="92" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="110" cy="108" r="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="132" cy="98" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="148" cy="112" r="1.5" fill="currentColor" fillOpacity="0.2" />
      {/* Steam */}
      <path d="M65 58c-1-6 4-8 3-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M100 55c-1-6 4-8 3-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M138 60c-1-6 4-8 3-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function DoodleSalad() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bowl */}
      <path d="M35 100c0 0 8 55 65 55s65-55 65-55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.05" />
      <ellipse cx="100" cy="100" rx="70" ry="12" stroke="currentColor" strokeWidth="2.5" />
      {/* Leaves */}
      <path d="M55 88c10-20 25-15 20 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M80 82c12-18 28-12 22 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M110 86c10-20 25-15 18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      {/* Tomato */}
      <circle cx="72" cy="78" r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12" />
      <line x1="72" y1="70" x2="72" y2="74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Olive */}
      <circle cx="120" cy="80" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="120" cy="80" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Onion rings */}
      <circle cx="95" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="95" cy="74" r="3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Feta cubes */}
      <rect x="130" y="75" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="58" y="82" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function DoodleSides() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Fries container */}
      <path d="M55 160l10-75h70l10 75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.05" />
      {/* Fries sticks */}
      <rect x="72" y="55" width="6" height="45" rx="2" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" transform="rotate(-5 75 77)" />
      <rect x="84" y="50" width="6" height="48" rx="2" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" transform="rotate(3 87 74)" />
      <rect x="96" y="52" width="6" height="46" rx="2" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" transform="rotate(-2 99 75)" />
      <rect x="108" y="48" width="6" height="50" rx="2" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" transform="rotate(6 111 73)" />
      <rect x="118" y="55" width="6" height="42" rx="2" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" transform="rotate(-4 121 76)" />
      {/* Brownie / dessert small */}
      <rect x="148" y="130" width="25" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M152 135c3 2 6-1 9 2s6-1 8 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Steam */}
      <path d="M88 38c-1-6 4-7 3-13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M105 35c-1-6 4-7 3-13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function DoodleDrinks() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Glass */}
      <path d="M60 55l8 100h64l8-100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.05" />
      {/* Liquid level */}
      <path d="M64 75h72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Bubbles */}
      <circle cx="85" cy="100" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="110" cy="115" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <circle cx="95" cy="130" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="115" cy="90" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="80" cy="125" r="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* Straw */}
      <line x1="118" y1="30" x2="108" y2="100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Ice cubes */}
      <rect x="78" y="82" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.35" transform="rotate(10 84 87)" />
      <rect x="100" y="95" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.35" transform="rotate(-8 106 100)" />
      {/* Lemon wedge */}
      <path d="M128 52c8-3 14 4 10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="128" y1="52" x2="138" y2="64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

const DOODLE_MAP: Record<string, React.FC> = {
  "Authentic Pizzas": DoodlePizza,
  "Toasted Subs & Rolls": DoodleSub,
  "Saucy Wings": DoodleWings,
  "Creamy Pastas": DoodlePasta,
  "Oven-Baked Garlic Breads": DoodleGarlicBread,
  "Fresh Bowls of salads": DoodleSalad,
  "Sides & desserts": DoodleSides,
  "Drinks": DoodleDrinks,
};

const FOOD_ITEMS = [
  { label: "Authentic Pizzas" },
  { label: "Toasted Subs & Rolls" },
  { label: "Saucy Wings" },
  { label: "Creamy Pastas" },
  { label: "Oven-Baked Garlic Breads" },
  { label: "Fresh Bowls of salads" },
  { label: "Sides & desserts" },
  { label: "Drinks" },
];

export function HomePageSections() {
  const previewDeals = PIZZA_DEALS.slice(0, 4);
  return (
    <>
      <section className="border-b border-gold/15 bg-parchment-light py-16 text-umber">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
           
            <h2 className="mt-8 font-display text-3xl text-charcoal md:text-4xl">
              Authentic Italian-Inspired Preparation
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-umber/90 md:text-lg">
              {HOME.heritageBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl text-gold md:text-4xl">
              {HOME.experienceTitle}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-cream/80">
              {HOME.experienceBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>
        
          <Reveal className="mt-10" delay={0.12}>
            <h3 className="font-display text-xl text-gold">What sets us apart?</h3>
            <ul className="mt-4 space-y-2 text-cream/80">
              {HOME.craftExpectPoints.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-parchment-map py-16">
        <div className="mx-auto max-w-6xl px-4">
         <Reveal className="mt-8" delay={0.08}>
  <h3 className="font-display text-xl text-gold">
    Why people always choose us
  </h3>

  <ul className="mt-4 space-y-2 text-cream/80">
    {HOME.nightHighlights.map((item) => (
      <li key={item} className="flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
        {item}
      </li>
    ))}
  </ul>
</Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HOME.quotes.map((q, i) => (
              <Reveal key={q.attribution} delay={0.06 * i}>
                <motion.blockquote
                  whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
                  className="card-lift h-full rounded-lg border border-gold/25 bg-charcoal/75 p-6 shadow-lg"
                >
                  <p className="text-sm italic leading-relaxed text-cream/90">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <footer className="mt-4 font-display text-xs uppercase tracking-widest text-gold/90">
                    — {q.attribution}
                  </footer>
                </motion.blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl text-gold md:text-4xl">
              Royal favourites
            </h2>
            <p className="mt-3 max-w-3xl text-cream/70">{HOME.favouritesSub}</p>
          </Reveal>
          {/* Food showcase doodles */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FOOD_ITEMS.map((item, i) => {
              const Doodle = DOODLE_MAP[item.label];
              return (
                <Reveal key={item.label} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.35, ease }}
                    className="relative overflow-hidden rounded-lg border border-gold/25 bg-gradient-to-b from-charcoal/60 to-[#1a1710]"
                  >
                    <div className="relative aspect-square flex items-center justify-center p-6 text-gold/50">
                      {Doodle && <Doodle />}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 font-display text-sm text-gold">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_FEATURED_CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={0.05 * i}>
                <motion.li whileHover={{ y: -4 }} transition={{ duration: 0.35, ease }}>
                  <Link
                    href={c.href}
                    className="card-lift block rounded-lg border border-gold/30 bg-charcoal/80 p-5 font-display text-lg text-cream shadow-md hover:border-gold hover:text-gold"
                  >
                    {c.label}
                  </Link>
                </motion.li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-parchment-map py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl text-cream md:text-4xl">
                Pickup deals
              </h2>
              <p className="mt-2 max-w-xl text-cream/70">{HOME.dealsSub}</p>
            </Reveal>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pizza-deals"
                className="inline-block rounded-md border-2 border-gold px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10"
              >
                View all deals
              </Link>
            </motion.div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {previewDeals.map((d, i) => (
              <Reveal key={d.id} delay={0.06 * i}>
                <DealCard deal={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gold/20 bg-charcoal py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl text-gold md:text-4xl">
              Why locals choose Royal
            </h2>
            <p className="mt-3 max-w-3xl text-cream/75">{HOME.whySub}</p>
          </Reveal>
          <Reveal className="mt-8" delay={0.06}>
            <ul className="space-y-2 text-cream/80">
              {HOME.whyLocalsBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/why-were-better"
              className="inline-flex rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/10"
            >
              See why we&apos;re different
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-parchment-map py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="grid gap-10 rounded-lg border border-gold/30 bg-charcoal/85 p-8 shadow-[0_0_80px_rgba(201,154,58,0.12)] md:grid-cols-2 md:p-10">
              <div>
                <h2 className="font-display text-3xl text-gold">Visit Royal Pizzeria and Bar</h2>
                <p className="mt-4 text-cream/85">{SITE.address.full}</p>
                
                <div className="mt-6 flex flex-col gap-2 text-sm">
                  {SITE.phones.map((p) => (
                    <motion.a
                      key={p.href}
                      href={p.href}
                      whileHover={{ x: 4, color: "#c99a3a" }}
                      className="text-gold"
                    >
                      {p.display}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <motion.a
                  href={SITE.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="ribbon-red rounded-md py-3 text-center font-semibold text-cream"
                >
                  Order Now
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="block rounded-md border-2 border-gold py-3 text-center font-semibold text-gold hover:bg-gold/10"
                  >
                    Contact & directionss
                  </Link>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}