"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminShell } from "./AdminShell";
import { formatCurrency } from "@/lib/format";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type OrderItem = { name: string; quantity: number; price: number; size?: string; category?: string };
type Order = {
  _id: string;
  customer: { name: string; phone: string; email?: string };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  orderType: "pickup" | "delivery";
  deliveryAddress?: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
};

const STATUSES = ["pending", "preparing", "ready", "delivered", "cancelled"] as const;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-900/30 text-yellow-400 border-yellow-800/40",
  preparing: "bg-blue-900/30 text-blue-400 border-blue-800/40",
  ready: "bg-green-900/30 text-green-400 border-green-800/40",
  delivered: "bg-cream/10 text-cream/50 border-cream/10",
  cancelled: "bg-red-900/30 text-red-400 border-red-800/40",
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function OrderSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-gold/10 bg-white/[0.02] p-4 animate-pulse">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-gold/10" />
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-gold/10" />
                <div className="h-2 w-20 rounded bg-gold/5" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-12 rounded bg-gold/10" />
              <div className="h-3 w-16 rounded bg-gold/10" />
              <div className="h-5 w-20 rounded-full bg-gold/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`${BACKEND_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setOrders(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: status as Order["status"] } : o));
        if (selected?._id === orderId) setSelected((prev) => prev ? { ...prev, status: status as Order["status"] } : null);
      }
    } catch {
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: status as Order["status"] } : o));
      if (selected?._id === orderId) setSelected((prev) => prev ? { ...prev, status: status as Order["status"] } : null);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <AdminShell>
      <div className="space-y-5">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition ${filter === s ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-cream/50 hover:text-cream"}`}
            >
              {s} {s !== "all" && !loading && <span className="ml-1 opacity-50">{orders.filter((o) => o.status === s).length}</span>}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {loading ? (
          <OrderSkeleton />
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((order) => (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={() => setSelected(order)}
                  className="cursor-pointer rounded-lg border border-gold/15 bg-white/[0.02] p-4 hover:border-gold/30 hover:bg-white/[0.04] transition"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{order.orderType === "delivery" ? "🛵" : "🏪"}</span>
                      <div>
                        <p className="text-sm font-semibold text-cream">{order.customer.name}</p>
                        <p className="text-xs text-cream/35">{order.customer.phone} · {timeAgo(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-cream/40">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                      <span className="font-semibold text-gold text-sm">{formatCurrency(order.total)}</span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs ${statusColors[order.status]}`}>{order.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="text-center py-12 text-cream/30 text-sm">No orders found</p>
            )}
          </div>
        )}
      </div>

      {/* Order detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50" onClick={() => setSelected(null)} />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm flex flex-col border-l border-gold/20 bg-[#0c0b09] overflow-y-auto"
            >
              <div className="border-b border-gold/15 px-5 py-4 flex justify-between items-center sticky top-0 bg-[#0c0b09] z-10">
                <h3 className="font-display text-base text-gold">Order Detail</h3>
                <button onClick={() => setSelected(null)} className="text-cream/40 hover:text-cream">✕</button>
              </div>

              <div className="p-5 space-y-5">
                {/* Customer */}
                <div>
                  <p className="text-xs text-gold/50 uppercase tracking-wider mb-2">Customer</p>
                  <p className="text-sm text-cream">{selected.customer.name}</p>
                  <p className="text-xs text-cream/50">{selected.customer.phone}</p>
                  {selected.customer.email && <p className="text-xs text-cream/50">{selected.customer.email}</p>}
                </div>

                {/* Order info */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded border border-gold/15 p-3">
                    <p className="text-gold/50 mb-1">Type</p>
                    <p className="text-cream capitalize">{selected.orderType}</p>
                  </div>
                  <div className="rounded border border-gold/15 p-3">
                    <p className="text-gold/50 mb-1">Payment</p>
                    <p className="text-cream capitalize">{selected.paymentMethod}</p>
                  </div>
                </div>
                {selected.deliveryAddress && (
                  <div className="text-xs rounded border border-gold/15 p-3">
                    <p className="text-gold/50 mb-1">Delivery Address</p>
                    <p className="text-cream">{selected.deliveryAddress}</p>
                  </div>
                )}

                {/* Items */}
                <div>
                  <p className="text-xs text-gold/50 uppercase tracking-wider mb-2">Items</p>
                  <ul className="space-y-1.5">
                    {selected.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-xs">
                        <span className="text-cream/70">{item.quantity}× {item.name}{item.size ? ` (${item.size})` : ""}</span>
                        <span className="text-gold/60">{formatCurrency(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Totals */}
                <div className="border-t border-gold/10 pt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-cream/50"><span>Subtotal</span><span>{formatCurrency(selected.subtotal)}</span></div>
                  <div className="flex justify-between text-cream/50"><span>Tax</span><span>{formatCurrency(selected.tax)}</span></div>
                  <div className="flex justify-between font-semibold text-gold pt-1"><span>Total</span><span>{formatCurrency(selected.total)}</span></div>
                </div>

                {selected.notes && (
                  <div className="rounded border border-gold/15 p-3 text-xs">
                    <p className="text-gold/50 mb-1">Notes</p>
                    <p className="text-cream/70 italic">{selected.notes}</p>
                  </div>
                )}

                {/* Status update */}
                <div>
                  <p className="text-xs text-gold/50 uppercase tracking-wider mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        disabled={selected.status === s || updating === selected._id}
                        onClick={() => updateStatus(selected._id, s)}
                        className={`rounded-full border px-3 py-1 text-xs capitalize transition ${selected.status === s ? `${statusColors[s]} opacity-100` : "border-gold/20 text-cream/40 hover:text-cream hover:border-gold/40"} disabled:cursor-not-allowed`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}