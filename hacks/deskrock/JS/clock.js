

function showClock()
{
var clock=new Date();
var hours=clock.getHours();
var minutes=clock.getMinutes();
var seconds=clock.getSeconds();
// for a nice disply we'll add a zero before the numbers between 0 and 9
if (hours<10){
hours="0" + hours;
}
if (minutes<10){
minutes="0" + minutes;
}
if (seconds<10){
seconds="0" + seconds;
}
document.getElementById('showText').innerHTML=hours+":"+minutes+":"+seconds;
t=setTimeout('showClock()',500);
/* setTimeout() JavaScript method is used to call showClock() every 1000 milliseconds (that means exactly 1 second) */
}
