"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminShell } from "./AdminShell";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Lead = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  source: string;
  createdAt: string;
  contacted: boolean;
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "< 1h ago";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function LeadSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-gold/10 bg-white/[0.02] p-4 animate-pulse">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-gold/10" />
              <div className="h-2 w-48 rounded bg-gold/5" />
              <div className="h-3 w-64 rounded bg-gold/10" />
            </div>
            <div className="h-7 w-24 rounded bg-gold/10 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`${BACKEND_URL}/api/admin/leads`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setLeads(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleContacted = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    const lead = leads.find((l) => l._id === id);
    if (!lead) return;
    const newVal = !lead.contacted;
    try {
      await fetch(`${BACKEND_URL}/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ contacted: newVal }),
      });
    } catch {}
    setLeads((prev) => prev.map((l) => l._id === id ? { ...l, contacted: newVal } : l));
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm text-gold/60">Customer Inquiries & Leads</h2>
          {!loading && (
            <span className="text-xs text-cream/30">{leads.filter((l) => !l.contacted).length} unread</span>
          )}
        </div>

        {loading ? (
          <LeadSkeleton />
        ) : (
          <div className="space-y-3">
            {leads.map((lead, i) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg border p-4 transition ${lead.contacted ? "border-gold/10 bg-white/[0.015] opacity-60" : "border-gold/20 bg-white/[0.03]"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-cream">{lead.name}</p>
                      {!lead.contacted && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                    </div>
                    <div className="flex gap-3 text-xs text-cream/40 mb-2">
                      {lead.email && <span>{lead.email}</span>}
                      {lead.phone && <span>{lead.phone}</span>}
                      <span>{timeAgo(lead.createdAt)}</span>
                      <span className="capitalize text-cream/25">{lead.source}</span>
                    </div>
                    <p className="text-sm text-cream/65">{lead.message}</p>
                  </div>
                  <button
                    onClick={() => toggleContacted(lead._id)}
                    className={`shrink-0 rounded border px-3 py-1.5 text-xs transition ${lead.contacted ? "border-cream/10 text-cream/30 hover:border-gold/30 hover:text-cream/60" : "border-green-800/40 text-green-400 hover:bg-green-900/10"}`}
                  >
                    {lead.contacted ? "Mark unread" : "Mark contacted"}
                  </button>
                </div>
              </motion.div>
            ))}
            {leads.length === 0 && (
              <p className="text-center py-12 text-cream/30 text-sm">No leads yet</p>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}