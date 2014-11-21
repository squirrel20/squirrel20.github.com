---
layout: post
title: "解题报告 > leetcode > Balanced Binary Tree"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/balanced-binary-tree/)

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

<!--more-->

## 代码

{% highlight C++ %}
int getDepth(TreeNode *root, bool& isContinue)
{
	if (!isContinue) return 0;
	if (root == NULL) return 0;

	int leftDepth = getDepth(root->left, isContinue);
	int rightDepth = getDepth(root->right, isContinue);

	if (!isContinue) return 0;
	isContinue = abs(leftDepth - rightDepth) <= 1;
	return max(leftDepth, rightDepth) + 1;
}

bool isBalanced(TreeNode *root)
{
	bool isContinue = true;
	getDepth(root, isContinue);
	return isContinue;
}
{% endhighlight %}

## 分析

[论坛](https://oj.leetcode.com/discuss/59/different-definitions-balanced-result-different-judgments)上有关于高度平衡二叉树与AVL树的区别。

这就是深度优先搜索的一个例子。
