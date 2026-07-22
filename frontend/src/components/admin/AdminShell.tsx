"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/menu", label: "Menu", icon: "🍕" },
  { href: "/admin/deals", label: "Deals", icon: "🎉" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  // Jab tak auth check nahi hota — loading screen dikhao
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#090807] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl animate-pulse">👑</span>
          <p className="text-gold/40 text-sm tracking-widest uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#090807]">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex md:w-56 flex-col border-r border-gold/15 bg-[#0c0b09]">
        <div className="border-b border-gold/15 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">👑</span>
            <div>
              <p className="font-display text-sm text-gold leading-tight">Admin</p>
              <p className="text-[10px] text-cream/30">Bariis & Pizza</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                  active ? "bg-gold/10 text-gold" : "text-cream/50 hover:text-cream hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {active && (
                  <motion.span layoutId="admin-nav-active" className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gold/15 px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/40 hover:text-red-400 transition"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ ease }}
              className="fixed left-0 top-0 z-50 h-full w-56 border-r border-gold/15 bg-[#0c0b09] flex flex-col md:hidden"
            >
              <div className="border-b border-gold/15 px-5 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">👑</span>
                  <p className="font-display text-sm text-gold">Admin</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-cream/40 hover:text-cream">✕</button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${active ? "bg-gold/10 text-gold" : "text-cream/50 hover:text-cream hover:bg-white/[0.04]"}`}
                    >
                      <span>{item.icon}</span>{item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-gold/15 px-3 py-3">
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/40 hover:text-red-400 transition">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-gold/15 bg-[#0c0b09] px-5 py-3.5 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded border border-gold/25 text-cream/60 hover:text-gold"
          >
            ☰
          </button>
          <h1 className="font-display text-base text-gold capitalize">
            {nav.find((n) => n.href === pathname)?.label ?? "Admin"}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/" target="_blank" className="text-xs text-cream/30 hover:text-cream/60 transition">
              ← Back to site
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-5 md:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}