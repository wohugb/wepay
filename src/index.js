'use strict';

let util = require('./util');
let wpGot = require('./wp-got');
// https://api.mch.weixin.qq.com/pay/unifiedorder
/**
 * Authorization: 认证类型 签名信息
 * 认证类型，目前为W ECHATPAY2-SHA256-RSA2048
 * 签名信息
 *   发起请求的商户（包括直连商户、服务商或渠道商）的商户号 mchid
 *   商户API证书序列号，用于声明所使用的证书 serial_no
 *   请求随机串 nonce_str
 *   时间戳 timestamp
 *   签名值 signature
 *  注：以上五项签名信息，无顺序要求。
 */
module.exports = {
  init({ mchid, serial_no, privateKey }) {
    this.mchid = mchid;
    this.serial_no = serial_no;
    this.privateKey = privateKey;
  },
  async got({ method, url, body }) {
    let token = Object.assign(
      { mchid: this.mchid, serial_no: this.serial_no },
      util.genSignInfo({ method, url, body, privateKey: this.privateKey }),
    ).join();
    try {
      return await wpGot(url, { method, token });
    } catch (error) {
      console.warn(error);
      return { errcode: 9505, errmsg: 'WpGot Error' };
    }
  },
};
Object.prototype.join = function(glue, separator) {
  var object = this;

  if (glue == undefined) glue = '=';

  if (separator == undefined) separator = ',';

  return Object.getOwnPropertyNames(object)
    .map(k => {
      // return [k, object[k]].join(glue);
      return `${k}${glue}"${object[k]}"`;
    })
    .join(separator);
};
