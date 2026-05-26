// components/dashboard/KpiCards.tsx

import { kpiStats } from "@/data/offersMockData";

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiStats.map((stat) => (
        <div
          key={stat.id}
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 cursor-pointer"
        >
          {/* Top Accent */}
          <div
            className="h-[3px] w-full transition-all duration-200 group-hover:h-[4px]"
            style={{ backgroundColor: stat.accentColor }}
          />

          {/* Content */}
          <div className="relative p-4">
            {/* Icon — reduced opacity, brightens on hover */}
            <div className="absolute right-4 top-4 text-xl opacity-[0.07] transition-opacity duration-200 group-hover:opacity-[0.18]">
              {stat.icon}
            </div>

            {/* Label */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors duration-200 group-hover:text-slate-600">
              {stat.label}
            </p>

            {/* Main Value */}
            <h2
              className="mt-2 leading-none text-slate-900 transition-colors duration-200 group-hover:text-slate-800"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </h2>

            {/* Bottom Text */}
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
    </div>
  );
}