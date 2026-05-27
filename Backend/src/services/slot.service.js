const slotRepository = require('../repositories/slot.repository');
const { createSlot } = require('../models/slot.model');
const { AppError } = require('../utils/AppError');

class SlotService {
  async createSlot(payload) {
    const doc = createSlot(payload);
    return slotRepository.insertOne(doc);
  }

  async getAvailableSlots() {
    return slotRepository.findAvailable();
  }

  async getAllSlots() {
    return slotRepository.findAll({}, { sort: { start_time: 1 } });
  }

  async getSlotById(id) {
    const slot = await slotRepository.findById(id);
    if (!slot) throw new AppError('Slot not found', 404);
    return slot;
  }
}

module.exports = new SlotService();