var shaker = function(game){
	DEFAULT_COLOR = converToHex(colors[1]);
	FRONT_COLOR = converToHex(colors[6]);
	BACK_COLOR = converToHex(colors[0]);	

	aveAccel = 0;
	angle = 0;

	lastAccel = 0;
	lastAngle = 0;
	
	lastAction = '';

	config = { // 0.8, 0.35, 0.35, 0
		MIN_ACCEL_F: 0.8,
		MIN_ACCEL_B: 0.35, 
		MIN_ANGLE_F: 0.35, 
		MIN_ANGLE_B: 0.01, 
		VOL_FACTOR: false,
		SOUND: null
	};
};

shaker.prototype = {
    create: function(){  
    	initState(DEFAULT_COLOR);
    	
    	config.SOUND = bellSounds;

		logo = game.add.image(0, 0, 'bigLogo');		       
        logo.anchor.set(.5, .5);
        logo.x = game.world.centerX;
        logo.y = game.world.centerY - 100;

        debug_text_shaker = game.add.text(250, 850, "Shake it!", {font: '32px', fill: 'black'});
        debug_text_shaker.anchor.set(.5, .5);
        debug_text_shaker.x = game.world.centerX;

		try{window.addEventListener('deviceorientation', function(){
			angle = event.gamma;
		});} catch(e){}
			
		try{window.addEventListener('devicemotion', readAcc);} catch(e){}
		
		startGUI();
    }
};

function startGUI() {
    gui = new dat.GUI({ width: 300 });
    
    gui.add(config, 'MIN_ACCEL_F', 0, 1.6).name('min accel fwd');
    gui.add(config, 'MIN_ACCEL_B', 0, 0.7).name('min accel bck');
    gui.add(config, 'MIN_ANGLE_F', 0, 0.7).name('min angle fwd');
    gui.add(config, 'MIN_ANGLE_B', 0, 0.5).name('min angle bck');
    gui.add(config, 'VOL_FACTOR').name('Volume factor');
    //gui.add(config, 'SOUND').name('Volume factor').onFinishChange(updateKeywords);

   // if (isMobile()) gui.close();
}

function readAcc(event){
	if (game.state.getCurrentState().key == 'Shaker'){
		var aveAccel = (
			event.accelerationIncludingGravity.x + 
			event.accelerationIncludingGravity.y +
			event.accelerationIncludingGravity.z
		) / 3;
	
		if (!config.SOUND[0].isPlaying && !config.SOUND[1].isPlaying){
			if (Math.abs(lastAccel - aveAccel) > config.MIN_ACCEL_F && angle - lastAngle > config.MIN_ANGLE_F){ 
				if (lastAction != 'FRONT'){
					if (config.VOL_FACTOR) config.SOUND[0].volume = Math.abs(lastAccel - aveAccel);
					config.SOUND[0].play();
					
					flashShaker(FRONT_COLOR);
					
					lastAction = 'FRONT';
				}
			}
			
			else if(Math.abs(lastAccel - aveAccel) > config.MIN_ACCEL_B && angle - lastAngle < config.MIN_ANGLE_B){	
				if (lastAction != 'BACK'){
					if (config.VOL_FACTOR) config.SOUND[1].volume = Math.abs(lastAccel - aveAccel);
					config.SOUND[1].play();
					
					flashShaker(BACK_COLOR);
					
					lastAction = 'BACK';
				}
			}
		}

		//debug_text_shaker.text = roundIt(Math.abs(lastAccel - aveAccel));
		
		lastAngle = angle;
		lastAccel = aveAccel;
	}
}

function flashShaker(_color){
	if (_color == FRONT_COLOR){
		window.plugins.flashlight.switchOn();	
		navigator.vibrate(60);
	}
	else{
		navigator.vibrate(40);
	}
	
	game.stage.backgroundColor = _color;

	setTimeout(function(){ // back to normal
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
		game.stage.backgroundColor = DEFAULT_COLOR;
	}, 75);
}

