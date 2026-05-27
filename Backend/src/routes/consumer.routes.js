const { Router } = require('express');
const c = require('../controllers/consumer.controller');
const { validateObjectId } = require('../middlewares/validateObjectId');

const router = Router();

router.get('/', c.getConsumers);
router.get('/:id', validateObjectId, c.getConsumerById);
router.post('/', c.createConsumer);

module.exports = router;