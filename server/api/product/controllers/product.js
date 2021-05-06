'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myController(ctx) {
    // ...

    // https://www.algolia.com/doc/api-reference/api-methods/
    const { client } = strapi.services.algolia
    await client.listIndices()

    // ...
  },
};
