import { useSidebarState } from "./layout-context";

export function Topbar() {
  const { toggle } = useSidebarState();
  return (
    <header className="flex shrink-0 flex-nowrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5 lg:px-6">
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={toggle}
        className="shrink-0 rounded-md p-2 text-slate-600 hover:bg-slate-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="min-w-0 shrink">
        <h2 className="truncate text-lg font-semibold leading-tight text-slate-900">Offers</h2>
        <p className="truncate text-[11px] text-slate-500">
          4 pending · respond within 2 hrs for best conversion
        </p>
      </div>

      <div className="ml-auto flex shrink-0 flex-nowrap items-center gap-2">
        {/* Preview as pills */}
        <div className="hidden shrink-0 items-center gap-1 rounded-full border border-slate-200 px-1.5 py-0.5 sm:flex">
          <span className="px-1.5 text-[10px] font-semibold tracking-wider text-slate-500">
            PREVIEW AS
          </span>
          <button className="rounded-full px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100">
            Free
          </button>
          <button className="rounded-full px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100">
            Growth
          </button>
          <button className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            Pro
          </button>
        </div>

        {/* Embed live */}
        <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 xl:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="whitespace-nowrap">Embed live on pinnaclegolfclub.com</span>
        </div>

        {/* Currency */}
        <button className="hidden shrink-0 items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-700 md:flex">
          USD ($)
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
          SM
        </div>
      </div>
    </header>
  );
}
