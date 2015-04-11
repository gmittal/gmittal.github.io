	$(document).ready(function() {
		$(".name").lettering();
	});
	


	$("#aboutButton").click(function() {
	  $('html, body').animate({
	        scrollTop: $("#aboutArea").offset().top
	    }, 500);
	});

	$("#projectsButton").click(function() {
	  $('html, body').animate({
	        scrollTop: $("#projectsArea").offset().top
	    }, 750);
	});

	$("#thoughtsButton").click(function() {
	  $('html, body').animate({
	        scrollTop: $("#thoughtsArea").offset().top
	    }, 750);
	});

	$("#contactButton").click(function() {
	  $('html, body').animate({
	        scrollTop: $("#contactArea").offset().top
	    }, 1000);
	});




	  $(function(){
	      $("#awesomeTag").typed({
	        strings: ["enjoy <span id='tag'>learning.</span>", "attend <span id='tag'>hackathons.</span>", "make <span id='tag'>music.</span>", "create <span id='tag'>apps.</span>", "study at <span id='tag' onclick='window.open(\'http://gunn.pausd.org\');'>Gunn HS.</span>"],
	        typeSpeed:100,
	        cursorChar: "|",
	        loop: true,
	        backDelay: 1000
	      });


	  });


/*
	particlesJS('header', {
	  particles: {
	    color: '#c0392b',
	    color_random: false,
	    shape: 'circle', // "circle", "edge" or "triangle"
	    opacity: {
	      opacity: 1,
	      anim: {
	        enable: true,
	        speed: 2,
	        opacity_min: 0,
	        sync: false
	      }
	    },
	    size: 4,
	    size_random: true,
	    nb: 50,
	    line_linked: {
	      enable_auto: false,
	      distance: 140,
	      color: '#000',
	      opacity: 1,
	      width: 1,
	      condensed_mode: {
	        enable: false,
	        rotateX: 600,
	        rotateY: 600
	      }
	    },
	    anim: {
	      enable: true,
	      speed: 1.5
	    }
	  },
	  interactivity: {
	    enable: false,
	    mouse: {
	      distance: 300
	    },
	    detect_on: 'canvas', // "canvas" or "window"
	    mode: 'grab', // "grab" of false
	    line_linked: {
	      opacity: .5
	    },
	    events: {
	      onclick: {
	        enable: true,
	        mode: 'push', // "push" or "remove"
	        nb: 4
	      },
	      onresize: {
	        enable: true,
	        mode: 'out', // "out" or "bounce"
	        density_auto: false,
	        density_area: 100 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
	      }
	    }
	  },
	  retina_detect: true
	});


*/

