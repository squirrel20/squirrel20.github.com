---
layout: post
title: "解题报告 > leetcode > Remove Duplicates from Sorted Array"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array)

Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this in place with constant memory.

For example,

Given input array A = [1,1,2],

Your function should return length = 2, and A is now [1,2].

## 源码

<script src="https://gist.github.com/squirrel20/905e6e2a90ef4e72ac16.js"></script>

## 分析

可以使用类似插入排序的思想来解，不过这样做的时间复杂度过高。

因为数组已经是排好序的，所以可以避免很多不必要的移位操作，一次最多只需要移动一个字符。时间复杂度为O(n)。
