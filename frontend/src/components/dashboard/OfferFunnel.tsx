import { useQuery } from "@tanstack/react-query";
import { fetchFunnel } from "@/api/analytics";
import type { FunnelRow, FunnelConversions } from "@/api/analytics";

export function OfferFunnel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analyticsFunnel"],
    queryFn: fetchFunnel,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Define bar colors for each row
  const getBarColor = (id: string) => {
    const colors: Record<string, string> = {
      "f-1": "#3b82f6", // blue
      "f-2": "#8b5cf6", // purple
      "f-3": "#10b981", // green
      "f-4": "#059669", // dark green
    };
    return colors[id] || "#94a3b8";
  };

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-900">Offer funnel — this month</h3>
          <p className="text-[11px] text-slate-500">Embed clicks → offers → revenue</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-slate-500">Loading funnel data...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-900">Offer funnel — this month</h3>
          <p className="text-[11px] text-slate-500">Embed clicks → offers → revenue</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-rose-600">
            {(error as Error).message}
          </div>
        </div>
      </section>
    );
  }

  // The data is already the funnel data structure, not wrapped in { ok, data }
  if (!data || !data.rows) {
    return null;
  }

  const funnelRows = data.rows;
  const conversions = data.conversions;
  const period = data.period.replace("_", " ");

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Offer funnel — {period}
        </h3>
        <p className="text-[11px] text-slate-500">Embed clicks → offers → revenue</p>
      </div>

      <div className="space-y-4 px-5 py-5">
        {funnelRows.map((row: FunnelRow) => {
          const isRevenue = row.id === "f-4";
          return (
            <div key={row.id} className="flex items-center gap-4">
              {/* Label */}
              <p className="w-44 shrink-0 text-[12px] text-slate-600">{row.label}</p>

              {/* Bar */}
              <div className="relative h-2.5 flex-1 rounded-full bg-slate-100">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ 
                    width: `${Math.min(row.percent, 100)}%`, 
                    backgroundColor: getBarColor(row.id) 
                  }}
                />
              </div>

              {/* Value */}
              <span
                className={`w-16 text-right text-[12px] font-semibold ${
                  isRevenue ? "text-green-600" : "text-slate-900"
                }`}
              >
                {row.id === "f-4" ? `$${row.value.toLocaleString()}` : row.value}
              </span>

              {/* Percent — hidden for revenue row */}
              {!isRevenue ? (
                <span className="w-10 text-right text-[11px] text-slate-400">{row.percent}%</span>
              ) : (
                <span className="w-10" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
        <span>
          Conversion click→offer:{" "}
          <span className="font-semibold text-slate-700">{conversions.click_to_offer}</span>
        </span>
        <span>
          Conversion offer→accepted:{" "}
          <span className="font-semibold text-slate-700">{conversions.offer_to_accepted}</span>
        </span>
      </div>
    </section>
  );
}