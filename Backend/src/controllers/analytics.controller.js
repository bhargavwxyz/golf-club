const analyticsService = require('../services/analytics.service');

const getKpis = async (req, res, next) => {
  try {
    const kpis = await analyticsService.getKpis();
    res.json({ ok: true, data: kpis });
  } catch (err) {
    next(err);
  }
};

const getFunnel = async (req, res, next) => {
  try {
    const funnel = await analyticsService.getFunnel();
    res.json({ ok: true, data: funnel });
  } catch (err) {
    next(err);
  }
};

const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit ?? '10', 10);
    const activity = await analyticsService.getRecentActivity(limit);
    res.json({ ok: true, count: activity.length, data: activity });
  } catch (err) {
    next(err);
  }
};

module.exports = { getKpis, getFunnel, getRecentActivity };