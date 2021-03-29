/*
* 2017-present Gautam Mittal
*/

const fs = require('fs')
const marked = require('marked')
const moment = require('moment')
const rss = require('rss')

marked.setOptions({
    gfm: true, tables: true,
    highlight: function (code) {
        return require(`highlight.js`).highlightAuto(code).value
    }
})

function ls(dir) {
    return fs.readdirSync(`${__dirname}/${dir}`).filter((f) => {
        return f.substr(0, 1) != `.`
    })
}

function extract(contentDir, postFileName) {
    const fileContent = fs.readFileSync(`${contentDir}/${postFileName}`, `utf-8`)
    const start = fileContent.indexOf(`---START_METADATA---`)
    const end = fileContent.indexOf(`---END_METADATA---`)
    const jsonStart = fileContent.substr(start, end).indexOf(`{`)
    return {
        'slug': postFileName.substr(11, postFileName.length - 14),
        'timestamp': moment(postFileName.substr(0, 10), [`YYYY-MM-DD`]).format(`LL`),
        'metadata': JSON.parse(fileContent.substr(jsonStart, end - jsonStart)),
        'content': fileContent.substr(end + `---END_METADATA---`.length, fileContent.length)
    }
}

/*
  contentDir: directory of markdown files
  outputDir: build script output of HTML files
  ignore: file in contentDir of private markdown files
*/
function compile(contentDir, outputDir, ignore) {
    if (!fs.existsSync(contentDir)) throw `No content directory "${contentDir}" found.`
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)
    let _ignore = fs.readFileSync(`${contentDir}/${ignore}`, `utf-8`).split(`\n`).filter(p => p.length > 0)
    let postListMarkup = []

    // Setup RSS feed
    let feed = new rss({
        title: `Gautam Mittal`,
        site_url: `http://gmittal.github.io`,
        feed_url: `http://gmittal.github.io/feed.xml`,
        image_url: `https://gmittal.github.io/img/favicon.png`,
        language: `en`
    })

    // Process each post
    ls(contentDir).forEach((post) => {
        const metadata = extract(contentDir, post).metadata

        // Build list of posts displayed on the homepage
        if (_ignore.indexOf(post) == -1) {
            const listTemplate = `<div class="story">
              <a href="/${outputDir}/${extract(contentDir, post).slug}">${metadata.title}</a>
              <span class="date">${extract(contentDir, post).timestamp}. ${metadata.summary}</span></div>`
            postListMarkup.unshift(listTemplate)
        }

        // Build individual posts from template
        marked(extract(contentDir, post).content, function (err, content) {
            if (err) throw err

            const targetDir = `${outputDir}/${extract(contentDir, post).slug}`
            const postUrl = `http://gmittal.github.io/${targetDir}`

            const postTemplate = fs.readFileSync(`${__dirname}/templates/post.html`, `utf-8`)
                .replace(/{POST-TITLE}/g, metadata.title)
                .replace(/{POST-DATE}/g, extract(contentDir, post).timestamp)
                .replace(/{POST-AUTHOR}/g, metadata.author)
                .replace(/{POST-DESCRIPTION}/g, metadata.summary)
                .replace(/{POST-READ-TIME}/g, Math.ceil(content.split(` `).length / 250))
                .replace(/{POST-CONTENT}/g, content)
                .replace(/{POST-URL}/g, postUrl)
            // Write post to disk
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)
            fs.writeFileSync(`${targetDir}/index.html`, postTemplate)

            // Add the post to RSS
            if (_ignore.indexOf(post) == -1) {
                feed.item({
                    title: metadata.title,
                    description: `${metadata.summary} \n\n ${content}`,
                    url: postUrl,
                    date: new Date(extract(contentDir, post).timestamp),
                    author: metadata.author
                })
            }
        })
    })

    // Write RSS feed.xml
    fs.writeFileSync(`feed.xml`, feed.xml(`   `))

    // Build home page
    const indexTemplate = fs.readFileSync(`${__dirname}/templates/index.html`, `utf-8`)
        .replace(/{BLOG-POST-LIST}/g, postListMarkup.join(``))
    fs.writeFileSync(`${__dirname}/index.html`, indexTemplate)
}


// Yesterday is history, tomorrow is a mystery, but today is a gift.
compile(`content`, `thoughts`, `.ignore`)
