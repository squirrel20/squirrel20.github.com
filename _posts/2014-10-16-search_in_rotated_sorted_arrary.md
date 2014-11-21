---
layout: post
title: "解题报告 > leetcode > Search in Rotated Sorted Arrary"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[链接](https://oj.leetcode.com/problems/search-in-rotated-sorted-array/)

Suppose a sorted array is rotated at some pivot unknown to you beforehand.

(i.e., **0 1 2 4 5 6 7** might become **4 5 6 7 0 1 2**).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

<!--more-->

## 源码

{% highlight C++ %}
int search(int A[], int n, int target) {
	int first = 0;
	int last = n - 1;
	int mid;

	while (first <= last) {
		mid = (first + last) / 2;

		if (A[mid] == target)
			return mid;

		if (A[first] <= A[last]) {
			// sorted arrary
			if (A[mid] < target)
				first = mid + 1;
			else
				last = mid - 1;
		} else {
			if (A[mid] < A[first]) {
				if (target < A[mid])
					last = mid - 1;
				else if (A[mid] < target && target <= A[last])
					first = mid + 1;
				else
					last = mid - 1; // target > A[last]
			} else {
				if (target > A[mid])
					first = mid + 1;
				else if (A[last] < target && target < A[mid])
					last = mid - 1;
				else
					first = mid + 1;    // target <= A[last]
			}
		}
	}

	return -1;
}
{% endhighlight %}

## 分析

这题应采用二分搜索，时间复杂度O(lgn)。

对于已排序数组使用二分搜索比较好理解，这个只不过是多加了一些限定条件。
