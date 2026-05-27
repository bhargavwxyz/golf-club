const offerRepository = require('../repositories/offer.repository');
const offerActivityRepository = require('../repositories/offerActivity.repository');
const { getDB } = require('../db/connection');
const { COLLECTIONS } = require('../db/collections');
const { OFFER_STATUS } = require('../models/offer.model');

class AnalyticsService {

  /**
   * Computes the 4 KPI cards:
   *   - pending offer count
   *   - revenue this week vs last week
   *   - acceptance rate (this week)
   *   - avg response time in minutes (this week)
   */
  async getKpis() {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfThisWeek);

    const db = getDB();
    const col = db.collection(COLLECTIONS.OFFERS);

    // Pending count
    const pendingCount = await col.countDocuments({ status: OFFER_STATUS.PENDING });

    // Revenue this week
    const revenueThisWeek = await offerRepository.sumRevenue(startOfThisWeek, now);
    const revenueLastWeek = await offerRepository.sumRevenue(startOfLastWeek, endOfLastWeek);

    // Acceptance rate this week
    const [thisWeekStats] = await col.aggregate([
      { $match: { submitted_at: { $gte: startOfThisWeek } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          accepted: {
            $sum: { $cond: [{ $eq: ['$status', OFFER_STATUS.ACCEPTED] }, 1, 0] },
          },
        },
      },
    ]).toArray();

    const acceptanceRate = thisWeekStats
      ? Math.round((thisWeekStats.accepted / thisWeekStats.total) * 100)
      : 0;

    // Avg response time (minutes) — only for responded offers this week
    const [responseStats] = await col.aggregate([
      {
        $match: {
          submitted_at: { $gte: startOfThisWeek },
          responded_at: { $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          avgMs: {
            $avg: {
              $subtract: ['$responded_at', '$submitted_at'],
            },
          },
        },
      },
    ]).toArray();

    const avgResponseMinutes = responseStats
      ? Math.round(responseStats.avgMs / 1000 / 60)
      : 0;

    // Revenue trend
    let revenueTrend = null;
    if (revenueLastWeek > 0) {
      const pct = Math.round(((revenueThisWeek - revenueLastWeek) / revenueLastWeek) * 100);
      revenueTrend = { direction: pct >= 0 ? 'up' : 'down', text: `${Math.abs(pct)}% vs last week` };
    }

    return {
      pending_offers: {
        value: pendingCount,
        helper: 'Respond within 2 hrs',
      },
      revenue_this_week: {
        value: revenueThisWeek,
        trend: revenueTrend,
      },
      acceptance_rate: {
        value: acceptanceRate,
        trend: null,
      },
      avg_response_time_minutes: {
        value: avgResponseMinutes,
        trend: null,
      },
    };
  }

  /**
   * Computes funnel: embed clicks → offers submitted → accepted → revenue
   */
  async getFunnel() {
    const db = getDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const embedClicks = await db
      .collection(COLLECTIONS.EMBED_CLICKS)
      .countDocuments({ clicked_at: { $gte: startOfMonth } });

    const offersSubmitted = await db
      .collection(COLLECTIONS.OFFERS)
      .countDocuments({ submitted_at: { $gte: startOfMonth } });

    const offersAccepted = await db
      .collection(COLLECTIONS.OFFERS)
      .countDocuments({ status: OFFER_STATUS.ACCEPTED, responded_at: { $gte: startOfMonth } });

    const [revenueResult] = await db.collection(COLLECTIONS.OFFERS).aggregate([
      {
        $match: {
          status: OFFER_STATUS.ACCEPTED,
          responded_at: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).toArray();

    const revenueRecovered = revenueResult?.total ?? 0;
    const base = embedClicks || 1; // avoid division by zero

    return {
      period: 'this_month',
      rows: [
        {
          id: 'f-1',
          label: 'Embed clicks (demand signal)',
          value: embedClicks,
          percent: 100,
        },
        {
          id: 'f-2',
          label: 'Offers submitted',
          value: offersSubmitted,
          percent: Math.round((offersSubmitted / base) * 100),
        },
        {
          id: 'f-3',
          label: 'Offers accepted',
          value: offersAccepted,
          percent: Math.round((offersAccepted / base) * 100),
        },
        {
          id: 'f-4',
          label: 'Revenue recovered',
          value: revenueRecovered,
          percent: offersAccepted ? Math.round((offersAccepted / (offersSubmitted || 1)) * 100) : 0,
        },
      ],
      conversions: {
        click_to_offer: base ? `${Math.round((offersSubmitted / base) * 100)}%` : '0%',
        offer_to_accepted: offersSubmitted
          ? `${Math.round((offersAccepted / offersSubmitted) * 100)}%`
          : '0%',
      },
    };
  }

  /**
   * Recent activity feed — powers the "Recent Activity" card.
   */
  async getRecentActivity(limit = 10) {
    const raw = await offerActivityRepository.findRecentWithDetails(limit);

    return raw.map((item) => ({
      id: item._id,
      name: item.consumer?.name ?? 'Unknown',
      action: item.action,
      slot: item.slot
        ? formatSlot(item.slot.start_time)
        : 'Unknown slot',
      amount: item.offer?.amount ?? 0,
      occurred_at: item.occurred_at,
    }));
  }
}

function formatSlot(date) {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

module.exports = new AnalyticsService();