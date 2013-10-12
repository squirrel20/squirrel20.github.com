---
layout: default
title: HOME
tagline: view article
---
{% include JB/setup %}

<h1 style="text-align:center">Latest Posts</h1>
<ul class="post-list">
    {% for post in site.posts limit:10 %}
        <li>
            <article>
                <a href="{{ site.url }}{{ post.url }}">
                    <span class="entry-title"> {{ post.title }} </span>
                    <span class="entry-date">
                        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
                    </span>
                </a>
            </article>
        </li>
    {% endfor %}
</ul>

