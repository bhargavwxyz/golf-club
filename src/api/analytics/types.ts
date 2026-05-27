export interface AnalyticsKpiMetric {
  value: number;
  helper?: string | null;
  trend?: {
    direction: "up" | "down";
    text: string;
  } | null;
}

export interface AnalyticsKpisResponse {
  ok: true;
  data: {
    pending_offers: AnalyticsKpiMetric;
    revenue_this_week: AnalyticsKpiMetric;
    acceptance_rate: AnalyticsKpiMetric;
    avg_response_time_minutes: AnalyticsKpiMetric;
  };
}

// New funnel types
export interface FunnelRow {
  id: string;
  label: string;
  value: number;
  percent: number;
}

export interface FunnelConversions {
  click_to_offer: string;
  offer_to_accepted: string;
}

export interface AnalyticsFunnelResponse {
  ok: true;
  data: {
    period: string;
    rows: FunnelRow[];
    conversions: FunnelConversions;
  };
}