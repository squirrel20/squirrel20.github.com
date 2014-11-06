---
layout: post
title: "解题报告 > leetcode > Remove Element"
description: ""
category: ""
tags: []
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-element/)

Given an array and a value, remove all instances of that value in place and return the new length.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

<!--more-->

## 源码

{% highlight C++ %}
int removeElement(int A[], int n, int elem) {
	int left, mid, right, index;
	sort(A, A + n);

	left = 0;
	right = n - 1;
	index = -1;
	while(left <= right) {
		mid = (left + right) / 2;
		if (A[mid] < elem)
			left = mid + 1;
		else if (A[mid] > elem)
			right = mid - 1;
		else {
			index = mid;
			break;
		}
	}

	if (index == -1) return n;

	left = right = index;
	while (left >= 0 && A[left] == elem) left--;
	while (right < n && A[right] == elem ) right++;

	while (right < n) {
		A[left + 1] = A[right];
		left++;
		right++;
	}

	return left + 1;
}
{% endhighlight %}

{% highlight C++ %}
/* https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference */
 
int removeElement(int A[], int n, int elem) {
	int begin=0;
	for(int i=0;i<n;i++) if(A[i]!=elem) A[begin++]=A[i];
	return begin;
}
{% endhighlight %}

{% highlight C++ %}
/* https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference */

int removeElement(int A[], int n, int elem) {
	int i = 0;
	while (i < n) {
		if (A[i] == elem) {
			A[i] = A[n - 1];
			n--;
			/*
			   这份代码也是对的，这里i并没有增加，故会再次检查A[i] == elem 是否成立
			 */
		}
		else
			i++;
	}
	return n;
}
{% endhighlight %}

## 分析

### 第一份代码

该代码的时间复杂度为O(nlgn)，没错，我写的 （- -！）。

首先将数组排序，然后用二分法找出指定元素，之后就是删除一个或多个指定元素。

（之前做过一道类似的题欸，我居然还是会相出复杂度这么高的思路。[就是这题](http://myspes.info/2014/10/09/remove_duplicates_from_sorted_array/)）

### 第二份代码

这份代码来自[leetcode论坛](https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference)。

时间复杂度为O(n)，一次最多只移动一位，代码很简洁，可是也有一些不必要的移位操作。

### 第三份代码

同样来自[leetcode论坛](https://oj.leetcode.com/discuss/3753/my-solution-for-your-reference)。

是第二份代码的改进版，避免了不必要的移位操作。

> 这里也看出了，不要A了题就万事大吉了，得看看网上有没有给出更好的思路。
