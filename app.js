var configOptions = {};

var colors = require('colors');
var dotenv = require('dotenv');
var compression = require('compression');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var marked = require('marked');
var minify = require('express-minify');
var moment = require('moment');
var app = express();

dotenv.load();
app.use(compression());
app.use(minify());

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

// Markdown compilation with sytax highlighting
marked.setOptions({
  gfm: true, // by default allow Github-flavored markdown
  tables: true,
  highlight: function (code, lang, callback) {
    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

// TODO: use a better method of loading quotes
var inspirationQuotes = [];

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
        (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
              walk(file, function(err, res) {
                results = results.concat(res);
                next();
            });
          } else {
              results.push(file);
              next();
          }
          });
        })();
  });
};

function refJSON() {
    walk(__dirname+"/_posts", function (e, r) {
      var j = {};
      for (var i = 0; i < r.length; i++) {
        if (r[i].indexOf(".DS_Store") == -1) {
          var d = fs.readFileSync(r[i], "utf-8");
          var metaDataStart = d.indexOf("---START_METADATA---");
          var metaDataEnd = d.indexOf("---END_METADATA---");
          var jstart = d.substr(metaDataStart, metaDataEnd).indexOf("{");
          var metadataStr = d.substr(jstart, metaDataEnd-jstart);
          var metadata = JSON.parse(metadataStr); // object of metadata parsed out of markdown file
          j[r[i].split("/")[r[i].split("/").length-1].substr(11, r[i].length-14)] = {"title": metadata.title, "summary": metadata.summary};
        }
      }

      fs.writeFile(__dirname + "/ref.json", JSON.stringify(j));
    });
}

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  walk(__dirname + "/_posts", function (e, r) {
    // retrieve the template
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
            if (r[j].indexOf(".DS_Store") == -1) {
              r[j] = r[j].split("/")[r[j].split("/").length-1];
              var slug = r[j].substr(11, r[j].length-14);
              var time = moment(r[j].substr(0, 10), [configOptions.dateFormat]).format("LL");
              var k = slug + ".md";
              var listTemplate = configOptions.listTemplate;
              listTemplate = listTemplate.replace(/{POST-SLUG}/g, "/"+slug).replace(/{POST-TITLE}/g, ref[k].title).replace(/{POST-TIME}/g, time).replace(/{POST-DESCRIPTION}/g, ref[k].summary);
              htmlData.unshift(listTemplate);
            }
          }

          fs.readFile(__dirname+"/data/info.json", "utf-8", function (infoErr, infoFile) {
            var info = JSON.parse(infoFile);

            var newsHtmlData = [];
            for (var j = 0; j < info.news_articles.length; j++) {
                var infoIcon = '<a href="'+ info.news_articles[j].link +'"><img alt="'+ info.news_articles[j].source +'" src="'+ info.news_articles[j].icon +'" class="newsInfoIcon" /></a>';
                newsHtmlData.unshift(infoIcon);
            }

            // var projectHtmlData = [];
            // for (var k = 0; k < info.projects.length; k++) {
            //     var listTemplate = configOptions.listTemplate;
            //     listTemplate = listTemplate.replace(/{POST-SLUG}/g, info.projects[k].link).replace(/{POST-TITLE}/g, info.projects[k].name).replace(/{POST-TIME}/g, info.projects[k].description).replace(/{POST-DESCRIPTION}/g, "");
            //     projectHtmlData.unshift(listTemplate);
            // }

            var greetings = ["Hi", "Hello", "Hey"];
            var greeting = greetings[Math.floor(Math.random()*greetings.length)];
            var quoteData = inspirationQuotes[Math.floor(Math.random()*inspirationQuotes.length)];
            var quote = '"'+quoteData.body+'" &mdash; '+quoteData.source;

            fileData = fileData.replace(/{BLOG-POST-LIST}/g, htmlData.join(""));
            fileData = fileData.replace(/{BLOG-NAME}/g, configOptions.name);
            fileData = fileData.replace(/{BLOG-DESCRIPTION}/g, configOptions.description);
            fileData = fileData.replace(/{BLOG-GREETING}/g, greeting);
            fileData = fileData.replace(/{QUOTE-OF-THE-DAY}/g, quote);
            fileData = fileData.replace(/{GOOGLE-ANALYTICS-SITE-ID}/g, process.env.GOOGLE_ANALYTICS_SITE_ID);
            fileData = fileData.replace(/{BLOG-NEWS-LIST}/g, newsHtmlData.join(""));
            // fileData = fileData.replace(/{BLOG-PROJECTS-LIST}/g, projectHtmlData.join(""));

            res.send(fileData);
          });
        });
      }
    });
  });
});


app.use("/hacks", express.static(__dirname+"/static/hacks"));
app.use("/deskrock", express.static(__dirname+"/static/apps/deskrock"));
app.use("/mathninja", express.static(__dirname+"/static/apps/mathninja"));
app.use("/momentum", express.static(__dirname+"/static/apps/momentum"));
app.use("/smartcodes", express.static(__dirname+"/static/apps/smartcodes"));


// Read articles from other publishers "hosted" on the news site
app.get('/:uid', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile(__dirname+"/static/article.html", 'utf-8', function (err, fileData) {
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
        var time = md !== "404" ? moment(md.substr(0, 10), [configOptions.dateFormat]).format("LL") : "Invalid Page";

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
                fileData = fileData.replace(/{BLOG-NAME}/g, configOptions.name);
                fileData = fileData.replace(/{BLOG-DESCRIPTION}/g, configOptions.description);
                fileData = fileData.replace(/{DISQUS-LINK}/g, configOptions.disqusCommentLink);
                fileData = fileData.replace(/{QUOTE-OF-THE-DAY}/g, quote);
                fileData = fileData.replace(/{GOOGLE-ANALYTICS-SITE-ID}/g, process.env.GOOGLE_ANALYTICS_SITE_ID);
                res.send(fileData);
              });
          });
        } else {
          res.sendFile(__dirname + "/static/404.html");
        }
      });
    }
  });
});

// Serve everything else as static resources
app.use("/", express.static(__dirname+'/static'))


app.listen(process.env.PORT, function () {
  refJSON();
  fs.readFile(__dirname + "/data/quotes.json", "utf-8", function (e, d) {
    inspirationQuotes = JSON.parse(d).slice();
  });
  fs.readFile(__dirname + "/config.json", "utf-8", function (e, d) {
    configOptions = JSON.parse(d);
  });
  console.log("Gautam Mittal's ".magenta + ("site loaded at ").blue +("0.0.0.0:"+process.env.PORT).green);
});
