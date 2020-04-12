---
title: '接口'
weight: 1
description: >
  微支付v3 nodejs 接口
type: 'docs'
---

## 配置个文件

```js
const fs = require('fs');

module.exports = {
  mchid: '132******1',
  serial_no: '25A6********************************93A0',
  // privateKey: 'eUp8VUYNFgR41tn8yyIqsz73RuNhxHSB',
  privateKey: fs.readFileSync(`${__dirname}/cert/apiclient_key.pem`),
  certificates: `${__dirname}/certificates.json`,
};
```

- **mchid**: 商户号
- **serial_no**: 证书序列号
- **privateKey**: 私钥文件地址
- **certificates**: 平台证书文件地址

## 获取商户平台证书

**/v3/certificates**

```js
let { certificates } = require('wepay');
let config = require('./config/config');
(async () => {
  const body = await certificates(config);
  console.log('[返回数据]:', JSON.stringify(body));
})();
```
