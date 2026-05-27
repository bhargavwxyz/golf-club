const { Router } = require('express');
const c = require('../controllers/offer.controller');
const { validateObjectId } = require('../middlewares/validateObjectId');

const router = Router();

// GET /api/offers?status=Pending&from=&to=
router.get('/', c.getOffers);

// GET /api/offers/pending
router.get('/pending', c.getPendingOffers);

// GET /api/offers/:id
router.get('/:id', validateObjectId, c.getOfferById);

// POST /api/offers  ← use this from Postman to create offers
router.post('/', c.createOffer);

// PATCH /api/offers/:id/accept
router.patch('/:id/accept', validateObjectId, c.acceptOffer);

// PATCH /api/offers/:id/decline
router.patch('/:id/decline', validateObjectId, c.declineOffer);

// PATCH /api/offers/:id/counter  { "counter_amount": 150 }
router.patch('/:id/counter', validateObjectId, c.counterOffer);

module.exports = router;