module.exports = async ({ strapi }) => {
  // Set default permissions for public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (publicRole) {
    const permissions = [
      { controller: 'article', action: 'find' },
      { controller: 'article', action: 'findOne' },
      { controller: 'author', action: 'find' },
      { controller: 'author', action: 'findOne' },
      { controller: 'category', action: 'find' },
      { controller: 'category', action: 'findOne' },
      { controller: 'tag', action: 'find' },
      { controller: 'tag', action: 'findOne' },
    ];

    for (const { controller, action } of permissions) {
      const permissionExists = await strapi.query('plugin::users-permissions.permission').findOne({
        where: {
          role: publicRole.id,
          action: `api::${controller}.${controller}.${action}`,
        },
      });

      if (!permissionExists) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            role: publicRole.id,
            action: `api::${controller}.${controller}.${action}`,
            enabled: true,
          },
        });
      } else if (!permissionExists.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: permissionExists.id },
          data: { enabled: true },
        });
      }
    }

    console.log('✅ Public API permissions configured successfully!');
  }

  // Create initial categories if they don't exist
  const categoryCount = await strapi.query('api::category.category').count();
  
  if (categoryCount === 0) {
    const categories = [
      { name: 'AI & Technology', slug: 'ai-technology', description: 'AI and fintech innovations', color: '#3B82F6' },
      { name: 'Business Operations', slug: 'business-operations', description: 'Business process optimization', color: '#10B981' },
      { name: 'Tax & Compliance', slug: 'tax-compliance', description: 'Tax strategies and compliance', color: '#F59E0B' },
    ];

    for (const category of categories) {
      await strapi.entityService.create('api::category.category', {
        data: category,
      });
    }

    console.log('✅ Initial categories created successfully!');
  }

  // Create initial tags if they don't exist
  const tagCount = await strapi.query('api::tag.tag').count();
  
  if (tagCount === 0) {
    const tags = [
      { name: 'AI', slug: 'ai', color: '#3B82F6' },
      { name: 'Financial Management', slug: 'financial-management', color: '#10B981' },
      { name: 'Automation', slug: 'automation', color: '#8B5CF6' },
      { name: 'Expense Tracking', slug: 'expense-tracking', color: '#F59E0B' },
      { name: 'Tax Optimization', slug: 'tax-optimization', color: '#EF4444' },
      { name: 'Small Business', slug: 'small-business', color: '#06B6D4' },
    ];

    for (const tag of tags) {
      await strapi.entityService.create('api::tag.tag', {
        data: tag,
      });
    }

    console.log('✅ Initial tags created successfully!');
  }

  // Create default author if none exists
  const authorCount = await strapi.query('api::author.author').count();
  
  if (authorCount === 0) {
    await strapi.entityService.create('api::author.author', {
      data: {
        name: 'AI2Fin Team',
        email: 'blog@embracingearth.space',
        bio: 'The AI2Fin team creates expert content on AI-powered financial management, tax optimization, and business automation.',
        twitter: '@ai2fin',
        linkedin: 'https://linkedin.com/company/ai2fin',
        website: 'https://embracingearth.space',
      },
    });

    console.log('✅ Default author created successfully!');
  }

  console.log('🚀 Strapi CMS initialized and ready for AI2Fin blog!');
};
