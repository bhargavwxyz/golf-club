export interface PendingOfferConsumer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  consumer_type: string;
  reliability_score: number;
  reliability_tier: "VIP" | "Trusted" | "Standard";
  via_source: string | null;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface PendingOfferSlot {
  _id: string;
  start_time: string;
  end_time: string;
  max_players: number;
  base_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PendingOfferApi {
  _id: string;
  consumer_id: string;
  slot_id: string;
  amount: number;
  player_count: number;
  status: string;
  loyalty_tag: string | null;
  counter_amount: number | null;
  embed_click_id: string | null;
  submitted_at: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
  consumer: PendingOfferConsumer;
  slot: PendingOfferSlot;
}

export interface PendingOffersApiResponse {
  ok: true;
  count: number;
  data: PendingOfferApi[];
}

const BASE_URL = import.meta.env.VITE_BASEURL ?? "";

function getApiUrl(path: string) {
  if (!BASE_URL) {
    throw new Error("VITE_BASEURL is not configured. Set VITE_BASEURL in your environment.");
  }

  return `${BASE_URL}${path}`;
}

export async function fetchPendingOffers(): Promise<PendingOfferApi[]> {
  const response = await fetch(getApiUrl("/api/offers/pending"));

  if (!response.ok) {
    throw new Error(`Failed to load pending offers (${response.status})`);
  }

  const payload = (await response.json()) as PendingOffersApiResponse;

  if (!payload.ok) {
    throw new Error("Pending offers API returned an invalid response.");
  }

  return payload.data;
}
