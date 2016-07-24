/* Current Gestures for Mobile:
tap 1: start
tap 2: stop
slide: reset
*/
var tenthseconds = 0;
var countSec = 0;
var seconds = 0;
var countMin = 0;
var minutes = 0;
var running = false;
var numClicks = 0;
var stopwatch;
var numLaps = 0;
var lapMin1 = 0;
var lapSec1 = 0;
var lapTenth1 = 0;
var lapMin = 0;
var lapSec = 0;
var lapTenth = 0;
var fullScreenMode = false;

var lapMinData = new Array();
var lapSecondData = new Array();

function init() {                       // INIT
  if (running === true) {  
  stopwatch = setInterval(tick, 100);
  } else if (running === false) {
  clearInterval(stopwatch);  
  displayStartFactor();
  }
}

function touchInput() {
  numClicks++;
  if (running === true) {
    running = false;
  } else {
  running = true;
  }
  init();
}

function checkMobile() {
document.addEventListener('touchstart', touchInput, false);
event.preventDefault();
$(document).bind('click', function() {
  touchInput();  
});
  
   $(function() {      
      $(document).swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
         document.removeEventListener('touchstart', touchInput, false);
         running = true;
          
          if (direction == "up") {
                        if (fullScreenMode === false) {
                        fullScreenMode = true;
                        } else if (fullScreenMode === true) {
                        fullScreenMode = false;
                        }
                        checkScreenMode();
//                resetStopwatch();
            document.addEventListener('touchstart', touchInput, false);
          } // end direction up if

          if (direction == "down") {
            resetStopwatch();
            document.addEventListener('touchstart', touchInput, false);
          } // end direction down if
          
          if (direction == "right") {
            running = false;
            if (running === false) {
            	init();
            	displayStartFactor();
            	lapStopwatch();
            	running = true;
            	init();
            	document.addEventListener('touchstart', touchInput, false);
            }
           } // end direction right if
          
          if (direction == "left") {
            running = false;
            if (running === false) {
            init();
            displayStartFactor();
            lapStopwatch();
            running = true;
            init();
            document.addEventListener('touchstart', touchInput, false);
            } else {
            
            }
          } // end direction left if
          
        
          
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
      });
     
    });
   
  
  if ($(document).width() > 500) {
      $(document).bind("dblclick", function() {
        resetStopwatch();
      });
  }
}



$(document).ready(function() {
  checkMobile();
  $("body").append("<div id=\"displayArea\"><div id=\"watchDisplay\"></div><div id=\"startStop\"></div><br /></div><br /><br /><div id=\"lapBox\"><span style=\"font-family:'Raleway'; font-size: 15px; color:white; \">tap anywhere to start/stop<br />swipe left or right to lap<br />swipe down to reset</span></div><div id=\"settingsAccessLabel\">swipe up to enter full screen mode</div>");
checkZero();
displayStartFactor();
updateDisplay();
});


function checkScreenMode() {
//    if (running === false) {
//        running = false;
//    } else if (running === true) {
//        running = true;
//    }
    
//    init();
    
    if (fullScreenMode == true) {
        if ($(window).height() == 568) {
        $("#displayArea").css("height", 568);
        } else {
          $("#displayArea").css("height", 480);
        }
        $("#watchDisplay").css("margin-top", "40%");
        $("#lapBox").hide();
        $("#settingsAccessLabel").hide();
        
    } else {
        $("#displayArea").css("height", "55%");
        $("#watchDisplay").css("margin-top", 45);
        $("#lapBox").show();
        $("#settingsAccessLabel").show();
//        $("body").append("<div id=\"lapBox\"></div><div id=\"settingsAccessLabel\">swipe up to enter full screen mode</div>");
    }
}


function tick() {
  tenthseconds++;
    
  if (tenthseconds > 9) {
    tenthseconds = 0;
    countSec++;
  }
  if (countSec > 59) {
    countSec = 0;
    countMin++;
  }
    
  checkZero();  
  displayStartFactor();
  updateDisplay();
}


