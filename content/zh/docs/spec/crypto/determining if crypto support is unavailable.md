---
title: '确定是否加密的支持是否可用'
linkTitle: '是否可用'
weight: 1
description: >
  这是可能的`Node.js`，而不包括对`crypto`模块的支持来构建。<br>
  在这种情况下，调用 `require('crypto')` 将导致抛出一个错误。
type: 'docs'
---

```js
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
```
