module.exports = {
  /**
   * 1. 二级商户进件 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/applyments/post/
   */
  async applyments(options) {
    let reponse = await got.post('/v3/ecommerce/applyments', options);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2.1. 查询二级商进件申请状态 API(1) 通过申请单 ID 查询申请状态
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/applyments/get/
   */
  async getByApplymentId(applyment_id) {
    let reponse = await got.get(`/v3/ecommerce/applyments/${applyment_id}`);
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 2.2. 查询二级商进件申请状态 API(2) 通过业务申请编号查询申请状态
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/applyments/get/
   */
  async getByOutRequestNo(applyment_id) {
    let reponse = await got.get(
      `/v3/ecommerce/applyments/out-request-no/${out_request_no}`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 3. 修改结算帐号 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/applyments/sub_merchants-modify-settlement/
   */
  async modifySettlement(sub_mchid) {
    let reponse = await got.get(
      `/v3/apply4sub/sub_merchants/${sub_mchid}/modify-settlement`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
  /**
   * 4. 查询结算账户 API
   * docs: https://wepay-docs.netlify.com/docs/ecommerce/applyments/sub_merchants-modify-settlement/
   */
  async getSettlement(sub_mchid) {
    let reponse = await got.get(
      `/v3/apply4sub/sub_merchants/${sub_mchid}/settlement`,
    );
    const { body, request, headers } = reponse;
    return body;
  },
};
