'use strict';

const got = require('got');

// const getRateLimit = headers => ({
//   limit: parseInt(headers['x-ratelimit-limit'], 10),
//   remaining: parseInt(headers['x-ratelimit-remaining'], 10),
//   reset: new Date(parseInt(headers['x-ratelimit-reset'], 10) * 1000),
// });

const create = () =>
  got.extend({
    prefixUrl: process.env.WEPAY_ENDPOINT || 'https://api.mch.weixin.qq.com',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'https://github.com/wohugb/wepay',
    },
    responseType: 'json',
    handlers: [
      (options, next) => {
        // Authorization
        if (options.token && !options.headers.authorization) {
          options.headers.authorization = `WECHATPAY2-SHA256-RSA2048 ${options.token}`;
          delete options.token;
        }

        // `options.body` -> `options.json`
        options.json = options.body;
        delete options.body;

        // Don't touch streams
        if (options.isStream) return next(options);
        // console.log(options);
        return (async () => {
          try {
            return await next(options);
          } catch (error) {
            const { response } = error;
            if (response && response.body) {
              error.name = 'WepayV3Error';
              error.message = `${response.body.message} (${error.response.statusCode})`;
            }
            throw error;
          }
        })();
      },
    ],
    hooks: {
      init: [
        options => {
          // TODO: This should be fixed in Got
          // Remove leading slashes
          if (typeof options.url === 'string' && options.url.startsWith('/')) {
            options.url = options.url.slice(1);
          }
        },
      ],
    },
  });

module.exports = create();

if (process.env.NODE_ENV === 'test') {
  module.exports.recreate = create;
}
