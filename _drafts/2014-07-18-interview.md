---
layout: post
title: "面试准备"
description: ""
category: "读书笔记"
tags: [读书笔记]
---
{% include JB/setup %}

> *注：下面的内容是用来复习的，不是用来预习的。*

## 基本数据结构

### 栈

栈实现了一种后进先出（LIFO）的策略。如果试图对一个空栈作弹出操作，则称栈下溢；如果压栈操作超出了栈所能容纳的上限，则称栈上溢。

    push(S, x) {
        top[S] = top[S] + 1
        S[top[S]] = x
    }

    pop(S) {
        top[S] = top[S] - 1
        return S[top[S] + 1]
    }

### 队列

队列实现了一种先进先出（FIFO）的策略。当一个元素入队时，将排在队尾；出队的元素总是队首的元素。

    enqueue(Q, x) {
        Q[tail[Q]] = x
        if (tail[Q] == length[Q])
            tail[Q] = 1
        else
            tail[Q] = tail[Q] + 1
    }

    dequeue(Q) {
        x = Q[head[Q]]
        if head[Q] = length[Q]
            head[Q] = 1
        else
            head[Q] = head[Q] + 1
    }

### 链表

双链表的每一个元素都是一个对象。每个对象包含一个关键字和两个指针域：next和prev（分别指向下一个对象和上一个对象）。空对象可以用哨兵(sentinel)来表示，这样就简化了边界条件。

    list_delete(L, x) {
        // 不考虑边界条件时
        next[prev[x]] = nex[x]
        prev[next[x]] = prev[x]
    }

<!--more-->

### 二叉查找树

即可用作字典，也可用作优先队列。

二叉查找树，或者是一棵空树，或者是具有下列性质的二叉树：对于树中的每个节点X，它的左子树中所有关键字的值都小于X的关键字值，而它的右子树中的所有关键字值都大于X的关键字的值。

在二叉查找树(binary search tree)上执行的基本操作的时间与树的高度成正比。一颗随机构造的二叉查找树的期望高度为O(lg n)。

如果x是一颗包含n个结点的子树的根，则中序遍历所有结点的时间为O(n)。（P152）

#### 查找后继

查找后继为找出在中序遍历下结点的后继。即某一结点x的后继为所有大于key[x]中的最小的那个。分为两种情况。

* 如果x的右子树非空，则x的后继即右子树中的最左结点；
* 如果x的右子树为空，则x有一个后继y，y是x的最低祖先结点，且y的左儿子也是x的祖先。为找到y，可以从x开始向上查找，直到遇到某个是其父节点的左儿子的结点时为止。

#### 插入结点

该结点插入后是叶子结点。

#### 删除结点

将给定结点x删除，分三种情况：

* 如果x为叶子结点，直接删除，修改父节点的子女指针；
* 如果x只有一个子女，则可以通过在其子节点与父节点间建立一条链来删除x；
* 如果x有两个子女，则找到x的中序后继y（右子树的最左边的叶子结点），将y放在x所在的位置，删除y原来的结点。

查找、插入和删除的运行时间为O(h)，h为树的高度。

### 红黑树

红黑树是一种二叉查找树，通过对任何一条从根到叶子的路径上各个结点着色方式的限制，红黑树确保没有一条路径会比其他路径长两倍，因为是接近平衡的。

红黑树的性质：

1. 每个结点或是红的，或是黑的。
2. 根结点时黑的。
3. 每个叶节点（NIL）是黑的。
4. 如果一个结点时红的，则它的两个儿子都是黑的。
5. 对每个结点，从该结点到其子孙结点的所有路径上包含相同数目的黑结点。

在含n个关键字的红黑树上执行插入和删除结点操作的时间为O(lg n)。由于这两个操作对树作了修改，结果可能违反了红黑树的性质。为了保持红黑树性质，就要改变树中某些结点的颜色以及指针结构。

指针结构的修改是通过执行旋转来完成的。

### B树

B树是为磁盘或其他直接存取辅助存储设备而设计的一种平衡查找树。

一颗B树T是具有如下性质的有根数（根为root[T]）

