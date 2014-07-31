---
layout: post
title: "基准测试"
description: ""
category: ""
tags: []
---
{% include JB/setup %}


以下一段摘自[百度百科](http://baike.baidu.com/view/1854349.htm)

基准测试是指通过设计科学的测试方法、测试工具和测试系统，实现对一类测试对象的某项性能指标进行定量的和可对比的测试。例如，对计算机CPU进行浮点运算、数据访问的带宽和延迟等指标的基准测试，可以使用户清楚地了解每一款CPU的运算性能及作业吞吐能力是否满足应用程序的要求。

测试会用到一些工具，在linux中有一些测试工具比较好用：

* sysstat
* dstat
* top

### sysstat

在[网站](http://sebastien.godard.pagesperso-orange.fr/documentation.html)中找到了关于sysstat的描述。sysstat包括一些实时监控系统性能和使用情况的应用。包括的应用如下：

* iostat
* mpstat
* pidstat
* sar
* sadc
* sa1
* sa2
* sadf
* sysstat
* nfsiostat-sysstat
* cifsiostat

其中用的比较多的是sar，下面将会对sar做些简单的介绍。

#### sar

> sar - Collect, report, or save system activity information.
