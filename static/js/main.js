var greetings = ["Hi", "Hello", "Hey"]

function initTwitter() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
}

$(document).ready(function() {
	var greeting = greetings[Math.floor(Math.random()*greetings.length)+0];
	$("greeting").text(greeting);
});

$(window).resize(function() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
});
