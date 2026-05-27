const { ObjectId } = require('mongodb');

const SLOT_STATUS = Object.freeze({
  AVAILABLE: 'available',
  HELD: 'held',
  BOOKED: 'booked',
});

/**
 * Builds a Slot document ready for MongoDB insertion.
 */
function createSlot({ start_time, end_time, max_players, base_price, status }) {
  if (!start_time || !end_time) throw new Error('Slot requires start_time and end_time');
  if (!max_players || max_players < 1) throw new Error('Slot requires max_players >= 1');

  const now = new Date();

  return {
    _id: new ObjectId(),
    start_time: new Date(start_time),
    end_time: new Date(end_time),
    max_players: Number(max_players),
    base_price: Number(base_price ?? 0),
    status: status ?? SLOT_STATUS.AVAILABLE,
    created_at: now,
    updated_at: now,
  };
}

module.exports = { createSlot, SLOT_STATUS };