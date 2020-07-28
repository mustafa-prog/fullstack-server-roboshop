const sharedConfig = {
  env: process.env.NODE_ENV || 'development',
};

const devConfig = {
  db: 'mongodb://localhost:27017/fullstack-robo-shop',
  secrets: {
    session: 'oMWX74ktbulXUxbK2pNH0qOjJSHdsisKJR97m7JRq4SLm5yJs8wtV4EPdgqmOD9',
  },
};

const prodConfig = {
  // To do: Create an Atlas instance for production deployment and add its URL as an environment variable
  db: process.env.ATLAS_URL,
  secrets: {
    session: process.env.SESSION_SECRET,
  },
};

module.exports = Object.assign(
  {},
  sharedConfig,
  sharedConfig.env === 'production' ? prodConfig : devConfig
);
