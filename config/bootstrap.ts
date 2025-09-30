module.exports = async ({ strapi }) => {
  // Import and run bootstrap
  const bootstrap = require('../src/bootstrap');
  await bootstrap({ strapi });
};

