'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', ({ strapi }) => ({
  async findRelated(id, limit = 3) {
    const article = await strapi.entityService.findOne('api::article.article', id, {
      populate: ['category', 'tags'],
    });

    if (!article) return [];

    const relatedArticles = await strapi.entityService.findMany('api::article.article', {
      filters: {
        id: { $ne: id },
        $or: [
          { category: article.category?.id },
          { tags: { id: { $in: article.tags?.map(tag => tag.id) || [] } } },
        ],
      },
      populate: ['author', 'category', 'featuredImage'],
      limit,
    });

    return relatedArticles;
  },
}));

