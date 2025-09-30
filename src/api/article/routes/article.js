module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/:id/related',
      handler: 'article.findRelated',
      config: {
        auth: false,
      },
    },
  ],
};
