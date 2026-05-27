import { get } from "@/api/client";
import type { AnalyticsKpisResponse } from "./types";

export async function fetchKpis() {
  const response = await get<AnalyticsKpisResponse>("/api/analytics/kpis");

  if (!response || !response.ok) {
    throw new Error("Failed to load analytics KPIs from the server.");
  }

  return response.data;
}
