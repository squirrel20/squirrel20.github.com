---
layout: post
title: "解题报告 > leetcode > Longest Common Prefix"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/longest-common-prefix/)

Write a function to find the longest common prefix string amongst an array of strings.

<!--more-->

## 代码

{% highlight C++ %}
string longestCommonPrefix(vector<string> &strs)
{
	if (strs.size() == 0) return "";

	string ret = "";

	for (size_t i = 0; i < strs[0].size(); i++)
	{
		for (size_t j = 1; j < strs.size(); j++)
		{
			if (i > strs[j].size() || strs[0][i] != strs[j][i])
				return ret;
		}

		ret += strs[0][i];
	}

	return ret;
}
{% endhighlight %}

## 分析

无
