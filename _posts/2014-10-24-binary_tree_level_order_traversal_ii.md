---
layout: post
title: "解题报告 > leetcode > Binary Tree Level Order Traversal II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:

Given binary tree {3,9,20,#,#,15,7},

        3
       / \
      9  20
        /  \
       15   7

return its bottom-up level order traversal as:

    [
      [15,7],
      [9,20],
      [3]
    ]

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/619d0a6d499898c61204.js"></script>

## 分析

宽度优先搜索。
