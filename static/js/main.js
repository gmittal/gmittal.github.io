var greetings = ["Hi", "Hello", "Hey"]

$(window).resize(function() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
});

$(document).ready(function() {
	$(".twitter-timeline").height($("#pictureOfMe").height()+20);
	var greeting = greetings[Math.floor(Math.random()*greetings.length)+0];
	$("greeting").text(greeting);
});
