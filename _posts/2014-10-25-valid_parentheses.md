---
layout: post
title: "解题报告 > leetcode > Valid Parentheses"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/valid-parentheses/)

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

<!--more-->

## 代码

{% highlight C++}
bool isValid(string s)
{
	stack<char> sta;
	for (int i = 0; i < s.size(); i++) {
		switch (s[i]) {
			case '(': sta.push('('); break;
			case '{': sta.push('{'); break;
			case '[': sta.push('['); break;
			case ')':
					  if (!sta.empty() && sta.top() == '(') sta.pop();
					  else return false;
					  break;
			case '}':
					  if (!sta.empty() && sta.top() == '{') sta.pop();
					  else return false;
					  break;
			case ']':
					  if (!sta.empty() && sta.top() == '[') sta.pop();
					  else return false;
					  break;
		}
	}
	return sta.empty();
}
{% endhighlight %}

## 分析

这是一道典型的使用栈的问题。

* 遇到左括号压栈
* 遇到右括号，将左括号出栈

