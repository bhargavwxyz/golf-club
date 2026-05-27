const { ObjectId } = require('mongodb');

const CONSUMER_TYPE = Object.freeze({
  NEW_USER: 'new_user',
  STANDING_ORDER: 'standing_order',
});

const RELIABILITY_TIER = Object.freeze({
  VIP: 'VIP',
  TRUSTED: 'Trusted',
  STANDARD: 'Standard',
});

/**
 * Derives reliability tier from score.
 * Business rule lives here, not scattered across controllers.
 */
function deriveTier(score) {
  if (score >= 75) return RELIABILITY_TIER.VIP;
  if (score >= 50) return RELIABILITY_TIER.TRUSTED;
  return RELIABILITY_TIER.STANDARD;
}

/**
 * Builds a Consumer document ready for MongoDB insertion.
 */
function createConsumer({ name, email, phone, consumer_type, reliability_score, via_source, avatar_color }) {
  if (!name || !email) throw new Error('Consumer requires name and email');
  if (!Object.values(CONSUMER_TYPE).includes(consumer_type)) {
    throw new Error(`Invalid consumer_type. Must be one of: ${Object.values(CONSUMER_TYPE).join(', ')}`);
  }

  const score = Number(reliability_score ?? 50);
  const now = new Date();

  return {
    _id: new ObjectId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ?? null,
    consumer_type,
    reliability_score: score,
    reliability_tier: deriveTier(score),
    via_source: via_source ?? null,
    avatar_color: avatar_color ?? '#475569',
    created_at: now,
    updated_at: now,
  };
}

module.exports = { createConsumer, CONSUMER_TYPE, RELIABILITY_TIER, deriveTier };