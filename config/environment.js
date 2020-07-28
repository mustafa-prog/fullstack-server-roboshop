const sharedConfig = {
  env: process.env.NODE_ENV || 'development',
};

const devConfig = {
  db: 'mongodb://localhost:27017/fullstack-robo-shop',
};

const prodConfig = {
  // To do: Create an Atlas instance for production deployment and add its URL as an environment variable
  db: process.env.ATLAS_URL,
};

module.exports = Object.assign(
  {},
  sharedConfig,
  sharedConfig.env === 'production' ? prodConfig : devConfig
);
