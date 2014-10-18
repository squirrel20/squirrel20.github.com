---
layout: post
title: "解题报告 > leetcode > Reverse Integer"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

Reverse digits of an integer.

Example1: x = 123, return 321

Example2: x = -123, return -321

**Have you thought about this?**

Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!

If the integer's last digit is 0, what should the output be? ie, cases such as 10, 100.

Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?

Throw an exception? Good, but what if throwing an exception is not an option? You would then have to re-design the function (ie, add an extra parameter).

## 源码

<script src="https://gist.github.com/squirrel20/530b4549040cd45dbf61.js"></script>

## 分析

主要就是题目中的：**Have you thought about this?**
