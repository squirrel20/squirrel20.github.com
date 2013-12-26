---
layout: post
title: "android的传感器"
description: "android"
category: "Android"
tags: [android, sensor]
---
{% include JB/setup %}

Android设备的传感器一般分为以下3类：

### 1. 动作类传感器

加速计 TYPE_ACCELEROMETER
>加速计返回x、y、z三个方向的加速度值，单位为m/s^2。加速度在z轴方向受重力的影响，所以将手机平方在桌面上时，x=0、y=0、z=9.81m/s^2；将手机朝下平放在桌面上时，x=0,y=0,z=-9.81m/s^2

线性加速计 TYPE_LINEAR_ACCELERATION
>与加速计的区别就是去除了重力的影响

重力感应器 TYPE_GRAVITY
>输出重力数据

陀螺仪 TYPE_GYROSCOPE
>返回x、y、z三个方向的角加速度数据，单位时radians/second

旋转矢量传感器 TYPE_ROTATION_VECTOR
>旋转矢量代表设备的方向，是一个将坐标轴和角度混合计算得到的数据

### 2. 方向类传感器

方向传感器 TYPE_ORIENTATION
>返回三个方向的角度数据，单位时角度

磁力仪 TYPE_MAGNETIC_FIELD
>返回三个方向的环境磁场数据

### 3. 环境类传感器

温度传感器 TYPE_TEMPERATURE
>返回当前温度

光度传感器 TYPE_LIGHT
>检测实时的光线强度，单位时lux

压力传感器 TYPE_PRESSURE
>返回当前的呀强，单位时百帕斯卡

接近传感器 TYPE_PROXIMITY
>检测物体与手机的距离，单位是厘米
