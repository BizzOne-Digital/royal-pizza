"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT } from "@/data/site-content";
import { SITE } from "@/data/menu";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutPageBody() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,300px)]">
        <div className="space-y-8 text-cream/85">
          <Reveal>
  <div className="space-y-5">

    {/* HEADING */}
    <h2 className="font-display text-2xl text-gold md:text-3xl">
      Since 1973 | Five Decades on the Map
    </h2>

    <p>
      There are places you try once, and there are places that quietly become
      part of your routine.
    </p>

    <p>
      The Royal Pizzeria and Bar is the second kind. For decades, it’s been
      where evenings naturally land, the smell of fresh pizza in the air, the
      sound of familiar conversations, the comfort of knowing exactly what
      you’re getting before you even walk in.
    </p>

    <p>
      A quick stop that turns into staying a little longer. A simple meal that
      feels like more than just food.
    </p>

    <p>
      What’s kept it that way isn’t reinvention; it’s consistency. The kind you
      can taste. Recipes that haven’t lost their soul, portions that still feel
      generous, and a kitchen that cooks with intention, not shortcuts.
    </p>

    <p>
      The menu speaks in comfort, pizzas with that unmistakable oven-fresh
      bite, hearty classics that fill the table, wings that carry real flavour,
      and sides that round everything out the way a proper meal should.
    </p>

    <p>
      It’s the kind of food that fits into real life, after long days, busy
      nights, game evenings, and last-minute plans that somehow always work out
      here.
    </p>

    {/* SECOND HEADING */}
    <h2 className="pt-6 font-display text-2xl text-gold md:text-3xl">
      Still Here, Still The Same Where It Matters
    </h2>

    <p>
      Georgetown has changed in all the ways towns do. New faces, new places,
      new pace. But inside The Royal, the core never shifted:
    </p>

    <ul className="space-y-2 pl-5 text-cream/80">
      <li>• Food that feels familiar the moment it arrives</li>
      <li>• A place that doesn’t need explaining</li>
      <li>• A standard that doesn’t depend on the day</li>
    </ul>

    <p>
      Because when you’ve been feeding a community this long, you’re not just
      serving meals anymore, you’re part of people’s everyday lives.
    </p>

  </div>
</Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display text-2xl text-gold md:text-3xl">
              {ABOUT.timelineTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-cream/80">{ABOUT.timelineIntro}</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {ABOUT.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.08 * i}>
                <motion.article
                  whileHover={{
  y: -6,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}}
                  className="card-lift h-full rounded-lg border border-gold/25 bg-charcoal/70 p-5 shadow-lg"
                >
                  <h3 className="font-display text-lg text-gold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">{pillar.body}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display text-2xl text-gold">{ABOUT.communityTitle}</h2>
            <div className="mt-4 max-w-3xl space-y-4 text-cream/80">
              {ABOUT.communityBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="max-w-3xl border-l-2 border-gold/50 pl-5 text-lg italic text-cream/90">
              {ABOUT.closing}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/menu"
                  className="ribbon-red inline-block rounded-md px-6 py-2.5 text-sm font-semibold text-cream"
                >
                  View menu
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-block rounded-md border border-gold/40 px-6 py-2.5 text-sm text-gold hover:bg-gold/10"
                >
                  Visit us
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <Reveal className="flex justify-center md:justify-end" delay={0.1}>
          <motion.div
            className="relative aspect-square w-full max-w-[280px]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-full border-gold-double bg-charcoal/60 shadow-[0_0_50px_rgba(201,154,58,0.2)]" />
            <Image
              src="/assets/royal-logo.png"
              alt={`${SITE.name} seal`}
              fill
              className="object-contain p-6"
              sizes="280px"
            />
          </motion.div>
        </Reveal>
      </div>
    </div>
  );
}
