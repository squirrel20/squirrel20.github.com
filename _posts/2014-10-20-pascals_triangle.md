---
layout: post
title: "解题报告 > leetcode > Pascal's Triangle"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目连接](https://oj.leetcode.com/problems/pascals-triangle/)

Given numRows, generate the first numRows of Pascal's triangle.

For example, given numRows = 5,
Return

    [
         [1],
        [1,1],
       [1,2,1],
      [1,3,3,1],
     [1,4,6,4,1]
    ]

## 代码

<script src="https://gist.github.com/squirrel20/4308f91239b113c1764f.js"></script>

## 分析

杨辉三角，计算公式：

    f[i][j] = f[i - 1][j] + f[i - 1][j - 1]
