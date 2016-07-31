/* Copyright gautam.cc Developer Team */
// Powered by Google Chart API & QRServer API
// WARNING: Performance of SmartCodes may vary due to network connection errors, failure to reach server, and device type

// Character allowance is crucial, as if there is more than 1431 characters in the text field, the API fails, and stops creating QR Codes.
const char_allowance = 1431;


var createCode = function() {
    const sizeData = 150;
	var sData = txt.value;
    var sURL = "http://api.qrserver.com/v1/create-qr-code/?size="; /* QRSERVER API */
	var urlParam = sizeData + "x" + sizeData + "&data=";
	var finalLink = urlParam + sData;
	var QRsource = sURL + finalLink;
	imgGET.src=QRsource;
    
	if(sizeData.length == 0) {
        charDisplay.innerHTML = "<font color=\"red\">Size Specification Required</font>";
	}
	
	if(sizeData < 100) {
        charDisplay.innerHTML = "<font color=\"red\">Size Specification Required - Size too Small</font>";
	}
	
	if(sizeData > 547) {
        charDisplay.innerHTML = "<font color=\"red\">Cannot Generate QR Code - Size too Big, 547px<sup>2</sup> Max</font>";
	}
    
	if(isNaN(sizeData)) {
        charDisplay.innerHTML = "<font color=\"red\">Size Specification Required - Size must be a Numeric Value</font>";
	}
    
    // If there is no data input within the text field, display a blank QR Code ( this works offline )
    if(sData.length == 0) {
        imgGET.src = "create-qr-code.png";
    }
    
    if(sData.length == 1431) {
        // Do not give an undefined image
        imgGET.src = "question-qr.jpeg";
        
    }
}



// Function to display the amount of characters left

var displayChar = function() {
    var currentChar = txt.value;
    var numChar = currentChar.length;
    var charLeft = (char_allowance - numChar);
    var charLabelStat = "Characters Left: ";
    var fullCharString = charLabelStat + charLeft;
	charDisplay.innerHTML = fullCharString;
	
    /*	if(charLeft < 0) {
     charDisplay.innerHTML = "Cannot Generate QR Code";
     } */
}