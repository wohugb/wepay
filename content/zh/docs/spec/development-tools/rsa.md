---
title: 'RSA加密算法'
linkTitle: 'RSA加密算法'
weight: 3
description: >
  RSA加密算法是一种非对称加密算法，在公开密钥加密和电子商业中被广泛使用。
type: 'docs'
---

RSA 是 1977 年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的。当时他们三人都在麻省理工学院工作。RSA 就是他们三人姓氏开头字母拼在一起组成的。

1973 年，在英国政府通讯总部工作的数学家克利福德·柯克斯（Clifford Cocks）在一个内部文件中提出了一个与之等效的算法，但该算法被列入机密，直到 1997 年才得到公开。

对极大整数做因数分解的难度决定了 RSA 算法的可靠性。换言之，对一极大整数做因数分解愈困难，RSA 算法愈可靠。假如有人找到一种快速因数分解的算法的话，那么用 RSA 加密的信息的可靠性就会极度下降。但找到这样的算法的可能性是非常小的。今天只有短的 RSA 钥匙才可能被强力方式破解。到当前为止，世界上还没有任何可靠的攻击 RSA 算法的方式。只要其钥匙的长度足够长，用 RSA 加密的信息实际上是不能被破解的。

1983 年 9 月 12 日麻省理工学院在美国为 RSA 算法申请了专利。这个专利于 2000 年 9 月 21 日失效。由于该算法在申请专利前就已经被发表了，在世界上大多数其它地区这个专利权不被承认。

## 操作

### 公钥与私钥的产生

假设 Alice 想要通过一个不可靠的媒体接收 Bob 的一条私人消息。她可以用以下的方式来产生一个公钥和一个私钥：

1. 随意选择两个大的素数{\displaystyle p}p 和{\displaystyle q}q，{\displaystyle p}p 不等于{\displaystyle q}q，计算{\displaystyle N=pq}N=pq。
2. 根据欧拉函数，求得{\displaystyle r=\varphi (N)=\varphi (p)\varphi (q)=(p-1)(q-1)}r=\varphi (N) = \varphi (p)\varphi (q)=(p-1)(q-1)
3. 选择一个小于{\displaystyle r}r 的整数{\displaystyle e}e，使{\displaystyle e}e 与{\displaystyle r}r 互质。并求得{\displaystyle e}e 关于{\displaystyle r}r 的模逆元，命名为{\displaystyle d}d（求{\displaystyle d}d 令{\displaystyle ed\equiv 1{\pmod {r}}}{\displaystyle ed\equiv 1{\pmod {r}}}）。（模逆元存在，当且仅当{\displaystyle e}e 与{\displaystyle r}r 互质）
4. 将{\displaystyle p}p 和{\displaystyle q}q 的记录销毁。

{\displaystyle (N,e)}(N,e)是公钥，{\displaystyle (N,d)}(N,d)是私钥。Alice 将她的公钥{\displaystyle (N,e)}(N,e)传给 Bob，而将她的私钥{\displaystyle (N,d)}(N,d)藏起来。

### 加密消息

假设 Bob 想给 Alice 送一个消息{\displaystyle m}m，他知道 Alice 产生的{\displaystyle N}N 和{\displaystyle e}e。他使用起先与 Alice 约好的格式将{\displaystyle m}m 转换为一个小于{\displaystyle N}N 的非负整数{\displaystyle n}n，比如他可以将每一个字转换为这个字的 Unicode 码，然后将这些数字连在一起组成一个数字。假如他的信息非常长的话，他可以将这个信息分为几段，然后将每一段转换为{\displaystyle n}n。用下面这个公式他可以将{\displaystyle n}n 加密为{\displaystyle c}c：

{\displaystyle c\equiv n^{e}{\pmod {N}}}{\displaystyle c\equiv n^{e}{\pmod {N}}}
计算{\displaystyle c}c 并不复杂。Bob 算出{\displaystyle c}c 后就可以将它传递给 Alice。

### 解密消息

Alice 得到 Bob 的消息{\displaystyle c}c 后就可以利用她的密钥{\displaystyle d}d 来解码。她可以用以下这个公式来将{\displaystyle c}c 转换为{\displaystyle n}n：

{\displaystyle n\equiv c^{d}\ (\mathrm {mod} \ N)}{\displaystyle n\equiv c^{d}\ (\mathrm {mod} \ N)}
得到{\displaystyle n}n 后，她可以将原来的信息{\displaystyle m}m 重新复原。

