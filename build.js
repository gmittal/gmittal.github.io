/*
* 2017 Gautam Mittal
*/

var colors = require('colors');
var fs = require('fs');
var marked = require('marked');
var moment = require('moment');

marked.setOptions({ gfm: true, tables: true,
    highlight: function (code) {
        return require(`highlight.js`).highlightAuto(code).value;
    }
});

let ls = (dir) => {
    return fs.readdirSync(`${__dirname}/${dir}`).filter((f) => {return f.substr(0, 1) != `.`});
}

let extract = (postFileName) => {
    return {
        'slug': postFileName.substr(11, postFileName.length-14),
        'timestamp': moment(postFileName.substr(0, 10), [`YYYY-MM-DD`]).format(`LL`)
    }
}

let getPostMetadata = (fileContent) => {
    const start = fileContent.indexOf(`---START_METADATA---`);
    const end = fileContent.indexOf(`---END_METADATA---`);
    const jsonStart = fileContent.substr(start, end).indexOf(`{`);
    return JSON.parse(fileContent.substr(jsonStart, end-jsonStart));
}

let compile = (contentDir) => {
    let postListMarkup = [];

    ls(contentDir).forEach((post) => {
        const metadata = getPostMetadata(fs.readFileSync(`${contentDir}/${post}`, `utf-8`));
        const listTemplate = `<div class="story">
            <a href="/${extract(post).slug}">${metadata.title}</a>
            <span class="date">${extract(post).timestamp}. ${metadata.summary}</span></div>`;
        postListMarkup.unshift(listTemplate);
    });

    const indexTemplate = fs.readFileSync(`${__dirname}/templates/index.html`, `utf-8`)
                            .replace(/{BLOG-POST-LIST}/g, postListMarkup.join(``));
    fs.writeFileSync(`${__dirname}/index.html`, indexTemplate);
}

compile(`content`);

// ----------------------------- the bad stuff

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    walk(__dirname + "/_posts", function (e, r) {
        // retrieve template
        fs.readFile(__dirname+"/static/index.html", 'utf-8', function (err, fileData) {
            if (err) {
                console.log("There was an error serving the article template file.".red);
                res.send("An error occurred.");
            } else {
                fs.readFile(__dirname+"/ref.json", "utf-8", function (error, ref) {
                    ref = JSON.parse(ref);

                    // populate template with data
                    var htmlData = [];
                    for (var j = 0; j < r.length; j++) {
                        if (r[j].indexOf(".DS_Store") == -1 && r[j].indexOf(".gitignore") == -1) {
                            r[j] = r[j].split("/")[r[j].split("/").length-1];
                            var slug = r[j].substr(11, r[j].length-14);
                            var time = moment(r[j].substr(0, 10), [configOptions.DATE_FORMAT]).format("LL");
                            var k = slug + ".md";
                            var listTemplate = configOptions.LIST_TEMPLATE;
                            listTemplate = listTemplate.replace(/{POST-SLUG}/g, "/"+slug).replace(/{POST-TITLE}/g, ref[k].title).replace(/{POST-TIME}/g, time).replace(/{POST-DESCRIPTION}/g, ref[k].summary);
                            htmlData.unshift(listTemplate);
                        }
                    }

                    fs.readFile(__dirname+"/data/info.json", "utf-8", function (infoErr, infoFile) {
                        var quoteData = inspirationQuotes[Math.floor(Math.random()*inspirationQuotes.length)];
                        var quote = '"'+quoteData.body+'" &mdash; '+quoteData.source;

                        fileData = fileData.replace(/{BLOG-POST-LIST}/g, htmlData.join(""));

                        res.send(fileData);
                    });
                });
            }
        });
    });
});


// Read articles from other publishers "hosted" on the news site
app.get('/:uid', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(__dirname+"/static/post.html", 'utf-8', function (err, fileData) {
        if (err) {
            console.log("There was an error serving the article template file.".red);
            res.send("An error occurred.");
        } else {
            // searches for all of the markdown posts and returns an array sorted by date
            walk(__dirname + "/_posts", function (e, results) {
                var ix = -1;
                for (var i = 0; i < results.length; i++) {
                    results[i] = results[i].split("/")[results[i].split("/").length-1]
                    if (req.params.uid == results[i].substr(11, results[i].length-14)) {
                        ix = i;
                        break;
                    }
                }
                var md = ix !== -1 ? results[ix] : "404";
                var time = md !== "404" ? moment(md.substr(0, 10), [configOptions.DATE_FORMAT]).format("LL") : "Invalid Page";

                if (md !== "404") {
                    fs.readFile(__dirname + "/_posts/" + md, 'utf-8', function (error, markdown) {
                        var metaDataStart = markdown.indexOf("---START_METADATA---");
                        var metaDataEnd = markdown.indexOf("---END_METADATA---");
                        var jstart = markdown.substr(metaDataStart, metaDataEnd).indexOf("{");
                        var metadataStr = markdown.substr(jstart, metaDataEnd-jstart);
                        var metadata = JSON.parse(metadataStr); // object of metadata parsed out of markdown file
                        markdown = markdown.substr(metaDataEnd+"---END_METADATA---".length, markdown.length); // everything after the metadata
                        marked(markdown, function (err, content) {
                            if (err) throw err;

                            var wordCount = content.split(" ").length;
                            var timeToRead = Math.ceil(wordCount / 200);
                            var title = metadata.title;
                            var author = metadata.author;
                            var date = time;
                            var quoteData = inspirationQuotes[Math.floor(Math.random()*inspirationQuotes.length)];
                            var quote = '"'+quoteData.body+'" &mdash; '+quoteData.source;

                            fileData = fileData.replace(/{POST-TITLE}/g, title);
                            fileData = fileData.replace(/{POST-DATE}/g, date);
                            fileData = fileData.replace(/{POST-AUTHOR}/g, author);
                            fileData = fileData.replace(/{POST-READ-TIME}/g, timeToRead);
                            fileData = fileData.replace(/{POST-CONTENT}/g, content);
                            fileData = fileData.replace(/{BLOG-NAME}/g, configOptions.NAME);
                            fileData = fileData.replace(/{BLOG-DESCRIPTION}/g, configOptions.DESCRIPTION);
                            fileData = fileData.replace(/{DISQUS-LINK}/g, configOptions.DISQUS);
                            fileData = fileData.replace(/{QUOTE-OF-THE-DAY}/g, quote);
                            fileData = fileData.replace(/{GOOGLE-ANALYTICS-SITE-ID}/g, configOptions.GOOGLE_ANALYTICS_SITE_ID);
                            res.send(fileData);
                        });
                    });
                } else {
                    // hacky component to serve remaining files under site root
                    fs.readdir(__dirname+"/static/", function (e, fileList) {
                        if (e) console.log(e);
                        if (req.params.uid.indexOf(".") > -1 && fileList.indexOf(req.params.uid) > -1 && req.params.uid !== "index.html") {
                            res.setHeader('Content-Type', mime.lookup(__dirname+'/static/'+req.params.uid));
                            res.sendFile(__dirname+'/static/'+req.params.uid);
                        } else {
                            res.sendFile(__dirname+'/static/404.html');
                        }
                    });
                }
            });
        }
    });
});

// Serve everything else as static resources
app.use("/", express.static(__dirname+'/static'))

app.listen(configOptions.PORT, function () {
    refJSON();
    fs.readFile(__dirname + "/data/quotes.json", "utf-8", function (e, d) {
        inspirationQuotes = JSON.parse(d).slice();
    });
    console.log(("Loaded at ").blue +("0.0.0.0:"+configOptions.PORT).green);
});
