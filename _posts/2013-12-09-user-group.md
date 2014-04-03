---
layout: post
title: "用户和组"
description: ""
category: "linux"
tags: [linux]
---
{% include JB/setup %}

### 0 概念

在Linux中，任何一个文件都具有User, Group和Others三种权限。所以任一个文件必定属于某一个用户，某一个用户又必定在某一个组中（一个用户可以属于多个组，即附加组）。在文件/etc/passwd中可以查看用户及用户所在组的相关信息，在文件/etc/group中可以查看组的相关信息。

#### 0.1 /etc/passwd

/etc/passwd文件中的信息如下图所示：

![/etc/passwd]({{ CDN_PATH }}{{ site.img_url }}/2013120901.png)

每一行包含若干字段，字段间用冒号分隔，格式为：

    name:password:uid:gid:comment:home:shell

解释如下(来自：http://www.aka.org.cn/Lectures/002/Lecture-2.2.1/320.html)：
<table>
<tbody>
<tr>
<th>
字段
</th>
<th>
说明
</th>
</tr>
<tr>
<td>
name
</td>
<td>
用户登录名
</td>
</tr>
<tr>
<td>password</td>
<td>用户口令。此域中的口令是加密的。当用户登录系统时，系统对输入的口令采取相同的算法，与此域中的内容进行比较。如果此域为空，表明该用户登录时不需要口令。</td>
</tr>
<tr>
<td>uid</td>
<td>指定用户的 UID。用户登录进系统后，系统通过该值，而不是用户名来识别用户。</td>
</tr>
<tr>
<td>gid</td>
<td>GID。如果系统要对相同的一群人赋予相同的权利，则使用该值。</td>
</tr>
<tr>
<td>comment</td>
<td>用来保存用户的真实姓名和个人细节。</td>
</tr>
<tr>
<td>home</td>
<td>指定用户的主目录的绝对路径。</td>
</tr>
<tr>
<td>shell</td>
<td>如果用户登录成功，则要执行的命令的绝对路径放在这一区域中。它可以是任何命令。</td>
</tr>
</tbody>
</table>

#### 0.2 /etc/group

/etc/group文件中的信息如下图所示：

![/etc/group]({{ CDN_PATH }}{{ site.img_url }}/2013120902.png)

每一行包含若干字段，字段间用冒号分隔，格式为：

    group_name:passwd:gid:user_list

解释如下(来自：http://www.aka.org.cn/Lectures/002/Lecture-2.2.1/340.html)：
<table><tbody>
<tr>
<th>字段</th>
<th>说明</th>
</tr>
<tr>
<td>group_name</td>
<td>组名</td>
</tr>
<tr>
<td>password</td>
<td>组口令。此域中的口令是加密的。如果此域为空，表明该组不需要口令。</td>
</tr>
<tr>
<td>gid</td>
<td>指定 GID。</td>
</tr>
<tr>
<td>user_list</td>
<td>该组的所有用户，用户名之间用逗号隔开。</td>
</tr></tbody></table>

### 1 用户ID和组ID

Linux实际使用的是用户ID和组ID，用户名和组名只是便于使用者记忆。用户ID和组ID分为以下几种
<table><tbody>
<tr>
<td>实际用户ID</td>
<td rowspan="2">我们实际上是谁</td>
</tr>
<tr>
<td>实际组ID</td>
</tr>
<tr>
<td>有效用户ID</td>
<td rowspan="3">用于文件访问权限检查</td>
</tr>
<tr><td>
有效组ID
</td></tr>
<tr><td>
附加组ID
</td></tr>
<tr>
<td>保存的设置用户ID</td>
<td rowspan="2">由exec函数保存</td>
</tr><tr><td>
保存的设置组ID</td></tr></tbody></table>


### 2 更改用户ID和组ID

在unix/linux编程中，更改用户ID的函数是setuid，可以设置实际用户ID和有效用户ID。与此类似，setgid函数设置实际组ID和有效组ID。
    #include <unistd.h>
    int setuid(uid_t uid);
    int setgid(gid_t gid);

两个函数返回值：若成功则返回0，若出错则返回-1。
关于谁能更改ID有若干规则。现在考虑有关改变用户ID的规则（关于用户ID所说明的一切都是用于组ID）

1. 若进程具有超级用户特权，则setuid函数将实际用户ID、有效用户ID，以及保存的设置用户ID设置为uid。
2. 若进程没有超级用户特权，但是uid等于实际用户ID或保存的设置用户ID，则setuid只将有效用户设置为uid。不改变实际用户ID和保存的设置用户ID。
3. 如果以上两个条件都不满足，则将errno设置为EPERM，并返回-1。

关于内核维护的三个用户ID，还要注意以下几点：

1. 只有超级用户进程可以更改实际用户ID。通常，实际用户ID是在用户登录时，由Login程序设置的，而且永远不会改变它。login是一个超级用户进程，当它调用setuid时，会设置所有三个用户ID。
2. 仅当对程序文件设置了用户ID位时，exec函数才会设置有效用户ID。
3. 保存的设置用户ID是由exec复制有效用户ID而得来的。如果设置了文件的设置用户ID位，则在exec根据文件的用户ID设置了进程的有效用户ID以后，就将这个副本保存起来。

