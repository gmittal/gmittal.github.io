// EverBounce

//Initializing Variables
// Please alter, do trial and error with vars


 		var jumpHeight = 30;
 		var currentHeight = 0;
 		var lowestPlank = 0;
 		var gameInners = "";
 		var jumper = "";
 		var gameTime = 0;
 		var score = 0;
 		var GRAFFITI = 1;
 		
		function loadDemo(){ // loader for the demo
 		 	 gameInners = $("gameInners");
 		 	 keyboard.initialize();
 		 	 screener.initialize();
			 drawPlatforms();
			// moojumper.initialize();
			 UnlockChars();
	
		}
 
		var clock="";
		var gametimer = {
			time: 0,
			timeStamp: 0,
			framerate: 13.5,
			pauseClock: false,
			initialize: function(){
					this.time = 0;
					clock = $("clock");
					this.start();
			},
			start: function(){
				this.pauseClock = false;
				this.tick();
			},
			pause: function(gameTime){
	 			this.pauseClock = true;
			},
			tick: function(){
				if(!this.pauseClock){
					this.time = this.time+1;
					this.updateClockFace();
					animate.frame();
				 
					setTimeout(function(){
						gametimer.tick();
					},this.framerate);
				}
			},
			updateClockFace: function(){
				clock.innerHTML = this.time;
			},
			currentTime: function(){
				return this.time;
			}		
		}
		
		
	 	var score = "";
		var moojumper = {
			forwardMotion: 0,
			currentHeight: -40,
			highestHeight: -40,
			leftPosition: 160,
			leftAcceleration: 0,
			descending: false,
			initialize: function(){
				$("start").href="javascript:return false;";
				jumper = new Element('div', {
					'id': 'jumper' 
				});
				score = $("score");
				jumper.inject(gameInners);
				moojumper.jump();
				gametimer.initialize();
			//	moojumper.move();
			},
			draw: function(){
				if(jumper){
				 jumper.setStyles({
				 	 'left': this.leftPosition,
					 'bottom': this.currentHeight
				 });
				 	score.innerHTML = parseInt(this.highestHeight);
				 }
			},		
			jump: function(){
				 this.descending = false;
				 this.forwardMotion = 6.2;
			},	
			springJump: function(){
				 this.descending = false;
				 this.forwardMotion = 60;
			},
			shift: function(){
				
				if(keyboard.keys[37] && this.leftAcceleration >= -3.5){
					this.leftAcceleration = this.leftAcceleration - 0.50;
					if(jumper.hasClass("jumperRight")){
						jumper.removeClass("jumperRight");
					}
				}
				
				if(keyboard.keys[39] && this.leftAcceleration <= 3.5){
					this.leftAcceleration = this.leftAcceleration + 0.50;
						jumper.addClass("jumperRight");
				}
			 
				
				if(!keyboard.keys[39] && !keyboard.keys[37] || keyboard.keys[39] && keyboard.keys[37]){
					
					 
					if(this.leftAcceleration < 0 || this.leftAcceleration > 0){
					 	
					 	if(this.leftAcceleration < 0){
					 		this.leftAcceleration = this.leftAcceleration + 0.50;
					 	}
					 	else{
					 		this.leftAcceleration = this.leftAcceleration - 0.50;
					 	}
							
					}
				 
					
				}
				this.leftPosition = this.leftPosition + this.leftAcceleration;
				
				if(this.leftAcceleration < 0 && moojumper.leftPosition < -45){
					this.leftPosition = 320;
				}
				
				if(this.leftAcceleration > 0 && moojumper.leftPosition > 320){
					this.leftPosition = -45;
				}
				
				
				
			},
			decend: function(){
			      this.forwardMotion = this.forwardMotion - 0.125;
			      var fm = this.forwardMotion;
			     if(fm <= 0){
			     	 //jumper.innerHTML = this.fowardMotion;
			     	 this.descending = true;
			     	   collision.check();
			     	   this.destroyCheck();
			     	//  moojumper.jump();
			     }  
			},
			destroyCheck: function(){
				if(this.currentHeight < screener.position){
					gametimer.pause();
					screener.over();
				}
				
			},
			move: function(){
				 this.decend();
			     this.currentHeight = this.currentHeight + this.forwardMotion;
			   
			     
			     if(this.currentHeight >= 210 && this.currentHeight > this.highestHeight){
			     	screener.moveit(this.currentHeight - 210);
			     }
			     
			     if(this.currentHeight > this.highestHeight){
			     	this.highestHeight = this.currentHeight;
			     	 platform.destroy();
			     }
			     
			     this.shift()
			   
			     this.draw();
			     
			}
			
		}
		
		
		var animate = {
			frame: function(){
					moojumper.move();		
			} 
		}
		
		var collision = {
			check: function(){
				this.platform();
			},
			platform: function(){
				 
					platform.items.each(function(item, index){
						 var y = parseInt(item.getStyle("bottom"));
						 var x = parseInt(item.getStyle("left"));
						  
						if(y <= moojumper.currentHeight && y+15 >= moojumper.currentHeight && moojumper.leftPosition >= x-26 && moojumper.leftPosition <= (x+50)){	
						//	console.log(item.className);
							
							switch(item.className)
							{
							 case "standard_platform":
							   moojumper.jump();
							 break;
							 case "broken_platform":
							   item.dispose();
							   platform.items.erase(item);
							   jumper.addClass("jumberBrokeIt");
							   setTimeout(function(){
							   	 jumper.removeClass("jumberBrokeIt");
							   	
							   }, 500);
							 break;
							 case "spring_platform":
							 	moojumper.springJump();
							 	 jumper.addClass("jumperSpring");
							   	 setTimeout(function(){
							   	 jumper.removeClass("jumperSpring");
							   	
							   	  }, 1200);
							 break;
							default:
							  moojumper.jump();
							}
			 
						}
					});
				 
			}
		}
		
		
		var gameInners = "";
		var screener = {
			position: 0,
			initialize: function(){
			   gameInners = $("gameInners");
			},
			moveit: function(height){
				this.position = height;
			 
				gameInners.setStyle("top", height);
			},
			over: function(){
				
				
				jumper.set('morph', {duration: 800, transition: 'Sine:in', onComplete: function(){
				
				}});
									
				jumper.morph({bottom: parseInt(jumper.getStyle("bottom"))-1200});
				
				gameInners.set('morph', {duration: 800, transition: 'Sine:out', onComplete: function(){
					alert("Game Over: You Scored: "+$("score").innerHTML);
					window.location.reload();
				}});
									
				gameInners.morph({top: this.position-800});
		    }
				
		}
		
		
		 
		var platform = {
			items: [],
			itemsDestroy: 0,
			lastGoodPlatform: 0,
			addPlatform: function(){
				var t = rand((320-60));
				
				var platformType = rand(100);
			 	
			 	if(platformType <= 75){
				  	platformType = "standard_platform";
				  	this.lastGoodPlatform = lowestPlank;
				}
				else if(platformType > 75 && platformType <= 93){
				  	platformType = "broken_platform";
				}
				else{
					platformType = "spring_platform";
				}
				
				
				var bottom = lowestPlank;
				
				if(this.lastGoodPlatform+80 <= bottom ){
				 
					platformType = "standard_platform";
				}
				
				
				var sp = new Element('div', {
					'class': platformType, 
					'styles': {
						'left':  rand((320-60)),
						'bottom': bottom
						} 
				});
				sp.inject(gameInners);
				this.items.include(sp);
			},
			destroy: function(){
				 if(this.items[0]){
				 	if(screener.position >= parseInt(this.items[0].getStyle("bottom"))+15){
					 	 this.items[0].dispose();
					 	 this.items.erase(this.items[0]);
					 	 var randVal = 120;
					 	  if(this.itemsDestroy <= 120){
					 	 	this.itemsDestroy = this.itemsDestroy + 0.125;
					 	 	randVal = 40+this.itemsDestroy;
				  
					 	 	lowestPlank += rand((randVal))+15;
					 	 }
					 	 
					 	 this.addPlatform();
					}
				 
				 }
				//if(screener.position >= parseInt(this.items[0].getStyle("bottom"))){
				//	this.items[0].erase();
			//		platform.destroy();
				//	console.log("distroy");
			//	}
			
			 
			}
		}
		
		
		var keyboard = {
			keys: [],
			initialize: function(){ 
				keyboard.keys[37] = false;
				keyboard.keys[39] = false;
			},
			down: function(e){
			//	console.log(e.keyCode);
				var key = e.keyCode;
				//var place = this.items.indexOf(key);
				keyboard.keys[key] = true;	
			},
			up: function(e){
				var key = e.keyCode;
				keyboard.keys[key] = false;	
			}
		}
		
		function drawPlatforms(){
			for(i=0; i<=4; i++){
			    lowestPlank += rand((10))+15;
			 	platform.addPlatform();
			}
			 for(i=5; i<=20; i++){
			    lowestPlank += rand((40))+15;
			 	platform.addPlatform();
			}

			 // create an array to select words
			 var wordList = new array();
			 wordList[0] = "Hello";
			 wordList[1] = "HelloWorld";
		}
		
 	
		

function rand (n)
{
  return ( Math.floor ( Math.random ( ) * n + 1 ) );
}

	
	
	window.onkeydown = keyboard.down; 
	window.onkeyup = keyboard.up; 
	
	// iphone support! DO NOT TOUCH -- OR THE IOS WILL TAKE REVENGE WITH A BUNCH OF CREEPERS/EB????????
	window.ondevicemotion = function(event) {
			if(event.accelerationIncludingGravity.x <= -1){
				keyboard.keys[37] = true;
				keyboard.keys[39] = false;
			}
			else if(event.accelerationIncludingGravity.x >= 1){
				keyboard.keys[37] = false;
				keyboard.keys[39] = true;
			}
			else{
				keyboard.keys[37] = false;
				keyboard.keys[39] = false;
			}	
	}
	
	
 
	
	
		
		