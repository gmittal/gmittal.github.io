function OneProblem() {
var x=document.getElementById("QProblem");

var int1 = Math.floor(Math.random()*20);
var int2 = Math.floor(Math.random()*20);

var rslt = Math.round(parseInt(int1) * parseInt(int2));

x.innerHTML = "What is "+ int1 +" * "+ int2 +"?";
}