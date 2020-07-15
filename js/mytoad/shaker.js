var shaker = function(game){
	DEFAULT_COLOR = '#f7f7f7';
	FRONT_COLOR = '#ff00ff';
	BACK_COLOR = '#00ff00';	

	aveAccel = 0;
	angle = 0;

	lastAccel = 0;
	lastAngle = 0;

	MIN_ACCEL_F = 0.7;
	MIN_ACCEL_B = 0.4;

	MIN_ANGLE_F = 0.35;
	MIN_ANGLE_B = 0.15;
	
	lastAction = '';
};

shaker.prototype = {
    create: function(){      
		createButtons();
		
		game.stage.backgroundColor = DEFAULT_COLOR;

		logo = game.add.image(0, 0, 'bigLogo');
        logo.x = WIDTH / 2 - logo.width / 2;
        logo.y =  HEIGHT / 2 - logo.height / 2;

		backSfx = game.add.audio('back');
		frontSfx = game.add.audio('front');

		try{window.addEventListener('deviceorientation', function(){
			angle = event.gamma;
		});} catch(e){}
		
		if (game.state.getCurrentState().key == 'Shaker'){
			try{window.addEventListener('devicemotion', readAcc);} catch(e){}
		}
    }
};

function readAcc(event){
	var aveAccel = (
		event.accelerationIncludingGravity.x + 
		event.accelerationIncludingGravity.y +
		event.accelerationIncludingGravity.z
	) / 3;

	if (!frontSfx.isPlaying && !backSfx.isPlaying){
		if (Math.abs(lastAccel - aveAccel) > MIN_ACCEL_F && angle - lastAngle > MIN_ANGLE_F){ 
			if (lastAction != 'FRONT'){
				frontSfx.play();
				flashShaker(FRONT_COLOR);
				
				lastAction = 'FRONT';
			}
		}
		
		else if(Math.abs(lastAccel - aveAccel) > MIN_ACCEL_B && angle - lastAngle < MIN_ANGLE_B){	
			if (lastAction != 'BACK'){
				backSfx.play();
				flashShaker(BACK_COLOR);
				
				lastAction = 'BACK';
			}
		}
	}
	
	lastAngle = angle;
	lastAccel = aveAccel;	
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