1. 每个结点x有以下域：
    * n[x],当前存储在结点x中的关键字数
    * n[x]个关键字本身，以非降序存放，因此key1[x] <= key2[x] <= ...
    * leaf[x]，是一个布尔值，如果x是叶子结点的话，则为true，否则为false。
2. 每个内结点x还包含n[x]+1个指向其子女的指针c1[x], c2[x], .... 。叶结点没有子女，故它们的ci域无定义。
3. 各关键字key[x]对储存在各子树中的关键字范围加以分隔。
4. 每个叶节点具有相同的深度，即树的高度h。
5. 每一个结点能包含的关键字树有一个上界和下界。这些界可用一个称作B树的最小度数的固定整数t>=2来表示。

## 算法

### 广度优先搜索

### 深度优先搜索

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

#### 二分搜索代码

{% highlight c %}
int binary_search(int * arr, int length, int key)
{
    int left, mid, right;

    left = 0;
    right = length - 1;
    mid = (left + right) / 2;

    while (left <= right) {
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            left = mid + 1;
        else
            right = mid - 1;

        mid = (left + right) / 2;
    }

    return -1;
}
{% endhighlight %}

#### 快排代码

{% highlight c %}
void qsort(int * arr, int left, int right)
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

<!--more-->

#### 堆排序代码

{% highlight c %}
#include <stdio.h>

#define PARENT(i) ((i) >> 1)
#define LEFT(i) ((i) << 1)
#define RIGHT(i) (((i) << 1) + 1)

void max_heapify(int * arr, int i, int heap_size)
{
    int largest = i;
    int left = LEFT(i);
    int right = RIGHT(i);
    int tmp;

    if (left <= heap_size && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right <= heap_size && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        tmp = arr[largest];
        arr[largest] = arr[i];
        arr[i] = tmp;
        max_heapify(arr, largest, heap_size);
    }
}

void build_max_heap(int * arr, int heap_size)
{
    int i = PARENT(heap_size);

    for (; i >= 1; i--) {
        max_heapify(arr, i, heap_size);
    }
}

void heapsort(int * arr, int heap_size)
{
    int i, tmp;
    build_max_heap(arr, heap_size);

    for (i = heap_size; i >= 2; i--) {
        tmp = arr[1];
        arr[1] = arr[i];
        arr[i] = tmp;
        heap_size--;
        max_heapify(arr, 1, heap_size);
    }

}

void test_heapsort()
{
    int i;
    int arr[] = { 0, 16, 4, 10, 14, 7, 9, 3, 2, 8, 1 };
    heapsort(arr, 10);

    for (i = 1; i <= 10; i++){
        printf("%d ", arr[i]);
    }
    printf("\n");
    getchar();
}
{% endhighlight %}

### 动态规划

