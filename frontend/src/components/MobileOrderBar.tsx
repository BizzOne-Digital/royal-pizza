"use client";

import { SITE } from "@/data/menu";
import { motion } from "framer-motion";

export function MobileOrderBar() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.15 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-charcoal/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden"
    >
      <motion.a
        href={SITE.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(201,154,58,0.35)" }}
        whileTap={{ scale: 0.97 }}
        className="ribbon-red flex w-full items-center justify-center rounded-md py-3 text-center text-base font-semibold text-cream shadow-innerWarm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Order Now
      </motion.a>
    </motion.div>
  );
}
