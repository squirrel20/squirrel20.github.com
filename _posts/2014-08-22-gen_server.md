---
layout: post
title: "gen_server"
description: ""
category: "读书笔记"
tags: [Erlang]
---
{% include JB/setup %}

## Client-Server模型

Client-Server模型的特点是多个Client连接到一个Server。Server负责管理资源，Client通过Server分享资源。

![The Client-server model]({{ CDN_PATH }}{{ site.img_url }}/2014082201.gif)

## 一个gen_server的例子

{% highlight erlang %}
-module(gen_server_test).
-behavior(gen_server).

-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

-record(state, {a, b}).

%% API

start_link() ->
	gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

call() ->
	gen_server:call(?MODULE, hi).

cast() ->
	gen_server:cast(?MODULE, async).

stop() ->
	gen_server:call(?MODULE, stop).

%% callback functions

init([]) -> {ok, #state{}}.

handle_call(hi, _From, State) ->
	State1 = State#state{a = hi},
	{reply, ok, State1};
handle_call(stop, _From, State) ->
	{stop, got_stop_msg, State}.

handle_cast(async, State) ->
	State1 = State#state{b = got_async_msg},
	{noreply, State1};
handle_cast(stop, State) ->
	{stop, got_async_stop_msg, State}.

handle_info(_Info, State) ->
	State1 = State#state{a = got_info},
	{noreply, State1}.

terminate(_Reason, State) ->
	ok.

code_change(_OldVsn, State, _Extra) ->
	{ok, State}.

{% endhighlight %}

<!--more-->

## 启动gen_server

对于上一节的示例代码，要启动gen_server，只需调用`gen_server_test:start_link()`。该函数会调用`gen_server:start_link/4`。

	% gen_server
	start_link(Module, Args, Options) -> Result
	start_link(ServerName, Module, Args, Options) -> Result

	ServerName = {local, Name}|{global, GlobalName}|{via, Module, ViaName}
	Module = atom()
	Args = term()
	Options = [Option]
	Option = {debug, Dbgs}|{timeout, Time}|{spawn_opt, SOpts}
	Result = {ok, Pid}|ignore|{error, Error}

*参数解释*

如果ServerName={lcoal,Name}，将使用register/2给gen_server注册本地名Name。

如果ServerName={global,GlobalName}，将使用global:register_name/2给gen_server注册全局名GlobalName。

如果没提供ServerName，gen_server将不会被注册。

如果ServerName={via, Module, ViaName}，以后再讨论吧，这个也是看的一知半解。[todo]

Module是回调模块的模块名。

Args是任意的变量，它将被当作参数传给Module:init/1。

Options是一系列Option组成的元组。如果设置了{timeout, Time}选项，通俗的讲，执行gen_server:start_link的时间不能超过设置的时间，否则将会终止执行并返回{error,timeout}。

如果Options设置了{debug, Dbs}选项，呆会再说。 [todo]

如果Options设置了{spawn_opt, SOpts}, 在启动gen_server过程中将把SOpts当作参数传给spawn，执行gen_server:start_link将会分裂出一个进程来启动gen_server，这个后面的源码分析部分会说。

*执行过程*

gen_server:start_link在执行时会调用Module:init用来初始化gen_sever。当Module:init执行结束并返回后，gen_server:start_link才会返回。

	Module:init(Args) -> Result

	Args = term()
	Result = {ok,State} | {ok,State,Timeout} | {ok,State,hibernate} | {stop,Reason} | ignore

当一个gen_server通过gen_server:start/3,4或gen_server:start_link/3,4启动时，在新启动的gen_server进程里会调用该函数执行初始化。

当初始化成功后，该函数应该返回{ok,State},{ok,State,Timeout}或{ok,State,hibernate}，State是gen_server的内部状态。

## 回掉函数

在上面的源代码例子中，`init/1``handle_call/3``handle_info/2``handle_cast/2``terminate/2``code_change/3`都是gen_server的回调函数，这些回掉函数在回调模块`gen_server_test`中指定。

通过gen_server:start_link/4或gen_server:start/4新启动一个gen_server进程时，要指定回调模块，回调模块中export出这些回调函数。

gen_server收到了消息后都是通过这些回调函数实现具体的功能。例如，收到gen_server:call/2发来的消息会调用回调函数Module:handle_call/3处理，收到gen_server:cast/2发来的消息会调用回调函数Module:handle_cast/2处理，收到Pid!Msg方式发来的消息会调用回掉函数Module:handle_info处理。