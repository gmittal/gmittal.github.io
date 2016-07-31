function access_pro() {
var access_code = document.getElementById("access").value;
code = "oSLKWsX-V6Am";

// Check input
if (access_code == code) {
alert("Permission Granted");
window.open("http://www.gautam.cc/private/admin/private_links/premium/site/");
} else {
alert("Access Denied");
}
}