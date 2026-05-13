"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminShell } from "./AdminShell";
import { formatCurrency } from "@/lib/format";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://royal-pizza-api-git-main-bizzone-digitals-projects.vercel.app";

type Stats = {
  totalOrders: number;
  pendingOrders: number;
  todayRevenue: number;
  totalRevenue: number;
  topItems: { name: string; count: number }[];
  recentOrders: {
    _id: string;
    customer: { name: string };
    total: number;
    status: string;
    createdAt: string;
  }[];
};

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

export function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    topItems: [],
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    fetch(`${BACKEND_URL}/api/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed");
        }

        return res.json();
      })
      .then((data) => {
        setStats({
          totalOrders: data.totalOrders || 0,
          pendingOrders: data.pendingOrders || 0,
          todayRevenue: data.todayRevenue || 0,
          totalRevenue: data.totalRevenue || 0,
          topItems: data.topItems || [],
          recentOrders: data.recentOrders || [],
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: "🧾",
      color: "text-gold",
    },
    {
      label: "Pending",
      value: stats.pendingOrders.toString(),
      icon: "⏳",
      color: "text-yellow-400",
    },
    {
      label: "Today's Revenue",
      value: formatCurrency(stats.todayRevenue),
      icon: "💰",
      color: "text-green-400",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: "📈",
      color: "text-gold",
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-lg border border-gold/15 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-cream/40 uppercase tracking-wider">
                  {card.label}
                </span>

                <span className="text-xl">{card.icon}</span>
              </div>

              <p className={`font-display text-2xl ${card.color}`}>
                {loading ? "..." : card.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg border border-gold/15 bg-white/[0.02] p-5">
            <h2 className="font-display text-sm text-gold/70 mb-4">
              Recent Orders
            </h2>

            <div className="space-y-2">
              {stats.recentOrders.length === 0 ? (
                <p className="text-sm text-cream/40">
                  No recent orders
                </p>
              ) : (
                stats.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between rounded-md border border-gold/10 bg-white/[0.02] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-cream">
                        {order.customer.name}
                      </p>

                      <p className="text-xs text-cream/35">
                        {timeAgo(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${
                          statusColors[order.status] ?? ""
                        }`}
                      >
                        {order.status}
                      </span>

                      <span className="text-sm font-semibold text-gold">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gold/15 bg-white/[0.02] p-5">
            <h2 className="font-display text-sm text-gold/70 mb-4">
              Top Items
            </h2>

            <div className="space-y-3">
              {stats.topItems.length === 0 ? (
                <p className="text-sm text-cream/40">
                  No items yet
                </p>
              ) : (
                stats.topItems.map((item, i) => {
                  const max = stats.topItems[0].count;
                  const pct = Math.round((item.count / max) * 100);

                  return (
                    <div key={item.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-cream/70 truncate max-w-[160px]">
                          {item.name}
                        </span>

                        <span className="text-gold/60 ml-2">
                          {item.count}
                        </span>
                      </div>

                      <div className="h-1.5 rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{
                            delay: i * 0.1 + 0.3,
                            duration: 0.6,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}