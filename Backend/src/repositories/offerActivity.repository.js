const BaseRepository = require('./base.repository');
const { COLLECTIONS } = require('../db/collections');
const { ObjectId } = require('mongodb');

class OfferActivityRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.OFFER_ACTIVITY);
  }

  /**
   * Returns recent activity joined with offer → consumer + slot.
   * Powers the "Recent Activity" card on the dashboard.
   */
  async findRecentWithDetails(limit = 10) {
    return this.collection.aggregate([
      { $sort: { occurred_at: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: COLLECTIONS.OFFERS,
          localField: 'offer_id',
          foreignField: '_id',
          as: 'offer',
        },
      },
      { $unwind: { path: '$offer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: COLLECTIONS.CONSUMERS,
          localField: 'offer.consumer_id',
          foreignField: '_id',
          as: 'consumer',
        },
      },
      { $unwind: { path: '$consumer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: COLLECTIONS.SLOTS,
          localField: 'offer.slot_id',
          foreignField: '_id',
          as: 'slot',
        },
      },
      { $unwind: { path: '$slot', preserveNullAndEmptyArrays: true } },
    ]).toArray();
  }

  async findByOfferId(offer_id) {
    return this.collection
      .find({ offer_id: new ObjectId(offer_id) })
      .sort({ occurred_at: 1 })
      .toArray();
  }
}

module.exports = new OfferActivityRepository();