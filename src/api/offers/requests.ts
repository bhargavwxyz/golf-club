import { get, patch } from "@/api/client";
import type { 
  PendingOfferApi, 
  PendingOffersApiResponse, 
  OfferApi, 
  OffersApiResponse,
  CounterOfferResponse
} from "./types";

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

export async function declineOffer(id: string): Promise<void> {
  await patch<void>(`/api/offers/${id}/decline`);
}

// New counter offer API call
export async function counterOffer(id: string, counterAmount: number): Promise<OfferApi> {
  const payload = await patch<CounterOfferResponse>(`/api/offers/${id}/counter`, {
    counter_amount: counterAmount
  });

  if (!payload || !payload.ok) {
    throw new Error("Counter offer API returned an invalid response.");
  }

  return payload.data.value;
}