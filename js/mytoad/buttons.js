var buttons = function(game){
	SOUND_BUTTONS_N = 3;
	
	gate_mode = false; 
	stop_mode = true;
	soundButtons = [];
};

buttons.prototype = {
    create: function(){      
		createButtons();
    	game.stage.backgroundColor = '#ff2256';
    	
    	createSoundBtns();

    	game.input.addPointer();

        mode_button = this.add.image(0, 0, 'cont');
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height - 100;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);

	    sfx1 = game.add.audio('note1', 1);
	    sfx2 = game.add.audio('note2', 1);
	    sfx3 = game.add.audio('note3', 1);
	    
	    sounds = [sfx1, sfx2, sfx3];
    }
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 200, 'logo');
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
	var sound = sounds[place];

    if (!sound.isPlaying){
        if (!sound.paused){
            sound.play();  
            navigator.vibrate(200);  
        }
        else{
            sound.resume();
        }
		
		sprite.frame = 1;
        sprite.tint = 0xe3dfff;
        
        sound.onStop.add(function(){
           sprite.frame = 0;
           sprite.tint = 0xffffff;
        }, this);
    }
    
    else{
    	if (stop_mode){
        	sound.stop();
        }
    }    
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