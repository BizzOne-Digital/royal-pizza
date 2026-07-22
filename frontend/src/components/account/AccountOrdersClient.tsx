"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { formatCurrency } from "@/lib/format";

const DEFAULT_BACKEND_URL = "http://localhost:4000";
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");

function resolveBackendUrl() {
  if (typeof window === "undefined") return BACKEND_URL;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? DEFAULT_BACKEND_URL
    : BACKEND_URL;
}

type OrderItem = { name: string; size?: string; price: number; quantity: number };
type Order = {
  _id: string;
  items: OrderItem[];
  orderType: string;
  status: string;
  total: number;
  createdAt: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AccountOrdersClient() {
  const { customer, token, loading: authLoading, logout } = useCustomerAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      router.replace("/account/login");
      return;
    }
    fetch(`${resolveBackendUrl()}/api/customers/me/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { if (Array.isArray(d)) setOrders(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authLoading, token, router]);

  if (authLoading || !token) {
    return <div className="min-h-[50vh]" />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-gold">My Orders</h1>
          {customer && <p className="mt-1 text-sm text-cream/60">Signed in as {customer.name} ({customer.email})</p>}
        </div>
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="rounded-md border border-gold/25 px-4 py-2 text-xs font-semibold text-cream/70 hover:border-gold/50 hover:text-gold transition"
        >
          Sign Out
        </button>
      </div>

      {loading ? (
        <p className="text-cream/50">Loading your orders…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-gold/20 bg-white/[0.02] p-8 text-center">
          <p className="text-cream/60 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/menu" className="ribbon-red inline-flex rounded-md px-5 py-2.5 text-sm font-semibold text-cream">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease }}
              className="rounded-lg border border-gold/20 bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm text-cream/50">
                    {new Date(order.createdAt).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                  <span className="mt-1 inline-block rounded-full border border-gold/25 px-2.5 py-0.5 text-[11px] capitalize text-gold/80">
                    {order.status}
                  </span>
                </div>
                <span className="text-lg font-bold text-gold">{formatCurrency(order.total)}</span>
              </div>
              <ul className="space-y-1 text-sm text-cream/75">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between gap-2">
                    <span>{item.quantity}× {item.name}{item.size ? ` (${item.size})` : ""}</span>
                    <span className="text-cream/50">{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
