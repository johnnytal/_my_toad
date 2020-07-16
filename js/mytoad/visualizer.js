var visualizer = function(game){
	backgroundColors = [0xff0000, 0x10ff00, 0x1000ff];
};

visualizer.prototype = {
    create: function(){      
		initState('#ff0000');

		middleLogo = game.add.image(0, 0, 'bigLogo');
		middleLogo.anchor.set(.5, .5);
        middleLogo.x = game.world.centerX;
        middleLogo.y = game.world.centerY;
    	
    	createColorBtns();
    	
    	if (isMobile()){
    		startMic();
    	}
    	else{
			setTimeout(function(){
				getDevices();
			}, 500);
    	}
    }
};

function createColorBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < backgroundColors.length; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 200, 'logo');
    	soundButtons[b].inputEnabled = true;
    	soundButtons[b].name = b;
    	soundButtons[b].tint = backgroundColors[b];

		soundButtons[b].events.onInputDown.add(changeColor, this);  
    }
}

function changeColor(_this){
	var color = (backgroundColors[_this.name]).toString(16);
	game.stage.backgroundColor = color;
}

function startMic(){
	try{
		window.audioinput.checkMicrophonePermission(function(hasPermission) {
			if (hasPermission){
				webaudio_tooling_obj();
			}
		    else{
		        window.audioinput.getMicrophonePermission(function(hasPermission, message) {
		        	if (hasPermission) {
						webaudio_tooling_obj();		
		        	}
		        	else{
		        		alert('Microphone permission needed for app to work!');
		        	}
		        });
		    }
		});
	} catch(e){
		alert('Please give microphone permission via Settings > Apps ' + e);
	}	

    try{
        window.plugins.insomnia.keepAwake();
    } catch(e){}   
}

function webaudio_tooling_obj(){
	if (!navigator.getUserMedia){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }

    if (navigator.getUserMedia){
        navigator.getUserMedia({audio:true}, 
            function(stream) {
                start_stream(stream);
            },
            function(e) {
                alert(e);
            }
        );
    } else { alert('getUserMedia not supported in this browser'); }
}

function ascendLogos(StartX, startY){
	logoAscend = game.add.sprite(StartX + 100, HEIGHT - startY, 'logoSprite');
	logoAscend.scale.set(averageValue / 10, averageValue / 10);
	logoAscend.tint = 0xffffff * (largestFreq / 100);
	logoAscend.alpha = 0.6;

    tween = game.add.tween(logoAscend).to( { alpha: 0 }, 350, "Linear", true);
    tween.onComplete.add(function(){ logoAscend.destroy; }, this);
}
