"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AdminShell } from "./AdminShell";
import { formatCurrency } from "@/lib/format";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const GROUPS = ["bundle", "combo", "weekday"] as const;

type Deal = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  group: (typeof GROUPS)[number];
  availableDays: string[];
  orderableOnline: boolean;
  active: boolean;
};

type DealForm = {
  title: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  group: (typeof GROUPS)[number];
  availableDays: string[];
  orderableOnline: boolean;
};

const BLANK: DealForm = {
  title: "",
  price: "",
  description: "",
  image: "",
  imageAlt: "",
  badge: "",
  group: "combo",
  availableDays: [],
  orderableOnline: true,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AdminDealsClient() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [form, setForm] = useState<DealForm>(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`${BACKEND_URL}/api/admin/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setDeals(d); })
      .catch(() => {});
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const openAdd = () => { setForm(BLANK); setEditId(null); setModalOpen(true); };
  const openEdit = (d: Deal) => {
    setForm({
      title: d.title,
      price: d.price.toString(),
      description: d.description ?? "",
      image: d.image ?? "",
      imageAlt: d.imageAlt ?? "",
      badge: d.badge ?? "",
      group: d.group ?? "combo",
      availableDays: d.availableDays ?? [],
      orderableOnline: d.orderableOnline ?? true,
    });
    setEditId(d._id);
    setModalOpen(true);
  };

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.price) return;
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    const payload = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      image: form.image,
      imageAlt: form.imageAlt,
      badge: form.badge || undefined,
      group: form.group,
      availableDays: form.availableDays,
      orderableOnline: form.orderableOnline,
      active: true,
    };

    try {
      const url = editId ? `${BACKEND_URL}/api/admin/deals/${editId}` : `${BACKEND_URL}/api/admin/deals`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        setDeals((prev) => editId ? prev.map((d) => d._id === editId ? saved : d) : [saved, ...prev]);
        showToast(editId ? "Deal updated!" : "Deal added!");
      }
    } catch {
      showToast("Could not reach the server — check your connection.");
    } finally {
      setSaving(false);
      setModalOpen(false);
    }
  };

  const toggleActive = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    const deal = deals.find((d) => d._id === id);
    if (!deal) return;
    const newVal = !deal.active;
    try {
      await fetch(`${BACKEND_URL}/api/admin/deals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ active: newVal }),
      });
    } catch {}
    setDeals((prev) => prev.map((d) => d._id === id ? { ...d, active: newVal } : d));
    showToast(newVal ? "Deal enabled" : "Deal disabled");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deal?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`${BACKEND_URL}/api/admin/deals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setDeals((prev) => prev.filter((d) => d._id !== id));
    showToast("Deal deleted");
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-cream/50">Deals shown here also appear on the public Pizza Deals page — including weekday-only specials.</p>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={openAdd}
            className="ribbon-red rounded-md px-4 py-2 text-xs font-bold text-cream"
          >
            + Add Deal
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence>
            {deals.map((deal) => (
              <motion.div key={deal._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`rounded-lg border p-4 transition ${deal.active ? "border-gold/15 bg-white/[0.02]" : "border-cream/10 bg-white/[0.01] opacity-50"}`}
              >
                {deal.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={deal.image} alt={deal.imageAlt} className="w-full h-28 object-cover rounded mb-3" />
                )}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-cream truncate">{deal.title}</p>
                    <p className="text-xs text-cream/40 capitalize">{deal.group}{deal.badge ? ` · ${deal.badge}` : ""}</p>
                    {deal.description && <p className="text-xs text-cream/35 mt-1 line-clamp-2">{deal.description}</p>}
                    {deal.availableDays?.length > 0 && (
                      <p className="text-[11px] text-royal-red/80 mt-1 font-semibold">{deal.availableDays.join(", ")}</p>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gold shrink-0">{formatCurrency(deal.price)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => toggleActive(deal._id)}
                    className={`text-xs px-2.5 py-1 rounded border transition ${deal.active ? "border-green-800/40 text-green-400 hover:bg-red-900/10 hover:text-red-400 hover:border-red-800/40" : "border-yellow-800/40 text-yellow-400"}`}
                  >
                    {deal.active ? "✓ Active" : "✗ Hidden"}
                  </button>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(deal)} className="text-xs px-2 py-1 rounded border border-gold/20 text-cream/50 hover:text-gold hover:border-gold/40 transition">Edit</button>
                    <button onClick={() => handleDelete(deal._id)} className="text-xs px-2 py-1 rounded border border-red-800/30 text-red-400/60 hover:text-red-400 hover:border-red-800/60 transition">Del</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {deals.length === 0 && (
            <p className="text-sm text-cream/40 col-span-full">No deals yet — add one to get started.</p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ ease }}
              className="fixed inset-x-4 top-1/2 z-50 max-w-lg mx-auto -translate-y-1/2 max-h-[85vh] overflow-y-auto rounded-xl border border-gold/25 bg-[#0f0d0a] p-6"
            >
              <h3 className="font-display text-lg text-gold mb-5">{editId ? "Edit Deal" : "Add Deal"}</h3>
              <div className="space-y-4">
                <div>
                  <label className="admin-label">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" placeholder="e.g. Wednesday Wing Night" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="admin-label">Price *</label>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="admin-label">Group</label>
                    <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value as DealForm["group"] })} className="admin-input capitalize">
                      {GROUPS.map((g) => <option key={g} value={g} className="bg-[#0f0d0a]">{g}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input min-h-[60px] resize-none" placeholder="What's included…" />
                </div>
                <div>
                  <label className="admin-label">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="admin-input" placeholder="https://…" />
                </div>
                <div>
                  <label className="admin-label">Badge (optional)</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="admin-input" placeholder="e.g. Popular, Fan Favourite" />
                </div>
                <div>
                  <label className="admin-label">Available Days <span className="normal-case text-cream/30">(leave all unchecked = every day)</span></label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {WEEKDAYS.map((day) => (
                      <button key={day} type="button" onClick={() => toggleDay(day)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${form.availableDays.includes(day) ? "border-gold bg-gold/18 text-gold font-semibold" : "border-gold/20 text-cream/50 hover:border-gold/40"}`}
                      >{day.slice(0, 3)}</button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-cream/70">
                  <input type="checkbox" checked={form.orderableOnline} onChange={(e) => setForm({ ...form, orderableOnline: e.target.checked })} />
                  Orderable online (adds an Add to Cart button)
                </label>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setModalOpen(false)} className="flex-1 rounded-md border border-gold/20 py-2.5 text-sm text-cream/60 hover:text-cream transition">Cancel</button>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSave} disabled={saving}
                    className="flex-1 ribbon-red rounded-md py-2.5 text-sm font-bold text-cream disabled:opacity-60"
                  >
                    {saving ? "Saving…" : editId ? "Update" : "Add Deal"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-full border border-gold/30 bg-[#1a1710] px-5 py-2.5 text-sm text-gold shadow-lg"
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .admin-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(201,154,58,0.6); margin-bottom: 5px; }
        .admin-input { width: 100%; border-radius: 6px; border: 1px solid rgba(201,154,58,0.2); background: rgba(255,255,255,0.03); padding: 10px 14px; font-size: 13px; color: #f6e8c8; outline: none; transition: border-color 0.2s; }
        .admin-input:focus { border-color: rgba(201,154,58,0.5); }
        .admin-input::placeholder { color: rgba(246,232,200,0.2); }
      `}</style>
    </AdminShell>
  );
}
