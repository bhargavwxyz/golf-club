const BaseRepository = require('./base.repository');
const { COLLECTIONS } = require('../db/collections');
const { ObjectId } = require('mongodb');

class OfferRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.OFFERS);
  }

  async findByStatus(status) {
    return this.collection
      .find({ status })
      .sort({ submitted_at: -1 })
      .toArray();
  }

  /**
   * Returns offers joined with consumer + slot in one query.
   * Used by the pending offers table and view-all screen.
   */
  async findWithDetails(filter = {}, { from, to, limit = 100 } = {}) {
    const match = { ...filter };
    if (from || to) {
      match.submitted_at = {};
      if (from) match.submitted_at.$gte = new Date(from);
      if (to)   match.submitted_at.$lte = new Date(to);
    }

    return this.collection.aggregate([
      { $match: match },
      { $sort: { submitted_at: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: COLLECTIONS.CONSUMERS,
          localField: 'consumer_id',
          foreignField: '_id',
          as: 'consumer',
        },
      },
      { $unwind: { path: '$consumer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: COLLECTIONS.SLOTS,
          localField: 'slot_id',
          foreignField: '_id',
          as: 'slot',
        },
      },
      { $unwind: { path: '$slot', preserveNullAndEmptyArrays: true } },
    ]).toArray();
  }

  async findByConsumer(consumer_id) {
    return this.collection
      .find({ consumer_id: new ObjectId(consumer_id) })
      .sort({ submitted_at: -1 })
      .toArray();
  }

  /**
   * Revenue sum for a time window (accepted offers only).
   */
  async sumRevenue(from, to) {
    const result = await this.collection.aggregate([
      {
        $match: {
          status: 'Accepted',
          responded_at: { $gte: from, $lte: to },
        },
      },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).toArray();
    return result[0]?.total ?? 0;
  }
}

module.exports = new OfferRepository();