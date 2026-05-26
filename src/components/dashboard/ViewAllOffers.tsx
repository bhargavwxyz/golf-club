import { useState } from "react";
import { viewAllOffersSummary } from "@/data/offersMockData";

export function ViewAllOffers() {
  const [activeFilter, setActiveFilter] = useState(viewAllOffersSummary.filters[0]);

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{viewAllOffersSummary.title}</h3>
          <p className="text-[11px] text-slate-500">{viewAllOffersSummary.subtitle}</p>
        </div>
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
          Export CSV →
        </button>
      </div>

      <div className="flex items-center gap-2 px-5 py-3">
        {viewAllOffersSummary.filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
              activeFilter === filter
                ? "bg-orange-500 text-white shadow-sm"
                : "border border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-3 border-t border-slate-100 px-5 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
        <span>CONSUMER</span>
        <span>SLOT</span>
        <span>OFFER</span>
        <span>STATUS</span>
        <span className="text-right">TIME</span>
      </div>
      
      {/* Placeholder for actual data rows - you can map through data here */}
      <div className="px-5 py-8 text-center text-sm text-slate-400">
        No offers to display
      </div>
    </section>
  );
}