var shaker = function(game){
	DEFAULT_COLOR = '#f7f7f7';
	FRONT_COLOR = '#ff00ff';
	BACK_COLOR = '#00ff00';	

	aveAccel = 0;
	angle = 0;

	lastAccel = 0;
	lastAngle = 0;

	MIN_ACCEL_F = 0.8;
	MIN_ACCEL_B = 0.35;

	MIN_ANGLE_F = 0.35;
	MIN_ANGLE_B = 0;
	
	lastAction = '';
};

shaker.prototype = {
    create: function(){  
    	initState(converToHex(colors[8]));

		logo = game.add.image(0, 0, 'bigLogo');		       
        logo.anchor.set(.5, .5);
        logo.x = game.world.centerX;
        logo.y = game.world.centerY - 100;

        debug_text_shaker = game.add.text(250, 850, "Shake it!", {font: '32px', fill: 'black'});

		try{window.addEventListener('deviceorientation', function(){
			angle = event.gamma;
		});} catch(e){}
			
		try{window.addEventListener('devicemotion', readAcc);} catch(e){}
    }
};

function readAcc(event){
	if (game.state.getCurrentState().key == 'Shaker'){
		var aveAccel = (
			event.accelerationIncludingGravity.x + 
			event.accelerationIncludingGravity.y +
			event.accelerationIncludingGravity.z
		) / 3;
	
		//if (!frontSfx.isPlaying && !backSfx.isPlaying){
			if (Math.abs(lastAccel - aveAccel) > MIN_ACCEL_F && angle - lastAngle > MIN_ANGLE_F){ 
				if (lastAction != 'FRONT'){
					frontSfx.play();
					frontSfx.volume = Math.abs(lastAccel - aveAccel) + 0.15;
					flashShaker(FRONT_COLOR);
					
					lastAction = 'FRONT';
				}
			}
			
			else if(Math.abs(lastAccel - aveAccel) > MIN_ACCEL_B && angle - lastAngle < MIN_ANGLE_B){	
				if (lastAction != 'BACK'){
					backSfx.play();
					backSfx.volume = Math.abs(lastAccel - aveAccel) + 0.15;
					flashShaker(BACK_COLOR);
					
					lastAction = 'BACK';
				}
			}
		//}

		lastAngle = angle;
		lastAccel = aveAccel;	
		
		debug_text_shaker.text = roundIt(Math.abs(lastAccel - aveAccel) + 0.15);
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
	}, 60);
}

