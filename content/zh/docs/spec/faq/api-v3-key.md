---
title: 'API v3密钥相关'
linkTitle: '密钥相关'
weight: 63
description: >
  API v3密钥相关
type: 'docs'
---

## 修改 API v3 密钥, 会影响现有的使用 APIKey 密钥的交易吗？

**APIv3 密钥**: 我不是(APIKey 密钥）, 我(对交易）没有(影响）, 别找技术支持确认了。

## 使用 Java 加载密钥时, 抛出异常 InvalidKeyException: Illegal key size

受到美国法律的约束, 早期 Java 的运行时限制了 JCE 支持的密钥长度, 即默认不支持 256 位的 AES。解决的方法有三个:

- (推荐）升级 Java 8u162+, 默认使用 ulimited policy​
- Java 8u151 和 8u152, 可以在你的程序中直接放开策略

```java
Security.setProperty("crypto.policy", "unlimited");
```

- 其他版本, 下载无限强度权限策略文件补丁包, 并使用其中的文件覆盖\$JAVA_HOME/lib/security 目录下的对应的 local_policy.jar 和 US_export_policy.jar

Java9 及以上, 均无限制。
