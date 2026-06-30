"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const DEFAULT_BACKEND_URL = "http://localhost:4000";
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");

function resolveBackendUrl() {
  if (typeof window === "undefined") return BACKEND_URL;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? DEFAULT_BACKEND_URL
    : BACKEND_URL;
}

export function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Email and password required."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${resolveBackendUrl()}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("admin_token", token);
        router.push("/admin/dashboard");
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.message ?? "Invalid credentials.");
      }
    } catch {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#090807]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="w-full max-w-sm"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <span className="text-3xl">👑</span>
          </div>
          <h1 className="font-display text-2xl text-gold">Admin Panel</h1>
          <p className="text-sm text-cream/40 mt-1">Bariis & Pizza House</p>
        </div>

        <div className="rounded-xl border border-gold/20 bg-white/[0.03] p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="admin@bariis.com"
              className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder-cream/25 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder-cream/25 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 rounded border border-red-500/20 bg-red-900/10 px-3 py-2">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="ribbon-red w-full rounded-md py-3 text-sm font-bold text-cream disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />
                Signing in…
              </span>
            ) : "Sign In"}
          </motion.button>

      
        </div>
      </motion.div>
    </div>
  );
}
