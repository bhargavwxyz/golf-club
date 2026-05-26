import { pendingOffers, type PendingOffer } from "@/data/offersMockData";

function ReliabilityBadge({ offer }: { offer: PendingOffer }) {
  if (offer.reliabilityTier === "VIP") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
        ⭐ {offer.reliabilityScore} VIP
      </span>
    );
  }
  if (offer.reliabilityTier === "Trusted") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
        ✓ {offer.reliabilityScore} Trusted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">
      — {offer.reliabilityScore} Standard
    </span>
  );
}

export function PendingOffersTable() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Pending Offers</h3>
        <p className="text-[11px] text-slate-500">4 offers waiting · respond within 2 hrs for best conversion</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                CONSUMER
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                CONSUMER RELIABILITY SCORE
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                SLOT
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                OFFER
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                STATUS
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 min-w-[140px]">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingOffers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-slate-100 transition-colors duration-150 hover:bg-amber-50/60"
              >
                {/* CONSUMER - with subtle lock symbol */}
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                      style={{ backgroundColor: offer.avatarBg }}
                    >
                      {offer.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-slate-900">
                          {offer.name}
                        </span>
                        <span className="text-slate-400 text-xs opacity-60">🔒</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {offer.consumerType}
                        {offer.viaTag && (
                          <>
                            <span className="mx-1">·</span>
                            <span className="rounded bg-green-50 px-1.5 py-0.5 text-[9px] text-green-700">
                              {offer.viaTag}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* RELIABILITY */}
                <td className="px-4 py-3">
                  <ReliabilityBadge offer={offer} />
                </td>

                {/* SLOT */}
                <td className="px-4 py-3">
                  <span className="inline-flex whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
                    {offer.slot}
                  </span>
                </td>

                {/* OFFER */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[13px] font-bold text-green-600">+${offer.offerAmount}</span>
                    {offer.offerTag && (
                      <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-medium text-purple-700">
                        ✈ {offer.offerTag}
                      </span>
                    )}
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {offer.status}
                    </span>
                    <div className="text-[9px] text-slate-400 mt-0.5">{offer.submittedAgo}</div>
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex flex-row items-center justify-end gap-1.5">
                    <button className="inline-flex items-center gap-1 rounded bg-green-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-green-700 whitespace-nowrap">
                      ✓ Accept
                    </button>
                    <button className="rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 hover:bg-blue-100 whitespace-nowrap">
                      Counter
                    </button>
                    <button className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}