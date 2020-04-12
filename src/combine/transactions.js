const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 合单下单-JS支付API
   * docs: https://wepay-docs.netlify.com/docs/combine/jsapi/
   */
  async prepay(options) {
    let reponse = await got.post('/v3/combine-transactions/jsapi', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2. 合单查询订单API
   * docs: https://wepay-docs.netlify.com/docs/combine/out-trade-no/
   */
  async getPrepay(combine_out_trade_no) {
    let reponse = await got.post(
      `/v3/combine-transactions/out-trade-no/${combine_out_trade_no}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 合单关闭订单 API
   * docs: https://wepay-docs.netlify.com/docs/combine/close/
   */
  async close(combine_out_trade_no) {
    let reponse = await got.post(
      `/v3/combine-transactions/out-trade-no/${combine_out_trade_no}/close`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 4. 支付通知API
   * docs: https://wepay-docs.netlify.com/docs/combine/notify/
   */
  async notify() {},
};
