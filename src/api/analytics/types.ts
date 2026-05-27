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
