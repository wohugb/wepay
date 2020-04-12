const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 退款申请API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/refunds/apply/
   */
  async apply(options) {
    let reponse = await got.post('/v3/ecommerce/refunds/apply', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2.1. 通过微信支付退款单号查询退款
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/refunds/inquire/
   */
  async getByRefundId(params) {
    let options = {
      searchParams: queryString.stringify(params, {
        arrayFormat: 'bracket',
      }),
    };
    let reponse = await got.get(
      `/v3/ecommerce/refunds/id/${refund_id}`,
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2.2. 通过商户退款单号查询退款
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/refunds/inquire/
   */
  async getByOutRefundNo(params) {
    let options = {
      searchParams: queryString.stringify(params, {
        arrayFormat: 'bracket',
      }),
    };
    let reponse = await got.get(
      `/v3/ecommerce/refunds/out-refund-no/${out_refund_no}`,
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 退款结果通知API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/refunds/notify/
   */
  async notify() {},
};
