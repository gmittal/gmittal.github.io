

function OneProblem() {
	var x=document.getElementById("QProblem");
	var int1 = Math.floor(Math.random()*20);
	var int2 = Math.floor(Math.random()*20);
	var rslt = Math.round(parseInt(int1) * parseInt(int2));
	x.innerHTML = "What is "+ int1 +" * "+ int2 +"?";
}

function TenProblems(){
	for ( i = 0; i<10; i++ ) {
	  OneProblem();
	}
}




function OldTenProblems() {
	var x=document.getElementById("mainApp");
	var int1 = Math.floor(Math.random()*20);
	var int2 = Math.floor(Math.random()*20);
	var count;
	if ( int1 < 10 ) {
		count = 0;
		var i = 0;
		for ( i = 0; i<10; i++ ) {
			var q1 = Math.floor(Math.random()*20);
			var q2 = Math.floor(Math.random()*20);
			var rslt = Math.round(parseInt(q1) * parseInt(q2));
			var usr = prompt ("What is "+ q1 +" * "+ q2 +"?");
			if ( usr ) {
				if ( usr == rslt ) { count ++; }
			}
		}	
	alert("Your Score is: "+ count +"/10");
}


