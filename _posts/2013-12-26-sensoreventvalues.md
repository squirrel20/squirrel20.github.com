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

![坐标轴]({{ CDN_PATH }}{{ site.img_url }}/2013122601.png)

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

__Sensor.TYPE_MAGNETIC_FIELD:(磁力仪)__

测量x、y、z轴的环境磁场，单位是uT。

__Sensor.TYPE_GYROSCOPE:(陀螺仪)__

测量设备x、y、z轴的旋转速率，单位是radians/second。其坐标系统和叫速度传感器的一样。顺时针方向旋转为正值。也就是说，设备放在坐标系统的原点，观察者在任意轴（x、y或z轴）的正半轴，当观察到设备沿顺时针旋转即为正值。下面给出正旋转的标准数学定义，与前面卷的定义是不同的。

* values[0]: x轴的角速度
* values[1]: y轴的角速度
* values[2]: z轴的角速度

通常的陀螺仪的输出是通过计算角度旋转与时间的积分，例如下面的代码：

    private static final float NS25 = 1.0f / 1000000000.0f;
    private final flost[] deltaRotationVector = new float[4]();
    private float timestamp;

    public void onSensorChanged(SensorEvent event){
        // 

        if(timestamp != 0){
            final flost dT = (event.timestamp - timestamp) * NS2S;
            //
            float axisX = event.values[0];
            float axisY = event.values[1];
            float axisZ = event.values[2];

            //
            float omegaMagnitude = sqrt(axisX*axixX + axisY*axisY + axisZ*axisZ);

            //
            if(omegaMagnitude > EPSILON){
                axisX /= omegaMagnitude;
                axisY /= omegaMagnitude;
                axisZ /= omegaMagnitude;
            }

            //
            float thetaOverTwo = omegaMagnitude * dT / 2.0f;
            float sinThetaOverTwo = sin(thetaOverTwo);
            float cosThetaOverTwo = cos(thetaOverTwo);
            deltaRotationVector[0] = sinThetaOverTwo * axisX;
            deltaRotationVector[1] = sinThetaOverTwo * axisY;
            deltaRotationVector[2] = sinThetaOverTwo * axisZ;
            deltaRotationVector[3] = coseThetaOverTwo;
        }

        timestamp = event.timestamp;
        float[] deltaRotationMatrix = new float[9];
        SensorManager.getRotationMatrixFromVector(deltaRotationMatrix, deltaRotationVector);
        //
    }

在实际情况中，由于陀螺仪的噪声和误差会产生一些错误，所以需要做一些补救措施。通常时使用其他传感器的一些信息。

__Sensor.TYPE_LIGHT:(光传感器)__

values[0]: 环境光照强度

__Sensor.TYPE_PRESSURE:(压力传感器)__

values[0]: 大气压强，单位是hPa

__Sensor.TYPE_PROXIMITY:(接近传感器)__

values[0]: 接近传感器的距离，单位是厘米

_注：_一些接近传感器只支持近和远两种状态。在这种情况下，需要设置传感器的maxium range值，查过这个值就是处于远状态，否则就是处于近状态

__Sensor.TYPE_GRAVITY:(重力传感器)__

通过三维矢量指示处重力的方向和大小。单位时m/s^2。其坐标系统和加速度传感器坐标系统相同

_注：_当设备静止时，重力传感器的输出应该与加速度传感器的输出相同。

__Sensor.TYPE_LINEAR_ACCELERATION:(线性加速度)__

一个三维向量，表示沿设备每个轴方向的加速度，不包括重力。单位时m/s^2。其坐标系统和加速度传感器的坐标系统相同。

加速度传感器、重力传感器和线性加速度传感器的输出必须满足下面的公式：

    acceleration = gravity + linear-acceleration

__Sensor.TYPE_ROTATION_VECTOR:(旋转矢量)__

旋转矢量是通过计算设备和坐标轴的角度得出设备的方向，即在轴（x、y、z）上旋转一个角度θ。

旋转矢量的三个值是<x*sin(θ/2), y*sin(θ/2), z*sin(θ/2)>, 旋转矢量的量刚是sin(θ/2)，旋转矢量的方向和轴的旋转方向相同。

旋转矢量的三个值和四元素<cos(θ/2), x*sin(θ/2), y*sin(θ/2), z*sin(θ/2)>中的后面三个相同。

旋转矢量的值没有单位。x、y、z轴的定义方式与加速传感器相同。

旋转矢量的坐标系统按如下方式定义：

* X 轴定义为Y.Z向量的积（相当与设备当前位置沿正东方向的切线）
* Y 轴相当与设备当前位置沿正北方向的切线
* Z 轴正对着天空，垂直于地面

![旋转矢量坐标系统]({{ CDN_PATH }}{{ site.img_url }}/2013122602.png)

* values[0]: x*sin(θ/2)
* values[1]: y*sin(θ/2)
* values[2]: z*sin(θ/2)
* values[3]: cos(θ/2)
* values[4]: 估计航向精度（弧度）（如果不可用为-1）

values[3]作为一个可选项，在SDK 18开始有这个值。 values[4]在SDK 18中新加入的。

__Sensor.TYPE_ORIENTATION:(方向传感器)__

所有值的单位都是角度。

* values[0]: 方位，与地球磁场北极的角度，即垂直与z轴，与y轴的角度。北=0，东=90，南=180，西=270。
* values[1]: 倾斜角，围绕着x轴（-180，180），围绕着x轴，从z轴旋转向y轴为正。
* values[2]: 旋转角，围绕着x轴（-90，90），顺时针方向为正

*注：*由于历史原因，请使用`getRotationMatrixt()`获取旋转矢量的值。

*注：*由于历史原因，旋转角的正方向为顺时针方向

__Sensor.TYPE_RELATIVE_HUMIDITY:(相对湿度传感器)__

* values[0]: 相对湿度，以百分比形式表示

当测量相对环境空气湿度和环境温度时，计算露点和绝对湿度。

*露点（露点温度）（Dew point）*

在固定气压下，空气中所含的气态水达到饱和而凝结成液态水所需要降至的温度。在这温度时，凝结的水漂浮在空中称为雾、而粘在固体表面上时则称为露，因而得名露点(dew point)。

*绝对湿度（Absolute Humidity）*

绝对湿度是水蒸汽在一定体积的干燥空气中的质量。

__Sensor.TYPE_AMBIENT_TEMPERATURE:(环境温度传感器)__

* values[0]: 环境温度（室内温度），单位为摄氏度。

__Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED:(未校准磁力仪)__

与TYPE_MAGNETIC_FIELD类似，但是校准数据会单独列出来而不是包含在测量数据中。

__Sensor.TYPE_GAME_ROTATION_VECTOR:__

区别于TYPE_ROTATION_VECTOR，它不使用地球磁场。因此，Y轴并不指向地磁北极，而是某个特定参照。

__Sensor.TYPE_GYROSCOPE_UNCALIBRATED:__

单位是radians/sccond，测量x、y、z轴方向的旋转速率。同时提供每个轴方向的估计误差。

* values[0]: x轴的角速度
* values[1]: y轴的角速度
* values[2]: z轴的角速度
* values[3]: x轴的估计误差
* values[4]: y轴的估计误差
* values[5]: z轴的估计误差
