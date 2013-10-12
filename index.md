---
layout: page
title: Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}

Hello, world!

{% for post in site.posts %}
<header>
{{ post.title }}
</header>
<div>
{{ post.content }}
</div>
{% endfor %}
