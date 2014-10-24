---
layout: post
title: "解题报告 > leetcode > Merge Sorted Array"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

Given two sorted integer arrays A and B, merge B into A as one sorted array.

Note:

You may assume that A has enough space (size that is greater or equal to m + n) to hold additional elements from B. The number of elements initialized in A and B are m and n respectively.

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/73c9e302472d74b8ca56.js"></script>

## 分析

不使用额外的空间，在O(m+n)的时间复杂度内完成。

从后往前排就是了。
