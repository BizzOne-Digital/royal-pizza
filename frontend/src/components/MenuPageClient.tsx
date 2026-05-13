"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BEVERAGES_LIST,
  BUILD_YOUR_OWN_TIERS,
  BYO_EXTRAS,
  BYO_TOPPINGS,
  DESSERTS,
  DIPS_LIST,
  GARLIC_BREADS,
  MENU_CATEGORY_TABS,
  type MenuCategoryId,
  PASTA_EXTRAS,
  PASTAS,
  PIZZA_SIZE_LEGEND,
  SALADS,
  SIDES,
  SPECIALTY_PIZZAS,
  SUBS,
  SUB_EXTRAS,
  WING_SAUCES,
  WINGS,
} from "@/data/menu";
import { MENU_INTRO } from "@/data/site-content";
import { CategoryTabs } from "./CategoryTabs";
import { SimpleItemCard, SpecialtyPizzaCard } from "./MenuCard";

const panelTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  pizzas: {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&q=80",
    alt: "Fresh baked specialty pizza",
  },
  "build-your-own": {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=80",
    alt: "Build your own pizza toppings",
  },
  subs: {
    src: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=1400&q=80",
    alt: "Loaded toasted sub sandwich",
  },
  pastas: {
    src: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1400&q=80",
    alt: "Rich creamy pasta dish",
  },
  "garlic-breads": {
    src: "https://images.unsplash.com/photo-1619531040576-f9416740661f?w=1400&q=80",
    alt: "Golden oven-baked garlic bread",
  },
  wings: {
    src: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1400&q=80",
    alt: "Saucy crispy chicken wings",
  },
  salads: {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=80",
    alt: "Fresh crisp salad bowl",
  },
  sides: {
    src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=1400&q=80",
    alt: "Assorted sides and dips",
  },
  desserts: {
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1400&q=80",
    alt: "Delicious desserts",
  },
  "drinks-dips": {
    src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1400&q=80",
    alt: "Cold drinks and dipping sauces",
  },
};

const CATEGORY_TAGLINES: Record<string, string> = {
  pizzas: "Stone-baked to perfection — crisp where it counts, soft where it matters.",
  "build-your-own": "Your crust. Your sauce. Your toppings. Built your way.",
  subs: "Loaded, toasted, and dressed like a main course.",
  pastas: "Baked until the cheese sings — rich, hearty, and deeply satisfying.",
  "garlic-breads": "Kissed with butter and herbs — golden right out of the oven.",
  wings: "Sauced to order. Every bite packs a punch.",
  salads: "Fresh, crisp bowls that actually fill you up.",
  sides: "The perfect companions — never an afterthought.",
  desserts: "Finish it right. Sweet notes to close the feast.",
  "drinks-dips": "Cold drinks and bold dips to round out every order.",
};

function matches(q: string, ...parts: (string | undefined)[]) {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  return parts.some((p) => (p ?? "").toLowerCase().includes(needle));
}

function CategoryHero({ categoryId }: { categoryId: string }) {
  const img = CATEGORY_IMAGES[categoryId];
  const tagline = CATEGORY_TAGLINES[categoryId];
  if (!img) return null;

  return (
    <motion.div
      key={categoryId}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55 }}
      className="relative mb-10 overflow-hidden rounded-2xl border border-gold/20"
      style={{ height: 220 }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width:768px) 100vw, 1152px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="max-w-lg text-sm text-cream/85 md:text-base"
        >
          {tagline}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function MenuPageClient() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<MenuCategoryId>("pizzas");
  const [q, setQ] = useState("");

  useEffect(() => {
    const raw = searchParams?.get("category");
    if (!raw) return;
    const ok = MENU_CATEGORY_TABS.some((t) => t.id === raw);
    if (ok) setActive(raw as MenuCategoryId);
  }, [searchParams]);

  const filteredPizzas = useMemo(
    () =>
      SPECIALTY_PIZZAS.filter((p) =>
        matches(q, p.name, p.toppings, p.sauce, p.drizzle, p.choiceOfDrizzle),
      ),
    [q],
  );

  const byoHaystack = useMemo(() => {
    const toppings = [
      ...BYO_TOPPINGS.sauces,
      ...BYO_TOPPINGS.additionalCheeses,
      ...BYO_TOPPINGS.vegetarian,
      ...BYO_TOPPINGS.nonVegetarian,
    ].join(" ");
    const extras = BYO_EXTRAS.map((e) => e.name).join(" ");
    const tiers = BUILD_YOUR_OWN_TIERS.map((t) => t.label).join(" ");
    return `${tiers} ${toppings} ${extras} ${PIZZA_SIZE_LEGEND}`;
  }, []);

  const showByo = matches(q, "build", "topping", "cheese", "sauce", byoHaystack);

  function filterSimple(list: typeof SUBS) {
    return list.filter((i) => matches(q, i.name, i.description));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: panelTransition.ease }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1 className="font-display text-3xl text-gold md:text-4xl">Build Your Order, Your Way</h1>
          <p className="mt-2 max-w-xl text-sm text-cream/75">
            Explore the full menu with ease: filter by category, search exactly what you’re craving, and plan your order before you even arrive. Everything is designed to help you choose faster, smarter, and exactly how you like it.
          </p>
        </div>
        <label className="block w-full md:max-w-xs">
          <span className="sr-only">Search menu</span>
          <motion.input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search items…"
            whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(201,154,58,0.35)" }}
            className="w-full rounded-md border border-gold/35 bg-charcoal px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none ring-gold/30 transition-shadow"
          />
        </label>
      </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.55 }}
  className="mb-10 rounded-xl border border-gold/25 bg-gradient-to-br from-charcoal/95 via-charcoal/85 to-umber/30 p-6 shadow-[0_0_60px_rgba(201,154,58,0.08)] md:p-8"
