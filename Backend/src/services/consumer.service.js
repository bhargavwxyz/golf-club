const consumerRepository = require('../repositories/consumer.repository');
const { createConsumer } = require('../models/consumer.model');
const { AppError } = require('../utils/AppError');

class ConsumerService {
  async createConsumer(payload) {
    const existing = await consumerRepository.findByEmail(payload.email);
    if (existing) throw new AppError('A consumer with this email already exists', 409);

    const doc = createConsumer(payload);
    return consumerRepository.insertOne(doc);
  }

  async getAllConsumers() {
    return consumerRepository.findAll({}, { sort: { created_at: -1 } });
  }

  async getConsumerById(id) {
    const consumer = await consumerRepository.findById(id);
    if (!consumer) throw new AppError('Consumer not found', 404);
    return consumer;
  }
}

module.exports = new ConsumerService();