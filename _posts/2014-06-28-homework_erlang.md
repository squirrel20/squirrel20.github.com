---
layout: post
title: "Erlang程序设计（第2版）- 习题解答"
description: ""
category: "Erlang程序设计"
tags: [读书笔记]
---
{% include JB/setup %}

### 第2章

(4) 运行文件客户端和服务器代码。加入一个名为put_file的命令。你需要添加何种消息？学习如何查阅手册页。查阅手册页里的file模块。

	afile_server.erl

{% highlight erlang %}
-module(afile_server).
-export([start/1, loop/1]).

start(Dir) -> spawn(afile_server, loop, [Dir]) .

loop(Dir) ->
	receive
		{Client, list_dir} ->
			Client ! {self(), file:list_dir(Dir)};
		{Client, {get_file, File}} ->
			Full = filename:join(Dir, File),
			Client ! {self(), file:read_file(Full)};
		{Client, {put_file, Path, {ok, Content}}} ->
			file:write_file(Path, Content),
			Client ! {self(), {ok, {Path, "upload done!"}}}
	end,
	loop(Dir).
{% endhighlight %}

	afile_client.erl

{% highlight erlang %}
-module(afile_client).
-export([test/0, ls/1, get_file/2, put_file/3]).

test() ->
	Server = afile_server:start("."),
	put_file(Server, "notice.html", "notice2.html").

ls(Server) ->
	Server ! {self(), list_dir},
	receive
		{Server, FileList} ->
			FileList
	end.

get_file(Server, File) ->
	Server ! {self(), {get_file, File}},
	receive
		{Server, Content} ->
			Content
	end.

put_file(Server, FromFile, ToFile) ->
	Server ! {self(), {put_file, ToFile, file:read_file(FromFile)}},
	receive
		{Server, {ok, MSG}} ->
			MSG
	end.
{% endhighlight %}

<!--more-->

### 第3章

(1) 快速浏览3.1.3节，然后测试并记忆这些行编辑命令。

|命令			|说明|
|--------------------|
|^A 			|行首|
|^D 			|删除当前字符|
|^E 			|行尾|
|^F或右箭头键	|向前的字符|
|^B或左箭头键	|向后的字符|
|^P或上箭头键	|前一行|
|^N或下箭头键	|下一行|
|^T 			|调换最近两个字符的位置|
|Tab 			|尝试扩展当前模块或函数的名称|

(2) 在shell里输入help()命令。你将看到一长串命令。可以试试其中的一些命令。

	(erl@******)2> help().
	** shell internal commands **
	b()        -- display all variable bindings
	e(N)       -- repeat the expression in query <N>
	f()        -- forget all variable bindings
	f(X)       -- forget the binding of variable X
	h()        -- history
	history(N) -- set how many previous commands to keep
	results(N) -- set how many previous command results to keep
	catch_exception(B) -- how exceptions are handled
	v(N)       -- use the value of query <N>
	rd(R,D)    -- define a record
	rf()       -- remove all record information
	rf(R)      -- remove record information about R
	rl()       -- display all record information
	rl(R)      -- display record information about R
	rp(Term)   -- display Term using the shell's record information
	rr(File)   -- read record information from File (wildcards allowed)
	rr(F,R)    -- read selected record information from file(s)
	rr(F,R,O)  -- read selected record information with options
	** commands in module c **
	bt(Pid)    -- stack backtrace for a process
	c(File)    -- compile and load code in <File>
	cd(Dir)    -- change working directory
	flush()    -- flush any messages sent to the shell
	help()     -- help info
	i()        -- information about the system
	ni()       -- information about the networked system
	i(X,Y,Z)   -- information about pid <X,Y,Z>
	l(Module)  -- load or reload module
	lc([File]) -- compile a list of Erlang modules
	ls()       -- list files in the current directory
	ls(Dir)    -- list files in directory <Dir>
	m()        -- which modules are loaded
	m(Mod)     -- information about module <Mod>
	memory()   -- memory allocation information
	memory(T)  -- memory allocation information of type <T>
	nc(File)   -- compile and load code in <File> on all nodes
	nl(Module) -- load module on all nodes
	pid(X,Y,Z) -- convert X,Y,Z to a Pid
	pwd()      -- print working directory
	q()        -- quit - shorthand for init:stop()
	regs()     -- information about registered processes
	nregs()    -- information about all registered processes
	xm(M)      -- cross reference check a module
	y(File)    -- generate a Yecc parser
	** commands in module i (interpreter interface) **
	ih()       -- print help for the i module
	true

