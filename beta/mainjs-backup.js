$(document)
    .ready(function() {
    $("#display").height(450);
    $("#display").width(520);
    checkMobile();
    $("#display")
        .append('<center><div id="navbar"><hr id="stop"><ul class="nav nav-pills"><li id="homeButton"><a href="#">Home</a></li><li><a href="#aboutModal" data-toggle="modal">About</a></li><li><a href="#appModal" data-toggle="modal">Applications</a></li><li><a href="#projModal" data-toggle="modal">Projects</a></li><li><a href="#expModal" data-toggle="modal">Experience</a></li><li><a href="https://www.github.com/gmittal/">GitHub</a></li><li><a href="#twitterModal" data-toggle="modal">Recent Chirps</a></li><li><a href="#contactModal" data-toggle="modal">Contact</a></li></ul></div></center>');
});

$(window).resize(function() {
  checkMobile();
});

function checkMobile() {
    if ($(document).width() < 600) {
    $("#display").addClass("mobile");
    $("#profilePic").height(200);
    $("#display").height($(window).height() - 50);
    $("#display").width($(window).width() - 50);
  } else {
    $("#profilePic").height(250);
    $("#display").height(450);
    $("#display").width(520);
  $("#display").removeClass("mobile");
  }
}