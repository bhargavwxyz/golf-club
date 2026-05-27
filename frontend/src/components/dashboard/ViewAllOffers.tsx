import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict } from "date-fns";
import { fetchAllOffers } from "@/api/offers";
import type { PendingOfferApi as OfferApi } from "@/api/offers";

const filterOptions = ["All", "Accepted", "Countered", "Declined"] as const;

type OfferFilter = (typeof filterOptions)[number];

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function normalizeConsumerType(type: string) {
  return type.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatSlot(slot: OfferApi["slot"]) {
  const start = new Date(slot.start_time);
  const end = new Date(slot.end_time);
  return `${format(start, "EEE h:mm a")} – ${format(end, "h:mm a")}`;
}

function getSubmittedAgo(submittedAt: string | null) {
  if (!submittedAt) return "Submitted unknown";
  return `Submitted ${formatDistanceToNowStrict(new Date(submittedAt), { addSuffix: true })}`;
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Accepted":
      return "bg-emerald-100 text-emerald-700";
    case "Countered":
      return "bg-amber-100 text-amber-700";
    case "Declined":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function ViewAllOffers() {
  const [activeFilter, setActiveFilter] = useState<OfferFilter>(filterOptions[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["allOffers"],
    queryFn: fetchAllOffers,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const allOffers = useMemo(() => data ?? [], [data]);

  const filteredOffers = useMemo(
    () =>
      activeFilter === "All"
        ? allOffers
        : allOffers.filter((offer) => offer.status === activeFilter),
    [activeFilter, allOffers],
  );

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <h3 className="text-sm font-semibold text-slate-900">View All Offers</h3>
          <p className="text-[11px] text-slate-500">Loading offers from the backend…</p>
        </div>
        <div className="px-5 py-8 text-center text-sm text-slate-500">Fetching offer data now. Please wait.</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <h3 className="text-sm font-semibold text-slate-900">View All Offers</h3>
          <p className="text-[11px] text-slate-500">Unable to load offers right now.</p>
        </div>
        <div className="px-5 py-8 text-center text-sm text-rose-600">{(error as Error).message}</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">View All Offers</h3>
          <p className="text-[11px] text-slate-500">Showing {filteredOffers.length} of {allOffers.length} offers from the backend.</p>
        </div>
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
          Export CSV →
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-5 py-3">
        {filterOptions.map((filter) => (
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

      <table className="w-full border-t border-slate-100 text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80">
            <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">CONSUMER</th>
            <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">SLOT</th>
            <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">OFFER</th>
            <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">STATUS</th>
            <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">TIME</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredOffers.map((offer) => (
            <tr key={offer._id} className="hover:bg-slate-50/70">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: offer.consumer.avatar_color }}
                  >
                    {getInitials(offer.consumer.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{offer.consumer.name}</p>
                    <p className="text-[11px] text-slate-500">{offer.consumer.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-[12px] font-semibold text-slate-900">{formatSlot(offer.slot)}</p>
                <p className="text-[11px] text-slate-500">{normalizeConsumerType(offer.consumer.consumer_type)}</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">${offer.amount.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500">{offer.player_count} players</p>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusStyles(offer.status)}`}>
                  {offer.status}
                </span>
              </td>
              <td className="px-5 py-4 text-[11px] text-slate-500">{getSubmittedAgo(offer.submitted_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOffers.length === 0 && (
        <div className="px-5 py-8 text-center text-sm text-slate-500">No offers match the selected filter.</div>
      )}
    </section>
  );
}