解码的原理是

{\displaystyle c^{d}\equiv n^{e\cdot d}\ (\mathrm {mod} \ N)} c^d \equiv n^{e \cdot d}\ (\mathrm{mod}\ N)
已知{\displaystyle ed\equiv 1{\pmod {r}}}{\displaystyle ed\equiv 1{\pmod {r}}}，即 {\displaystyle ed=1+h\varphi (N)}{\displaystyle ed=1+h\varphi (N)}。 由欧拉定理得：

{\displaystyle n^{ed}=n^{1+h\varphi (N)}=n\left(n^{\varphi (N)}\right)^{h}\equiv n(1)^{h}{\pmod {N}}\equiv n{\pmod {N}}}{\displaystyle n^{ed}=n^{1+h\varphi (N)}=n\left(n^{\varphi (N)}\right)^{h}\equiv n(1)^{h}{\pmod {N}}\equiv n{\pmod {N}}}

### 签名消息

RSA 也可以用来为一个消息署名。假如 Alice 想给 Bob 传递一个署名的消息的话，那么她可以为她的消息计算一个散列值（Message digest），然后用她的私钥“加密”（如同前面“加密消息”的步骤）这个散列值并将这个“署名”加在消息的后面。这个消息只有用她的公钥才能被解密。Bob 获得这个消息后可以用 Alice 的公钥“解密”（如同前面“解密消息”的步骤）这个散列值，然后将这个数据与他自己为这个消息计算的散列值相比较。假如两者相符的话，那么 Bob 就可以知道发信人持有 Alice 的私钥，以及这个消息在传播路径上没有被篡改过。

## 安全

假设偷听者 Eve 获得了 Alice 的公钥{\displaystyle N}N 和{\displaystyle e}e 以及 Bob 的加密消息{\displaystyle c}c，但她无法直接获得 Alice 的密钥{\displaystyle d}d。要获得{\displaystyle d}d，最简单的方法是将{\displaystyle N}N 分解为{\displaystyle p}p 和{\displaystyle q}q，这样她可以得到同余方程{\displaystyle de=1(\mathrm {mod} (p-1)(q-1))}de=1 (\mathrm{mod}(p-1)(q-1))并解出{\displaystyle d}d，然后代入解密公式

{\displaystyle c^{d}\equiv n\ (\mathrm {mod} \ N)} c^d \equiv n\ (\mathrm{mod}\ N)
导出 n（破密）。但至今为止还没有人找到一个多项式时间的算法来分解一个大的整数的因子，同时也还没有人能够证明这种算法不存在（见因数分解）。

至今为止也没有人能够证明对{\displaystyle N}N 进行因数分解是唯一的从{\displaystyle c}c 导出{\displaystyle n}n 的方法，直到今天也还没有找到比它更简单的方法。（至少没有公开的方法。）

因此今天一般认为只要{\displaystyle N}N 足够大，那么黑客就没有办法了。

假如{\displaystyle N}N 的长度小于或等于 256 位，那么用一台个人电脑在几个小时内就可以分解它的因子了。1999 年，数百台电脑合作分解了一个 512 位长的{\displaystyle N}N。一个由 Shamir 和 Tromer 在 2003 年从理论上构建的硬件 TWIRL[6]，使人们开始质疑 1024 位长的 N 的安全性，当前推荐{\displaystyle N}N 的长度至少为 2048 位。[7]

1994 年彼得·秀尔（Peter Shor）证明一台量子计算机可以在多项式时间内进行因数分解。假如量子计算机有朝一日可以成为一种可行的技术的话，那么秀尔的算法可以淘汰 RSA 和相关的派生算法。（即依赖于分解大整数困难性的加密算法）

假如有人能够找到一种有效的分解大整数的算法的话，或者假如量子计算机可行的话，那么在解密和制造更长的钥匙之间就会展开一场竞争。但从原理上来说 RSA 在这种情况下是不可靠的。

## 实现细节

### 密钥生成

首先要使用概率算法来验证随机产生的大的整数是否质数，这样的算法比较快而且可以消除掉大多数非质数。假如有一个数通过了这个测试的话，那么要使用一个精确的测试来保证它的确是一个质数。

除此之外这样找到的{\displaystyle p}p 和{\displaystyle q}q 还要满足一定的要求，首先它们不能太靠近，此外{\displaystyle p-1}p-1 或{\displaystyle q-1}q-1 的因子不能太小，否则的话{\displaystyle N}N 也可以被很快地分解。

