"use client";

import type { PizzaPrices, SimpleMenuItem, SpecialtyPizza, SignaturePizza } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sizeLabels: { key: keyof PizzaPrices; short: string; full: string }[] = [
  { key: "S", short: "S", full: "Small" },
  { key: "M", short: "M", full: "Medium" },
  { key: "L", short: "L", full: "Large" },
  { key: "XL", short: "XL", full: "Jumbo" },
  { key: "P", short: "P", full: "Party" },
];

function AddedBadge({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0.75, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75 }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-900/80 text-sm font-bold text-green-300 pointer-events-none backdrop-blur-sm"
        >
          ✓ Added to Cart
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* ─── SPECIALTY PIZZA CARD ─────────────────────────────────────────────────── */
export function SpecialtyPizzaCard({ pizza }: { pizza: SpecialtyPizza }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<keyof PizzaPrices>("M");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const sizeInfo = sizeLabels.find((s) => s.key === selectedSize)!;
    addItem({
      id: `${pizza.id}-${selectedSize}`,
      name: pizza.name,
      category: "pizza",
      price: pizza.prices[selectedSize],
      size: sizeInfo.full,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-gold/20 bg-gradient-to-b from-[#1c1a14] to-charcoal/90 p-5 shadow-lg transition-all duration-300 hover:border-gold/45 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(201,154,58,0.1)]"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <h3 className="font-display text-lg text-gold leading-tight">{pizza.name}</h3>
        <span className="shrink-0 text-xs text-cream/45">from {formatCurrency(pizza.startingAt)}</span>
      </div>

      {/* Info chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="rounded-full border border-gold/30 bg-gold/8 px-2.5 py-0.5 text-[11px] text-gold/80">
          🍅 {pizza.sauce}
        </span>
        {pizza.drizzle && (
          <span className="rounded-full border border-red-500/30 bg-red-900/20 px-2.5 py-0.5 text-[11px] text-red-300/80">
            🌶 {pizza.drizzle} drizzle
          </span>
        )}
      </div>
      <p className="text-sm text-cream/70 leading-relaxed mb-4 flex-1">{pizza.toppings}</p>

      {/* Size selector */}
      <div className="grid grid-cols-5 gap-1 mb-3">
        {sizeLabels.map(({ key, short }) => (
          <button
            key={key}
            onClick={() => setSelectedSize(key)}
            className={`flex flex-col items-center rounded-lg border py-1.5 transition-all duration-200 ${
              selectedSize === key
                ? "border-gold bg-gold/18 shadow-[0_0_10px_rgba(201,154,58,0.2)]"
                : "border-gold/20 bg-charcoal/40 hover:border-gold/40"
            }`}
          >
            <span className={`text-[10px] font-bold uppercase ${selectedSize === key ? "text-gold" : "text-cream/50"}`}>{short}</span>
            <span className={`text-xs font-semibold ${selectedSize === key ? "text-gold" : "text-cream/70"}`}>
              ${pizza.prices[key].toFixed(2)}
            </span>
          </button>
        ))}
      </div>

      {/* Add to cart */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="w-full rounded-lg bg-gold/15 border border-gold/40 py-2.5 text-sm font-bold text-gold transition-all hover:bg-gold/25 hover:border-gold/70 hover:shadow-[0_0_16px_rgba(201,154,58,0.2)]"
        >
          Add to Cart — {formatCurrency(pizza.prices[selectedSize])}
        </motion.button>
        <AddedBadge show={added} />
      </div>
    </motion.article>
  );
}

/* ─── SIGNATURE PIZZA CARD ─────────────────────────────────────────────────── */
export function SignaturePizzaCard({ pizza }: { pizza: SignaturePizza }) {
  const { addItem } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const selected = pizza.prices[selectedIdx];

  const handleAdd = () => {
    addItem({
      id: `${pizza.id}-${selected.label}`,
      name: pizza.name,
      category: "signature-pizza",
      price: selected.amount,
      size: selected.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl border border-amber-700/30 bg-gradient-to-b from-amber-950/30 to-charcoal/90 p-5 shadow-lg transition-all duration-300 hover:border-amber-600/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Crown badge */}
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">👑</span>
          <h3 className="font-display text-lg text-amber-300 leading-tight">{pizza.name}</h3>
        </div>
      </div>

      <p className="text-sm text-cream/70 leading-relaxed mb-4 flex-1">{pizza.toppings}</p>

      {/* Size picker */}
      <div className="flex gap-2 mb-3">
        {pizza.prices.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setSelectedIdx(i)}
            className={`flex-1 rounded-lg border py-2 text-xs transition-all ${
              selectedIdx === i
                ? "border-amber-500/60 bg-amber-900/30 text-amber-300 font-bold"
                : "border-gold/20 text-cream/60 hover:border-gold/40"
            }`}
          >
            <div>{p.label}</div>
            <div className="font-semibold">${p.amount.toFixed(2)}</div>
          </button>
        ))}
      </div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="w-full rounded-lg bg-amber-900/30 border border-amber-600/40 py-2.5 text-sm font-bold text-amber-300 transition-all hover:bg-amber-900/50 hover:border-amber-500/60"
        >
          Add to Cart — {formatCurrency(selected.amount)}
        </motion.button>
        <AddedBadge show={added} />
      </div>
    </motion.article>
  );
}

/* ─── SIMPLE ITEM CARD ─────────────────────────────────────────────────────── */
export function SimpleItemCard({ item, category }: { item: SimpleMenuItem; category?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<{ label: string; amount: number } | null>(
    item.prices?.[0] ?? null
  );

  const price = typeof item.price === "number" ? item.price : selectedPrice?.amount ?? 0;

  const handleAdd = () => {
    if (!price) return;
    addItem({
      id: `${item.id}-${selectedPrice?.label ?? "std"}`,
      name: item.name,
      category: category ?? "item",
      price,
      size: selectedPrice?.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12px" }}
      transition={{ duration: 0.38 }}
      className="group flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-gold/18 bg-charcoal/60 px-4 py-3.5 transition-all duration-200 hover:border-gold/40 hover:bg-charcoal/80"
    >
      {/* Name + desc */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base text-cream leading-snug">{item.name}</h3>
        {item.description && (
          <p className="mt-0.5 text-xs text-cream/55 leading-relaxed line-clamp-2">{item.description}</p>
        )}
        {item.note && (
          <p className="mt-1 text-[11px] text-gold/60 italic">{item.note}</p>
        )}
      </div>

      {/* Price + sizes + button */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        {typeof item.price === "number" && (
          <span className="text-base font-bold text-gold">{formatCurrency(item.price)}</span>
        )}
        {item.prices && (
          <div className="flex gap-1.5">
            {item.prices.map((p) => (
              <button
                key={p.label}
                onClick={() => setSelectedPrice(p)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
                  selectedPrice?.label === p.label
                    ? "border-gold bg-gold/18 text-gold shadow-[0_0_8px_rgba(201,154,58,0.15)]"
                    : "border-gold/25 text-gold/60 hover:border-gold/50 hover:text-gold/80"
                }`}
              >
                {p.label} {formatCurrency(p.amount)}
              </button>
            ))}
          </div>
        )}
        {price > 0 ? (
          <div className="relative w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="rounded-lg border border-gold/35 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold transition-all hover:bg-gold/22 hover:border-gold/60 whitespace-nowrap"
            >
              + Add to Cart
            </motion.button>
            <AddedBadge show={added} />
          </div>
        ) : (
          <span className="text-xs text-cream/35 italic">Price varies</span>
        )}
      </div>
    </motion.article>
  );
}

/* ─── WINGS CARD ────────────────────────────────────────────────────────────── */
export function WingsCard({ item }: { item: SimpleMenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!item.price) return;
    addItem({
      id: item.id,
      name: item.name,
      category: "wings",
      price: item.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.38 }}
      className="flex items-center justify-between gap-3 rounded-xl border border-orange-700/25 bg-gradient-to-r from-orange-950/20 to-charcoal/70 px-5 py-4 transition-all hover:border-orange-600/40"
    >
      <div>
        <h3 className="font-display text-base text-orange-300">{item.name}</h3>
        {item.description && <p className="text-xs text-cream/60 mt-0.5">{item.description}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-lg font-bold text-orange-300">{formatCurrency(item.price ?? 0)}</span>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="rounded-lg border border-orange-500/40 bg-orange-900/25 px-3 py-1.5 text-xs font-bold text-orange-300 transition-all hover:bg-orange-900/45 hover:border-orange-400/60"
          >
            + Add
          </motion.button>
          <AddedBadge show={added} />
        </div>
      </div>
    </motion.article>
  );
}

/* ─── STARTER CARD ──────────────────────────────────────────────────────────── */
export function StarterCard({ item }: { item: SimpleMenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const hasPrice = typeof item.price === "number" && item.price > 0;

  const handleAdd = () => {
    if (!hasPrice) return;
    addItem({ id: item.id, name: item.name, category: "starter", price: item.price! });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.38 }}
      className="flex items-center justify-between gap-4 rounded-xl border border-gold/18 bg-charcoal/60 px-4 py-3.5 transition-all hover:border-gold/38 hover:bg-charcoal/75"
    >
      <div className="flex-1">
        <h3 className="font-display text-base text-cream">{item.name}</h3>
        {item.description && <p className="text-xs text-cream/55 mt-0.5 line-clamp-2">{item.description}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {hasPrice && <span className="font-bold text-gold">{formatCurrency(item.price!)}</span>}
        <div className="relative">
          {hasPrice ? (
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="rounded-lg border border-gold/35 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold transition-all hover:bg-gold/22 hover:border-gold/60"
            >
              + Add
            </motion.button>
          ) : (
            <span className="text-xs text-cream/35 italic">Ask for price</span>
          )}
          <AddedBadge show={added} />
        </div>
      </div>
    </motion.article>
  );
}
