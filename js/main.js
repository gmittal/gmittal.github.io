function initTwitter() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
}

$(window).resize(function() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
});
