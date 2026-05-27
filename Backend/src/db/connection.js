const { MongoClient } = require('mongodb');
const config = require('../config');

let client = null;
let db = null;

function buildUri() {
  const { username, password, cluster, name, appName } = config.db;
  return `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster}/${name}?appName=${appName}`;
}

async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(buildUri());
    await client.connect();
    db = client.db(config.db.name);
    console.log(`[db] connected → ${config.db.name}`);
    return db;
  } catch (err) {
    console.error('[db] connection failed:', err.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('[db] Database not initialised. Call connectDB() first.');
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    db = null;
    client = null;
  }
}

module.exports = { connectDB, getDB, closeDB };