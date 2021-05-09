'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const index = 'PRODUCTS';
const ppd = 'products_publishing_date';
const pr = 'products_rating';
const ppdesc = 'products_price_desc';
const ppasc = 'products_price_asc';

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      strapi.services.algolia.saveObject(result, index);
      strapi.services.algolia.saveObject(result, ppd);
      strapi.services.algolia.saveObject(result, pr);
      strapi.services.algolia.saveObject(result, ppdesc);
      strapi.services.algolia.saveObject(result, ppasc);
    },
    afterUpdate(result, params, data) {
      if (result.published_at) {
        strapi.services.algolia.saveObject(result, index);
        strapi.services.algolia.saveObject(result, ppd);
        strapi.services.algolia.saveObject(result, pr);
        strapi.services.algolia.saveObject(result, ppdesc);
        strapi.services.algolia.saveObject(result, ppasc);
      } else {
        strapi.services.algolia.deleteObject(result.id, index);
        strapi.services.algolia.deleteObject(result.id, ppd);
        strapi.services.algolia.deleteObject(result.id, pr);
        strapi.services.algolia.deleteObject(result.id, ppdesc);
        strapi.services.algolia.deleteObject(result.id, ppasc);
      }
    },
    afterDelete(result, params) {
      strapi.services.algolia.deleteObject(result.id, index);
      strapi.services.algolia.deleteObject(result.id, ppd);
      strapi.services.algolia.deleteObject(result.id, pr);
      strapi.services.algolia.deleteObject(result.id, ppdesc);
      strapi.services.algolia.deleteObject(result.id, ppasc);
    },
  },
};
