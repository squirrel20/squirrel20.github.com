---
layout: post
title: "解题报告 > leetcode > Remove Duplicates from Sorted Array II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

Follow up for "Remove Duplicates":

What if duplicates are allowed at most twice?

For example,

Given sorted array A = [1,1,1,2,2,3],

Your function should return length = 5, and A is now [1,1,2,2,3].

## 源码

<script src="https://gist.github.com/squirrel20/d831d6b31f4a4e22208e.js"></script>

## 分析

与[Remove Duplicates from Sorted Array](http://myspes.info/2014/10/09/remove_duplicates_from_sorted_array/)类似。

只是当前字符是与前面的前面的字符作比较。
