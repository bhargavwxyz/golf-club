// Single source of truth for collection names and index definitions.

const COLLECTIONS = {
  CONSUMERS: 'consumers',
  SLOTS: 'slots',
  OFFERS: 'offers',
  OFFER_ACTIVITY: 'offer_activity',
  EMBED_CLICKS: 'embed_clicks',
};

/**
 * Creates all required indexes.
 * Safe to call on every startup (MongoDB skips existing indexes).
 */
async function createIndexes(db) {
  await db.collection(COLLECTIONS.CONSUMERS).createIndexes([
    { key: { email: 1 }, unique: true, name: 'unique_consumer_email' },
    { key: { reliability_tier: 1 }, name: 'consumer_reliability_tier' },
  ]);

  await db.collection(COLLECTIONS.SLOTS).createIndexes([
    { key: { start_time: 1 }, name: 'slot_start_time' },
    { key: { status: 1 }, name: 'slot_status' },
  ]);

  await db.collection(COLLECTIONS.OFFERS).createIndexes([
    { key: { status: 1 }, name: 'offer_status' },
    { key: { consumer_id: 1 }, name: 'offer_consumer' },
    { key: { slot_id: 1 }, name: 'offer_slot' },
    { key: { submitted_at: -1 }, name: 'offer_submitted_at_desc' },
  ]);

  await db.collection(COLLECTIONS.OFFER_ACTIVITY).createIndexes([
    { key: { offer_id: 1 }, name: 'activity_offer_id' },
    { key: { occurred_at: -1 }, name: 'activity_occurred_at_desc' },
  ]);

  await db.collection(COLLECTIONS.EMBED_CLICKS).createIndexes([
    { key: { slot_id: 1 }, name: 'click_slot_id' },
    { key: { clicked_at: -1 }, name: 'click_clicked_at_desc' },
    { key: { converted: 1 }, name: 'click_converted' },
  ]);

  console.log('[db] indexes ensured');
}

module.exports = { COLLECTIONS, createIndexes };