---
layout: post
title: "定义你自己的behaviour"
description: ""
category: "读书笔记"
tags: [Erlang]
---
{% include JB/setup %}

> [原文链接](https://erlangcentral.org/wiki/index.php?title=Defining_Your_Own_Behaviour)

## 为什么要定义behaviour

使用behaviour可以给编程人员带来很多便利。通过定义behaviour，可以确保使用了该behaviour的模板会实现所有的函数。当别人的库或应用通过回调函数使用你创建的库或应用时，定义behaviour是个不错的选择。

## 定义behaviour

定义behaviour很简单，从R15版开始，制定了新的定义方式。

### R14及其更早的版本

创建一个模块，模块名即为behaviour名，定义和导出behaviour_info函数，其只有一个原子参数为callbacks。

该函数应该返回一个由元组组成的列表，各元组指定了回调函数和元数。例如：

{% highlight erlang %}
-module(some_behaviour).
 
-export([behaviour_info/1]).
 
behaviour_info(callbacks) ->
    [{init,1},
     {handle, 1},
     {sync, 2}];
behaviour_info(_Other) ->
    undefined.
{% endhighlight %}

该behaviour要求回调模块定义函数`init/1`，`handle/1`和`sync/2`。

### R15及其之后的版本

自R15B开始，编译器支持一种新的方式定义behaviour的接口，并且Dialyzer可以分析这些定义。

替代`behaviour_info/1`的是`-callback`，该方式不仅列出了函数名，也列出了参数的类型和期望的返回值。与上面相同的例子，使用-callback写法如下：

{% highlight erlang %}
-module(some_behaviour).
 
-callback init(Args :: list(term())) -> 'ok'|tuple('error', Reason :: string()).
 
-callback handle(Event :: atom()) -> NextEvent :: atom().
 
-callback sync(Node :: node(), Timeout :: non_neg_integer()) -> 'ok'|tuple('error', Reason :: string()).
{% endhighlight %}

## 例子

{% highlight erlang %}
-module(usage).
 
-behaviour(some_behaviour).
 
-export([init/1, handle/1, sync/2, foo/0]).
 
init(Config) ->
    Config.
 
sync(_Entry, Config) ->
    Config.
 
handle(Message) ->
    Message.
 
foo() ->
    foo_atom_returned.
{% endhighlight %}