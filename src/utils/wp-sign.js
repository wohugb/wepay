const crypto = require('crypto');
const util = require('util');

module.exports = {
  genNonceStr(length) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const maxPos = chars.length;
    let nonce = '';
    let i;
    for (i = 0; i < (length || 32); i++) {
      nonce += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return nonce.toUpperCase();
  },
  genWkey() {
    signType = signType || 'MD5';
    var string = this.toQueryString(params, lower);
    string += '&key=' + key;
    // console.error('[genWkey]:', signType, string);
    return signTypes[signType](string).toUpperCase();
  },
  genTimeStamp() {
    return parseInt(+new Date() / 1000, 10) + '';
  },
  /**
   * 构造签名串
   * https://wechatpay-api.gitbook.io/wechatpay-api-v3/qian-ming-zhi-nan-1/qian-ming-sheng-cheng
   * 签名串一共有五行，每一行为一个参数。
   * 行尾以\n（换行符，ASCII编码值为0x0A）结束，
   * 包括最后一行。
   * 如果参数本身以\n结束，也需要附加一个\n。
   * 例如:
   *
   *   HTTP请求方法\n
   *   URL\n
   *   请求时间戳\n
   *   请求随机串\n
   *   请求报文主体\n
   *
   * 商户需要使用自身的私钥对API URL、消息体等关键数据的组合进行SHA-256 with RSA签名。
   *
   * /v3/certificates
   * */
  genSignInfo({ method, pathname, body, privateKey }) {
    method = method.toUpperCase() || 'GET';
    if (!pathname) return { errcode: 9404, errmsg: 'pathnameEmpty' };
    let timestamp = this.genTimeStamp();
    let nonce_str = this.genNonceStr();
    let data =
      `${method}\n` + `${pathname}\n` + `${timestamp}\n` + `${nonce_str}\n`;
    if (body && method !== 'GET') data += `${JSON.stringify(body)}\n`;
    else data += '\n';
    // console.log('signData:');
    // console.warn(data);
    // console.warn(JSON.stringify(data));
    let signature = crypto
      .createSign('RSA-SHA256')
      .update(data)
      .sign(privateKey, 'base64');
    // console.log(signature);
    return { nonce_str, timestamp, signature };
  },
  aes256gcmDecrypt({ aesKey, nonce, associated_data, ciphertext }) {
    // console.log({ aesKey, nonce, associated_data, ciphertext });
    const crypto = require('crypto');
    const buf = Buffer.from(ciphertext, 'base64');
    const length = buf.length;
    const auth_tag = buf.slice(length - 16);
    const data = buf.slice(0, length - 16);
    let decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, nonce);
    decipher.setAuthTag(Buffer.from(auth_tag));
    decipher.setAAD(Buffer.from(associated_data));
    let decrypt = decipher.update(data, null, 'utf8');
    decipher.final('utf8');
    return decrypt;
  },
};
