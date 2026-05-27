const BaseRepository = require('./base.repository');
const { COLLECTIONS } = require('../db/collections');
const { SLOT_STATUS } = require('../models/slot.model');

class SlotRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.SLOTS);
  }

  async findAvailable() {
    return this.collection
      .find({ status: SLOT_STATUS.AVAILABLE })
      .sort({ start_time: 1 })
      .toArray();
  }

  async findByDateRange(from, to) {
    return this.collection
      .find({ start_time: { $gte: new Date(from), $lte: new Date(to) } })
      .sort({ start_time: 1 })
      .toArray();
  }
}

module.exports = new SlotRepository();