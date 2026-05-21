"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BUILD_YOUR_OWN_PASTA,
  BYO_TOPPINGS,
  MENU_CATEGORY_TABS,
  type MenuCategoryId,
  PASTA_ADDONS,
  PASTAS,
  PIZZA_SIZE_LEGEND,
  SALADS,
  SANDWICHES,
  SIDES,
  SIGNATURE_PASTAS,
  SIGNATURE_PIZZAS,
  SPECIALTY_PIZZAS,
  STARTERS,
  SUBS,
  SUB_EXTRAS,
  WING_SAUCES,
  WINGS,
  BUILD_YOUR_OWN_TIERS,
  BYO_EXTRAS,
  BYO_TOPPING_PRICING,
} from "@/data/menu";
import { CategoryTabs } from "./CategoryTabs";
import {
  SimpleItemCard,
  SpecialtyPizzaCard,
  SignaturePizzaCard,
  WingsCard,
  StarterCard,
} from "./MenuCard";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import { AnimatePresence as AP } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const panel = { duration: 0.36, ease };

// ─── HERO DATA ────────────────────────────────────────────────────────────────
const HERO: Record<string, { src: string; alt: string; tagline: string }> = {
  starters: {
    src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=1400&q=80",
    alt: "Starters and appetizers",
    tagline: "The perfect way to begin — shareable, crispy, and deeply satisfying.",
  },
  pizzas: {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&q=80",
    alt: "Fresh baked classic pizza",
    tagline: "Stone-baked to perfection — crisp where it counts, soft where it matters.",
  },
  "signature-pizzas": {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=80",
    alt: "Signature gourmet pizza",
    tagline: "Elevated combinations — our chef's most distinctive creations.",
  },
  "build-your-own": {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=80",
    alt: "Build your own pizza",
    tagline: "Your crust. Your sauce. Your toppings. Built your way.",
  },
  subs: {
    src: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=1400&q=80",
    alt: "Loaded toasted sub",
    tagline: "Loaded, toasted, and dressed like a main course.",
  },
  pastas: {
    src: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1400&q=80",
    alt: "Rich creamy pasta",
    tagline: "Baked until the cheese sings — rich, hearty, and deeply satisfying.",
  },
  wings: {
    src: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1400&q=80",
    alt: "Saucy chicken wings",
    tagline: "Sauced to order. Every bite packs a punch.",
  },
  salads: {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=80",
    alt: "Fresh crisp salad",
    tagline: "Fresh, crisp bowls that actually fill you up.",
  },
  sides: {
    src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=1400&q=80",
    alt: "Sides and fries",
    tagline: "The perfect companions — never an afterthought.",
  },
};

function CategoryHero({ id }: { id: string }) {
  const h = HERO[id];
  if (!h) return null;
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 overflow-hidden rounded-2xl border border-gold/15"
      style={{ height: 200 }}
    >
      <Image src={h.src} alt={h.alt} fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 1152px" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/65 to-transparent" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="absolute bottom-5 left-6 max-w-lg text-sm text-cream/80 md:text-base"
      >
        {h.tagline}
      </motion.p>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-display text-2xl text-cream">{children}</h2>
      <div className="flex-1 h-px bg-gold/15" />
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-3">
      <span className="h-4 w-0.5 rounded-full bg-gold/60" />
      <h3 className="font-display text-lg text-gold">{children}</h3>
    </div>
  );
}

function matches(q: string, ...parts: (string | undefined)[]) {
  if (!q.trim()) return true;
  const n = q.toLowerCase();
  return parts.some((p) => (p ?? "").toLowerCase().includes(n));
}

