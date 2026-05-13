"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { totalItems, openCart, lastAdded } = useCart();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={openCart}
        className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gold/35 text-cream/80 hover:border-gold hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={`Cart with ${totalItems} items`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-charcoal"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* "Added!" toast near cart */}
      <AnimatePresence>
        {lastAdded && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            className="absolute right-0 top-12 z-50 whitespace-nowrap rounded-md border border-gold/30 bg-[#1a1710] px-3 py-1.5 text-xs text-gold shadow-lg"
          >
            ✓ Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
