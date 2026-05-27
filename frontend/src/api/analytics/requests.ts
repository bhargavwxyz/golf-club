import { get } from "@/api/client";
import type { AnalyticsKpisResponse, AnalyticsFunnelResponse } from "./types";

export async function fetchKpis() {
  const response = await get<AnalyticsKpisResponse>("/api/analytics/kpis");

  if (!response || !response.ok) {
    throw new Error("Failed to load analytics KPIs from the server.");
  }

  return response.data;
}

// New funnel API call
export async function fetchFunnel() {
  const response = await get<AnalyticsFunnelResponse>("/api/analytics/funnel");

  if (!response || !response.ok) {
    throw new Error("Failed to load analytics funnel data from the server.");
  }

  return response.data;
}