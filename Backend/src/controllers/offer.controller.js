const offerService = require('../services/offer.service');

const getOffers = async (req, res, next) => {
  try {
    const { status, from, to } = req.query;
    const offers = await offerService.getOffers({ status, from, to });
    res.json({ ok: true, count: offers.length, data: offers });
  } catch (err) {
    next(err);
  }
};

const getPendingOffers = async (req, res, next) => {
  try {
    const offers = await offerService.getPendingOffers();
    res.json({ ok: true, count: offers.length, data: offers });
  } catch (err) {
    next(err);
  }
};

const getOfferById = async (req, res, next) => {
  try {
    const offer = await offerService.getOfferById(req.params.id);
    res.json({ ok: true, data: offer });
  } catch (err) {
    next(err);
  }
};

const createOffer = async (req, res, next) => {
  try {
    const offer = await offerService.createOffer(req.body);
    res.status(201).json({ ok: true, data: offer });
  } catch (err) {
    next(err);
  }
};

const acceptOffer = async (req, res, next) => {
  try {
    const offer = await offerService.acceptOffer(req.params.id);
    res.json({ ok: true, data: offer });
  } catch (err) {
    next(err);
  }
};

const declineOffer = async (req, res, next) => {
  try {
    const offer = await offerService.declineOffer(req.params.id);
    res.json({ ok: true, data: offer });
  } catch (err) {
    next(err);
  }
};

const counterOffer = async (req, res, next) => {
  try {
    const offer = await offerService.counterOffer(req.params.id, req.body);
    res.json({ ok: true, data: offer });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOffers,
  getPendingOffers,
  getOfferById,
  createOffer,
  acceptOffer,
  declineOffer,
  counterOffer,
};