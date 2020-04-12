const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 账户余额提现API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_withdraw/ecommerce_withdraw/
   */
  async ecommerce(sub_mchid) {
    let reponse = await got.post(`/v3/ecommerce/fund/withdraw`, options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2 提现状态查询API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_withdraw/ecommerce_withdraw_inquire/
   */
  async getEcommerce(sub_mchid) {
    let reponse = await got.get(`/v3/ecommerce/fund/withdraw/${withdraw_id}`);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 电商平台提现API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_withdraw/merchant_withdraw/
   */
  async merchant(options) {
    let reponse = await got.post(`/v3/merchant/fund/withdraw`, options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 4. 电商平台提现状态查询API
   * docs: https://wepay-docs.netlify.com/ecommerce/fund_withdraw/merchant_withdraw_inquire/
   */
  async getMerchant(out_request_no) {
    let reponse = await got.get(
      `/v3/merchant/fund/withdraw/out-request-no/${out_request_no}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 5. 按日下载提现异常文件API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_withdraw/bill/
   */
  async bill(bill_type) {
    let reponse = await got.get(
      `/v3/merchant/fund/withdraw/bill-type/${bill_type}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
};
