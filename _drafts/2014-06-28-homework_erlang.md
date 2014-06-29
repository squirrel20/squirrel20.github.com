---
layout: post
title: "Erlang程序设计（第2版）-习题解答"
description: ""
category: ""
tags: []
---
{% include JB/setup %}

### 第2章

binary()

iodata()

	read_file(Filename) -> {ok, Binary} | {error, Reason}

	Types:

	Filename = name_all()
	Binary = binary()
	Reason = posix() | badarg | terminated | system_limit


	write_file(Filename, Bytes) -> ok | {error, Reason}

	Types:

	Filename = name_all()
	Bytes = iodata()
	Reason = posix() | badarg | terminated | system_limit