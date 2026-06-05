"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AdminShell } from "./AdminShell";
import { formatCurrency } from "@/lib/format";
import { SPECIALTY_PIZZAS, SIGNATURE_PIZZAS, SUBS, SANDWICHES, WINGS, PASTAS, SIGNATURE_PASTAS, STARTERS } from "@/data/menu";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  available: boolean;
};

const INITIAL_ITEMS: MenuItem[] = [
  ...STARTERS.slice(0, 3).map((s) => ({ _id: s.id, name: s.name, category: "starter", price: s.price ?? 0, description: s.description, available: true })),
  ...SPECIALTY_PIZZAS.slice(0, 4).map((p) => ({ _id: p.id, name: p.name, category: "pizza", price: p.prices.M, description: p.toppings, available: true })),
  ...SIGNATURE_PIZZAS.slice(0, 2).map((p) => ({ _id: p.id, name: p.name, category: "signature-pizza", price: p.prices.S, description: p.toppings, available: true })),
  ...SANDWICHES.map((s) => ({ _id: s.id, name: s.name, category: "sandwich", price: s.price ?? 0, description: s.description, available: true })),
  ...SUBS.slice(0, 3).map((s) => ({ _id: s.id, name: s.name, category: "sub", price: s.price ?? 0, description: s.description, available: true })),
  ...WINGS.slice(0, 2).map((w) => ({ _id: w.id, name: w.name, category: "wings", price: w.price ?? 0, available: true })),
  ...PASTAS.map((p) => ({ _id: p.id, name: p.name, category: "pasta", price: p.price ?? 0, description: p.description, available: true })),
  ...SIGNATURE_PASTAS.map((p) => ({ _id: p.id, name: p.name, category: "signature-pasta", price: p.price ?? 0, description: p.description, available: true })),
];

const ease = [0.22, 1, 0.36, 1] as const;

type ItemForm = { name: string; category: string; price: string; description: string; imageUrl: string };

const BLANK: ItemForm = { name: "", category: "pizza", price: "", description: "", imageUrl: "" };
const CATEGORIES = ["pizza", "sub", "wings", "pasta", "sides", "drinks", "desserts"];

export function AdminMenuClient() {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState<ItemForm>(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`${BACKEND_URL}/api/admin/menu`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setItems(d); })
      .catch(() => {});
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const openAdd = () => { setForm(BLANK); setEditId(null); setModalOpen(true); };
  const openEdit = (item: MenuItem) => {
    setForm({ name: item.name, category: item.category, price: item.price.toString(), description: item.description ?? "", imageUrl: item.imageUrl ?? "" });
    setEditId(item._id);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    const payload = { name: form.name, category: form.category, price: parseFloat(form.price), description: form.description, imageUrl: form.imageUrl, available: true };

    try {
      const url = editId ? `${BACKEND_URL}/api/admin/menu/${editId}` : `${BACKEND_URL}/api/admin/menu`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        if (editId) {
          setItems((prev) => prev.map((i) => i._id === editId ? saved : i));
        } else {
          setItems((prev) => [saved, ...prev]);
        }
        showToast(editId ? "Item updated!" : "Item added!");
      }
    } catch {
      // Demo mode
      if (editId) {
        setItems((prev) => prev.map((i) => i._id === editId ? { ...i, ...payload } : i));
      } else {
        const newItem: MenuItem = { _id: Date.now().toString(), ...payload };
        setItems((prev) => [newItem, ...prev]);
      }
      showToast(editId ? "Item updated!" : "Item added!");
    } finally {
      setSaving(false);
      setModalOpen(false);
    }
  };

  const toggleAvailable = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    const item = items.find((i) => i._id === id);
    if (!item) return;
    const newVal = !item.available;
    try {
      await fetch(`${BACKEND_URL}/api/admin/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ available: newVal }),
      });
    } catch {}
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, available: newVal } : i));
    showToast(newVal ? "Item enabled" : "Item disabled");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`${BACKEND_URL}/api/admin/menu/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setItems((prev) => prev.filter((i) => i._id !== id));
    showToast("Item deleted");
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <AdminShell>
      <div className="space-y-5">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {["all", ...CATEGORIES].map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`rounded-full border px-3 py-1 text-xs capitalize transition ${filter === c ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-cream/50 hover:text-cream"}`}
              >{c}</button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={openAdd}
            className="ribbon-red rounded-md px-4 py-2 text-xs font-bold text-cream"
          >
            + Add Item
          </motion.button>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`rounded-lg border p-4 transition ${item.available ? "border-gold/15 bg-white/[0.02]" : "border-cream/10 bg-white/[0.01] opacity-50"}`}
              >
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.name} className="w-full h-28 object-cover rounded mb-3" />
                )}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-cream truncate">{item.name}</p>
                    <p className="text-xs text-cream/40 capitalize">{item.category}</p>
                    {item.description && <p className="text-xs text-cream/35 mt-1 line-clamp-2">{item.description}</p>}
                  </div>
                  <span className="text-sm font-bold text-gold shrink-0">{formatCurrency(item.price)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => toggleAvailable(item._id)}
                    className={`text-xs px-2.5 py-1 rounded border transition ${item.available ? "border-green-800/40 text-green-400 hover:bg-red-900/10 hover:text-red-400 hover:border-red-800/40" : "border-yellow-800/40 text-yellow-400"}`}
                  >
                    {item.available ? "✓ Active" : "✗ Hidden"}
                  </button>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="text-xs px-2 py-1 rounded border border-gold/20 text-cream/50 hover:text-gold hover:border-gold/40 transition">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-xs px-2 py-1 rounded border border-red-800/30 text-red-400/60 hover:text-red-400 hover:border-red-800/60 transition">Del</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              className="fixed inset-x-4 top-1/2 z-50 max-w-md mx-auto -translate-y-1/2 rounded-xl border border-gold/25 bg-[#0f0d0a] p-6"
            >
              <h3 className="font-display text-lg text-gold mb-5">{editId ? "Edit Item" : "Add Menu Item"}</h3>
              <div className="space-y-4">
                <div>
                  <label className="admin-label">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" placeholder="Item name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="admin-label">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input capitalize">
                      {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0f0d0a]">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Price *</label>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input" type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input min-h-[72px] resize-none" placeholder="Ingredients, details…" />
                </div>
                <div>
                  <label className="admin-label">Image URL (or Cloudinary)</label>
                  <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="admin-input" placeholder="https://…" />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setModalOpen(false)} className="flex-1 rounded-md border border-gold/20 py-2.5 text-sm text-cream/60 hover:text-cream transition">Cancel</button>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSave} disabled={saving}
                    className="flex-1 ribbon-red rounded-md py-2.5 text-sm font-bold text-cream disabled:opacity-60"
                  >
                    {saving ? "Saving…" : editId ? "Update" : "Add Item"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
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