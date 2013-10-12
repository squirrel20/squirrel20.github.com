---
layout: page
title: Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}



{% for post in site.posts %}
<article class="hentry" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">
  <header>
    <div class="entry-meta"><span class="entry-date date published updated"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished"><a href="{{ site.url }}{{ post.url }}">{{ post.date | date: "%B %d, %Y" }}</a></time></span><span class="author vcard" itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name" class="fn"><a href="{{ site.url }}/about" title="About {{ site.owner.name }}" itemprop="url">{{ site.owner.name }}</a></span></span>{% if site.disqus_shortname and post.comments %}&nbsp; &bull; &nbsp;<span class="entry-comments"><a href="{{ site.url }}{{ post.url }}#disqus_thread">Comment</a></span>{% endif %}</div><!-- /.entry-meta -->
    {% if post.link %}
      <h1 class="entry-title" itemprop="name"><a href="{{ site.url }}{{ post.url }}" rel="bookmark" itemprop="url" title="{{ post.title }}"><i class="icon-double-angle-right"></i></a> <a href="{{ post.link }}">{{ post.title }}</a></h1>
    {% else %}
      <h1 class="entry-title" itemprop="name"><a href="{{ site.url }}{{ post.url }}" rel="bookmark" title="{{ post.title }}" itemprop="url">{{ post.title }}</a></h1>
    {% endif %}
  </header>
  <div class="entry-content" itemprop="description">
    {{ post.content }}
  </div><!-- /.entry-content -->
</article><!-- /.hentry -->
{% endfor %}
