---
layout: post
title: "解题报告 > leetcode > Valid Palindrome"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/valid-palindrome/)

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

For example,

"A man, a plan, a canal: Panama" is a palindrome.

"race a car" is not a palindrome.

Note:

Have you consider that the string might be empty? This is a good question to ask during an interview.

For the purpose of this problem, we define empty string as valid palindrome.

<!--more-->

## 源码

{% highlight C++}
bool isPalindrome(string s)
{
	int low = 0;
	int high = s.size() - 1;

	while (low < high) {
		if (s[low] >= 'A' && s[low] <= 'Z')
			s[low] = s[low] - 'A' + 'a';
		else if (! ((s[low] >= 'a' && s[low] <= 'z') ||
					(s[low] >= '0' && s[low] <= '9'))) {
			low++;
			continue;
		}
		if (s[high] >= 'A' && s[high] <= 'Z')
			s[high] = s[high] - 'A' + 'a';
		else if (! ((s[high] >= 'a' && s[high] <= 'z') ||
					(s[high] >= '0' && s[high] <= '9'))) {
			high--;
			continue;
		}

		if (s[low] != s[high]) return false;

		low++;
		high--;
	}

	return true;
}
{% endhighlight %}

## 分析

想不另外再写函数，只在一个函数里面写出简单的代码好麻烦。
