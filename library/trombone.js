var trombMain = function(game){
	accelY = 0;
	
	DEFAULT_COLOR_TROMB = '#0ffff0';
	SOUND1COLOR = '#ff00ff';
	SOUND2COLOR = '#00ff00';
	
	resetSfx1 = true;
	resetSfx2 = true;
	
	min_angle_1 = 5;
	min_angle_2 = 2;
};

trombMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#0ffff0';
    
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;

		sfx1 = game.add.audio('tromb_short');
		sfx2 = game.add.audio('tromb_long');

    	trombImg = game.add.image(200, 100, 'tromboneImg');

        angleText = game.add.text(300, 300, "Play it!", {font: '42px', fill: 'white'});
        
       	try{window.addEventListener('deviceorientation', readTrombAccel);} catch(e){}
    }
};

function readTrombAccel(event){
	if (game.state.getCurrentState().key == 'Trombone'){
		accelY = roundIt((event.beta + 180) / 8.5 - 15);
		angleText.text = accelY;
		
		if (accelY < min_angle_1 && resetSfx1){
			sfx1.play();
			
			resetSfx1 = false;
			
			if (sfx2.isPlaying){
				sfx2.stop();
			}
				
			navigator.vibrate(35);
		}
		
		if (accelY >= min_angle_1){
			resetSfx1 = true;
		}
		
		if (accelY < min_angle_2 && !sfx2.isPlaying && resetSfx2){
			sfx2.play();
			
			resetSfx2 = false;
			
			if (sfx1.isPlaying){
				sfx1.stop();
			}
	
			navigator.vibrate(50);
		}
		
		if (accelY >= min_angle_2){
			resetSfx2 = true;
		}
		
		if (sfx1.isPlaying){
			game.stage.backgroundColor = SOUND1COLOR;
		}
		else if(sfx2.isPlaying){
			game.stage.backgroundColor = SOUND2COLOR;
		}
		else{
			game.stage.backgroundColor = DEFAULT_COLOR_TROMB;
		}
	}
}