// ─── BUILD YOUR OWN PIZZA BUILDER ─────────────────────────────────────────────
function ByoPizzaBuilder() {
  const { addItem } = useCart();
  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "P">("M");
  const [toppings, setToppings] = useState<string[]>([]);
  const [sauce, setSauce] = useState("Pizza Sauce");
  const [added, setAdded] = useState(false);

  const basePrices: Record<string, number> = { S: 12.93, M: 16.93, L: 20.93, XL: 24.93, P: 28.93 };
  const extraPriceMap: Record<string, number> = { S: 1, M: 1.5, L: 2, XL: 2.5, P: 3 };
  const basePrice = basePrices[size];
  const firstFour = Math.min(toppings.length, 4);
  const extra = Math.max(0, toppings.length - 4);
  const toppingCost = firstFour * 1 + extra * (extraPriceMap[size] ?? 1);
  const total = basePrice + toppingCost;

  const toggleTopping = (t: string) =>
    setToppings((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const sizeKeys = ["S", "M", "L", "XL", "P"] as const;
  const sizeNames: Record<string, string> = { S: "Small", M: "Medium", L: "Large", XL: "Jumbo", P: "Party" };

  const handleAdd = () => {
    addItem({ id: `byo-${size}-${Date.now()}`, name: `Build Your Own Pizza (${sizeNames[size]})`, category: "pizza", price: total, size: sizeNames[size] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#1c1a14] to-charcoal/90 p-6 space-y-5">
      {/* Size */}
      <div>
        <p className="text-xs font-bold text-gold/70 uppercase tracking-wider mb-2">Choose Size</p>
        <div className="grid grid-cols-5 gap-1.5">
          {sizeKeys.map((k) => (
            <button key={k} onClick={() => setSize(k)}
              className={`flex flex-col items-center rounded-xl border py-2 transition-all ${size === k ? "border-gold bg-gold/18 shadow-[0_0_10px_rgba(201,154,58,0.2)]" : "border-gold/20 hover:border-gold/40"}`}
            >
              <span className={`text-[10px] font-bold ${size === k ? "text-gold" : "text-cream/50"}`}>{sizeNames[k]}</span>
              <span className={`text-xs font-semibold ${size === k ? "text-gold" : "text-cream/65"}`}>${basePrices[k].toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sauce */}
      <div>
        <p className="text-xs font-bold text-gold/70 uppercase tracking-wider mb-2">Sauce <span className="font-normal text-cream/40">(counts as 1 topping)</span></p>
        <div className="flex flex-wrap gap-1.5">
          {BYO_TOPPINGS.sauces.map((s) => (
            <button key={s} onClick={() => setSauce(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${sauce === s ? "border-gold bg-gold/18 text-gold" : "border-gold/25 text-cream/65 hover:border-gold/50"}`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      <div>
        <p className="text-xs font-bold text-gold/70 uppercase tracking-wider mb-2">
          Toppings — <span className="text-gold">{toppings.length} selected</span>
          <span className="text-cream/40 font-normal ml-2">(first 4 = $1 each)</span>
        </p>
        <div className="space-y-3">
          {[
            { label: "Vegetarian", items: BYO_TOPPINGS.vegetarian },
            { label: "Non-Vegetarian", items: BYO_TOPPINGS.nonVegetarian },
            { label: "Extra Cheese", items: BYO_TOPPINGS.additionalCheeses },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className="text-[11px] text-cream/40 uppercase tracking-wide mb-1.5">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((t) => (
                  <button key={t} onClick={() => toggleTopping(t)}
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] transition-all ${toppings.includes(t) ? "border-gold bg-gold/18 text-gold font-semibold" : "border-gold/20 text-cream/60 hover:border-gold/40"}`}
                  >{t}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total + Add */}
      <div className="flex items-center justify-between border-t border-gold/15 pt-4">
        <div>
          <p className="text-xs text-cream/50">Estimated Total</p>
          <p className="text-2xl font-bold text-gold">{formatCurrency(total)}</p>
          {toppings.length > 0 && (
            <p className="text-[11px] text-cream/40">Base {formatCurrency(basePrice)} + {toppings.length} topping{toppings.length !== 1 ? "s" : ""} {formatCurrency(toppingCost)}</p>
          )}
        </div>
        <div className="relative">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={handleAdd}
            className="rounded-xl border border-gold/40 bg-gold/15 px-6 py-3 text-sm font-bold text-gold hover:bg-gold/25 hover:border-gold/65 transition-all"
          >Add to Cart</motion.button>
          <AnimatePresence>
            {added && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-green-900/80 text-xs font-bold text-green-300 pointer-events-none"
              >✓ Added!</motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export function MenuPageClient() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<MenuCategoryId>("starters");
  const [q, setQ] = useState("");

  useEffect(() => {
    const raw = searchParams?.get("category");
    if (!raw) return;
    const ok = MENU_CATEGORY_TABS.some((t) => t.id === raw);
    if (ok) setActive(raw as MenuCategoryId);
  }, [searchParams]);

  const filteredPizzas = useMemo(
    () => SPECIALTY_PIZZAS.filter((p) => matches(q, p.name, p.toppings, p.sauce)),
    [q]
  );
  const filteredSig = useMemo(
    () => SIGNATURE_PIZZAS.filter((p) => matches(q, p.name, p.toppings)),
    [q]
  );
  function fs<T extends { name?: string; description?: string }>(list: T[]) {
    return list.filter((i) => matches(q, i.name, i.description));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1 className="font-display text-3xl text-gold md:text-4xl">Build Your Order, Your Way</h1>
          <p className="mt-1.5 max-w-xl text-sm text-cream/65">
            Browse every category, search what you&apos;re craving, and add directly to your cart.
          </p>
        </div>
        <label className="block w-full md:max-w-xs">
          <span className="sr-only">Search menu</span>
          <motion.input
            type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search items…"
            whileFocus={{ boxShadow: "0 0 0 2px rgba(201,154,58,0.35)" }}
            className="w-full rounded-xl border border-gold/30 bg-charcoal px-4 py-2.5 text-sm text-cream placeholder:text-cream/35 outline-none transition-shadow"
          />
        </label>
      </motion.div>

      <CategoryTabs active={active} onChange={setActive} />

      <AnimatePresence mode="wait">

        {/* ── STARTERS ─────────────────────────────────────────────────────── */}
        {active === "starters" && (
          <motion.section key="starters" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-2">
            <CategoryHero id="starters" />
            <SectionTitle>Starters</SectionTitle>
            <div className="space-y-2">{fs(STARTERS).map((i) => <StarterCard key={i.id} item={i} />)}</div>
            <SubTitle>Sides</SubTitle>
            <div className="space-y-2">{fs(SIDES).map((i) => <SimpleItemCard key={i.id} item={i} category="side" />)}</div>
          </motion.section>
        )}

        {/* ── CLASSIC PIZZAS ────────────────────────────────────────────────── */}
        {active === "pizzas" && (
          <motion.section key="pizzas" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-4">
            <CategoryHero id="pizzas" />
            <SectionTitle>Classic Pizzas</SectionTitle>
            <p className="text-xs text-cream/45 -mt-2">{PIZZA_SIZE_LEGEND}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPizzas.map((p) => <SpecialtyPizzaCard key={p.id} pizza={p} />)}
            </div>
            {!filteredPizzas.length && <p className="text-cream/50">No pizzas match your search.</p>}
          </motion.section>
        )}

        {/* ── SIGNATURE PIZZAS ──────────────────────────────────────────────── */}
        {active === "signature-pizzas" && (
          <motion.section key="sig-pizzas" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-4">
            <CategoryHero id="signature-pizzas" />
            <SectionTitle>Signature Pizzas</SectionTitle>
            <p className="text-xs text-cream/45 -mt-2">Available in Small & Medium only</p>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredSig.map((p) => <SignaturePizzaCard key={p.id} pizza={p} />)}
            </div>
            {!filteredSig.length && <p className="text-cream/50">No signature pizzas match your search.</p>}
          </motion.section>
        )}

        {/* ── BUILD YOUR OWN PIZZA ──────────────────────────────────────────── */}
        {active === "build-your-own" && (
          <motion.section key="byo" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-4">
            <CategoryHero id="build-your-own" />
            <SectionTitle>Build Your Own Pizza</SectionTitle>
            <ByoPizzaBuilder />
          </motion.section>
        )}

        {/* ── SUBS & SANDWICHES ─────────────────────────────────────────────── */}
        {active === "subs" && (
          <motion.section key="subs" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-2">
            <CategoryHero id="subs" />
            <SectionTitle>Sandwiches</SectionTitle>
            <p className="text-xs text-cream/45 -mt-2">Comes with a choice of Side — Fries, Onion Rings or Wedges</p>
            <div className="space-y-2">{fs(SANDWICHES).map((i) => <SimpleItemCard key={i.id} item={i} category="sandwich" />)}</div>
            <SubTitle>Submarines (Foot Long)</SubTitle>
            <div className="space-y-2">{fs(SUBS).map((i) => <SimpleItemCard key={i.id} item={i} category="sub" />)}</div>
            <SubTitle>Sub Extras</SubTitle>
            <div className="space-y-2">{fs(SUB_EXTRAS).map((i) => <SimpleItemCard key={i.id} item={i} category="sub-extra" />)}</div>
          </motion.section>
        )}

        {/* ── PASTAS ────────────────────────────────────────────────────────── */}
        {active === "pastas" && (
          <motion.section key="pastas" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-2">
            <CategoryHero id="pastas" />
            <SectionTitle>Pastas</SectionTitle>
            <div className="space-y-2">{fs(PASTAS).map((i) => <SimpleItemCard key={i.id} item={i} category="pasta" />)}</div>
            <SubTitle>Signature Pastas</SubTitle>
            <div className="space-y-2">{fs(SIGNATURE_PASTAS).map((i) => <SimpleItemCard key={i.id} item={i} category="signature-pasta" />)}</div>
            <SubTitle>Pasta Add-Ons</SubTitle>
            <div className="space-y-2">{fs(PASTA_ADDONS).map((i) => <SimpleItemCard key={i.id} item={i} category="pasta-addon" />)}</div>
            {/* Build Your Own Pasta */}
            <SubTitle>Build Your Own Pasta</SubTitle>
            <div className="rounded-2xl border border-gold/20 bg-charcoal/60 p-5 space-y-4">
              <span className="text-gold font-bold">Starting at {formatCurrency(BUILD_YOUR_OWN_PASTA.startingAt)}</span>
              <div className="grid gap-3 md:grid-cols-2 mt-3">
                {[
                  { label: "🍝 Choose Your Pasta", items: BUILD_YOUR_OWN_PASTA.pastas },
                  { label: "🍅 Choose Your Sauce", items: BUILD_YOUR_OWN_PASTA.sauces },
                  { label: "🥩 Add Protein", items: BUILD_YOUR_OWN_PASTA.proteins },
                  { label: "🧀 Way to Cook", items: BUILD_YOUR_OWN_PASTA.wayToCook },
                ].map(({ label, items }) => (
                  <div key={label} className="rounded-xl border border-gold/15 bg-charcoal/50 p-4">
                    <p className="text-sm font-bold text-gold mb-2">{label}</p>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item} className="text-xs text-cream/70 flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── WINGS ─────────────────────────────────────────────────────────── */}
        {active === "wings" && (
          <motion.section key="wings" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-3">
            <CategoryHero id="wings" />
            <SectionTitle>Wings</SectionTitle>
            <div className="space-y-2">{fs(WINGS).map((i) => <WingsCard key={i.id} item={i} />)}</div>
            <SubTitle>Available Sauces</SubTitle>
            <div className="rounded-xl border border-gold/20 bg-charcoal/60 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {WING_SAUCES.split(", ").map((s) => (
                  <span key={s} className="rounded-full border border-gold/25 bg-gold/8 px-3 py-1 text-xs text-gold/80">{s}</span>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── SALADS ────────────────────────────────────────────────────────── */}
        {active === "salads" && (
          <motion.section key="salads" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-2">
            <CategoryHero id="salads" />
            <SectionTitle>Salads</SectionTitle>
            <div className="space-y-2">{fs(SALADS).map((i) => <SimpleItemCard key={i.id} item={i} category="salad" />)}</div>
          </motion.section>
        )}

        {/* ── SIDES ─────────────────────────────────────────────────────────── */}
        {active === "sides" && (
          <motion.section key="sides" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={panel} className="mt-8 space-y-2">
            <CategoryHero id="sides" />
            <SectionTitle>Sides</SectionTitle>
            <div className="space-y-2">{fs(SIDES).map((i) => <SimpleItemCard key={i.id} item={i} category="side" />)}</div>
          </motion.section>
        )}

      </AnimatePresence>
    </div>
  );
}