---
layout: post
title: "解题报告 > leetcode > Single Number"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
## 题目

[题目链接](https://oj.leetcode.com/problems/single-number)

Given an array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

## 源码

<script src="https://gist.github.com/squirrel20/31cb8d72ee7e33cc8ee8.js"></script>

## 分析

这里用到了一个关于**异或**运算的性质：

    A ^ 0 = 0
    A ^ A = 0
    A ^ A ^ B = B
