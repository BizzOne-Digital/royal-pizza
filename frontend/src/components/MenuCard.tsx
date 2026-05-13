"use client";

import type { PizzaPrices, SimpleMenuItem, SpecialtyPizza } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sizeLabels: { key: keyof PizzaPrices; short: string; label: string }[] = [
  { key: "S", short: "S", label: '10"' },
  { key: "M", short: "M", label: '12"' },
  { key: "L", short: "L", label: '14"' },
  { key: "XL", short: "XL", label: '16"' },
  { key: "P", short: "P", label: '18"' },
];

function AddedFeedback({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center rounded-md bg-gold/20 text-xs font-semibold text-gold pointer-events-none"
        >
          ✓ Added!
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function SpecialtyPizzaCard({ pizza }: { pizza: SpecialtyPizza }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<keyof PizzaPrices>("M");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const sizeInfo = sizeLabels.find((s) => s.key === selectedSize)!;
    addItem({
      id: pizza.id,
      name: pizza.name,
      category: "pizza",
      price: pizza.prices[selectedSize],
      size: `${sizeInfo.short} (${sizeInfo.label})`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 30px rgba(201,154,58,0.12)" }}
      className="card-lift border-gold-double rounded-lg bg-charcoal/80 p-5 shadow-lg ring-1 ring-gold/10 flex flex-col"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl text-gold">{pizza.name}</h3>
        <p className="text-sm text-cream/70">Starting at {formatCurrency(pizza.startingAt)}</p>
      </div>
      <dl className="mt-3 space-y-1 text-sm text-cream/85">
        <div><dt className="inline text-gold/90">Sauce: </dt><dd className="inline">{pizza.sauce}</dd></div>
        <div><dt className="inline text-gold/90">Toppings: </dt><dd className="inline">{pizza.toppings}</dd></div>
        {pizza.drizzle && <div><dt className="inline text-gold/90">Drizzle: </dt><dd className="inline">{pizza.drizzle}</dd></div>}
        {pizza.choiceOfDrizzle && <div><dt className="inline text-gold/90">Choice of Drizzle: </dt><dd className="inline">{pizza.choiceOfDrizzle}</dd></div>}
      </dl>
      <div className="mt-3 grid grid-cols-5 gap-1 text-center text-xs sm:text-sm">
        {sizeLabels.map(({ key, short }) => (
          <button
            key={key}
            onClick={() => setSelectedSize(key)}
            className={`rounded border py-1.5 transition-all ${selectedSize === key ? "border-gold bg-gold/15 text-gold" : "border-gold/25 bg-charcoal/50 text-cream hover:border-gold/50"}`}
          >
            <div className="text-[10px] uppercase text-gold/80">{short}</div>
            <div className="font-semibold">{formatCurrency(pizza.prices[key])}</div>
          </button>
        ))}
      </div>
      <div className="mt-3 flex-1 flex items-end">
        <div className="relative w-full">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="w-full rounded-md border border-gold/50 bg-gold/10 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/20"
          >
            Add to Cart — {formatCurrency(pizza.prices[selectedSize])}
          </motion.button>
          <AddedFeedback show={added} />
        </div>
      </div>
    </motion.article>
  );
}

export function SimpleItemCard({ item }: { item: SimpleMenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<{ label: string; amount: number } | null>(item.prices?.[0] ?? null);

  const price = typeof item.price === "number" ? item.price : selectedPrice?.amount ?? 0;
  const sizeName = selectedPrice?.label;

  const handleAdd = () => {
    if (!price) return;
    addItem({ id: item.id, name: item.name, category: "item", price, size: sizeName });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15px" }} transition={{ duration: 0.4 }}
      whileHover={{ x: 4, borderColor: "rgba(201,154,58,0.55)" }}
      className="flex flex-col gap-2 rounded-lg border border-gold/25 bg-charcoal/70 p-4"
    >
      <div className="flex sm:flex-row flex-col sm:items-start sm:justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-display text-lg text-cream">{item.name}</h3>
          {item.description && <p className="mt-1 text-sm text-cream/75">{item.description}</p>}
        </div>
        <div className="shrink-0 text-right">
          {typeof item.price === "number" && <p className="font-semibold text-gold">{formatCurrency(item.price)}</p>}
          {item.prices && (
            <div className="flex flex-wrap gap-1 justify-end mt-1">
              {item.prices.map((p) => (
                <button key={p.label} onClick={() => setSelectedPrice(p)}
                  className={`rounded px-2 py-0.5 text-xs border transition-all ${selectedPrice?.label === p.label ? "border-gold bg-gold/15 text-gold" : "border-gold/30 text-gold/70 hover:border-gold/60"}`}
                >
                  {p.label}: {formatCurrency(p.amount)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {price > 0 && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="w-full rounded border border-gold/30 py-1.5 text-xs font-semibold text-gold/80 transition hover:bg-gold/10 hover:text-gold hover:border-gold/50"
          >
            + Add to Cart — {formatCurrency(price)}
          </motion.button>
          <AddedFeedback show={added} />
        </div>
      )}
    </motion.article>
  );
}
