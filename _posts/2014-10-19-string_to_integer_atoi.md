---
layout: post
title: "解题报告 > leetcode > String to Integer (atoi)"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/string-to-integer-atoi/)

Implement atoi to convert a string to an integer.

**Hint:** Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.

**Notes:** It is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front.

Requirements for atoi:

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, INT_MAX (2147483647) or INT_MIN (-2147483648) is returned.

<!--more-->

## 代码

{% highlight C++ %}
int atoi(const char *str) {
	int len = strlen(str);
	long long out = 0;
	bool flag = true;
	char pos = '+';
	for (unsigned int i = 0; i < len; i++) {
		if (str[i] == ' ' && flag)
			continue;

		if ((str[i] == '+' || str[i] == '-') && flag) {
			flag = false;
			pos = str[i];
		}
		else if (str[i] >= '0' && str[i] <= '9') {
			flag = false;
			out = (str[i] - '0') + out * 10;
		}
		else
			break;
	}
	if (pos == '-') out = -out;
	if (out > INT_MAX) out = INT_MAX;
	if (out < INT_MIN) out = INT_MIN;
	return out;
}
{% endhighlight %}

## 分析

注意规则就是了
