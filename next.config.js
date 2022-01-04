const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const mongo_url = "YOUR_MONGO_URL_HERE";

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_URL: mongo_url
      }
    }
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_URL: mongo_url
    }
  }
}
