---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for page in collections.all %}
        <url>
            <loc>{{ site.url }}{{ page.url | url }}</loc>
            <lastmod>{{ page.date }}</lastmod>
            <changefreq>{{page.data.changeFreq}}</changefreq>
        </url>
    {% endfor %}
</urlset>