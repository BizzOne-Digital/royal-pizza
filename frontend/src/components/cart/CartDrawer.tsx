"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-gold/30 bg-[#0f0d0a] shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-gold">Your Order</span>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/25 text-cream/70 hover:border-gold hover:text-gold"
                aria-label="Close cart"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="text-5xl opacity-30">🍕</div>
                  <p className="font-display text-lg text-cream/50">Your cart is empty</p>
                  <p className="text-sm text-cream/35">Add something delicious from our menu</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeCart}
                    className="mt-2 rounded-md border border-gold/40 px-5 py-2 text-sm font-semibold text-gold hover:bg-gold/10"
                  >
                    Browse Menu
                  </motion.button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.id}-${item.size ?? ""}`}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex gap-3 rounded-lg border border-gold/15 bg-white/[0.03] p-3"
                      >
                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm text-cream leading-tight">{item.name}</p>
                          {item.size && (
                            <p className="mt-0.5 text-xs text-gold/70">Size: {item.size}</p>
                          )}
                          <p className="mt-0.5 text-xs text-cream/50 capitalize">{item.category}</p>
                          {item.notes && (
                            <p className="mt-1 text-xs text-cream/40 italic">{item.notes}</p>
                          )}
                        </div>

                        {/* Qty + price */}
                        <div className="flex flex-col items-end justify-between gap-2">
                          <p className="text-sm font-semibold text-gold">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1, item.size)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-gold/30 text-sm text-cream/70 hover:border-gold hover:text-gold"
                              aria-label={`Decrease ${item.name}`}
                            >
                              −
                            </button>
                            <span className="w-5 text-center text-sm text-cream">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1, item.size)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-gold/30 text-sm text-cream/70 hover:border-gold hover:text-gold"
                              aria-label={`Increase ${item.name}`}
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="ml-1 flex h-6 w-6 items-center justify-center rounded border border-red-900/40 text-red-400/70 hover:border-red-500/60 hover:text-red-400"
                              aria-label={`Remove ${item.name}`}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold/20 px-5 py-4 space-y-3">
                {/* Summary */}
                <div className="flex items-center justify-between text-sm text-cream/70">
                  <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                  <span className="font-semibold text-cream">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-cream/40">
                  <span>Taxes &amp; fees calculated at checkout</span>
                </div>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="ribbon-red flex w-full items-center justify-between rounded-md px-5 py-3 text-sm font-semibold text-cream shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-cream/80">{formatCurrency(totalPrice)}</span>
                  </Link>
                </motion.div>

                <button
                  onClick={closeCart}
                  className="w-full rounded-md border border-gold/25 py-2 text-sm text-cream/60 hover:text-cream transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
