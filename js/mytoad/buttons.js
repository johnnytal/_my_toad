var buttons = function(game){
	gate_mode = false; 

	soundButtons = [];
	intervals = [];
	BPM = 120;
};

buttons.prototype = {
    create: function(){      
		initState('#ff2256');

    	game.input.addPointer();

        mode_button = this.add.image(0, 0, 'cont');
        mode_button.frame = 1;
        mode_button.y = HEIGHT - mode_button.height - 100;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);
//TODO - i could make the audio loop and make the length of each sound 125ms, and then i dont need interval and it would be syncd
	    sfx1 = game.add.audio('HE', 1);
	    sfx2 = game.add.audio('HERE', 1);
	    sfx3 = game.add.audio('K8CUK9IK', 1);
	    sfx4 = game.add.audio('K8ECR8', 1);
	    sfx5 = game.add.audio('Snare602', 1);
	    sfx6 = game.add.audio('PY', 1);
	    sfx7 = game.add.audio('SBB2', 1);
	    sfx8 = game.add.audio('SEE', 1);
	    sfx9 = game.add.audio('RAA', 1);
	    
	    sounds = [sfx1, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx8, sfx9];
	    
	    for (x = 0; x < sounds.length; x++){
	    	sounds[x].play();
	    	sounds[x].mute = true;
	    	
	    	intervals[x] = null;
	    }
	    
	    SOUND_BUTTONS_N = sounds.length;
	        	
    	createSoundBtns();
    }
};

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (200 * (b%3)), 200 + (Math.floor(b/3) * 200), 'logo');
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound2, this);
        
       /* soundButtons[b].events.onInputUp.add(function(){
            if (gate_mode) stopSounds();
        }, this); */ 
    }
}

function playSound2(item, kb){
	var place = soundButtons.indexOf(item);
	var sprite = soundButtons[place];
	var sound = sounds[place];

	if (intervals[place] != null){
		clearInterval(intervals[place]);
	}
			
	if (!gate_mode){
		if (sound.mute){
			sprite.tint = 0xe3dfff;
			sound.mute = false;
			
			intervals[place] = setInterval(function(){
				sound.play();
			}, 60000 / BPM);
		}
		else{
			sound.mute = true;
			sprite.tint = 0xffffff;
		}
	}
	else{
		sound.mute = false;
		sound.play();
		sprite.tint = 0xe3dfff;
		
        setTimeout(function(){
    		sprite.tint = 0xffffff;
    		sound.mute = true;
        }, 500);
	}
}

/*function playSound(item, kb){
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
}*/

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