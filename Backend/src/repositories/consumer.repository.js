const BaseRepository = require('./base.repository');
const { COLLECTIONS } = require('../db/collections');

class ConsumerRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.CONSUMERS);
  }

  async findByEmail(email) {
    return this.collection.findOne({ email: email.toLowerCase() });
  }

  async findByTier(tier) {
    return this.collection.find({ reliability_tier: tier }).toArray();
  }
}

module.exports = new ConsumerRepository();