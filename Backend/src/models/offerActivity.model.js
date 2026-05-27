const { ObjectId } = require('mongodb');

const ACTIVITY_ACTION = Object.freeze({
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  COUNTER_SENT: 'counter sent',
  SUBMITTED: 'submitted',
});

/**
 * Builds an OfferActivity document.
 * This collection is append-only — records are never updated or deleted.
 */
function createActivity({ offer_id, action, actor, meta }) {
  if (!offer_id) throw new Error('Activity requires offer_id');
  if (!Object.values(ACTIVITY_ACTION).includes(action)) {
    throw new Error(`Invalid action. Must be one of: ${Object.values(ACTIVITY_ACTION).join(', ')}`);
  }

  return {
    _id: new ObjectId(),
    offer_id: new ObjectId(offer_id),
    action,
    actor: actor ?? 'staff',   // 'staff' | 'system' | 'consumer'
    meta: meta ?? {},           // any extra context (counter_amount, reason, etc.)
    occurred_at: new Date(),
  };
}

module.exports = { createActivity, ACTIVITY_ACTION };