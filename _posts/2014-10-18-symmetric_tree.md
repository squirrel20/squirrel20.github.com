---
layout: post
title: "解题报告 > leetcode > Symmetric Tree "
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/symmetric-tree/)

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree is symmetric:

      1
     / \
    2   2
   / \ / \
  3  4 4  3

But the following is not:

      1
     / \
    2   2
     \   \
     3    3

Note:

Bonus points if you could solve it both recursively and iteratively.

confused what "{1,#,2,3}" means?

OJ's Binary Tree Serialization:

The serialization of a binary tree follows a level order traversal, where '#' signifies a path terminator where no node exists below.

Here's an example:

     1
    / \
   2   3
      /
     4
      \
       5

The above binary tree is serialized as "{1,2,3,#,#,4,#,#,5}".

<!--more-->

## 源码

<script src="https://gist.github.com/squirrel20/776684ef9545ecdbee2d.js"></script>

## 分析

思路就是对左右子树同步遍历，其中左子树采用**根左右**的遍历方式，右子树采用**根右左**的遍历方式。

因为每个节点遍历一次，时间复杂度为O(n)。
