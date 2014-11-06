---
layout: post
title: "解题报告 > leetcode > Valid Parentheses"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/remove-duplicates-from-sorted-list/)

Given a sorted linked list, delete all duplicates such that each element appear only once.

For example,

Given 1->1->2, return 1->2.

Given 1->1->2->3->3, return 1->2->3.

<!--more-->

## 代码

{% highlight C++}
ListNode *deleteDuplicates(ListNode *head) {
	ListNode *tmp = head;
	while (tmp != NULL) {
		if (tmp->next != NULL && tmp->val == tmp->next->val)
			tmp->next = tmp->next->next;
		else
			tmp = tmp->next;
	}

	return head;
}
{% endhighlight %}

## 分析

无
