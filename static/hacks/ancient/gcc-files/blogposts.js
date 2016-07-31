var posts = new Array();



$(document).ready(function() {
	addPost("http://www.gautam.cc/blog/first-blog-post/");
	addPost("http://www.gautam.cc/blog/makegameswithus-internship-experience/");
	addPost("http://www.gautam.cc/blog/learning-to-code/");
	parsePosts();
});

function addPost(postUrl) {
	posts[posts.length] = postUrl;

}

function parsePosts() {
	for (var i = 0; i < posts.length; i++) {
		var url = posts[i];
		var title;
		var date;
		var postData;

		var titleTxt = url + "title.txt";
		var dateTxt = url + "date.txt";
		var postTxt = url + "post.txt";

		$.get(titleTxt, function(data) {
    	  title = data;
		});

		$.get(dateTxt, function(data) {
    	  date = data;
		});

		$.get(postTxt, function(data) {
    	  postData = data;
		});

		postString = postData.substring(0, 80);

		$("#blogList").append("<a href=\"" + url + "\"><h6>" + title + "</h6></a><p><b>" + date +"</b></p><p>" + postString + "</p><br />");

	}
}