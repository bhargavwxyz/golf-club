const offerRepository = require('../repositories/offer.repository');
const offerActivityRepository = require('../repositories/offerActivity.repository');
const consumerRepository = require('../repositories/consumer.repository');
const slotRepository = require('../repositories/slot.repository');
const { createOffer, OFFER_STATUS } = require('../models/offer.model');
const { createActivity, ACTIVITY_ACTION } = require('../models/offerActivity.model');
const { AppError } = require('../utils/AppError');

class OfferService {

  async createOffer(payload) {
    // Validate consumer exists
    const consumer = await consumerRepository.findById(payload.consumer_id);
    if (!consumer) throw new AppError('Consumer not found', 404);

    // Validate slot exists and is available
    const slot = await slotRepository.findById(payload.slot_id);
    if (!slot) throw new AppError('Slot not found', 404);
    if (slot.status !== 'available') throw new AppError('Slot is not available', 409);

    // Build and insert offer
    const offerDoc = createOffer(payload);
    const offer = await offerRepository.insertOne(offerDoc);

    // Mark embed click as converted if provided
    if (payload.embed_click_id) {
      await offerRepository.collection.db
        .collection('embed_clicks')
        .updateOne({ _id: offer.embed_click_id }, { $set: { converted: true } });
    }

    // Append audit log
    await offerActivityRepository.insertOne(
      createActivity({ offer_id: offer._id, action: ACTIVITY_ACTION.SUBMITTED, actor: 'consumer' })
    );

    return offer;
  }

  async getOffers({ status, from, to }) {
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    return offerRepository.findWithDetails(filter, { from, to });
  }

  async getPendingOffers() {
    return offerRepository.findWithDetails({ status: OFFER_STATUS.PENDING });
  }

  async getOfferById(id) {
    const offer = await offerRepository.findWithDetails({ _id: require('mongodb').ObjectId.createFromHexString(id) });
    if (!offer.length) throw new AppError('Offer not found', 404);
    return offer[0];
  }

  async acceptOffer(id) {
    const offer = await offerRepository.findById(id);
    if (!offer) throw new AppError('Offer not found', 404);
    if (offer.status !== OFFER_STATUS.PENDING) {
      throw new AppError(`Cannot accept an offer with status: ${offer.status}`, 409);
    }

    const updated = await offerRepository.updateOne(id, {
      status: OFFER_STATUS.ACCEPTED,
      responded_at: new Date(),
    });

    await offerActivityRepository.insertOne(
      createActivity({ offer_id: id, action: ACTIVITY_ACTION.ACCEPTED, actor: 'staff' })
    );

    return updated;
  }

  async declineOffer(id) {
    const offer = await offerRepository.findById(id);
    if (!offer) throw new AppError('Offer not found', 404);
    if (offer.status !== OFFER_STATUS.PENDING) {
      throw new AppError(`Cannot decline an offer with status: ${offer.status}`, 409);
    }

    const updated = await offerRepository.updateOne(id, {
      status: OFFER_STATUS.DECLINED,
      responded_at: new Date(),
    });

    await offerActivityRepository.insertOne(
      createActivity({ offer_id: id, action: ACTIVITY_ACTION.DECLINED, actor: 'staff' })
    );

    return updated;
  }

  async counterOffer(id, { counter_amount }) {
    if (!counter_amount || counter_amount <= 0) {
      throw new AppError('counter_amount must be a positive number', 400);
    }

    const offer = await offerRepository.findById(id);
    if (!offer) throw new AppError('Offer not found', 404);
    if (offer.status !== OFFER_STATUS.PENDING) {
      throw new AppError(`Cannot counter an offer with status: ${offer.status}`, 409);
    }

    const updated = await offerRepository.updateOne(id, {
      status: OFFER_STATUS.COUNTERED,
      counter_amount: Number(counter_amount),
      responded_at: new Date(),
    });

    await offerActivityRepository.insertOne(
      createActivity({
        offer_id: id,
        action: ACTIVITY_ACTION.COUNTER_SENT,
        actor: 'staff',
        meta: { counter_amount },
      })
    );

    return updated;
  }
}

module.exports = new OfferService();