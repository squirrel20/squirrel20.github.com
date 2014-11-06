---
layout: post
title: "解题报告 > leetcode > Search in Rotated Sorted Arrary II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[链接](https://oj.leetcode.com/problems/search-in-rotated-sorted-array-ii/)

Follow up for "[Search in Rotated Sorted Array](http://myspes.info/%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A/2014/10/16/search_in_rotated_sorted_arrary/)":

What if duplicates are allowed?

Would this affect the run-time complexity? How and why?

Write a function to determine if a given target is in the array.

<!--more-->

## 代码

{% highlight C++ %}
bool search(int A[], int n, int target) {
	int first = 0;
	int last = n - 1;
	int mid;

	while (first <= last) {
		mid = (first + last) / 2;

		if (A[mid] == target)
			return true;

		if (A[first] < A[last]) {
			// sorted arrary
			if (A[mid] < target)
				first = mid + 1;
			else
				last = mid - 1;
		} else {
			if (A[first] == A[last] && A[mid] == A[first]) {
				int tmp = mid + 1;
				// 判断是哪一边所有数字相等
				while (A[tmp] == A[last]) tmp++;
				if (tmp > last)
					last = mid - 1;
				else
					first = mid + 1;
			} else if (A[mid] < A[first]) {
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

	return false;
}
{% endhighlight %}

## 分析

[Search in Rotated Sorted Array](http://myspes.info/%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A/2014/10/16/search_in_rotated_sorted_arrary/)的升级版。

最差时间复杂度为O(n)。

主要是可能会有这种情况`111113111111111111111111111`，然后查找`3`是否存在。

{% highlight c %}
if (A[first] == A[last] && A[mid] == A[first]) {
    int tmp = mid + 1;
    // 判断是哪一边所有数字相等
    while (A[tmp] == A[last]) tmp++;
    if (tmp > last)
        last = mid - 1;
    else
        first = mid + 1;
}
{% endhighlight %}

上面代码就是用于分析这种情况，因此最差的时间复杂度为O(n)。
