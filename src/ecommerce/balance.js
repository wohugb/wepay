const got = require('../utils/wp-got');
const queryString = require('query-string');

module.exports = {
  /**
   * 1. 查询二级商户账户实时余额API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_balance/balance_merchant/
   */
  async balanceSubMch(sub_mchid) {
    let reponse = await got.post(
      `/v3/ecommerce/fund/balance/${sub_mchid}`,
      options,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2 查询二级商户账户日终余额API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_balance/enddaybalance/
   */
  async enddaybalanceSubMch(sub_mchid) {
    let reponse = await got.get(
      `/v3/ecommerce/fund/enddaybalance/${sub_mchid}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 查询电商平台账户实时余额API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_balance/balance_platform/
   */
  async balance(account_type) {
    let reponse = await got.get(`/v3/merchant/fund/balance/${account_type}`);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 4. 查询电商平台账户日终余额API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/fund_balance/dayendbalance/
   */
  async dayendbalance(account_type) {
    let reponse = await got.get(
      `/v3/merchant/fund/dayendbalance/${account_type}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
};
