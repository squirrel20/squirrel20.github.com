---
layout: post
title: "解题报告 > leetcode > Maximum Depth of Binary Tree"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目](https://oj.leetcode.com/problems/maximum-depth-of-binary-tree/)

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

<!--more-->

## 代码

{% highlight C++ %}
int maxDepth(TreeNode *root) {
	if (root == NULL) return 0;
	stack<TreeNode *> gray;
	stack<int> depth;
	int out = 0;

	gray.push(root);
	depth.push(1);
	while (!gray.empty()) {
		TreeNode *tmp = gray.top();
		int num = depth.top();
		gray.pop();
		depth.pop();
		if (tmp->left == NULL && tmp->right == NULL) {
			out = num > out ? num : out;
		}
		else {
			if (tmp->left != NULL) {
				gray.push(tmp->left);
				depth.push(num + 1);
			}
			if (tmp->right != NULL) {
				gray.push(tmp->right);
				depth.push(num + 1);
			}
		}
	}
	return out;
}
{% endhighlight %}

## 分析

使用非递归方式实现的，想了半天终于想出了一个非递归版的深度优先搜索。
