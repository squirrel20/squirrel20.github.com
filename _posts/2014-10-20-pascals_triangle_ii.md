---
layout: post
title: "解题报告 > leetcode > Pascal's Triangle II"
description: ""
category: "解题报告"
tags: [解题报告, leetcode]
---
{% include JB/setup %}

## 题目

[题目链接](https://oj.leetcode.com/problems/pascals-triangle-ii/)

Given an index k, return the kth row of the Pascal's triangle.

For example, given k = 3,

Return [1,3,3,1].

Note:

Could you optimize your algorithm to use only O(k) extra space?

<!--more-->

## 代码

{% highlight C++ %}
vector<int> getRow(int rowIndex) {
	vector<int> row;
	if (rowIndex < 0) return row;

	row.push_back(1);
	double tmp;
	for (int i = 1; i <= rowIndex; ++i) {
		tmp = (double)row.back() * (double)(rowIndex - i + 1) / (double)i;
		row.push_back(tmp);
	}

	return row;
}
{% endhighlight %}

{% highlight C++ %}
vector<int> getRow(int rowIndex) {
	vector<int> row;
	if (rowIndex < 0) return row;

	row.push_back(1);
	vector<int> tmp;
	for (int i = 1; i <= rowIndex; ++i) {
		tmp.push_back(1);
		for (int j = 1; j < i; j++)
			tmp.push_back(row[j] + row[j-1]);
		tmp.push_back(1);

		row = tmp;
		tmp.clear();
	}

	return row;
}
{% endhighlight %}

## 分析

[此题的另外一个版本](http://myspes.info/%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A/2014/10/20/pascals_triangle/)

### 关于第二份代码（美是美，可是会溢出）

参见[维基百科](http://zh.wikipedia.org/wiki/%E6%9D%A8%E8%BE%89%E4%B8%89%E8%A7%92%E5%BD%A2)，杨辉三角的性质：

1. 杨辉三角以正整数构成，数字左右对称，每行由1开始逐渐变大，然后变小，回到1。
2. 第n行的数字个数为n个。
3. 第n行的第k个数字为组合数`C(n-1, k-1)`。
4. 第n行数字和为`2^(n-1)`。
5. 除每行最左侧与最右侧的数字以外，每个数字等于它的左上方与右上方两个数字之和（也就是说，第n行第k个数字等于第n-1行的第k-1个数字与第k个数字的和）。这是因为有组合恒等式：`C(n, i)=C(n-1, i-1) + C(n-1, i)`。可用此性质写出整个杨辉三角形。

第二份代码就是基于第3个性质得来的。

    C(n, k) = C(n, k-1) * (n - k + 1) / k

这个怎么来的，推下公式就可以证明了。
