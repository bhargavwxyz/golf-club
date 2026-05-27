const consumerService = require('../services/consumer.service');

const getConsumers = async (req, res, next) => {
  try {
    const consumers = await consumerService.getAllConsumers();
    res.json({ ok: true, count: consumers.length, data: consumers });
  } catch (err) {
    next(err);
  }
};

const getConsumerById = async (req, res, next) => {
  try {
    const consumer = await consumerService.getConsumerById(req.params.id);
    res.json({ ok: true, data: consumer });
  } catch (err) {
    next(err);
  }
};

const createConsumer = async (req, res, next) => {
  try {
    const consumer = await consumerService.createConsumer(req.body);
    res.status(201).json({ ok: true, data: consumer });
  } catch (err) {
    next(err);
  }
};

module.exports = { getConsumers, getConsumerById, createConsumer };