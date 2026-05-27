const { getDB } = require('../db/connection');
const { ObjectId } = require('mongodb');

class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  get collection() {
    return getDB().collection(this.collectionName);
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll(filter = {}, options = {}) {
    return this.collection.find(filter, options).toArray();
  }

  async insertOne(doc) {
    const result = await this.collection.insertOne(doc);
    return { ...doc, _id: result.insertedId };
  }

  async updateOne(id, update) {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...update, updated_at: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  async deleteOne(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async count(filter = {}) {
    return this.collection.countDocuments(filter);
  }
}

module.exports = BaseRepository;