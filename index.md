---
layout: default
title: Squirrel
tagline: view article
---
{% include JB/setup %}

<h1 style="text-align:center">Latest Posts</h1>
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

