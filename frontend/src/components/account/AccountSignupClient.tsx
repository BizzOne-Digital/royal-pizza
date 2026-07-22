"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";

const ease = [0.22, 1, 0.36, 1] as const;

export function AccountSignupClient() {
  const { signup } = useCustomerAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) { setError("Name, email, and password are required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const result = await signup(name, email, password, phone || undefined);
    setLoading(false);
    if (result.ok) {
      router.push("/account/orders");
    } else {
      setError(result.message ?? "Could not create account.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl text-gold">Create an Account</h1>
          <p className="text-sm text-cream/50 mt-1">Track your orders and check out faster next time.</p>
        </div>

        <div className="rounded-xl border border-gold/20 bg-white/[0.03] p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder-cream/25 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder-cream/25 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Phone (optional)</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(905) 555-0123"
              className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder-cream/25 outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold/60 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              placeholder="At least 6 characters"
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
            onClick={handleSignup}
            disabled={loading}
            className="ribbon-red w-full rounded-md py-3 text-sm font-bold text-cream disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create Account"}
          </motion.button>

          <p className="text-center text-xs text-cream/50">
            Already have an account?{" "}
            <Link href="/account/login" className="text-gold underline-offset-2 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
