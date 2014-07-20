---
layout: post
title: "面试准备"
description: ""
category: ""
tags: []
---
{% include JB/setup %}

## 算法

### 排序算法

#### 排序算法的稳定性

1） 稳定的：如果存在多个具有相同排序码的记录，经过排序后，这些记录的相对次序仍然保持不变，则这种排序算法称为稳定的。插入排序、冒泡排序、归并排序、分配排序（桶式、基数）都是稳定的排序算法。

2）不稳定的：否则称为不稳定的。快速排序、堆排序、直接选择排序shell排序都是不稳定的排序算法。

#### 排序算法的选择

1）若n较小(如n≤50)，可采用直接插入或直接选择排序。
当记录规模较小时，直接插入排序较好；否则因为直接选择移动的记录数少于直接插人，应选直接选择排序为宜。

2）若文件初始状态基本有序(指正序)，则应选用直接插人、冒泡或随机的快速排序为宜。

3）若n较大，则应采用时间复杂度为O(nlgn)的排序方法：快速排序、堆排序或归并排序。快速排序是目前基于比较的内部排序中被认为是最好的方法，当待排序的关键字是随机分布时，快速排序的平均时间最短；堆排序所需的辅助空间少于快速排序，并且不会出现快速排序可能出现的最坏情况。这两种排序都是不稳定的。

若要求排序稳定，则可选用归并排序。但本章介绍的从单个记录起进行两两归并的排序算法并不值得提倡，通常可以将它和直接插入排序结合在一起使用。先利用直接插入排序求得较长的有序子文件，然后再两两归并之。因为直接插入排序是稳定 的，所以改进后的归并排序仍是稳定的。

#### 快排代码

{% highlight c %}
void qsort(int *arr, int left, int right)
{
    int i = left, j = right;
    int index = (left + right) / 2;
    int key = arr[index];

    while(i < j) {
        while ( arr[i] <= key && i < index) i++;
        if (i < index) {
            arr[index] = arr[i];
            index = i;
        }   

        while ( arr[j] >= key && j > index) j--;
        if (j > index) {
            arr[index] = arr[j];
            index = j;
        }   
    }
    
    arr[i] = key;

    if (left < i - 1)
        qsort(arr, left, i - 1);
    if (i + 1 < right)
        qsort(arr, i + 1, right);
}
{% endhighlight %}

### 动态规划