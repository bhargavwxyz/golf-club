const { Router } = require('express');
const c = require('../controllers/analytics.controller');

const router = Router();

// GET /api/analytics/kpis
router.get('/kpis', c.getKpis);

// GET /api/analytics/funnel
router.get('/funnel', c.getFunnel);

// GET /api/analytics/activity?limit=10
router.get('/activity', c.getRecentActivity);

module.exports = router;