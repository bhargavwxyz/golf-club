import { get, patch } from "@/api/client";
import type { PendingOfferApi, PendingOffersApiResponse, OfferApi, OffersApiResponse } from "./types";

export async function fetchPendingOffers(): Promise<PendingOfferApi[]> {
  const payload = (await get<PendingOffersApiResponse>("/api/offers/pending"));

  if (!payload || !payload.ok) {
    throw new Error("Pending offers API returned an invalid response.");
  }

  return payload.data;
}

export async function fetchAllOffers(): Promise<OfferApi[]> {
  const payload = await get<OffersApiResponse>("/api/offers");

  if (!payload || !payload.ok) {
    throw new Error("Offers API returned an invalid response.");
  }

  return payload.data;
}

export async function acceptOffer(id: string): Promise<void> {
  await patch<void>(`/api/offers/${id}/accept`);
}
