"use client";

import { useEffect, useState } from "react";
import { PIZZA_DEALS, type PizzaDeal } from "@/data/menu";

const DEFAULT_BACKEND_URL = "http://localhost:4000";
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL).replace(/\/+$/, "");

function resolveBackendUrl() {
  if (typeof window === "undefined") return BACKEND_URL;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? DEFAULT_BACKEND_URL
    : BACKEND_URL;
}

export type ApiDeal = PizzaDeal & { group: "bundle" | "combo" | "weekday" };

type ApiDealResponse = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  group: "bundle" | "combo" | "weekday";
  availableDays?: string[];
  orderableOnline?: boolean;
};

/**
 * Deals are admin-managed (see /admin/deals). This hook fetches the live list;
 * if the backend is unreachable it falls back to the bundled static list so the
 * page still renders something during local dev / outages.
 */
export function useDeals() {
  const [deals, setDeals] = useState<ApiDeal[]>(
    PIZZA_DEALS.map((d) => ({ ...d, group: "combo" as const }))
  );
  const [source, setSource] = useState<"api" | "static">("static");

  useEffect(() => {
    let cancelled = false;
    fetch(`${resolveBackendUrl()}/api/deals`)
      .then((r) => r.json())
      .then((data: ApiDealResponse[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setDeals(
          data.map((d) => ({
            id: d._id,
            title: d.title,
            price: d.price,
            description: d.description,
            image: d.image,
            imageAlt: d.imageAlt,
            badge: d.badge,
            group: d.group,
            availableDays: d.availableDays,
            orderableOnline: d.orderableOnline,
          }))
        );
        setSource("api");
      })
      .catch(() => {
        // stays on the static fallback already in state
      });
    return () => { cancelled = true; };
  }, []);

  return { deals, source };
}
