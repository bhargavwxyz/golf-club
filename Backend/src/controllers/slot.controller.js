const slotService = require('../services/slot.service');

const getSlots = async (req, res, next) => {
  try {
    const { available } = req.query;
    const slots = available === 'true'
      ? await slotService.getAvailableSlots()
      : await slotService.getAllSlots();
    res.json({ ok: true, count: slots.length, data: slots });
  } catch (err) {
    next(err);
  }
};

const getSlotById = async (req, res, next) => {
  try {
    const slot = await slotService.getSlotById(req.params.id);
    res.json({ ok: true, data: slot });
  } catch (err) {
    next(err);
  }
};

const createSlot = async (req, res, next) => {
  try {
    const slot = await slotService.createSlot(req.body);
    res.status(201).json({ ok: true, data: slot });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSlots, getSlotById, createSlot };