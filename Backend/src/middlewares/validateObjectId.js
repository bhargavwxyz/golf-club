const { ObjectId } = require('mongodb');

function validateObjectId(req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ ok: false, error: 'Invalid ID format' });
  }
  next();
}

module.exports = { validateObjectId };