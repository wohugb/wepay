process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exit(1); // To exit with a 'failure' code
});

const got = require('got');
const nock = require('nock');

let { certificates, combine_transactions } = require('../src/');
let config = require('./config/config');
(async () => {
  const body = await combine_transactions({
    config,
    combine_appid: config.combine.appid,
    combine_mchid: config.combine.mchid,
    combine_out_trade_no: '1217752501201407033233368018',
    openid: config.combine.openid,
    sub_orders: [
      {
        mchid: config.combine.mchid,
        attach: '深圳分店',
        amount: {
          total_amount: 10,
          currency: 'CNY',
        },
        out_trade_no: '20150806125346',
        sub_mchid: config.combine.mchid,
        // detail: '',
        profit_sharing: null,
        description: '腾讯充值中心-QQ 会员充值',
      },
    ],
  });
  console.log('[返回数据]:', JSON.stringify(body));
})();

// (async () => {
//   const { body } = await got.post('https://httpbin.org/anything', {
//     json: {
//       hello: 'world',
//     },
//     responseType: 'json',
//   });

//   console.log(body.data, typeof body.data);
//   //=> '{"hello":"world"}'
// })();

// nock('https://sindresorhus.com')
//   .get('/')
//   .reply(200, 'Hello world!');

// (async () => {
//   const response = await got('https://sindresorhus.com');
//   console.log(response.body);
//   //=> 'Hello world!'
// })();
