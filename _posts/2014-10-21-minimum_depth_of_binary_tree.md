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

{% highlight C++}
int minDepth(TreeNode *root)
{
	if (root == NULL) return 0;

	queue<TreeNode*> wd;
	wd.push(root);
	int dept = 1;
	while (1) {
		queue<TreeNode*> lu;
		while (!wd.empty()) {
			TreeNode* tmp = wd.front();
			wd.pop();

			if (tmp->left == NULL && tmp->right == NULL) return dept;
			if (tmp->left != NULL) lu.push(tmp->left);
			if (tmp->right != NULL) lu.push(tmp->right);
		}
		dept++;
		wd = lu;
	}
	return dept;
}
{% endhighlight %}

## 分析

虽然官方给这题打的标签是深度优先搜索，可我觉得使用宽度优先搜索遍历的节点要少些，这样更快嘛。
