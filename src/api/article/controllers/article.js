'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    
    // Add reading time calculation
    if (data) {
      data.forEach(article => {
        if (article.attributes.content) {
          const wordCount = article.attributes.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          article.attributes.readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        }
      });
    }
    
    return { data, meta };
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    
    // Add reading time calculation
    if (data && data.attributes.content) {
      const wordCount = data.attributes.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      data.attributes.readingTime = Math.ceil(wordCount / 200);
    }
    
    return { data, meta };
  },
}));