>
  <h2 className="font-display text-xl text-gold md:text-2xl">
    {MENU_INTRO.title}
  </h2>

  <div className="mt-4 max-w-4xl space-y-3 text-sm leading-relaxed text-cream/80 md:text-base">
    {MENU_INTRO.paras.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
  </div>

  {/* YE NAYA SECTION YAHAN LAGAO */}
  <h3 className="mt-8 font-display text-lg text-gold">
    {MENU_INTRO.appetiteTitle}
  </h3>

  <div className="mt-3 max-w-4xl space-y-3 text-sm leading-relaxed text-cream/80 md:text-base">
    {MENU_INTRO.appetiteBody.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
  </div>

  {/* TIPS */}
  <h3 className="mt-8 font-display text-lg text-gold">
    {MENU_INTRO.tipsTitle}
  </h3>

  <ul className="mt-3 max-w-3xl space-y-2 text-sm text-cream/75">
    {MENU_INTRO.tips.map((t) => (
      <li key={t} className="flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
        {t}
      </li>
    ))}
  </ul>
</motion.div>

      <CategoryTabs active={active} onChange={setActive} />

      <AnimatePresence mode="wait">
        {active === "pizzas" ? (
          <motion.section
            key="pizzas"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={panelTransition}
            aria-labelledby="menu-pizzas"
            className="mt-10 space-y-6"
          >
            <CategoryHero categoryId="pizzas" />
            <h2 id="menu-pizzas" className="font-display text-2xl text-cream">Specialty pizzas</h2>
            <p className="text-sm text-cream/65">{PIZZA_SIZE_LEGEND}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {filteredPizzas.map((p) => (
                <SpecialtyPizzaCard key={p.id} pizza={p} />
              ))}
            </div>
            {filteredPizzas.length === 0 ? (
              <p className="text-cream/60">No pizzas match your search.</p>
            ) : null}
          </motion.section>
        ) : null}

        {active === "build-your-own" && showByo ? (
          <motion.section
            key="byo"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={panelTransition}
            aria-labelledby="menu-byo"
            className="mt-10 space-y-6"
          >
            <CategoryHero categoryId="build-your-own" />
            <h2 id="menu-byo" className="font-display text-2xl text-cream">Build your own pizza</h2>
            <p className="text-sm text-cream/65">{PIZZA_SIZE_LEGEND}</p>
            <div className="overflow-x-auto rounded-lg border border-gold/25 bg-charcoal/70">
              <table className="min-w-full text-left text-sm text-cream">
                <thead className="border-b border-gold/25 bg-umber/40 text-gold">
                  <tr>
                    <th className="px-4 py-3 font-display">Tier</th>
                    <th className="px-2 py-3">S</th><th className="px-2 py-3">M</th>
                    <th className="px-2 py-3">L</th><th className="px-2 py-3">XL</th>
                    <th className="px-2 py-3">P</th>
                  </tr>
                </thead>
                <tbody>
                  {BUILD_YOUR_OWN_TIERS.map((row) => (
                    <tr key={row.label} className="border-b border-gold/10">
                      <td className="px-4 py-3 font-medium">{row.label}</td>
                      <td className="px-2 py-3">${row.prices.S.toFixed(2)}</td>
                      <td className="px-2 py-3">${row.prices.M.toFixed(2)}</td>
                      <td className="px-2 py-3">${row.prices.L.toFixed(2)}</td>
                      <td className="px-2 py-3">${row.prices.XL.toFixed(2)}</td>
                      <td className="px-2 py-3">${row.prices.P.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Sauces", items: BYO_TOPPINGS.sauces },
                { title: "Additional cheeses", items: BYO_TOPPINGS.additionalCheeses },
                { title: "Vegetarian toppings", items: BYO_TOPPINGS.vegetarian },
                { title: "Non-vegetarian toppings", items: BYO_TOPPINGS.nonVegetarian },
              ].map(({ title, items }) => (
                <div key={title} className="rounded-lg border border-gold/25 bg-charcoal/70 p-5">
                  <h3 className="font-display text-lg text-gold">{title}</h3>
                  <p className="mt-2 text-sm text-cream/85">{items.join(", ")}.</p>
                </div>
              ))}
            </div>
            <h3 className="font-display text-xl text-gold">Extras</h3>
            <div className="space-y-3">
              {BYO_EXTRAS.map((ex) => (
                <div key={ex.name} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-gold/20 bg-charcoal/60 px-4 py-3 text-sm">
                  <span className="text-cream">{ex.name}</span>
                  <span className="text-gold">
                    S ${ex.prices.S.toFixed(2)} · M ${ex.prices.M.toFixed(2)} · L ${ex.prices.L.toFixed(2)} · XL ${ex.prices.XL.toFixed(2)} · P ${ex.prices.P.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {active === "build-your-own" && !showByo ? (
          <motion.p key="byo-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 text-cream/60">
            No build-your-own items match your search.
          </motion.p>
        ) : null}

        {active === "subs" ? (
          <motion.section key="subs" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-subs" className="mt-10 space-y-6">
            <CategoryHero categoryId="subs" />
            <h2 id="menu-subs" className="font-display text-2xl text-cream">Subs</h2>
            <div className="space-y-3">{filterSimple(SUBS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
            <h3 className="font-display text-xl text-gold">Sub extras</h3>
            <div className="space-y-3">{filterSimple(SUB_EXTRAS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "pastas" ? (
          <motion.section key="pastas" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-pastas" className="mt-10 space-y-6">
            <CategoryHero categoryId="pastas" />
            <h2 id="menu-pastas" className="font-display text-2xl text-cream">Pastas</h2>
            <div className="space-y-3">{filterSimple(PASTAS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
            <h3 className="font-display text-xl text-gold">Pasta extras</h3>
            <div className="space-y-3">{filterSimple(PASTA_EXTRAS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "garlic-breads" ? (
          <motion.section key="garlic" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-garlic" className="mt-10 space-y-6">
            <CategoryHero categoryId="garlic-breads" />
            <h2 id="menu-garlic" className="font-display text-2xl text-cream">Garlic breads</h2>
            <div className="space-y-3">{filterSimple(GARLIC_BREADS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "wings" ? (
          <motion.section key="wings" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-wings" className="mt-10 space-y-6">
            <CategoryHero categoryId="wings" />
            <h2 id="menu-wings" className="font-display text-2xl text-cream">Wings</h2>
            <div className="rounded-lg border border-gold/20 bg-charcoal/60 px-5 py-4 text-sm">
              <span className="font-semibold text-gold">Available sauces: </span>
              <span className="text-cream/80">{WING_SAUCES}</span>
            </div>
            <div className="space-y-3">{filterSimple(WINGS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "salads" ? (
          <motion.section key="salads" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-salads" className="mt-10 space-y-6">
            <CategoryHero categoryId="salads" />
            <h2 id="menu-salads" className="font-display text-2xl text-cream">Salads</h2>
            <div className="space-y-3">{filterSimple(SALADS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "sides" ? (
          <motion.section key="sides" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-sides" className="mt-10 space-y-6">
            <CategoryHero categoryId="sides" />
            <h2 id="menu-sides" className="font-display text-2xl text-cream">Sides</h2>
            <div className="space-y-3">{filterSimple(SIDES).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
            <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-5 text-sm text-cream/85">
              <h3 className="font-display text-lg text-gold">Dips</h3>
              <p className="mt-2">{DIPS_LIST}</p>
            </div>
            <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-5 text-sm text-cream/85">
              <h3 className="font-display text-lg text-gold">Beverages</h3>
              <p className="mt-2">{BEVERAGES_LIST}</p>
            </div>
          </motion.section>
        ) : null}

        {active === "desserts" ? (
          <motion.section key="desserts" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-desserts" className="mt-10 space-y-6">
            <CategoryHero categoryId="desserts" />
            <h2 id="menu-desserts" className="font-display text-2xl text-cream">Desserts</h2>
            <div className="space-y-3">{filterSimple(DESSERTS).map((i) => <SimpleItemCard key={i.id} item={i} />)}</div>
          </motion.section>
        ) : null}

        {active === "drinks-dips" ? (
          <motion.section key="drinks" role="tabpanel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={panelTransition} aria-labelledby="menu-drinks" className="mt-10 space-y-6">
            <CategoryHero categoryId="drinks-dips" />
            <h2 id="menu-drinks" className="font-display text-2xl text-cream">Drinks & dips</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-6 text-sm text-cream/85">
                <h3 className="font-display text-lg text-gold">Dips</h3>
                <p className="mt-2">{DIPS_LIST}</p>
              </div>
              <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-6 text-sm text-cream/85">
                <h3 className="font-display text-lg text-gold">Beverages</h3>
                <p className="mt-2">{BEVERAGES_LIST}</p>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
