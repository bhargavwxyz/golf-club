const { ObjectId } = require('mongodb');

const OFFER_STATUS = Object.freeze({
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
  COUNTERED: 'Countered',
});

/**
 * Builds an Offer document ready for MongoDB insertion.
 */
function createOffer({ consumer_id, slot_id, amount, player_count, loyalty_tag, embed_click_id }) {
  if (!consumer_id) throw new Error('Offer requires consumer_id');
  if (!slot_id) throw new Error('Offer requires slot_id');
  if (!amount || amount <= 0) throw new Error('Offer requires a positive amount');

  const now = new Date();

  return {
    _id: new ObjectId(),
    consumer_id: new ObjectId(consumer_id),
    slot_id: new ObjectId(slot_id),
    amount: Number(amount),
    player_count: Number(player_count ?? 2),
    status: OFFER_STATUS.PENDING,
    loyalty_tag: loyalty_tag ?? null,       // e.g. "Delta"
    counter_amount: null,                   // set only when staff counters
    embed_click_id: embed_click_id ? new ObjectId(embed_click_id) : null,
    submitted_at: now,
    responded_at: null,
    created_at: now,
    updated_at: now,
  };
}

module.exports = { createOffer, OFFER_STATUS };