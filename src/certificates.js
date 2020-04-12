/**
 * 获取商户平台证书
 */
const fs = require('fs');
const got = require('./wp-got');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const sign = require('./utils/wp-sign');
const util = require('util');

module.exports = async function (config) {
  let { mchid, serial_no, privateKey, aesKey, platform_cert } = config;
  // const adapter = new FileSync(config.certificates);
  // const db = low(adapter);
  let reponse = await got.get('/v3/certificates', {
    mchid,
    serial_no,
    privateKey,
  });
  const { body, request, headers } = reponse;
  // console.log({ headers, body: body.data[0] });
  if (body && body.data) {
    let data = body.data[0];
    if (headers) {
      // const {
      //   'wechatpay-nonce': nonce,
      //   'wechatpay-signature': signature,
      //   'wechatpay-timestamp': timestamp,
      //   'wechatpay-serial': serial,
      //   'request-id': id,
      // } = headers;
      // console.log(signature); //headers, id, serial, nonce, timestamp,
      // ! fuck header nonce 和 body nonce 不是一个nonce
    }

    // db.defaults({ data: [] }).write();
    // let dataDb = db
    //   .get('data')
    //   .find({
    //     serial_no: data.serial_no,
    //   })
    //   .value();
    // if (dataDb) {
    //   db.get('data')
    //     .find({
    //       serial_no: data.serial_no,
    //     })
    //     .assign(data)
    //     .write();
    // } else {
    //   db.get('data')
    //     .push(data)
    //     .write();
    // }
    let options = Object.assign({ aesKey }, data.encrypt_certificate);
    let decrypt = sign.aes256gcmDecrypt(options);
    fs.writeFileSync(platform_cert, decrypt);
    return decrypt;
  }
  return body;
};
