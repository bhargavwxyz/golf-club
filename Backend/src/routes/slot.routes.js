const { Router } = require('express');
const c = require('../controllers/slot.controller');
const { validateObjectId } = require('../middlewares/validateObjectId');

const router = Router();

// GET /api/slots?available=true
router.get('/', c.getSlots);
router.get('/:id', validateObjectId, c.getSlotById);
router.post('/', c.createSlot);

module.exports = router;