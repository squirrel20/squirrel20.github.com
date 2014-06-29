---
layout: post
title: "【翻译】Erlang数据类型"
description: ""
category: ""
tags: []
---
{% include JB/setup %}

[原文链接](http://www.erlang.org/doc/reference_manual/data_types.html)

### 1 Terms

在这个章节中将会介绍许多Erlang数据类型。任意的数据类型都可以叫做*term*类型。

### 2 Number

Erlang中有两种数值型的字面值：*integers*和*floats*。除了常规的表示方法，Erlang还提供了特定的表示方法：

* $char

字符char是ASCII码结果。

* base#value

base是value的进制，其取值范围为[2,36]。在Erlang 5.2/OTP R9B 及其之前的版本，其取值范围是[2,16]。

一些例子：

	1> 42.
	42
	2> $A.
	65
	3> $\n.
	10
	4> 2#101.
	5
	5> 16#1f.
	31
	6> 2.3.
	2.3
	7> 2.3e3.
	2.3e3
	8> 2.3e-3.
	0.0023

### 3 Atom

atom是一种字面值常量，其值就为名字。atom以小写字母开始