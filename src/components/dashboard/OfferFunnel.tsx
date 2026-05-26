import { offerFunnel, offerFunnelConversions } from "@/data/offersMockData";

export function OfferFunnel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Offer funnel — this month</h3>
        <p className="text-[11px] text-slate-500">Embed clicks → offers → revenue</p>
      </div>

      <div className="space-y-3 px-4 py-3">
        {offerFunnel.map((row) => (
          <div key={row.id} className="flex items-center gap-3">
            <p className="w-40 shrink-0 text-[11px] text-slate-600">{row.label}</p>
            <div className="relative h-1.5 flex-1 rounded-full bg-slate-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${row.percent}%`, backgroundColor: row.barColor }}
              />
            </div>
            <span className="w-16 text-right text-[11px] font-semibold text-slate-900">
              {row.value}
            </span>
            <span className="w-10 text-right text-[10px] text-slate-400">{row.percent}%</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2 text-[10px] text-slate-500">
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