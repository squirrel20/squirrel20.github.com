---
layout: post
title: "解题报告 > leetcode > Count and Say"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/count-and-say/)

The count-and-say sequence is the sequence of integers beginning as follows:

    1, 11, 21, 1211, 111221, ...

1 is read off as "one 1" or 11.

11 is read off as "two 1s" or 21.

21 is read off as "one 2, then one 1" or 1211.

Given an integer n, generate the nth sequence.

Note: The sequence of integers will be represented as a string.

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/41c596edc005f08cee87.js"></script>

## 分析

这就是一个基于一定的规则，进行模拟。输入参数为n，代表模拟n次。
