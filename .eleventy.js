const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')

const mapping = {
    a:[ 'text-blue-600', 'font-semibold', 'hover:underline' ],
    h1: [
        'leading-tight',
        'border-b',
        'text-4xl',
        'font-semibold',
        'mb-4',
        'mt-6',
        'pb-2'
    ],
    h2: [
        'leading-tight',
        'border-b',
        'text-2xl',
        'font-semibold',
        'mb-4',
        'mt-6',
        'pb-2'
    ],
    h3: [ 'leading-snug', 'text-lg', 'font-semibold', 'mb-4', 'mt-6' ],
    h4: [ 'leading-none', 'text-base', 'font-semibold', 'mb-4', 'mt-6' ],
    h5: [ 'leading-tight', 'text-sm', 'font-semibold', 'mb-4', 'mt-6' ],
    h6: [
        'leading-tight',
        'text-sm',
        'font-semibold',
        'text-gray-600',
        'mb-4',
        'mt-6'
    ],
    blockquote: [
        'text-base',
        'border-l-4',
        'border-gray-300',
        'pl-4',
        'pr-4',
        'text-gray-600'
    ],
    code: [
        'font-mono',
        'text-sm',
        'inline',
        'bg-gray-200',
        'rounded',
        'px-1',
        'py-05'
    ],
    pre: [ 'bg-gray-100', 'rounded', 'p-4' ],
    ul: [ 'text-base', 'pl-8', 'list-disc' ],
    ol: [ 'text-base', 'pl-8', 'list-decimal' ],
    kbd: [
        'text-xs',
        'inline-block',
        'rounded',
        'border',
        'px-1',
        'py-05',
        'align-middle',
        'font-normal',
        'font-mono',
        'shadow'
    ],
    table: [ 'text-base', 'border-gray-600', 'w-full' ],
    th: [ 'border', 'py-1', 'px-3' ],
    td: [ 'border', 'py-1', 'px-3' ],
}

module.exports = function(eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight)

    // To enable merging of tags
    eleventyConfig.setDataDeepMerge(true)

    // Copy these static files to _site folder
    eleventyConfig.addPassthroughCopy('src/assets')

    // To create excerpts
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_alias: 'post_excerpt',
        excerpt_separator: '<!-- excerpt -->'
    })

    // To create a filter to determine duration of post
    eleventyConfig.addFilter('readTime', (value) => {
        const content = value
        const textOnly = content.replace(/(<([^>]+)>)/gi, '')
        const readingSpeedPerMin = 300
        return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
    })

    eleventyConfig.addCollection('tagList', collection => {
        const tagsSet = new Set()
        collection.getAll().forEach(item => {
            if (!item.data.tags) return
            item.data.tags
                .filter(tag => !['posts', 'all'].includes(tag))
                .forEach(tag => tagsSet.add(tag))
        })
        return Array.from(tagsSet).sort()
    })

    const md = markdownIt({ linkify: true, html: true })
    md.use(markdownItClass, mapping)
    eleventyConfig.setLibrary('md', md)

    return {
        dir: {
            input: 'src'
        }
    }
}
