const fs = require('fs')

const generateFilePath = () => {
  const yyyy = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  return`src/posts/${yyyy}/${mm.toString().padStart(2,0)}`
}

const generateTemplate = (filename) => {
  return `---
title: ${filename.join(' ')}
date: ${formatDate()}
tags:
- 
---

<!-- excerpt -->
`
}

const formatDate = () => {
  const d = new Date(),
    month = (d.getMonth() + 1).toString(),
    day = d.getDate().toString(),
    year = d.getFullYear()

  return `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`
}

const createMarkdown = () => {
  const filename = process.argv.slice(2)
  const targetDir = generateFilePath()
  const content = generateTemplate(filename)

  fs.mkdirSync(targetDir, { recursive: true })

  const filepath = `${targetDir}/${filename.join('-')}.md`
  fs.writeFile(filepath, content, (err) => {
    if (err) throw err
    console.log('Created new post at ' + filepath)
  }
  )
}

createMarkdown()