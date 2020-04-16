---
title: 'Crypto'
linkTitle: 'Crypto'
weight: 8
description: >
  在`crypto`模块提供加密功能，其包括用于`OpenSSL's hash`, `HMAC`, `cipher`, `decipher`, `sign`, 和 `verify`功能的一组包装的。
type: 'docs'
---

<!--introduced_in=v0.3.6-->

> Stability: 2 - Stable

使用 `require('crypto')` 访问此模块.

```js
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto
  .createHmac('sha256', secret)
  .update('I love cupcakes')
  .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```
