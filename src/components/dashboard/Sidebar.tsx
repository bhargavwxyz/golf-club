import { sidebarItems, type SidebarItem } from "@/data/offersMockData";
import { useSidebarState } from "./layout-context";

function groupItems(items: SidebarItem[]) {
  return items.reduce<Record<string, SidebarItem[]>>((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});
}

export function Sidebar() {
  const { open, setOpen } = useSidebarState();
  const groups = groupItems(sidebarItems);
  const groupOrder: SidebarItem["group"][] = ["OVERVIEW", "INTELLIGENCE", "SETTINGS"];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-60 shrink-0 flex-col bg-[#0b2545] text-slate-100 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${open ? "lg:flex" : "lg:hidden"}`}
      >
        {/* Brand */}
        <div className="px-5 pt-5 pb-6">
          <h1 className="text-base font-semibold tracking-tight text-white">Pinnacle Golf Club</h1>
          <p className="text-[11px] text-slate-400">Business Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3">
          {groupOrder.map((group) => (
            <div key={group} className="mb-5">
              <p className="px-3 pb-2 text-[10px] font-semibold tracking-widest text-slate-400">
                {group}
              </p>
              <ul className="space-y-1">
                {groups[group]?.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-[13px] transition-colors ${
                        item.active
                          ? "bg-[#0a1d3a] text-white"
                          : "text-slate-300 hover:bg-[#0a1d3a]/60 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-sm leading-none">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </span>
                      {item.badge !== undefined && (
                        <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Current plan card */}
        <div className="m-3 rounded-lg border border-slate-700/60 bg-[#0a1d3a] p-3">
          <p className="text-[10px] font-medium tracking-wider text-slate-400">CURRENT PLAN</p>
          <p className="mt-1 text-base font-semibold text-white">Pro Tier</p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-3/4 rounded-full bg-orange-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
