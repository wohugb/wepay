'use strict';

const util = require('util');
const kits = require('./wp-kits');
const got = require('got');
const pkg = require('../package');
/**
 * Authorization: 认证类型 签名信息
 * 认证类型，目前为W ECHATPAY2-SHA256-RSA2048
 * 签名信息
 *   发起请求的商户（包括直连商户、服务商或渠道商）的商户号 mchid
 *   商户API证书序列号，用于声明所使用的证书 serial_no
 *   请求随机串 nonce_str
 *   时间戳 timestamp
 *   签名值 signature
 *  注: 以上五项签名信息，无顺序要求。
 */
module.exports = got.extend({
  prefixUrl: process.env.WEPAY_ENDPOINT || 'https://api.mch.weixin.qq.com',
  headers: {
    'Content-Type': 'application/json',
    'user-agent': `${pkg.name}(${pkg.version}):https://github.com/wohugb/wepay`,
  },
  responseType: 'json',
  handlers: [
    (options, next) => {
      // Authorization
      // if (options.token && !options.headers.authorization) {
      //   options.headers.authorization = `WECHATPAY2-SHA256-RSA2048 ${options.token}`;
      //   delete options.token;
      // }
      let { method, url, body, privateKey, mchid, serial_no } = options;
      // @todo 产训？query=param
      let { pathname } = url;

      let token = Object.assign(
        { mchid, serial_no },
        kits.genSignInfo({
          method,
          pathname,
          body,
          privateKey,
        }),
      ).join();
      options.headers.authorization = `WECHATPAY2-SHA256-RSA2048 ${token}`;
      delete options.mchid;
      delete options.serial_no;
      delete options.privateKey;

      // `options.body` -> `options.json`
      if (options.body) {
        options.json = options.body;
        delete options.body;
      }

      // Don't touch streams
      if (options.isStream) return next(options);
      // console.log(options.headers);
      return (async () => {
        try {
          return await next(options);
        } catch (error) {
          const { response = {} } = error;
          /** body, url, ip, requestUrl, timings, isFromCache, redirectUrls, retryCount, */
          const { request = {}, body = {}, statusCode = 0 } = response;
          // console.log({ body: util.inspect(body) });
          console.log({
            request: util.inspect(request, { depth: null }),
          });
          error.name = body.code;
          error.message = body.message;
          // throw error;
          return { body: Object.assign(body, { statusCode }) };
        }
      })();
    },
  ],
  hooks: {
    init: [
      (options) => {
        // TODO: This should be fixed in Got
        // Remove leading slashes
        if (typeof options.url === 'string' && options.url.startsWith('/')) {
          options.url = options.url.slice(1);
        }
      },
    ],
  },
});
Object.prototype.join = function (glue, separator) {
  var object = this;

  if (glue == undefined) glue = '=';

  if (separator == undefined) separator = ',';

  return Object.getOwnPropertyNames(object)
    .map((k) => {
      // return [k, object[k]].join(glue);
      return `${k}${glue}"${object[k]}"`;
    })
    .join(separator);
};
