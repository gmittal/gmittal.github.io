var greetings = ["Hi", "Hello", "Hey"]

$(document).ready(function() {
	var greeting = greetings[Math.floor(Math.random()*greetings.length)+0];
	$("greeting").text(greeting);
});
