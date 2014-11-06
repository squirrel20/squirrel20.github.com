---
layout: post
title: "解题报告 > leetcode > Palindrome Number"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/palindrome-number/)

Determine whether an integer is a palindrome. Do this without extra space.

Some hints:

Could negative integers be palindromes? (ie, -1)

If you are thinking of converting the integer to string, note the restriction of using extra space.

You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?

There is a more generic way of solving this problem.

<!--more-->

## 代码

{% highlight C++}
bool isPalindrome(int x)
{
	// 负数没有回文数？为什么
	if (x < 0) return false;

	int tmp = 0;
	int x2 = x;
	while (x) {
		tmp = tmp * 10 + x % 10;
		x /= 10;
	}

	return tmp == x2; // 这里也有考虑到溢出的情况，溢出了，自然两者就不等了
}
{% endhighlight %}

## 分析

因为回文数正反着看是一样的，所以可以求其逆序，比较逆序与正序是否相等。时间复杂度为O(lg n)。

---

### [回文数的定义](http://zh.wikipedia.org/wiki/%E5%9B%9E%E6%96%87%E6%95%B0)

在任意固定的基b下，数n称为回文的当且仅当：

* n是单个数字，或
* n为两个相同数字，或
* n由三个或更多数字组成，其首位和末位数字相同，且从n中去掉该首位和末尾数字后的数也是回文的。

> 回文数大于0，这个是为什么呢。
