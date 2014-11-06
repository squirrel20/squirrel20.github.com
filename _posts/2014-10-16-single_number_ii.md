---
layout: post
title: "解题报告 > leetcode > Single Number II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/single-number-ii/)

Given an array of integers, every element appears three times except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

<!--more-->

## 源码

{% highlight C++ %}
int singleNumber(int A[], int n) {
	int ones = 0;
	int twos = 0;
	int threes = 0;
	for (int i = 0; i < n; i++) {
		twos = twos | (ones & A[i]);
		ones = ones ^ A[i];
		threes = ones & twos;

		ones = ones & (~threes);
		twos = twos & (~threes);
	}

	return ones;
}

/* 来自 https://oj.leetcode.com/discuss/857/constant-space-solution */
{% endhighlight %}

## 分析

这道题是[Single Number](http://myspes.info/%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A/2014/09/30/Single_Number/)的升级版。

代码来自[leetcode讨论区](https://oj.leetcode.com/discuss/857/constant-space-solution)。

下面摘抄原文（原答主写的太好了）：

---

If you sum the ith bit of all numbers and mod 3, it must be either 0 or 1 due to the constraint of this problem where each number must appear either three times or once. This will be the ith bit of that "single number".

A straightforward implementation is to use an array of size 32 to keep track of the total count of ith bit.

{% highlight c %}

int singleNumber(int A[], int n) {
    int count[32] = {0};
    int result = 0;
    for (int i = 0; i < 32; i++) {
        for (int j = 0; j < n; j++) {
            if ((A[j] >> i) & 1) {
                count[i]++;
            }
        }
        result |= ((count[i] % 3) << i);
    }
    return result;
}

{% endhighlight %}

We can improve this based on the previous solution using three bitmask variables:

* `ones` as a bitmask to represent the ith bit had appeared once.
* `twos` as a bitmask to represent the ith bit had appeared twice.
* `threes` as a bitmask to represent the ith bit had appeared three times.

When the ith bit had appeared for the third time, clear the ith bit of both ones and twos to 0. The final answer will be the value of ones.

{% highlight c %}

int singleNumber(int A[], int n) {
    int ones = 0, twos = 0, threes = 0;
    for (int i = 0; i < n; i++) {
        twos |= ones & A[i];
        ones ^= A[i];
        threes = ones & twos;
        ones &= ~threes;
        twos &= ~threes;
    }
    return ones;
}

{% endhighlight %}
