import { pendingOffers, type PendingOffer } from "@/data/offersMockData";

function ReliabilityBadge({ offer }: { offer: PendingOffer }) {
  if (offer.reliabilityTier === "VIP") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
        ⭐ {offer.reliabilityScore} VIP
      </span>
    );
  }
  if (offer.reliabilityTier === "Trusted") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
        ✓ {offer.reliabilityScore} Trusted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
      — {offer.reliabilityScore} Standard
    </span>
  );
}

export function PendingOffersTable() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Pending Offers</h3>
        <p className="text-[11px] text-slate-500">4 offers waiting · respond within 2 hrs for best conversion</p>
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
            <tr key={offer.id} className="transition-colors duration-150 hover:bg-slate-50/60">

              {/* CONSUMER */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: offer.avatarBg }}
                  >
                    {offer.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="text-[12px] font-semibold text-slate-900">{offer.name}</span>
                      <span className="text-[10px] opacity-40">🔒</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap text-[10px] text-slate-500">
                      <span>{offer.consumerType}</span>
                      {offer.viaTag && (
                        <>
                          <span>·</span>
                          <span className="rounded bg-green-50 px-1 py-0.5 text-[9px] font-medium text-green-700">{offer.viaTag}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </td>

              {/* RELIABILITY */}
              <td className="px-3 py-3 whitespace-nowrap">
                <ReliabilityBadge offer={offer} />
              </td>

              {/* SLOT */}
              <td className="px-3 py-3 whitespace-nowrap">
                <span className="whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {offer.slot}
                </span>
              </td>

              {/* OFFER */}
              <td className="px-3 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-bold text-green-600">+${offer.offerAmount}</span>
                  {offer.offerTag && (
                    <span className="rounded bg-purple-50 px-1 py-0.5 text-[9px] font-medium text-purple-700 whitespace-nowrap">
                      ✈ {offer.offerTag}
                    </span>
                  )}
                </div>
              </td>

              {/* STATUS */}
              <td className="px-3 py-3 whitespace-nowrap">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  {offer.status}
                </span>
                <div className="mt-0.5 text-[9px] text-slate-400 whitespace-nowrap">{offer.submittedAgo}</div>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center justify-end gap-1.5">
                  <button className="rounded-md bg-green-600 px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-green-700 whitespace-nowrap">
                    ✓ Accept
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