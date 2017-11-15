var json;
var blogPostJSON;


$.getJSON( "blogPosts.json", function( data ) {
	json = data;
});

blogPostJSON = JSON.parse(json);

for (var i = 0; i < blogPostJSON.urls.length; i++) {
	var nameFile = blogPostJSON.urls[i] + "title.txt";
	var dateFile = blogPostJSON.urls[i] + "date.txt";
	var postFile = blogPostJSON.urls[i] + "post.txt";


	var url = blogPostJSON.urls[i];
	var name;
	var date;
	var post;

	$.get(nameFile, function(data) {
       name = data;
	});

	$.get(dateFile, function(data) {
       date = data;
	});

	$.get(postFile, function(data) {
       post = data;
	});

	var shortenedPost = post.substring(0, 100) + "...";

	$("#blogPostList").append("<a href=" + url +"<h4>" + name + "</h4><p>" + shortenedPost + "</p><br />");
}
