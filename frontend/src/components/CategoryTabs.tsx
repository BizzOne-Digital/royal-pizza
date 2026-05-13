"use client";

import type { MenuCategoryId } from "@/data/menu";
import { MENU_CATEGORY_TABS } from "@/data/menu";
import { motion } from "framer-motion";

type Props = {
  active: MenuCategoryId;
  onChange: (id: MenuCategoryId) => void;
};

export function CategoryTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="relative flex flex-wrap gap-2 border-b border-gold/20 pb-4"
    >
      {MENU_CATEGORY_TABS.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`relative z-0 overflow-hidden rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              selected
                ? "border-gold text-gold"
                : "border-gold/30 text-cream/85 hover:border-gold/60 hover:text-gold"
            }`}
          >
            {selected ? (
              <motion.span
                layoutId="menu-category-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-gold/25 to-gold/10 shadow-innerWarm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
