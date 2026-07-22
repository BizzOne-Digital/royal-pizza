"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const DEFAULT_BACKEND_URL = "http://localhost:4000";
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");

function resolveBackendUrl() {
  if (typeof window === "undefined") return BACKEND_URL;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? DEFAULT_BACKEND_URL
    : BACKEND_URL;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type CustomerAuthContextType = {
  customer: Customer | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
};

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("customer_token");
    if (!saved) { setLoading(false); return; }
    setToken(saved);
    fetch(`${resolveBackendUrl()}/api/customers/me`, {
      headers: { Authorization: `Bearer ${saved}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setCustomer(d); else localStorage.removeItem("customer_token"); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${resolveBackendUrl()}/api/customers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, message: data.message ?? "Invalid credentials." };
      localStorage.setItem("customer_token", data.token);
      setToken(data.token);
      setCustomer(data.customer);
      return { ok: true };
    } catch {
      return { ok: false, message: "Could not reach the server." };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    try {
      const res = await fetch(`${resolveBackendUrl()}/api/customers/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, message: data.message ?? "Could not create account." };
      localStorage.setItem("customer_token", data.token);
      setToken(data.token);
      setCustomer(data.customer);
      return { ok: true };
    } catch {
      return { ok: false, message: "Could not reach the server." };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("customer_token");
    setToken(null);
    setCustomer(null);
  }, []);

  return (
    <CustomerAuthContext.Provider value={{ customer, token, loading, login, signup, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
