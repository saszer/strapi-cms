'use strict';

module.exports = async ({ strapi }) => {
  // Create default categories
  const categories = [
    { name: 'AI & Finance', slug: 'ai-finance', description: 'Articles about AI in financial services', color: '#3B82F6' },
    { name: 'Tax Optimization', slug: 'tax-optimization', description: 'Tax strategies and optimization tips', color: '#10B981' },
    { name: 'Business Insights', slug: 'business-insights', description: 'Business and entrepreneurship content', color: '#F59E0B' },
    { name: 'Technology', slug: 'technology', description: 'Tech trends and innovations', color: '#8B5CF6' },
  ];

  for (const categoryData of categories) {
    const existing = await strapi.entityService.findMany('api::category.category', {
      filters: { slug: categoryData.slug },
    });
    
    if (existing.length === 0) {
      await strapi.entityService.create('api::category.category', {
        data: categoryData,
      });
    }
  }

  // Create default tags
  const tags = [
    { name: 'AI', slug: 'ai', color: '#3B82F6' },
    { name: 'Finance', slug: 'finance', color: '#10B981' },
    { name: 'Tax', slug: 'tax', color: '#F59E0B' },
    { name: 'Business', slug: 'business', color: '#8B5CF6' },
    { name: 'Technology', slug: 'technology', color: '#EF4444' },
    { name: 'Tutorial', slug: 'tutorial', color: '#06B6D4' },
  ];

  for (const tagData of tags) {
    const existing = await strapi.entityService.findMany('api::tag.tag', {
      filters: { slug: tagData.slug },
    });
    
    if (existing.length === 0) {
      await strapi.entityService.create('api::tag.tag', {
        data: tagData,
      });
    }
  }

  // Create default author
  const existingAuthor = await strapi.entityService.findMany('api::author.author', {
    filters: { email: 'admin@ai2fin.com' },
  });

  if (existingAuthor.length === 0) {
    await strapi.entityService.create('api::author.author', {
      data: {
        name: 'AI2Fin Team',
        email: 'admin@ai2fin.com',
        bio: 'The AI2Fin team creates content about AI-powered financial management and tax optimization.',
        social: {
          twitter: '@ai2fin',
          linkedin: 'https://linkedin.com/company/ai2fin',
          website: 'https://embracingearth.space',
        },
      },
    });
  }

  console.log('✅ Blog content types and initial data created successfully!');
};
