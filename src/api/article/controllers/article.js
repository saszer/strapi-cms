'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

/**
 * Counts the words in an HTML string for reading-time estimates.
 * Tags are stripped repeatedly until the output is stable, so malformed or
 * nested markup (e.g. "<scr<b>ipt>") cannot survive a single pass.
 * embracingearth.space
 */
const countWords = (html) => {
  let text = html;
  let previous;
  do {
    previous = text;
    text = text.replace(/<[^>]*>/g, '');
  } while (text !== previous);
  return text.split(/\s+/).length;
};

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    // Add reading time calculation
    if (data) {
      data.forEach(article => {
        if (article.attributes.content) {
          const wordCount = countWords(article.attributes.content);
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
      const wordCount = countWords(data.attributes.content);
      data.attributes.readingTime = Math.ceil(wordCount / 200);
    }

    return { data, meta };
  },
}));

