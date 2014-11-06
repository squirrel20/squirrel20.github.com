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

{% highlight C++ %}
vector<vector<int> > levelOrderBottom(TreeNode *root)
{
	vector<vector<int> > out;
	stack<vector<int> > level;
	if (root == NULL) return out;
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
		level.push(each_level);
	}

	while (!level.empty()) {
		vector<int> tmp = level.top();
		level.pop();
		out.push_back(tmp);
	}
	return out;
}
{% endhighlight %}

## 分析

宽度优先搜索。
