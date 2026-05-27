import { recentActivity, type RecentActivity as Activity } from "@/data/offersMockData";

function ActionIcon({ action }: { action: Activity["action"] }) {
  if (action === "accepted") return <span className="text-green-600 text-sm">✓</span>;
  if (action === "declined") return <span className="text-slate-400 text-sm">—</span>;
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3b82f6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 10 4 15 9 20" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);
}

export function RecentActivityCard() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50/50 transition-colors">
            {/* Action Icon */}
            <div className="w-6 text-center">
              <ActionIcon action={item.action} />
            </div>
            
            {/* Name and Action */}
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-medium text-slate-900">{item.name}</span>
              <span className="text-[11px] text-slate-500 ml-1">
                {item.action === "counter sent" ? "counter sent" : `offer ${item.action}`}
              </span>
            </div>
            
            {/* Slot */}
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 whitespace-nowrap">
              {item.slot}
            </span>
            
            {/* Amount */}
            <span className="w-14 text-right text-[12px] font-semibold text-green-600 whitespace-nowrap">
              +${item.amount}
            </span>
            
            {/* Time */}
            <span className="w-16 text-right text-[10px] text-slate-400 whitespace-nowrap">
              {item.when}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}