此外寻找质数的算法不能给攻击者任何信息，这些质数是怎样找到的，尤其产生随机数的软件必须非常好。要求是随机和不可预测。这两个要求并不相同。一个随机过程可能可以产生一个不相关的数的系列，但假如有人能够预测出（或部分地预测出）这个系列的话，那么它就已经不可靠了。比如有一些非常好的随机数算法，但它们都已经被发表，因此它们不能被使用，因为假如一个攻击者可以猜出{\displaystyle p}p 和{\displaystyle q}q 一半的位的话，那么他们就已经可以轻而易举地推算出另一半。

此外密钥{\displaystyle d}d 必须足够大，1990 年有人证明假如{\displaystyle p}p 大于{\displaystyle q}q 而小于{\displaystyle 2q}2q（这是一个很经常的情况）而{\displaystyle d<{\frac {1}{3}}\times N^{\frac {1}{4}}}d<\frac{1}{3} \times N^{\frac{1}{4}}，那么从{\displaystyle N}N 和{\displaystyle e}e 可以很有效地推算出{\displaystyle d}d。此外{\displaystyle e=2}e=2 永远不应该被使用。

### 速度

比起 DES 和其它对称算法来说，RSA 要慢得多。实际上 Bob 一般使用一种对称算法来加密他的信息，然后用 RSA 来加密他的比较短的对称密码，然后将用 RSA 加密的对称密码和用对称算法加密的消息送给 Alice。

### 密钥分配

和其它加密过程一样，对 RSA 来说分配公钥的过程是非常重要的。分配公钥的过程必须能够抵挡中间人攻击。假设 Eve 交给 Bob 一个公钥，并使 Bob 相信这是 Alice 的公钥，并且她可以截下 Alice 和 Bob 之间的信息传递，那么她可以将她自己的公钥传给 Bob，Bob 以为这是 Alice 的公钥。Eve 可以将所有 Bob 传递给 Alice 的消息截下来，将这个消息用她自己的密钥解密，读这个消息，然后将这个消息再用 Alice 的公钥加密后传给 Alice。理论上 Alice 和 Bob 都不会发现 Eve 在偷听他们的消息。今天人们一般用可靠的第三方机构签发证书来防止这样的攻击。

## 典型密钥长度

1997 年后开发的系统，用户应使用 1024 位密钥，证书认证机构应用 2048 位或以上。

## 已公开的或已知的攻击方法

### 大数因数分解

针对 RSA 最流行的攻击一般是基于大数因数分解。1999 年，RSA-155 (512 bits)被成功分解，花了五个月时间（约 8000 MIPS 年）和 224 CPU hours 在一台有 3.2G 中央内存的 Cray C916 计算机上完成。[8]

RSA-158 表示如下：

```
39505874583265144526419767800614481996020776460304936454139376051579355626529450683609
727842468219535093544305870490251995655335710209799226484977949442955603

= 3388495837466721394368393204672181522815830368604993048084925840555281177×
11658823406671259903148376558383270818131012258146392600439520994131344334162924536139
```

2009 年 12 月 12 日，编号为 RSA-768（768 bits, 232 digits）数也被成功分解[9]。这一事件威胁了现通行的 1024-bit 密钥的安全性，普遍认为用户应尽快升级到 2048-bit 或以上。

RSA-768 表示如下：

```
123018668453011775513049495838496272077285356959533479219732245215172640050726
365751874520219978646938995647494277406384592519255732630345373154826850791702
6122142913461670429214311602221240479274737794080665351419597459856902143413

= 3347807169895689878604416984821269081770479498371376856891
2431388982883793878002287614711652531743087737814467999489×
3674604366679959042824463379962795263227915816434308764267
6032283815739666511279233373417143396810270092798736308917
```

### 时间攻击

1995 年有人提出了一种非常意想不到的攻击方式：假如 Eve（窃密者）对 Alice 的硬件有充分的了解，而且知道它对一些特定的消息加密时所需要的时间的话，那么她可以很快地推导出 d。这种攻击方式之所以会成立，主要是因为在进行加密时所进行的模指数运算是一个比特一个比特进行的，而比特为 1 所花的运算比比特为 0 的运算要多很多，因此若能得到多组消息与其加密时间，就会有机会可以反推出私钥的内容。

## 相关条目

- 公开密钥加密
- 量子电脑
- 秀尔算法
- Miller-Rabin 素数测试
- 快速幂
- 扩展欧几里得算法
