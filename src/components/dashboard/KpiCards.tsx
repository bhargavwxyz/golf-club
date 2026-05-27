// components/dashboard/KpiCards.tsx

import { useQuery } from "@tanstack/react-query";
import { fetchKpis } from "@/api/analytics";
import type { AnalyticsKpiMetric } from "@/api/analytics";

const kpiCardConfig = [
  {
    key: "pending_offers" as const,
    id: "pending",
    label: "PENDING OFFERS",
    icon: "✉️",
    accentColor: "#f97316",
    formatValue: (metric: AnalyticsKpiMetric) => `${metric.value}`,
  },
  {
    key: "revenue_this_week" as const,
    id: "revenue",
    label: "REVENUE THIS WEEK",
    icon: "💰",
    accentColor: "#16a34a",
    formatValue: (metric: AnalyticsKpiMetric) => `$${metric.value}`,
  },
  {
    key: "acceptance_rate" as const,
    id: "acceptance",
    label: "ACCEPTANCE RATE",
    icon: "☑️",
    accentColor: "#2563eb",
    formatValue: (metric: AnalyticsKpiMetric) => `${metric.value}%`,
  },
  {
    key: "avg_response_time_minutes" as const,
    id: "response",
    label: "AVG RESPONSE TIME",
    icon: "⚡",
    accentColor: "#f59e0b",
    formatValue: (metric: AnalyticsKpiMetric) => `${metric.value}m`,
  },
];

export function KpiCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analyticsKpis"],
    queryFn: fetchKpis,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const cards = kpiCardConfig.map((config) => {
    const metric = data?.[config.key];

    return {
      ...config,
      value: metric ? config.formatValue(metric) : "—",
      helper: metric?.helper ?? undefined,
      trend: metric?.trend ?? undefined,
    };
  });

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((stat) => (
        <div
          key={stat.id}
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 cursor-pointer"
        >
          <div
            className="h-[3px] w-full transition-all duration-200 group-hover:h-[4px]"
            style={{ backgroundColor: stat.accentColor }}
          />

          <div className="relative p-4">
            <div className="absolute right-4 top-4 text-xl opacity-[0.07] transition-opacity duration-200 group-hover:opacity-[0.18]">
              {stat.icon}
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors duration-200 group-hover:text-slate-600">
              {stat.label}
            </p>

            <h2
              className="mt-2 leading-none text-slate-900 transition-colors duration-200 group-hover:text-slate-800"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-0.02em",
              }}
            >
              {isLoading ? "..." : stat.value}
            </h2>

            <div className="mt-2 space-y-0.5">
              {stat.helper && (
                <p className="text-xs text-slate-500 transition-colors duration-200 group-hover:text-slate-600">
                  {stat.helper}
                </p>
              )}

              {stat.trend?.direction === "up" && (
                <p className="text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:text-emerald-600">
                  ↑ {stat.trend.text}
                </p>
              )}

              {stat.trend?.direction === "down" && (
                <p className="text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:text-blue-600">
                  ↓ {stat.trend.text}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {error && (
        <div className="col-span-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 lg:col-span-4">
          Unable to load analytics data.
        </div>
      )}
    </div>
  );
}
