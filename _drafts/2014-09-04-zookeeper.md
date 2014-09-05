---
layout: post
title: "ZooKeeper"
description: "A Distributed Coordination Service for Distributed Applications"
category: "读书笔记"
tags: [读书笔记, zookeeper]
---
{% include JB/setup %}

ZooKeeper是为分布式应用设计的分布式的、开源的协调服务。它提供了一个简单的原语集，使得分布式应用程序可以是实现更高级的同步服务、配置维护、群组和名称服务。

一致性服务很难实现。其原因主要是如竞争条件和锁等会造成其出现错误。ZooKeeper的出现可以减轻分布式应用在一致性方面的负担。

## ZooKeeper的设计目标

### 简单

前面一段的介绍我也没看出来简单啊。

ZooKeeper提供了高性能、高可用性和严格有序的访问。高性能体现着它可以在大的分布式系统中使用。可靠性体现在只会出现单点故障（？）。严格有序意味着在客户端可以实现复杂的同步原语。

### 可扩展

![ZooKeeper Service]({{ CDN_PATH }}{{ site.img_url }}/2014090401.jpg)

ZooKeeper服务往往包含多个服务器，服务器相互之间需要知道对方的存在。

### 有序

### 快速