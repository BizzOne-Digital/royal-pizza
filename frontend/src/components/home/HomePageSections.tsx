"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DealCard } from "@/components/DealCard";
import { HOME } from "@/data/site-content";
import { HOME_FEATURED_CATEGORIES, SITE } from "@/data/menu";
import { useDeals } from "@/lib/useDeals";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;


const CATEGORY_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  pizzas: { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", alt: "Fresh baked pizza" },
  subs: { src: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=600&q=80", alt: "Loaded toasted sub" },
  wings: { src: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80", alt: "Saucy chicken wings" },
  pastas: { src: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&q=80", alt: "Rich creamy pasta" },
  starters: { src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80", alt: "Starters and appetizers" },
  salads: { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", alt: "Fresh crisp salad" },
  garlic: { src: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=600&q=80", alt: "Oven-baked garlic bread" },
  drinks: { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", alt: "Cold soda drink" },
};

export function HomePageSections() {
  const { deals } = useDeals();
  const previewDeals = deals.slice(0, 4);
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
          {/* Food showcase photos — each tile links straight to its menu category */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {HOME_FEATURED_CATEGORIES.map((c, i) => {
              const photo = CATEGORY_IMAGE_MAP[c.id];
              return (
                <Reveal key={c.id} delay={0.05 * i}>
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.35, ease }}>
                    <Link
                      href={c.href}
                      className="card-lift block relative overflow-hidden rounded-lg border border-gold/25 bg-charcoal hover:border-gold/60"
                    >
                      <div className="relative aspect-square">
                        {photo && (
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
                        <span className="absolute bottom-3 left-3 font-display text-sm text-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                          {c.label}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
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
                  href={SITE.orderingEnabled ? SITE.orderUrl : SITE.phones[0].href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="ribbon-red rounded-md py-3 text-center font-semibold text-cream"
                >
                  {SITE.orderingEnabled ? "Order Now" : "Call Now to Order"}
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="block rounded-md border-2 border-gold py-3 text-center font-semibold text-gold hover:bg-gold/10"
                  >
                    Contact & directions
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