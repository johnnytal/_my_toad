var buttons = function(game){
	gate_mode = false; 
	soundButtons = [];
	timeOuts = [];	
};

buttons.prototype = {
    create: function(){      
		initState(converToHex(colors[7]));

    	game.input.addPointer();
    	game.input.addPointer();

        mode_button = this.add.image(0, 0, 'cont');
        mode_button.frame = 1;
        mode_button.y = 60;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);

	    buttonSounds = [sfx1, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx8, sfx9, sfx10, sfx11, sfx12];
	    
	    for (x = 0; x < buttonSounds.length; x++){
	    	timeOuts[x] = null;
	    }
	    
	    SOUND_BUTTONS_N = buttonSounds.length;
	        	
    	createSoundBtns();
    }
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(70 + (200 * (b%3)), 200 + (Math.floor(b/3) * 200), 'logo');
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
        
        soundButtons[b].events.onInputUp.add(function(){
            if (gate_mode) stopSounds();
        }, this); 
    }
}

function playSound(item, kb){
	var place = soundButtons.indexOf(item);
	var sprite = soundButtons[place];
	var sound = buttonSounds[place];
	
	if (sound.isPlaying) sound.stop(); 
    sound.play();  

    sprite.tint = colors[place];
    
	if (timeOuts[place] != null){
		clearTimeout(timeOuts[place]);
	}
    
	timeOuts[place] = setTimeout(function(){
    	 sprite.tint = 0xffffff;
    }, sound.durationMS);  
    
    navigator.vibrate(125);  
}

function stopSounds(){
    for (n = 0; n < sounds.length; n++){
        sounds[n].stop();
    }   
}

function toggle_mode(item){
	if (item.frame == 0){
		item.frame = 1;
		gate_mode = false;
	}	
	else{
		item.frame = 0;
		gate_mode = true;
	}
}