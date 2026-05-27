// data/offersMockData.ts

export type ReliabilityTier = "VIP" | "Trusted" | "Standard";

export type OfferStatus =
  | "Pending"
  | "Accepted"
  | "Declined"
  | "Countered";

export type ActivityType =
  | "accepted"
  | "declined"
  | "counter sent";

export interface KpiStat {
  id: string;
  label: string;
  value: string;
  helper?: string;
  trend?: {
    direction: "up" | "down";
    text: string;
  };
  accentColor: string;
  icon: string;
}

export interface PendingOffer {
  id: string;
  initials: string;
  avatarBg: string;
  name: string;
  consumerType: string;
  viaTag?: string;
  reliabilityScore: number;
  reliabilityTier: ReliabilityTier;
  slot: string;
  offerAmount: number;
  offerTag?: string;
  status: OfferStatus;
  submittedAgo: string;
  highlighted?: boolean;
}

export interface RecentActivity {
  id: string;
  name: string;
  action: ActivityType;
  slot: string;
  amount: number;
  when: string;
}

export interface FunnelRow {
  id: string;
  label: string;
  value: string;
  percent: number;
  barColor: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  group: "OVERVIEW" | "INTELLIGENCE" | "SETTINGS";
  badge?: number;
  active?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "🖼️",
    group: "OVERVIEW",
  },
  {
    id: "offers",
    label: "Offers",
    icon: "🧾",
    group: "OVERVIEW",
    badge: 4,
    active: true,
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "📦",
    group: "OVERVIEW",
  },
  {
    id: "embed-demand",
    label: "Embed Demand",
    icon: "🔥",
    group: "OVERVIEW",
  },
  {
    id: "loyalty",
    label: "Loyalty",
    icon: "✈️",
    group: "OVERVIEW",
  },
  {
    id: "yield-engine",
    label: "Yield Engine",
    icon: "🪩",
    group: "INTELLIGENCE",
  },
  {
    id: "embed-integrations",
    label: "Embed & Integrations",
    icon: "🔗",
    group: "SETTINGS",
  },
  {
    id: "slot-management",
    label: "Slot Management",
    icon: "🗓️",
    group: "SETTINGS",
  },
];

export const kpiStats: KpiStat[] = [
  {
    id: "pending",
    label: "PENDING OFFERS",
    value: "4",
    helper: "Respond within 2 hrs",
    accentColor: "#f97316",
    icon: "✉️",
  },
  {
    id: "revenue",
    label: "REVENUE THIS WEEK",
    value: "$675",
    trend: {
      direction: "up",
      text: "14% vs last week",
    },
    accentColor: "#16a34a",
    icon: "💰",
  },
  {
    id: "acceptance",
    label: "ACCEPTANCE RATE",
    value: "83%",
    trend: {
      direction: "up",
      text: "6pts vs last week",
    },
    accentColor: "#2563eb",
    icon: "☑️",
  },
  {
    id: "response",
    label: "AVG RESPONSE TIME",
    value: "22m",
    trend: {
      direction: "down",
      text: "8m faster",
    },
    accentColor: "#f59e0b",
    icon: "⚡",
  },
];

export const pendingOffers: PendingOffer[] = [
  {
    id: "o-1",
    initials: "DK",
    avatarBg: "#0f172a",
    name: "Derek K.",
    consumerType: "Standing order · 2 players",
    reliabilityScore: 87,
    reliabilityTier: "VIP",
    slot: "Sat 9:30–10:30am",
    offerAmount: 105,
    status: "Pending",
    submittedAgo: "Submitted 45m ago",
    highlighted: true,
  },
  {
    id: "o-2",
    initials: "PK",
    avatarBg: "#475569",
    name: "Priya K.",
    consumerType: "New user · 2 players",
    reliabilityScore: 30,
    reliabilityTier: "Standard",
    slot: "Sat 10:00–11:00am",
    offerAmount: 85,
    status: "Pending",
    submittedAgo: "Submitted 1h 12m ago",
  },
  {
    id: "o-3",
    initials: "MT",
    avatarBg: "#92400e",
    name: "Marcus T.",
    consumerType: "Standing order · 4 players",
    viaTag: "via Supreme Golf",
    reliabilityScore: 76,
    reliabilityTier: "VIP",
    slot: "Sat 8:30–9:30am",
    offerAmount: 210,
    status: "Pending",
    submittedAgo: "Submitted 12m ago",
  },
  {
    id: "o-4",
    initials: "JR",
    avatarBg: "#1d4ed8",
    name: "James R.",
    consumerType: "New user · 2 players",
    reliabilityScore: 58,
    reliabilityTier: "Trusted",
    slot: "Sun 9:00–10:00am",
    offerAmount: 22,
    offerTag: "Delta",
    status: "Pending",
    submittedAgo: "Submitted 1h 45m ago",
  },
];

export const recentActivity: RecentActivity[] = [
  {
    id: "a-1",
    name: "Alex M.",
    action: "accepted",
    slot: "Sat 7:30am",
    amount: 30,
    when: "2h ago",
  },
  {
    id: "a-2",
    name: "Sarah L.",
    action: "accepted",
    slot: "Fri 2pm",
    amount: 25,
    when: "Yesterday",
  },
  {
    id: "a-3",
    name: "Ryan B.",
    action: "declined",
    slot: "Sun 10am",
    amount: 12,
    when: "Yesterday",
  },
  {
    id: "a-4",
    name: "Tom W.",
    action: "counter sent",
    slot: "Mon 8am",
    amount: 18,
    when: "2 days ago",
  },
  {
    id: "a-5",
    name: "Nina C.",
    action: "accepted",
    slot: "Wed 7am",
    amount: 22,
    when: "2 days ago",
  },
];

export const offerFunnel: FunnelRow[] = [
  {
    id: "f-1",
    label: "Embed clicks (demand signal)",
    value: "127",
    percent: 100,
    barColor: "#f97316",
  },
  {
    id: "f-2",
    label: "Offers submitted",
    value: "76",
    percent: 60,
    barColor: "#2563eb",
  },
  {
    id: "f-3",
    label: "Offers accepted",
    value: "52",
    percent: 41,
    barColor: "#16a34a",
  },
  {
    id: "f-4",
    label: "Revenue recovered",
    value: "$2,750",
    percent: 70,
    barColor: "#f97316",
  },
];

export const offerFunnelConversions = {
  clickToOffer: "60%",
  offerToAccepted: "68%",
};

export const viewAllOffersSummary = {
  title: "View all offers",
  subtitle: "Last 30 days · $680 recovered from 6 completed offers",
  filters: ["All", "Accepted", "Declined", "Countered"],
};