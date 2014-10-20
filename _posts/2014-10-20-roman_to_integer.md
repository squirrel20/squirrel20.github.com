---
layout: post
title: "解题报告 > leetcode > Roman to Integer"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/roman-to-integer/)

Given a roman numeral, convert it to an integer.

Input is guaranteed to be within the range from 1 to 3999.

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/a7d71b3226933759bbf3.js"></script>

## 分析

主要是要熟悉罗马数字的规则。

罗马数字一共有7个：

    I     V    X      L      C        D        M
    1    5    10    50    100    500    1000

这道题用到的规则如下：

1. 重复次数：一个罗马数字重复几次，就表示这个数的几倍。
2. 左加右减：
    * 在较大的罗马数字的右边记上较小的罗马数字，表示大数字加小数字。
    * 在较大的罗马数字的左边记上较小的罗马数字，表示大数字减小数字。

其他的具体详情，参见[维基百科](http://zh.wikipedia.org/wiki/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97)
