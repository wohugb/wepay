const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 请求分账API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/orders_post/
   */
  async orders(options) {
    let reponse = await got.post('/v3/ecommerce/profitsharing/orders', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2. 查询分账结果API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/orders_get/
   */
  async getOrders(params) {
    let options = {
      searchParams: queryString.stringify(params, {
        arrayFormat: 'bracket',
      }),
    };
    let reponse = await got.get('/v3/ecommerce/profitsharing/orders', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 请求分账回退API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/returnorders_post/
   */
  async returnorders(options) {
    let reponse = await got.post(
      '/v3/ecommerce/profitsharing/returnorders',
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 4. 查询分账回退结果API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/returnorders_get/
   */
  async getReturnorders(params) {
    let options = {
      searchParams: queryString.stringify(params, {
        arrayFormat: 'bracket',
      }),
    };
    let reponse = await got.get(
      '/v3/ecommerce/profitsharing/returnorders',
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 5. 查询分账回退结果API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/finish-order/
   */
  async finishOrder(options) {
    let reponse = await got.post(
      '/v3/ecommerce/profitsharing/finish-order',
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 6. 添加分账接收方API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/receivers_add/
   */
  async receiversAdd(options) {
    let reponse = await got.post(
      '/v3/ecommerce/profitsharing/receivers/add',
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 7. 删除分账接收方API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/receivers_add/
   */
  async receiversDelete(options) {
    let reponse = await got.post(
      '/v3/ecommerce/profitsharing/receivers/delete',
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 8. 分账动账通知API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/profitsharing/notify/
   */
  async notify() {},
};