(3) 试着用一些元组来表示一座房子，再用一个房子列表来表示一条街道。请确保你能向这些结构中加入数据或从中取出数据。

假设房子包含的信息有：主人姓名、门牌号和房子面积。则一个房子用元祖表示的例子为：

	{joe, a_121, 123}

一条街道就包含了很多房子，故街道列表的元素即为房子元组，一个街道列表的例子为：

	[{joe, a_121, 123}, {joe, a_122, 123}]

没错，这条街都是joe的，好羡慕。

向列表加入和提取数据都在列表头操作。即[X|Y] = L。

### 第4章

(1) 扩展geometry.erl。添加一些子句来计算圆和直角三角形的面积。添加一些子句来计算各种几何图形的周长。

{% highlight erlang %}
-module (geometry).
-export ([area/1, circumference/1]).
area({rectangle, Width, Ht})	-> Width * Ht;
area({circle, R})				-> 3.14159 * R * R;
area({right_triangle, Left, Right})	-> Left * Right / 2.

circumference({rectangle, Width, Ht})	-> (Width + Ht) * 2;
circumference({circle, R})				-> 2 * 3.14159 * R;
circumference({right_triangle, Left, Right})	
	-> Left + Right + math:sqrt(Left * Left + Right * Right).
{% endhighlight %}

(2) 内置函数tuple_to_list(T)能将元组T里的元素转换成一个列表。轻编写一个名为my_tuple_to_list(T)的函数来做同样的事，但不要使用相同功能的内置函数。

{% highlight erlang %}
-module(convert).
-export([my_tuple_to_list/1]).

my_tuple_to_list(T) ->
	for(1, erlang:tuple_size(T), T, []).

for(I, Max, T, L) when I < Max -> for(I + 1, Max, T, [erlang:element(I, T)|L]);
for(Max, Max, T, L) -> [erlang:element(Max, T)|L].
{% endhighlight %}

主要需要用到两个关于元组的函数：

	erlang:tuple_size(Tuple) -> integer() >= 0	
	erlang:element(N, Tuple) -> term()	

(3) 查看erlang:now/0、erlang:date/0和erlang:time/0的定义。请编写一个名为my_time_func(F)的函数，让它执行fun F并记下执行时间。编写一个名为my_date_string()的函数，用它把当前的日期和时间改成整齐的格式。

	erlang:now() -> Timestamp

Types:

Timestamp = timestamp()
timestamp() = 
    {MegaSecs :: integer() >= 0,
     Secs :: integer() >= 0,
     MicroSecs :: integer() >= 0}

	erlang:date() -> Date

Types:

Date = calendar:date()
Returns the current date as {Year, Month, Day}.

	erlang:time() -> Time

Types:

Time = calendar:time()
Returns the current time as {Hour, Minute, Second}.

{% highlight erlang %}
-module(time).
-export([my_time/0]).

my_time() ->
	my_time_func(fun() -> my_date_string() end).

my_time_func(F) ->
	F().

my_date_string() ->
	{Year, Month, Day} = date(),
	{Hour, Minute, Second} = time(),
	{Year, Month, Day, Hour, Minute, Second}.
{% endhighlight %}

(5,6,7) math_functions.erl模块的一些功能

{% highlight erlang %}
-module(math_functions).
-export([even/1, odd/1, filter/2, split1/1, split2/1]).

even(X) -> X rem 2 =:= 0.
odd(X) -> X rem 2 =:= 1.

filter(F, L) ->
	[X || X <- L, F(X)].

split1(L) ->
	{filter(fun(X) -> X rem 2 =:= 0 end, L), filter(fun(X) -> X rem 2 =:= 1 end, L)}.

split2(L) ->
	split2_acc(L, [], []).

