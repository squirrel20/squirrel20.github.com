---
layout: post
title: "解题报告 > leetcode > Zigzag Conversion"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/zigzag-conversion/)

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

    P       A       H       N
    A   P   L   S   I   I   G
    Y       I       R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

    string convert(string text, int nRows);

convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/fb2e3a4f6305b3e01f6a.js"></script>

## 分析

    A           G
    B       F   H
    C   E       I
    D           J

从上面可以看出，第一行和最后一行字符间隔为一个周期，第一行和最后一行之间的字符在一个周期内还会存在一个字符。
