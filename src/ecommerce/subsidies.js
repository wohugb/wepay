const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 请求补差 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/subsidies/create/
   */
  async create(options) {
    let reponse = await got.post('/v3/ecommerce/subsidies/create', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2. 取消补差 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/subsidies/cancel/
   */
  async cancel(applyment_id) {
    let reponse = await got.post(`/v3/ecommerce/subsidies/cancel`);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 请求补差回退 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/subsidies/return/
   */
  async return(applyment_id) {
    let reponse = await got.post(`/v3/ecommerce/subsidies/return`);
    const { body, request, headers } = reponse;
    return body;
  },
};
