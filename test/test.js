let wpGot = require('../src/index');
let config = require('./config');
(async () => {
  wpGot.init(config);
  const { body } = await wpGot.got({
    url: '/v3/certificates',
    method: 'GET',
    body: {
      combine_out_trade_no: '1217752501201407033233368018',
      combine_mchid: '1230000109',
      scene_info: {
        device_id: 'POS1:1',
        payer_client_ip: '14.17.22.32',
      },
      sub_orders: [
        {
          mchid: '1230000109',
          attach: '深圳分店',
          amount: {
            total_amount: 10,
            currency: 'CNY',
          },
          out_trade_no: '20150806125346',
          sub_mchid: '1900000109',
          detail: '',
          profit_sharing: null,
          description: '腾讯充值中心-QQ会员充值',
        },
      ],
      combine_payer_info: {
        openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
      },
      time_start: '2018-06-08T10:34:56+08:00',
      time_expire: '2018-06-08T10:34:56+08:00',
      notify_url: 'https://yourapp.com/notify',
      limit_pay: ['no_debit'],
    },
  });
  console.log('[返回数据]:', JSON.stringify(body));
})();
