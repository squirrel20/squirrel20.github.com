---
layout: post
title: "Erlang程序设计（第2版）-习题解答"
description: ""
category: ""
tags: []
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

* tuple_size(Tuple) -> integer() >= 0	% erlang模块
* element(N, Tuple) -> term()	% erlang模块