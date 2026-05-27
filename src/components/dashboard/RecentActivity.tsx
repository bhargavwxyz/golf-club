import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict } from "date-fns";
import { fetchAllOffers } from "@/api/offers";
import type { PendingOfferApi } from "@/api/offers";

function ActionIcon({ action }: { action: "accepted" | "declined" | "counter sent" }) {
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

function getActionType(status: string): "accepted" | "declined" | "counter sent" {
  if (status === "Accepted") return "accepted";
  if (status === "Declined") return "declined";
  return "counter sent";
}

function formatSlot(slot: PendingOfferApi["slot"]) {
  const start = new Date(slot.start_time);
  return format(start, "EEE h:mm a");
}

function getActivityTime(offer: PendingOfferApi) {
  const timestamp = offer.responded_at ?? offer.submitted_at ?? offer.created_at;
  return timestamp ? new Date(timestamp) : new Date();
}

export function RecentActivityCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allOffers"],
    queryFn: fetchAllOffers,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const recentOffers = useMemo(() => {
    if (!data) return [];

    return [...data]
      .sort((a, b) => getActivityTime(b).getTime() - getActivityTime(a).getTime())
      .slice(0, 6)
      .map((offer) => ({
        id: offer._id,
        name: offer.consumer.name,
        action: getActionType(offer.status),
        slot: formatSlot(offer.slot),
        amount: offer.amount,
        when: offer.responded_at
          ? formatDistanceToNowStrict(new Date(offer.responded_at), { addSuffix: true })
          : offer.submitted_at
          ? formatDistanceToNowStrict(new Date(offer.submitted_at), { addSuffix: true })
          : "just now",
      }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <div className="px-5 py-8 text-center text-sm text-slate-500">Loading recent activity from the offers API…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <div className="px-5 py-8 text-center text-sm text-rose-600">Unable to load recent activity.</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {recentOffers.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50/50 transition-colors">
            <div className="w-6 text-center">
              <ActionIcon action={item.action} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-medium text-slate-900">{item.name}</span>
              <span className="text-[11px] text-slate-500 ml-1">
                {item.action === "counter sent" ? "counter sent" : `offer ${item.action}`}
              </span>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 whitespace-nowrap">
              {item.slot}
            </span>
            <span className="w-14 text-right text-[12px] font-semibold text-green-600 whitespace-nowrap">
              +${item.amount.toLocaleString()}
            </span>
            <span className="w-16 text-right text-[10px] text-slate-400 whitespace-nowrap">
              {item.when}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
