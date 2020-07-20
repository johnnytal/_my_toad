var visualizer = function(game){
	N_OF_COLOR_BTNS = 3;
};

visualizer.prototype = {
    create: function(){      
		initState(converToHex(colors[0]));

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
	        
    for(b = 0; b < N_OF_COLOR_BTNS; b++){
    	soundButtons[b] = soundBtnsGroup.create(60 + (220 * b), 200, 'logo');
    	soundButtons[b].inputEnabled = true;
    	soundButtons[b].name = b;
    	soundButtons[b].tint = colors[b];

		soundButtons[b].events.onInputDown.add(changeColor, this);  
    }
}

function changeColor(_this){
	game.stage.backgroundColor = converToHex(colors[_this.name]);
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
	logoAscend = game.add.sprite(StartX + 60, HEIGHT - startY, 'light_web');
	logoAscend.scale.set(averageValue / 7, averageValue / 7);
	logoAscend.tint = 0xffffff * (largestFreq / 100);
	logoAscend.alpha = 1;
	
	game.add.tween(logoAscend).to( { alpha: 0 }, 1600, "Linear", true);
	
	tween = game.add.tween(logoAscend).to( { y: -50 }, 3200, "Linear", true);
    tween.onComplete.add(function(){ logoAscend.destroy; }, this);
}
