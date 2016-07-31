      var createCode = function() {
        var sizeData = sizeInput.value;
	var sData = txt.value;
	var sURL = "https://chart.googleapis.com/chart?";
	var urlParam = "chs="+ sizeData + "x" + sizeData + "&cht=qr&chl=";
	var finalLink = urlParam + sData;
	var QRsource = sURL + finalLink;
	imgGET.src=QRsource;

	if(sizeData.length = 0) {
	charDisplay.innerHTML = "<font color=\"red\" style=\"float: left;\">Size Specification Required</font>";
	} 
	
	if(sizeData < 100) {
	charDisplay.innerHTML = "<font color=\"red\" style=\"float: left;\">Size Specification Required - Size too Small</font>";
	}
	
	if(sizeData > 547) {
	charDisplay.innerHTML = "<font color=\"red\" style=\"float: left;\">Cannot Generate QR Code - Size too Big, 547px<sup>2</sup> Max</font>";
	}

	if(isNaN(sizeData)) {
	charDisplay.innerHTML = "<font color=\"red\" style=\"float: left;\">Size Specification Required - Size must be a Numeric Value</font>";
	}


      }
      
      
      var displayChar = function() {
        var currentChar = txt.value;
        var numChar = currentChar.length;
        var charLeft = (1431 - numChar);
	charDisplay.innerHTML = numChar + ", " + charLeft;
	
	if(charLeft < 0) {
	  charDisplay.innerHTML = "Cannot Generate QR Code";
	  }
	}
	