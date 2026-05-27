import { offerFunnel, offerFunnelConversions } from "@/data/offersMockData";

export function OfferFunnel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">Offer funnel — this month</h3>
        <p className="text-[11px] text-slate-500">Embed clicks → offers → revenue</p>
      </div>

      <div className="space-y-4 px-5 py-5">
        {offerFunnel.map((row) => {
          const isRevenue = row.id === "f-4";
          return (
            <div key={row.id} className="flex items-center gap-4">
              {/* Label */}
              <p className="w-44 shrink-0 text-[12px] text-slate-600">{row.label}</p>

              {/* Bar */}
              <div className="relative h-2.5 flex-1 rounded-full bg-slate-100">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${row.percent}%`, backgroundColor: row.barColor }}
                />
              </div>

              {/* Value */}
              <span
                className={`w-16 text-right text-[12px] font-semibold ${
                  isRevenue ? "text-green-600" : "text-slate-900"
                }`}
              >
                {row.value}
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
          <span className="font-semibold text-slate-700">{offerFunnelConversions.clickToOffer}</span>
        </span>
        <span>
          Conversion offer→accepted:{" "}
          <span className="font-semibold text-slate-700">{offerFunnelConversions.offerToAccepted}</span>
        </span>
      </div>
    </section>
  );
}