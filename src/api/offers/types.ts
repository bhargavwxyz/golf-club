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

export type OfferApi = PendingOfferApi;
export type OffersApiResponse = PendingOffersApiResponse;

// New counter offer types
export interface CounterOfferResponse {
  ok: true;
  data: {
    lastErrorObject: {
      n: number;
      updatedExisting: boolean;
    };
    value: OfferApi;
    ok: number;
    $clusterTime: {
      clusterTime: {
        $timestamp: string;
      };
      signature: {
        hash: string;
        keyId: {
          low: number;
          high: number;
          unsigned: boolean;
        };
      };
    };
    operationTime: {
      $timestamp: string;
    };
  };
}