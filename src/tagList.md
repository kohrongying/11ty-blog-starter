---
layout: default
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
eleventyComputed:
  title: "{{ tag }}"
---  

{% for post in collections[tag] %}
<div class="py-4 sm:py-10">
  <p>
    <span class="text-2xl sm:text-4xl font-bold hover:underline"><a href="{{ post.url }}">{{ post.data.title }}</a></span>
  </p>
  <em>{{ post.date | date: "%Y-%m-%d" }}</em>
  <p class="mt-4">{{ post.data.post_excerpt }}... 
    <span class="hover:underline text-indigo-500"><a href="{{ post.url }}">Read More</a></span>
  </p>
</div>
{% endfor %}
