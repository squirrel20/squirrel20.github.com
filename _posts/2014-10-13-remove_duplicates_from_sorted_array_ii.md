---
layout: post
title: "解题报告 > leetcode > Remove Duplicates from Sorted Array II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

Follow up for "Remove Duplicates":

What if duplicates are allowed at most twice?

For example,

Given sorted array A = [1,1,1,2,2,3],

Your function should return length = 5, and A is now [1,1,2,2,3].

<!--more-->

## 源码

{% highlight C++ %}
int removeDuplicates(int A[], int n) {
	if (n < 3)
		return n;

	int index = 1;
	for (int i = 2; i < n; ++i) {
		if (A[i] != A[index - 1]) {
			A[index + 1] = A[i];
			++index;
		}
	}

	return index + 1;
}
{% endhighlight %}

## 分析

与[Remove Duplicates from Sorted Array](http://myspes.info/2014/10/09/remove_duplicates_from_sorted_array/)类似。

只是当前字符是与前面的前面的字符作比较。
