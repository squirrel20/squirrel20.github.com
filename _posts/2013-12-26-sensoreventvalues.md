---
layout: post
title: "SensorEvent"
description: "android SensorEvent.values info"
category: "android"
tags: [android]
---
{% include JB/setup %}

以下内容翻译自：[developer.android.com](http://developer.android.com/intl/zh-cn/reference/android/hardware/SensorEvent.html)

    public class SensorEvent extends Object{
        ...
    }

### 类概述

这个类表示一个传感器事件，并且会携带一些信息，例如：传感器类型、时间戳、精度和传感器数据等。

__使用SensorEvent API定义坐标系统__。

坐标系统时根据手机屏幕默认方向定义的。当设备屏幕方向改变，坐标轴也不会更改。

X轴沿屏幕水平向右，Y轴沿屏幕竖直向上，Z轴垂直于屏幕。在系统中，在屏幕后面的Z轴坐标值为负值。

![坐标轴]({{ site.img_url }}/2013122501.png)

_注：_这套坐标系统与Android 2D API中的以屏幕右上角为原点的坐标系统不同。

### 摘要

<table>
<tbody>
<tr><th>域</th><th></th><th></th></tr>
<tr>
    <td>public int</td>
    <td>accuracy</td>
    <td>这个事件的精确度</td>
</tr>
<tr>
    <td>public Sensor</td>
    <td>sensor</td>
    <td>生成这个事件的传感器</td>
</tr>
<tr>
    <td>public long</td>
    <td>timestamp</td>
    <td>时间发生时的时间，纳秒</td>
</tr>
<tr>
    <td>public final float[]</td>
    <td>values</td>
    <td>values的内容和长度取决与监听的传感器的类型</td>
</tr>
</tbody>
</table>

### public final float[] values 概述

__Sensor.TYPE_ACCELEROMETER (加速计):__

所有值都遵循国际单位制(m/s^2)

* values[0]: x轴的加速度值减去x轴方向的重力值 
* values[1]: y轴的加速度值减去y轴方向的重力值
* values[2]: z轴的加速度值减去z轴方向的重力值

这种类型的传感器通过设备（__Ad__）测量加速度。即通过下面的公式测量力作用在传感器自身（__Fs__）的值。

<center>Ad = - ∑Fs / mass</center>

并且重力会影响测量加速度：

<center>Ad = -g - ∑Fs / mass</center>

因此，当设备放在桌面上（此时明显没有加速度），加速计会读取重力值 g = 9.81 m/s^2

同样的，当设备做自由落体运动，设备以9.81m/s^2的加速落向地面，此时加速计读取的值为 0 m/s。

因此为了测量设备真实的加速度，必须消除重力的影响。这可以通过高通滤波来实现。反过来，通过地同滤波可以隔离重力。

    public void onSensorChanged(SensorEvent event)
    {
        // alpha = t / (t + dT)
        // t: 低通滤波的时间常数
        // dT: 该事件传递率

        final float alpha = 0.8;

        gravity[0] = alpha * gravity[0] + (1 - alpha) * event.values[0];
        gravity[1] = alpha * gravity[1] + (1 - alpha) * event.values[1];
        gravity[2] = alpha * gravity[2] + (1 - alpha) * event.values[2];

        linear_acceleration[0] = event.values[0] - gravity[0];
        linear_acceleration[1] = event.values[1] - gravity[1];
        linear_acceleration[2] = event.values[2] - gravity[2];
    }

例子：

* 当设备平放在桌面上，使设备从左边移动到右边，x轴方向的加速度值为正。
* 当设备平放在桌面上，加速度值为+9.81，由设备的加速度值(0m/s^2)减去重力值(-9.81m/s^2)得出。（注：__重力方向在z轴的反方向，因此为负值__）
* 当设备平放在桌面上，以加速度A m/s^2推向天空，设备加速度的值为 A+9.81，由设备加速度(+A m/s^2)减去重力值(-9.81 m/s^2)得出
