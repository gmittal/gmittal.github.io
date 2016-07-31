/* Copyright 2012 Gautam Mittal

MAJOR BUG: When building multiple codes, APIs must be the same. E.G One code cannot be generated using Google Chart and one be generated using QR Server

QR Server is suggested when generating codes above 600px. QR Server can generate codes with a max size of 1000px. Google Chart API has a size limit of 547px per code. 

Kawya does not take size in pixels. Max size is unknown.

Keremerkan API is not suggested. Bugs still remain.

The Data Matrices are built using Kaywa and Barcodes are built using BarcodeInc.

USEFUL LINKS:
http://www.scandit.com/2012/05/01/how-to-personalize-your-own-qr-code-a-step-by-step-guide/
http://www.youthedesigner.com/2011/09/29/what-is-a-qr-code-and-how-does-it-work/

*/
  

var qrserver;
var google;
var kaywa;
var L = "L";
var M = "M";
var Q = "Q";
var H = "H";
var auto;

var demoCode0 = "http://www.gautam.cc/";
var demoCode1 = "I was created using jQRy!";
var demoCode2 = "I am so Awesome.";

function init() {
  qrserver = "qrserver";
  google = "google";
  kaywa = "kaywa";
  L = "L";
  M = "M";
  Q = "Q";
  H = "H";
  auto = "auto";
}

init(); // required

// QR Code
function create2dcode(data, size, ecc, api, id) {
// Initialize variables  

var defUrl;
var urlParam;
  
  if (size === "auto") {
    size = $(window).width();   // returns height of browser viewport
  }
  
// Determine which API to use  
if (api === "google") { // Google Chart API
  defUrl = "https://chart.googleapis.com/chart?";
  urlParam = "chs="+ size + "x" + size + "&cht=qr" + "&chld=" + ecc + "chl=";
}
  
if (api === "qrserver") { // QRSERVER API
  defUrl = "http://api.qrserver.com/v1/create-qr-code/?size=";
  urlParam = size + "x" + size + "&ecc=" + ecc + "&data=";
}  
  
  if (api === "kaywa") { // KAWYA
    defUrl = "http://qrfree.kaywa.com/?s=";
      urlParam = size + "&d=";
  }
 
  if (api === "keremerkan") {
    defUrl = "http://generator.keremerkan.net/code.png?do=1&action=text&ecl=";
    urlParam = ecc + "&block=" + size + "&otype=png&ctype=q&fg=%23000000&bg=%23FFFFFF&hid=0af7479a-96379874&free_text=";
  }
  
/* if (api === undefined) {
  defUrl = "http://api.qrserver.com/v1/create-qr-code/?size=";
  urlParam = size + "x" + size + "&data=";
} */
  
  if (data.length > 1431) {
  document.getElementById(id).src = "http://blogs.trinitydc.edu/webteam/files/2011/09/QR_question_mark_v2.jpg";
  }
  
var finalLink = urlParam + data;
var QRsource = defUrl + finalLink;
    
document.getElementById(id).src = QRsource;
  
}

/* NOTE: for demo to run successfully, an <IMG>
with the ID "demo" should already exist */
function giveDemo() {
  create2dcode(demoCode0, 200, M, qrserver, "demo");
}

// Data Matrix
function create2dmatrix(data_m, size_m, id_m) {
  var defineUrl = "http://datamatrix.kaywa.com/img.php?s=";
  var urlParameters = size_m + "&d=" + data_m;
  var finalSource = defineUrl + urlParameters;
  document.getElementById(id_m).src = finalSource;
}

// Barcode
function create1dbarcode(data_b, width, height, res, font_size, id_b) {
  var defURL = "http://www.barcodesinc.com/generator/image.php?code=";
  var urlParameter = data_b + "&style=453&type=C128B&width=" + width + "&height=" + height + "&xres=" + res + "&font=" + font_size;
  var finalImageSrc = defURL + urlParameter;
  document.getElementById(id_b).src = finalImageSrc;
}


function checkNet() {
  var deviceConnectStatus = navigator.onLine;
  if (deviceConnectStatus === true) {
    // Do nothing
  } else {
    console.log("Device is Offline");
  alert("You are currently offline. Please check your internet connection before generating any more codes.");
  }
}

function init_style(border_width, border_radius, id) {
  document.getElementById(id).style.borderWidth = border_width;
  document.getElementById(id).style.borderRadius = border_radius; //numeric 
}

function getCodeLink(id) {
  var returnLink = document.getElementById(id).src;
  alert(returnLink);
}
