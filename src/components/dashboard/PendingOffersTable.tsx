import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict } from "date-fns";
import { fetchPendingOffers, acceptOffer } from "@/api/offers";
import type { PendingOfferApi } from "@/api/offers";

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function normalizeConsumerType(type: string) {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ReliabilityBadge({ consumer }: { consumer: PendingOfferApi["consumer"] }) {
  if (consumer.reliability_tier === "VIP") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
        ⭐ {consumer.reliability_score} VIP
      </span>
    );
  }
  if (consumer.reliability_tier === "Trusted") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
        ✓ {consumer.reliability_score} Trusted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
      — {consumer.reliability_score} Standard
    </span>
  );
}

function formatSlot(slot: PendingOfferApi["slot"]) {
  const start = new Date(slot.start_time);
  const end = new Date(slot.end_time);
  return `${format(start, "EEE h:mm a")}–${format(end, "h:mm a")}`;
}

function getSubmittedAgo(submittedAt: string | null) {
  if (!submittedAt) return "Submitted unknown";
  return `Submitted ${formatDistanceToNowStrict(new Date(submittedAt), { addSuffix: true })}`;
}

export function PendingOffersTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pendingOffers"],
    queryFn: fetchPendingOffers,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const pendingOffers = useMemo(() => data ?? [], [data]);
  const offerCount = pendingOffers.length;
  const queryClient = useQueryClient();
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const acceptMutation = useMutation({
    mutationFn: (id: string) => acceptOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingOffers"] });
      queryClient.invalidateQueries({ queryKey: ["analyticsKpis"] });
    },
    onError: (err) => console.error(err),
  });

  function handleAccept(id: string) {
    setAcceptingId(id);
    acceptMutation.mutate(id, {
      onSettled() {
        setAcceptingId(null);
      },
    });
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Pending Offers</h3>
          <p className="text-[11px] text-slate-500">Loading offers from the backend…</p>
        </div>
        <div className="px-5 py-8 text-center text-sm text-slate-500">Fetching pending offers now. Please wait.</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Pending Offers</h3>
          <p className="text-[11px] text-slate-500">Unable to load pending offers right now.</p>
        </div>
        <div className="px-5 py-8 text-center text-sm text-rose-600">
          {(error as Error).message}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Pending Offers</h3>
        <p className="text-[11px] text-slate-500">{offerCount} offers waiting · respond within 2 hrs for best conversion</p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/50">
            <th className="px-4 py-2 text-left text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">CONSUMER</th>
            <th className="px-3 py-2 text-left text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">CONSUMER RELIABILITY SCORE</th>
            <th className="px-3 py-2 text-left text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">SLOT</th>
            <th className="px-3 py-2 text-left text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">OFFER</th>
            <th className="px-3 py-2 text-left text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">STATUS</th>
            <th className="px-4 py-2 text-right text-[9px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pendingOffers.map((offer) => (
            <tr key={offer._id} className="transition-colors duration-150 hover:bg-slate-50/60">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: offer.consumer.avatar_color }}
                  >
                    {getInitials(offer.consumer.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="text-[12px] font-semibold text-slate-900">{offer.consumer.name}</span>
                      <span className="text-[10px] opacity-40">🔒</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap text-[10px] text-slate-500">
                      <span>{normalizeConsumerType(offer.consumer.consumer_type)}</span>
                      {offer.consumer.via_source && (
                        <>
                          <span>·</span>
                          <span className="rounded bg-green-50 px-1 py-0.5 text-[9px] font-medium text-green-700">
                            {offer.consumer.via_source}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-3 py-3 whitespace-nowrap">
                <ReliabilityBadge consumer={offer.consumer} />
              </td>

              <td className="px-3 py-3 whitespace-nowrap">
                <span className="whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {formatSlot(offer.slot)}
                </span>
              </td>

              <td className="px-3 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-bold text-green-600">+${offer.amount}</span>
                  {offer.loyalty_tag && (
                    <span className="rounded bg-purple-50 px-1 py-0.5 text-[9px] font-medium text-purple-700 whitespace-nowrap">
                      ✈ {offer.loyalty_tag}
                    </span>
                  )}
                </div>
              </td>

              <td className="px-3 py-3 whitespace-nowrap">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  {offer.status}
                </span>
                <div className="mt-0.5 text-[9px] text-slate-400 whitespace-nowrap">
                  {getSubmittedAgo(offer.submitted_at)}
                </div>
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleAccept(offer._id)}
                    disabled={acceptingId === offer._id}
                    className="rounded-md bg-green-600 px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-green-700 disabled:opacity-50 whitespace-nowrap"
                  >
                    {acceptingId === offer._id ? "Accepting…" : "✓ Accept"}
                  </button>
                  <button className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap">
                    Counter
                  </button>
                  <button className="flex h-5 w-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100 text-[10px]">
                    ✕
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
