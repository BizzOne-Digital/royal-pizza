"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DealCard } from "@/components/DealCard";
import { HOME } from "@/data/site-content";
import { HOME_FEATURED_CATEGORIES, PIZZA_DEALS, SITE } from "@/data/menu";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

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
                    “{q.quote}”
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
          {/* Food showcase images */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", label: "Authentic Pizzas" },
              { src: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80", label: "Toasted Subs & Rolls" },
              { src: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80", label: "Saucy Wings" },
              { src: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&q=80", label: "Creamy Pastas" },
               { src: "https://images.unsplash.com/photo-1587676353811-1708ddf47031?q=80&w=657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Oven-Baked Garlic Breads" },
              { src: "https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Fresh Bowls of salads" },
              { src: "https://images.unsplash.com/photo-1574782256582-a705e799cdeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Sides & desserts" },
              { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Drinks" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative overflow-hidden rounded-lg border border-gold/25"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 font-display text-sm text-gold">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
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
              See why we’re different
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