function convertMilliseconds() {
var result = (tenthseconds * 1000);
}


function displayStartFactor() {
  if (running === true) {
    $("#startStop").html("<b>STOP</b>");
  } else if (running === false) {
    $("#startStop").html("<b>START</b>"); 
  }
}


function checkZero() {
//    if (seconds == 10) {
//        $("#watchDisplay").html("<div class=\"nums\" id=\"minutes\"><b>" + minutes + "</b></div>:<div class=\"nums\" id=\"seconds\">" + 10 + "</div>");
//    }
    
    if (seconds <= 9) {
    seconds = "0" + countSec;
  } else {
    seconds = countSec;
  }
   
    
    
  if (minutes <= 9) {
    minutes = "0" + countMin;
  } else {
    minutes = countMin;
  }
}

function resetStopwatch() {
tenthseconds = 0;
countSec = 0;
seconds = 0;
countMin = 0;
minutes = 0;
running = false;
clearInterval(stopwatch);
clearLaps();
checkZero();
displayStartFactor();
updateDisplay();
}

function lapStopwatch() {
  numLaps++;
  /* lapMin = minutes - lapMin1;
  lapSec = seconds - lapSec1;
  lapTenth = tenthseconds - lapTenth1;
  if (numLaps == 1) {
  lapMin1 = minutes;
  lapSec1 = seconds;
  lapTenth1 = tenthseconds;
  $("#lapBox").prepend("Lap " + numLaps + ": <span class=\"lapnums\">" + lapMin1 + ":" + lapSec1 + "." + lapTenth1 + "</span><br /><br />");
  } else {
  $("#lapBox").prepend("Lap " + numLaps + ": <span class=\"lapnums\">" + lapMin + ":" + lapSec + "." + lapTenth + "</span><br /><br />");
    lapMin1 = lapMin;
    lapSec1 = lapSec;
    lapTenth1 = lapTenth;
  } */
//    lapMinData[numLaps-1] = minutes;
    lapSecondData[numLaps-1] = (minutes * 60) + seconds;
   
    if (numLaps == 1) {
        $("#lapBox").prepend("<b>LAP </b>" + numLaps + " &nbsp; &nbsp; &nbsp; &nbsp; <span class=\"lapnums\">" + minutes + ":" + seconds + "</span><br />");
    } else {
        
        
        var minPast;
//        if (lapMinData[numLaps-2] > minutes) {
//            minPast = (minutes + 60) - lapMinData[numLaps-2];
//        } else {
//            minPast = minutes - lapMinData[numLaps-2];
//        }
//
//        
        var secPast;
//        if (lapSecondData[numLaps-2] > seconds) {
//            secPast = (seconds + 60) - lapSecondData[numLaps-2];
//        } else {
//            secPast = seconds - lapSecondData[numLaps-2];
//        }
        
        timePast = ((minutes * 60) + seconds) - lapSecondData[numLaps - 2];
        minPast = Math.round(timePast/60);
        secPast = timePast % 60;
        
        if (minPast > 9) {
            minPast = minPast;
        } else {
            minPast = "0" + minPast;
        }
        
        if (secPast > 9) {
            secPast = secPast;
        } else {
            secPast = "0" + secPast;
        }
        
        $("#lapBox").prepend("<b>LAP </b>" + numLaps + " &nbsp; &nbsp; &nbsp; &nbsp; <span class=\"lapnums\">" + minPast + ":" + secPast + "</span><br />");
    }
}

function clearLaps() {
  $("#lapBox").html("");
  $("#lapBox").append("<span style=\"font-family:'Raleway'; font-size: 15px; color:white; \">tap anywhere to start/stop<br />swipe left or right to lap<br />swipe down to reset</span>");
 
  numLaps = 0;
}

function displaySettings() {

} 

function updateDisplay() {
  $("#watchDisplay").html("<div class=\"nums\" id=\"minutes\"><b>" + minutes + "</b></div> <div class=\"nums\" id=\"seconds\">" + seconds + "</div>");
}