split2_acc([H|T], Odds, Evens) ->
	case (H rem 2) of
		1 -> split2_acc(T, [H|Odds], Evens);
		0 -> split2_acc(T, Odds, [H|Evens])
	end;
split2_acc([], Odds, Evens) -> {Evens, Odds}.
{% endhighlight %}

### 第5章

(1) 我没找到Erlang里有关于json的函数。

(2) 编写一个map_search_pred(Map, Pred)函数，让它返回映射组里第一个复合条件的{Key, Value}元素（条件是Pred(Key, Value)为true）。

{% highlight erlang %}
-module(map).
-export([map_search_pred/2]).

map_search_pred(Map, Pred) ->
	L = maps:to_list(Map),
	mp(L, Pred).

mp([{Key, Val}|T], Pred) ->
	Stat = Pred(Key, Val),
	if
		Stat ->
			{Key, Val};
		length(T) > 0 ->
			mp(T, Pred);
		true ->
			{no, one}
	end.

{% endhighlight %}

### 第6章

(1) file:read_file(File)会返回{ok, Bin}或者{error, Why}，其中File是文件名，Bin则包含了文件的内容。请编写一个myfile:read(File)函数，当文件可读取时返回Bin，否则抛出一个异常错误。

{% highlight erlang %}
-module(map).
-export([map_search_pred/2]).

map_search_pred(Map, Pred) ->
	L = maps:to_list(Map),
	mp(L, Pred).

mp([{Key, Val}|T], Pred) ->
	Stat = Pred(Key, Val),
	if
		Stat ->
			{Key, Val};
		length(T) > 0 ->
			mp(T, Pred);
		true ->
			{no, one}
	end.
{% endhighlight %}

(2) 重写try_test.erl里的代码，让它生成两条错误消息：一条文明的消息给用户，另一条详细的消息给开发者。

？ 怎么区分用户和开发者，DEBUG吗，还是用原子来区分

{% highlight erlang %}
-module(try_test).
-export([demo1/0,demo2/0,demo3/0]).

generate_exception({1, Who}) -> a;
generate_exception({2, Who}) -> {Who, throw(a)};
generate_exception({3, Who}) -> {Who, exit(a)};
generate_exception({4, Who}) -> {'EXIT', a};
generate_exception({5, Who}) -> {Who, error(a)}.

demo1() ->
	[cathcer(I) || I <- [1,2,3,4,5]].

demo2() ->
	[{I, (catch generate_exception(I))} || I <- [1,2,3,4,5]].

demo3() ->
	try generate_exception(5)
	catch
		error:{developer, X} -> {X, erlang:get_stacktrace()};
		error:{user, X} -> X
	end.

cathcer(N) ->
	try generate_exception(N) of
		Val -> {N, normal, Val}
	catch
		throw:{user, X} -> {N, caught, thrown, X};
		exit:{user, X} -> {N, caught, exited, X};
		error:{user, X} -> {N, caught, error, X};

		throw:{developer, X} -> {N, caught, thrown, X, erlang:get_stacktrace()};
		exit:{developer, X} -> {N, caught, exited, X, erlang:get_stacktrace()};
		error:{developer, X} -> {N, caught, error, X}, erlang:get_stacktrace()
	after
		done
	end.
{% endhighlight %}

### 第7章

(1) 编写一个函数来反转某个二进制型里的字节顺序。

{% highlight erlang %}
-module(lecture7).
-export([convert_byte/1]).

convert_byte(Bin) ->
	list_to_binary(convert_list(binary_to_list(Bin), [])).

convert_list([H|T], L) ->
	if
		length(T) > 0 ->
			convert_list(T, [H|L]);
		true ->
			[H|L]
	end.
{% endhighlight %}

(2,3,4) 编写一个term_to_packet(Term) -> Packet 函数，通过调用term_to_bianry(Term)来生成并返回一个二进制型，它内含长度为4个字节的包头N，后跟N个字节的数据。编写一个反转函数packet_to_term(Packet) -> Term ，使得它成为前一个函数的逆向函数。按照4.1.3节的样式编写一个测试，测一下之前的两个函数是否能正确地把数据类型编码成数据包（Packet），以及通过解码数据包来复原最初的数据类型。
