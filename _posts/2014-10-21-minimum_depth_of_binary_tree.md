---
layout: post
title: "解题报告 > leetcode > Minimum Depth of Binary Tree"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/minimum-depth-of-binary-tree/)

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

<!--more-->

## 代码

<script src="https://gist.github.com/squirrel20/4e47286f665663a35217.js"></script>

## 分析

虽然官方给这题打的标签是深度优先搜索，可我觉得使用宽度优先搜索遍历的节点要少些，这样更快嘛。
