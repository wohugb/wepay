---
title: '类: DiffieHellmanGroup'
linkTitle: 'DiffieHellmanGroup'
weight: 6
description: >
  `DiffieHellmanGroup`类需要一个众所周知的MODP组作为它的参数，但其它作业跟`DiffieHellman`一样。
type: 'docs'
---

<!-- YAML
added: v0.7.5
-->

```js
const name = 'modp1';
const dh = crypto.createDiffieHellmanGroup(name);
```

`name` is taken from [RFC 2412][] (modp1 and 2) and [RFC 3526][]:

```console
$ perl -ne 'print "$1\n" if /"(modp\d+)"/' src/node_crypto_groups.h
modp1  #  768 bits
modp2  # 1024 bits
modp5  # 1536 bits
modp14 # 2048 bits
modp15 # etc.
modp16
modp17
modp18
```
