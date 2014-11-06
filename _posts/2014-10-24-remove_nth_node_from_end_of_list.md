---
layout: post
title: "解题报告 > leetcode > Remove Nth Node From End of List"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

Given a linked list, remove the nth node from the end of list and return its head.

For example,

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.

Note:

Given n will always be valid.
Try to do this in one pass.

## 代码

{% highlight C++}
ListNode *removeNthFromEnd(ListNode *head, int n)
{
	ListNode tmp(0);
	tmp.next = head;
	ListNode *first = &tmp;
	ListNode *second = &tmp;
	while (n--) first = first->next;
	while (first != NULL && first->next != NULL) {
		first = first->next;
		second = second->next;
	}
	second->next = second->next->next;
	return tmp.next;
}
{% endhighlight %}

## 分析

假设链表长度为m，那么需要移除的为第m-n+1个节点。

思路是首先定义一个指针A移动到第n个节点，那么A接下来移动m-n次即移动到末尾。

而且，第m-n个节点的后继节点即为要删除节点。
