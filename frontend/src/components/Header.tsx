"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/data/menu";
import { CartButton } from "@/components/cart/CartButton";

const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/pizza-deals", label: "Pizza Deals" },
  { href: "/why-were-better", label: "Why We’re Better" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={{
        boxShadow: scrolled
          ? "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,154,58,0.2)"
          : "0 0 0 rgba(0,0,0,0)",
        borderColor: scrolled ? "rgba(201,154,58,0.35)" : "rgba(201,154,58,0.15)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-gold/25 bg-charcoal/90 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-full h-px exotic-shimmer-line opacity-70" />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <motion.span
              className="relative h-14 w-14 shrink-0 md:h-16 md:w-16"
              animate={{
                filter: scrolled
                  ? "drop-shadow(0 0 14px rgba(201,154,58,0.45))"
                  : "drop-shadow(0 0 10px rgba(201,154,58,0.28))",
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/assets/royal-logo.png"
                alt={`${SITE.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width:768px) 56px, 64px"
                priority
              />
            </motion.span>

          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-md px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  active ? "text-gold" : "text-cream/90"
                }`}
              >
                <span className="relative z-10 transition duration-300 group-hover:text-gold">
                  {item.label}
                </span>
                <span
                  className={`absolute inset-x-2 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold via-cream to-royal-red transition duration-300 group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                  }`}
                />
                {active ? (
                  <motion.span
                    layoutId="nav-active-glow"
                    className="absolute inset-0 -z-10 rounded-md bg-gold/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            href={SITE.phones[0].href}
            whileHover={{ scale: 1.03, borderColor: "rgba(201,154,58,0.85)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden rounded-md border border-gold/40 px-3 py-2 text-sm text-cream transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:inline-flex"
          >
            {SITE.phones[0].display}
          </motion.a>
          <CartButton />
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-gold/35 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <motion.svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold/20 bg-charcoal/98 lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-3 text-base text-cream transition hover:bg-umber/60 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={SITE.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                className="ribbon-red mt-2 rounded-md px-4 py-3 text-center font-semibold text-cream"
              >
                Order Now
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
