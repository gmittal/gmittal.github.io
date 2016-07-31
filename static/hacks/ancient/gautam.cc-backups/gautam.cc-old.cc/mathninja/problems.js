
"use strict";
var rslt;
var int1;
var int2;
var opr;
var level;

var answer_area=document.getElementById("answer");

function update_score(s){
   setCookie("score",s,365);
   var x=document.getElementById("ScoreArea");
   x.innerHTML = s;

}

function handleEnter(inField, e) {
    var charCode;

    if(e && e.which){
	charCode = e.which;
    }else if(window.event){
	e = window.event;
	charCode = e.keyCode;
    }

    if(charCode == 13) {
	evaluate_answer();
    }
}

var OneProblem = function() {
	var x=document.getElementById("ProblemArea");
	// Clear the question area of any text
	x.innerHTML = "";

	// Clear the answer area of any existing text
	document.AnswerForm.answer.value = "";
	// Make answer area visible
	document.getElementById("AnswerArea").style.visibility = "visible";
	document.getElementById("AnswerArea").style.display = "block";

	document.getElementById("problembutton").style.display = "none";
	document.getElementById("problembutton").style.visibility = "hidden";

	document.getElementById("answerbutton").style.display = "block";
	document.getElementById("answerbutton").style.visibility = "visible";
	
	int1 = Math.floor(Math.random()*20);
	int2 = Math.floor(Math.random()*20);
	var opr = ((Math.random() > 0.5) ? 1 : 2);
	if (opr === 1){
		rslt = Math.round(parseInt(int1) * parseInt(int2));
		x.innerHTML = "What is " + int1 + " x " + int2 + "?";
	}	
	else{
		rslt = Math.round(parseInt(int1) + parseInt(int2));
		x.innerHTML = "What is " + int1 + " plus " + int2 + "?";
	}
	       
	document.AnswerForm.answer.focus()
}

var score;


var evaluate_answer = function() {
        var answer =  parseInt(document.getElementById('answer').value);
        var x=document.getElementById("ProblemArea");
        var scoreCount = 0;
	level = "White";
	score = parseInt(document.getElementById("ScoreArea").innerHTML);
        // Clear the question area of any text
        x.innerHTML = "";
        if (answer === rslt){
            x.innerHTML = "<font color=\"green\">Correct!</font> The answer is ";
	    x.innerHTML +=  rslt;
            score = score + 5;
                if ( score > 50 ) {
                        level = " ";
                        level = "Yellow";
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"yellowbelt.png\" />"
                                }
                if ( score > 100 ) {
                        level = " ";
                        level = "Green";
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"greenbelt.png\" />"
                                }
                if ( score > 200 ) {
                        level = " ";
                        level = "Blue";
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"bluebelt.png\" />"
                                }
                if ( score > 300 ) {
                        level = " ";
                        level = "Brown";
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"brownbelt.png\" />"
                                }
                if ( score > 400 ) {
                        level = " ";
                        level = "Red"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"redbelt.png\" />"
                                }
                if ( score > 500 ) {
                        level = " ";
                        level = "Black"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"        
                                }
                if ( score > 620 ) {
                        level = " ";
                        level = "Black II"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 750 ) {
                        level = " ";
                        level = "Black III"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"        
                                }
                if ( score > 875 ) {
                        level = " ";
                        level = "Black IV"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 920 ) {
                        level = " ";
                        level = "Black V"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 1100 ) {
                        level = " ";
                        level = "Black VI"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 1400 ) {
                        level = " ";
                        level = "Black VII"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 1600 ) {
                        level = " ";
                        level = "Black VIII"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }
                if ( score > 1900 ) {
                        level = " ";
                        level = "Black IX"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                                }   
                if ( score > 2250 ) {
                        level = " ";
                        level = "Black X"
                        document.getElementById("beltSign").innerHTML = "<img id=\"beltImg\" src=\"blackbelt.png\" />"
                }     
	}

        else{
            x.innerHTML = "<font color=\"red\">Sorry.</font> The right answer  is " + rslt;
            score = score - 5;
        }
        update_score(score);


        document.getElementById("levelArea").innerHTML = level + " belt";

        // Make answer area visible
        document.getElementById("AnswerArea").style.display = "block";
        document.getElementById("AnswerArea").style.visibility = "hidden";

        document.getElementById("answerbutton").style.display = "none";
        document.getElementById("answerbutton").style.visibility = "hidden";

        document.getElementById("problembutton").style.display = "block";
        document.getElementById("problembutton").style.visibility = "visible";
}



function entsub() { 
if (window.event && window.event.keyCode == 13){ 
this.document.AnswerForm.submit(); 
} 
}


function toggleSound(){
if (document.all&&document.all.sound&&document.all.sound.src!=='')
document.all.sound.src=''
else if (document.getElementById&&document.getElementById('snd')){
sndEl=document.getElementById('snd')
document.getElementById('sndC').removeChild(sndEl)
}
else if (document.all&&document.all.sound&&document.all.sound.src=='')
document.all.sound.src=sndEl
else if (document.getElementById)
document.getElementById('sndC').appendChild(sndEl)
}
