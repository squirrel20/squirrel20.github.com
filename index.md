---
layout: default
title: Squirrel
tagline: view article
---
{% include JB/setup %}

<h1 style="text-align:center">不忘初衷</h1>
<!--<h1 style="text-align:center">Latest Posts</h1>-->
<div>
<ul class="post-list">
    {% for post in site.posts limit:10 %}
        <li>
            <article>
                <span class="entry-title"><a href="{{ site.url  }}{{ post.url  }}"> {{ post.title }} </a></span>
                <span class="entry-date">
                    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
                </span>
            </article>
        </li>
    {% endfor %}
</ul>
</div>
<div style="padding:10px 0;background-color:#eef">
    <h3 style="text-align:center">推广链接</h3>
    <ul class="post-list">
        <li>    
            <span class="entry-title"><a href="https://app.yinxiang.com/referral/Registration.action?uid=4904023&sig=54284ba0ed39107ea43b8e7bc3a37392" target="_blank">印象笔记(Evernoe)</a></span>
        </li>
        <li>    
            <span class="entry-title"><a href="https://db.tt/1U5Pxqmo" target="_blank">Dropbox</a></span>
        </li>
    </ul>
</div>

