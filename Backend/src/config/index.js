// All environment variables are read and validated here.
// Nothing else in the codebase calls process.env directly.

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`[config] Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

const config = {
  port: parseInt(process.env.PORT || '3000', 10),

  db: {
    password: requireEnv('DB_PASSWORD'),
    name: process.env.DB_NAME || 'golfclub',
    cluster: process.env.DB_CLUSTER || 'cluster0.orlw2s4.mongodb.net',
    appName: process.env.DB_APP_NAME || 'Cluster0',
    username: process.env.DB_USERNAME || 'admin',
  },

  app: {
    env: process.env.NODE_ENV || 'development',
    isDev: (process.env.NODE_ENV || 'development') === 'development',
  },
};

module.exports = config;