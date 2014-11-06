---
layout: post
title: "解题报告 > leetcode > Binary Tree Level Order Traversal"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/binary-tree-level-order-traversal/)

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:

Given binary tree {3,9,20,#,#,15,7},

        3
       / \
      9  20
        /  \
       15   7

return its level order traversal as:

    [
      [3],
      [9,20],
      [15,7]
    ]

<!--more-->

## 代码

{% highlight C++ %}
vector<vector<int> > levelOrder(TreeNode *root) {
	vector<vector<int> > level;
	if (root == NULL) return level;
	queue<TreeNode *> gray;
	gray.push(root);

	while (!gray.empty()){
		vector<int> each_level;
		int gsize = gray.size();
		while (gsize--) {
			TreeNode *tmp = gray.front();
			gray.pop();
			each_level.push_back(tmp->val);
			if (tmp->left != NULL)
				gray.push(tmp->left);
			if (tmp->right != NULL)
				gray.push(tmp->right);
		}
		level.push_back(each_level);
	}

	return level;
}
{% endhighlight %}

## 分析

宽度优先搜索。
