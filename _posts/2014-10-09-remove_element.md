---
layout: post
title: "解题报告 > leetcode > Remove Element"
description: ""
category: ""
tags: []
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-element/)

Given an array and a value, remove all instances of that value in place and return the new length.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

## 源码

<script src="https://gist.github.com/squirrel20/c05b7d77a94ac34432cd.js"></script>

## 分析

### 第一份代码

该代码的时间复杂度为O(nlgn)，没错，我写的 （- -！）。

首先将数组排序，然后用二分法找出指定元素，之后就是删除一个或多个指定元素。

（之前做过一道类似的题欸，我居然还是会相出复杂度这么高的思路。[就是这题](http://myspes.info/2014/10/09/remove_duplicates_from_sorted_array/)）

### 第二份代码

这份代码来自[leetcode论坛](https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference)。

时间复杂度为O(n)，一次最多只移动一位，代码很简洁，可是也有一些不必要的移位操作。

### 第三份代码

同样来自[leetcode论坛](https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference)。

是第二份代码的改进版，避免了不必要的移位操作。

> 这里也看出了，不要A了题就万事大吉了，得看看网上有没有给出更好的思路。
