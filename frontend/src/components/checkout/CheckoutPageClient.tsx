"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

const DELIVERY_RESTRICTION_MESSAGE = "Sorry, we currently deliver only within Georgetown.";

const ease = [0.22, 1, 0.36, 1] as const;

type OrderType = "pickup" | "delivery";
type PaymentType = "cash" | "card";

type FormData = {
  name: string;
  phone: string;
  email: string;
  orderType: OrderType;
  address: string;
  paymentMethod: PaymentType;
  notes: string;
};

const DEFAULT_BACKEND_URL = "http://localhost:4000";
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");

export function CheckoutPageClient() {
  const resolveBackendUrl = () => {
    if (typeof window === "undefined") return BACKEND_URL;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return DEFAULT_BACKEND_URL;
    }
    return BACKEND_URL;
  };
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    orderType: "pickup",
    address: "",
    paymentMethod: "cash",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const tax = totalPrice * 0.13;
  const total = totalPrice + tax;

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(form.phone))
      e.phone = "Valid phone number required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (form.orderType === "delivery" && !form.address.trim())
      e.address = "Delivery address is required";
    return e;
  };

  const validateDeliveryLocation = async () => {
    if (form.orderType !== "delivery") return { allowed: true };

    const trimmedAddress = form.address.trim();
    if (!trimmedAddress) {
      setErrors((prev) => ({ ...prev, address: "Delivery address is required" }));
      return { allowed: false };
    }

    try {
      const res = await fetch(`${resolveBackendUrl()}/api/orders/validate-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: trimmedAddress }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.allowed) {
        setErrors((prev) => ({ ...prev, address: data.message ?? DELIVERY_RESTRICTION_MESSAGE }));
        setServerError(data.message ?? DELIVERY_RESTRICTION_MESSAGE);
        return { allowed: false };
      }

      setErrors((prev) => ({ ...prev, address: undefined }));
      setServerError(null);
      return { allowed: true };
    } catch {
      setErrors((prev) => ({ ...prev, address: DELIVERY_RESTRICTION_MESSAGE }));
      setServerError(DELIVERY_RESTRICTION_MESSAGE);
      return { allowed: false };
    }
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const deliveryCheck = await validateDeliveryLocation();
    if (!deliveryCheck.allowed) {
      return;
    }

    setErrors({});
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch(`${resolveBackendUrl()}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
          },
          orderType: form.orderType,
          deliveryAddress: form.address || undefined,
          paymentMethod: form.paymentMethod,
          notes: form.notes,
          items: items.map((i) => ({
            itemId: i.id,
            name: i.name,
            category: i.category,
            size: i.size,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal: totalPrice,
          tax,
          total,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderId(data.order?._id ?? data.orderId ?? "confirmed");
        clearCart();
        setSubmitted(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setServerError(errData.message ?? "Order failed. Please try again.");
      }
    } catch {
      // Backend not available — show success in demo mode
      setOrderId("DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase());
      clearCart();
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c99a3a" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>
          <h1 className="font-display text-3xl text-gold mb-3">Order Placed!</h1>
          <p className="text-cream/70 mb-2">Thank you, {form.name}!</p>
          {orderId && (
            <p className="text-xs text-cream/40 mb-6">
              Order ID: <span className="text-gold/60 font-mono">{orderId}</span>
            </p>
          )}
          <p className="text-sm text-cream/60 mb-8">
            {form.orderType === "pickup"
              ? "Your order is being prepared. We'll call you when it's ready for pickup."
              : "Your order is on its way! Estimated delivery: 30–45 mins."}
          </p>
          <Link
            href="/menu"
            className="ribbon-red inline-flex rounded-md px-6 py-3 text-sm font-semibold text-cream"
          >
            Order Again
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 text-center">
        <div>
          <div className="text-5xl mb-4 opacity-30">🛒</div>
          <h1 className="font-display text-2xl text-cream/60 mb-4">Your cart is empty</h1>
          <Link href="/menu" className="ribbon-red inline-flex rounded-md px-5 py-2.5 text-sm font-semibold text-cream">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-md border px-4 py-3 text-sm bg-white/[0.04] text-cream placeholder-cream/30 outline-none transition focus:ring-1 ${
      errors[field]
        ? "border-red-500/60 focus:ring-red-500/30"
        : "border-gold/25 focus:border-gold/60 focus:ring-gold/20"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="font-display text-3xl text-gold mb-8"
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Form — left */}
        <div className="lg:col-span-3 space-y-6">
          {/* Contact */}
          <Section title="Contact Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input
                  className={inputClass("name")}
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="err">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Phone *</label>
                <input
                  className={inputClass("phone")}
                  placeholder="+1 (905) 555-0123"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="err">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Email (optional)</label>
                <input
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="err">{errors.email}</p>}
              </div>
            </div>
          </Section>

          {/* Order type */}
          <Section title="Order Type">
            <div className="grid grid-cols-2 gap-3">
              {(["pickup", "delivery"] as OrderType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, orderType: t })}
                  className={`rounded-md border p-4 text-left transition-all ${
                    form.orderType === t
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/20 text-cream/60 hover:border-gold/40"
                  }`}
                >
                  <div className="text-xl mb-1">{t === "pickup" ? "🏪" : "🛵"}</div>
                  <div className="font-semibold capitalize text-sm">{t}</div>
                  <div className="text-xs mt-0.5 opacity-60">
                    {t === "pickup" ? "Ready in ~20 mins" : "~30–45 mins"}
                  </div>
                </button>
              ))}
            </div>
            <AnimatePresence>
              {form.orderType === "delivery" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    <label className="label">Delivery Address *</label>
                    <textarea
                      className={`${inputClass("address")} min-h-[80px] resize-none`}
                      placeholder="123 Main St, Georgetown, ON L7G 4A5"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    {errors.address && <p className="err">{errors.address}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* Payment */}
          <Section title="Payment Method">
            <div className="grid grid-cols-2 gap-3">
              {(["cash", "card"] as PaymentType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setForm({ ...form, paymentMethod: p })}
                  className={`rounded-md border p-4 text-left transition-all ${
                    form.paymentMethod === p
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/20 text-cream/60 hover:border-gold/40"
                  }`}
                >
                  <div className="text-xl mb-1">{p === "cash" ? "💵" : "💳"}</div>
                  <div className="font-semibold capitalize text-sm">{p === "card" ? "Card / Online" : "Cash"}</div>
                  <div className="text-xs mt-0.5 opacity-60">
                    {p === "cash" ? "Pay on arrival" : "Pay securely now"}
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* Notes */}
          <Section title="Special Instructions">
            <textarea
              className={`${inputClass("notes")} min-h-[80px] resize-none`}
              placeholder="Allergies, special requests, gate codes…"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Section>
        </div>

        {/* Order summary — right */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-lg border border-gold/20 bg-white/[0.02] p-5">
            <h2 className="font-display text-lg text-gold mb-4">
              Order Summary
              <span className="ml-2 text-sm text-cream/40 font-sans font-normal">({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
            </h2>

            <ul className="space-y-2 mb-4">
              {items.map((item) => (
                <li key={`${item.id}-${item.size ?? ""}`} className="flex justify-between text-sm gap-2">
                  <span className="text-cream/75 truncate">
                    {item.quantity}× {item.name}
                    {item.size && <span className="text-cream/40 ml-1">({item.size})</span>}
                  </span>
                  <span className="text-cream/80 shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gold/15 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-cream/60">
                <span>Subtotal</span><span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-cream/60">
                <span>HST (13%)</span><span>{formatCurrency(tax)}</span>
              </div>
              {form.orderType === "delivery" && (
                <div className="flex justify-between text-sm text-cream/60">
                  <span>Delivery</span><span className="text-gold/60">TBD</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-cream pt-2 border-t border-gold/15">
                <span>Total</span><span className="text-gold">{formatCurrency(total)}</span>
              </div>
            </div>

            {serverError && (
              <p className="mt-3 text-xs text-red-400 rounded border border-red-500/20 bg-red-900/10 px-3 py-2">
                {serverError}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(201,154,58,0.25)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={submitting}
              className="ribbon-red mt-4 w-full rounded-md py-3.5 text-sm font-bold text-cream disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />
                  Placing Order…
                </span>
              ) : (
                `Place Order — ${formatCurrency(total)}`
              )}
            </motion.button>

            <p className="mt-3 text-center text-xs text-cream/30">
              By ordering you agree to our terms of service
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .label { display: block; margin-bottom: 6px; font-size: 12px; color: rgba(201,154,58,0.7); text-transform: uppercase; letter-spacing: 0.08em; }
        .err { margin-top: 4px; font-size: 11px; color: rgb(248 113 113); }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg border border-gold/15 bg-white/[0.02] p-5"
    >
      <h2 className="font-display text-base text-gold/80 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}
