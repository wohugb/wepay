const crypto = require('crypto');

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
    return nonce;
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
   * 例如：
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
  genSignInfo({ method, url, body, privateKey }) {
    method = method || 'GET';
    if (!url) return { errcode: 9404, errmsg: 'urlEmpty' };
    let timestamp = this.genTimeStamp();
    let nonce_str = this.genNonceStr();
    let data = `${method}\n` + `${url}\n` + `${timestamp}\n` + `${nonce_str}\n`;
    if (body && method !== 'GET') data += `${JSON.stringify(body)}\n`;
    else data += '\n';
    // console.log('signData:', data, privateKey);
    let sign = crypto.createSign('RSA-SHA256');
    // sign.update(Buffer.from(data, 'utf-8'));
    sign.update(data);
    let signature = sign.sign(privateKey, 'base64');
    return { nonce_str, timestamp, signature };
  },
};