[动态规划：从新手到专家](http://hawstein.com/posts/dp-novice-to-advanced.html)

## 操作系统

### 进程

#### 进程和线程的区别

进程是程序的一次执行。线程可以理解为进程中执行的一段程序片段。在一个多任务环境中下面的概念可以帮助我们理解两者间的差别。

进程间是独立的，这表现在内存空间、上下文环境上；线程运行在进程空间内。一般来讲，进程无法突破进程边界存取其他进程内的存储空间，而线程由于处于进程空间内，所以同一进程所产生的线程共享同一内存空间。

同一进程中的两段代码不能同时执行，除非引入线程。

线程是属于进程的，当进程退出时该进程所产生的线程都会被强制退出并清楚。线程占用的资源要少于进程所占用的资源。进程和线程都有优先级。

进程间可以通过IPC通信，但线程不可以。

### IPC

1. 管道（Pipe）及有名管道（named pipe）：管道可用于具有亲缘关系进程间的通信，有名管道克服了管道没有名字的限制，因此，除具有管道所具有的功能外，它还允许无亲缘关系进程间的通信；
2. 信号（Signal）：信号是比较复杂的通信方式，用于通知接受进程有某种事件发生，除了用于进程间通信外，进程还可以发送信号给进程本身；linux除了支持Unix早期信号语义函数sigal外，还支持语义符合Posix.1标准的信号函数sigaction（实际上，该函数是基于BSD的，BSD为了实现可靠信号机制，又能够统一对外接口，用sigaction函数重新实现了signal函数）；
3. 报文（Message）队列（消息队列）：消息队列是消息的链接表，包括Posix消息队列system V消息队列。有足够权限的进程可以向队列中添加消息，被赋予读权限的进程则可以读走队列中的消息。消息队列克服了信号承载信息量少，管道只能承载无格式字节流以及缓冲区大小受限等缺点。
4. 共享内存：使得多个进程可以访问同一块内存空间，是最快的可用IPC形式。是针对其他通信机制运行效率较低而设计的。往往与其它通信机制，如信号量结合使用，来达到进程间的同步及互斥。
5. 信号量（semaphore）：主要作为进程间以及同一进程不同线程之间的同步手段。
6. 套接口（Socket）：更为一般的进程间通信机制，可用于不同机器之间的进程间通信。起初是由Unix系统的BSD分支开发出来的，但现在一般可以移植到其它类Unix系统上：Linux和System V的变种都支持套接字。

## Linux命令

[Linux常用命令](https://app.yinxiang.com/pub/myspes/tools)

#### netstat

netstat  -  Print network connections, routing tables, interface statistics, mas‐querade connections(伪连接), and multicast memberships.

-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态
-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令。

推荐命令：ss , ip

#### tcpdump

dump traffic on a network

tcpdump可以将网络中传送的数据包的“头”完全截获下来提供分析。

#### ipcs

ipcs - provide information on ipc facilities

ipc show 显示进程间通信的信息

#### ipcrm

ipcrm - remove a message queue, semaphore set or shared memory id

#### sed

[sed 简明教程](http://coolshell.cn/articles/9104.html)

#### awk

[awk 简明教程](http://coolshell.cn/articles/9070.html)

## 网络

### TCP

3次握手建立一个连接。

1. 第一次握手：建立连接时，客户端发送SYN包(SYN=j)到服务器，并进入SYN_SEND状态，等待服务器确认。
2. 第二次握手：服务器收到SYN包，必须确认客户的SYN（ACK=j+1）,同时自己也发送一个SYN包（SYN=k），即SYN+ACK包，此时服务器进入SYN_RECV状态。
3. 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK（ACK=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成3次握手。

4次挥手断开一个连接（假设由客户端主动关闭连接）。

1. 第一次挥手：客户端发送一个FIN包(FIN=j)到服务器，客户端进入FIN_WAIT_1状态。
2. 第二次挥手：服务器收到FIN包，确认客户的FIN（ACK=j+1）,服务器进入CLOSE_WAIT状态。
3. 第三次挥手：服务器发送一个FIN包(FIN=k)到客户端，服务器进入LAST_ACK状态。
4. 第四次挥手：客户端收到FIN包，客户端进入TIME_WIAT状态，确认服务器的FIN（ACK=k+1），服务器收到确认ACK后，服务器进入CLOSED状态，完成四次挥手。

### HTTP

## C/C++

### 静态函数

静态函数会被自动分配在一个一直使用的存储区，直到退出应用程序实例，避免了调用函数时压栈出栈，速度快很多。

关键字“static”，译成中文就是“静态的”，所以内部函数又称静态函数。但此处“static”的含义不是指存储方式，而是指对函数的作用域仅局限于本文件。 使用内部函数的好处是：不同的人编写不同的函数时，不用担心自己定义的函数，是否会与其它文件中的函数同名，因为同名也没有关系。

1、 静态函数与普通函数的区别在于：静态函数不可以被同一源文件以外的函数调用。

2、 静态局部变量与普通局部变量的区别在于：静态局部变量只初始化一次，下一次初始化实际上是依然是上一次的变量；

3、 静态全局变量与普通全局变量的区别在于：静态全局变量的作用域仅限于所在的源文件。

### C程序的存储空间布局

[C程序的存储空间布局](http://myspes.info/c/2013/12/09/c-memory/)
