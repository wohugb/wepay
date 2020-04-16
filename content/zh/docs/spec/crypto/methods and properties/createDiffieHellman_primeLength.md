---
title: 'crypto.createDiffieHellman(primeLength[, generator])'
linkTitle: 'createDiffieHellman'
weight: 9
description: >

type: 'docs'
---

<!-- YAML
added: v0.5.0
-->

- `primeLength` {number}
- `generator` {number} **Default:** `2`
- Returns: {DiffieHellman}

Creates a `DiffieHellman` key exchange object and generates a prime of
`primeLength` bits using an optional specific numeric `generator`.
If `generator` is not specified, the value `2` is used.

## `crypto.createDiffieHellmanGroup(name)`

<!-- YAML
added: v0.9.3
-->

- `name` {string}
- Returns: {DiffieHellmanGroup}

An alias for [`crypto.getDiffieHellman()`][]
