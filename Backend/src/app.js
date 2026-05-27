require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const { notFoundHandler } = require('./middlewares/notFoundHandler');
const { requestLogger } = require('./middlewares/requestLogger');

const offerRoutes = require('./routes/offer.routes');
const consumerRoutes = require('./routes/consumer.routes');
const slotRoutes = require('./routes/slot.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/offers', offerRoutes);
app.use('/api/consumers', consumerRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/analytics', analyticsRoutes);

// health check
app.get('/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// ── Error handling (must be last) ────────────────────────────────────────────
app.use(notFoundHandler);

// ── Bootstrap ────────────────────────────────────────────────────────────────
async function start() {
  await connectDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`[server] running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('[server] fatal startup error:', err.message);
  process.exit(1);
});