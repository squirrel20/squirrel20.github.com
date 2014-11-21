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

<!--more-->

## 代码

{% highlight C++ %}
vector<vector<int> > generate(int numRows)
{
	vector<vector<int> > pt;
	if (numRows < 1) return pt;

	vector<int> one;
	one.push_back(1);
	pt.push_back(one);

	for (int i = 1; i < numRows; ++i) {
		vector<int> curLine;
		curLine.push_back(1);
		for (int j = 1; j < i ; ++j) {
			curLine.push_back(pt[i - 1][j] + pt[i - 1][j - 1]);
		}
		curLine.push_back(1);
		pt.push_back(curLine);
	}

	return pt;
}
{% endhighlight %}

## 分析

杨辉三角，计算公式：

    f[i][j] = f[i - 1][j] + f[i - 1][j - 1]
