const moment = require('moment');
const got = require('./wp-got');
module.exports = {
  /**
   *
   * @param {*} combine_appid 合单发起方的appid
   * @param {*} combine_mchid 合单发起方商户号
   * @param {*} combine_out_trade_no 合单支付总订单号
   * @param {*} sub_orders 最多支持子单条数: 50
   * @param {*} openid 使用合单appid获取的对应用户openid
   *
   * sub_orders:
   * {
      "mchid": "1230000109",
      "attach": "深圳分店",
      "amount": {
        "total_amount": 10,
        "currency": "CNY"
      },
      "out_trade_no": "20150806125346",
      "sub_mchid": "1900000109",
      "detail": "",
      "profit_sharing": null,
      "description": "腾讯充值中心-QQ 会员充值"
    }
   */
  async combine_transactions({
    config,
    combine_appid,
    combine_mchid,
    combine_out_trade_no,
    openid,
    sub_orders,
  }) {
    let { mchid, serial_no, privateKey, notify_url } = config;
    let body = {
      combine_appid,
      combine_mchid,
      combine_out_trade_no,
      combine_payer_info: { openid },
      sub_orders,
      time_start: moment().format(),
      time_expire: moment().add(10, 'minutes').format(),
      notify_url,
      limit_pay: ['no_debit'],
      // scene_info: {
      //   payer_client_ip: '',
      // },
    };
    let reponse = await got.post('/v3/combine-transactions/jsapi', {
      mchid,
      serial_no,
      privateKey,
      body,
    });
    let { body: respbody, request, headers } = reponse;
    // console.log({ headers, body: body.data[0] });
    return respbody;
  },
};
// (async () => {
//   wpGot.init(config);
//   const { body } = await wpGot.got({
//     url: '/v3/certificates',
//     method: 'GET',
//     body: {
//       combine_out_trade_no: '1217752501201407033233368018',
//       combine_mchid: '1230000109',
//       scene_info: {
//         device_id: 'POS1:1',
//         payer_client_ip: '14.17.22.32',
//       },
//       sub_orders: [
//         {
//           mchid: '1230000109',
//           attach: '深圳分店',
//           amount: {
//             total_amount: 10,
//             currency: 'CNY',
//           },
//           out_trade_no: '20150806125346',
//           sub_mchid: '1900000109',
//           detail: '',
//           profit_sharing: null,
//           description: '腾讯充值中心-QQ会员充值',
//         },
//       ],
//       combine_payer_info: {
//         openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
//       },
//       time_start: '2018-06-08T10:34:56+08:00',
//       time_expire: '2018-06-08T10:34:56+08:00',
//       notify_url: 'https://yourapp.com/notify',
//       limit_pay: ['no_debit'],
//     },
//   });
//   console.log('[返回数据]:', JSON.stringify(body));
// })();
