var buttons = function(game){
	gate_mode = false; 
	soundButtons = [];
	timeOuts = [];
	notes = true;
};

buttons.prototype = {
    create: function(){      
		initState(converToHex(colors[5]));

    	game.input.addPointer();
    	game.input.addPointer();

        mode_button = this.add.image(0, 55, 'cont');
        mode_button.scale.set(.8, .8);
        mode_button.frame = 1;
        mode_button.x = WIDTH - mode_button.width - 50;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_mode, this);

        mode_button = this.add.image(0, 55, 'noteBtn');
        mode_button.scale.set(.8, .8);
        mode_button.frame = 0;
        mode_button.x = WIDTH - mode_button.width - 200;
        
        mode_button.inputEnabled = true;
        mode_button.events.onInputDown.add(toggle_note, this);
        
        buttonSounds = [note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11, note12];
    
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
    	soundButtons[b] = soundBtnsGroup.create(70 + (200 * (b%3)), 200 + (Math.floor(b/3) * 200), 'btn_sampler');
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
        soundButtons[b].events.onInputUp.add(stopSounds, this); 
    
        btn_text = game.add.text(0, 0, buttonSounds[b].key.substring(0, buttonSounds[b].key.length - 1), 
        {font: '56px', fill: 'maroon'});
        btn_text.anchor.set(.5, .5);
        btn_text.x = soundButtons[b].x + soundButtons[b].width / 2;
        btn_text.y = soundButtons[b].y + soundButtons[b].height / 2;
    }
}

function playSound(item, kb){
	var place = soundButtons.indexOf(item);
	var sprite = soundButtons[place];
	var sound = buttonSounds[place];
	
	if (sound.isPlaying) sound.stop(); 
    
    sound.play(); 
    navigator.vibrate(75);   

    sprite.tint = colors[place];
    sprite.scale.set(.97, .97);
    
	if (timeOuts[place] != null){
		clearTimeout(timeOuts[place]);
	}
    
	timeOuts[place] = setTimeout(function(){
    	 sprite.tint = 0xffffff;
    	 sprite.scale.set(1, 1);
    }, sound.durationMS);  
}

function stopSounds(item){
	if (gate_mode){
		var place = soundButtons.indexOf(item);
		var sprite = soundButtons[place];
		var sound = buttonSounds[place];

    	if (sound.isPlaying){
	        sound.stop();
	        sprite.tint = 0xffffff;
	        sprite.scale.set(1, 1);
        }  
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

function toggle_note(item){
	if (item.frame == 0){
		item.frame = 1;
	    buttonSounds = [sfx1, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx8, sfx9, sfx10, sfx11, sfx12];
	    game.stage.backgroundColor = converToHex(colors[2]);
	}	
	else{
		item.frame = 0;
	    buttonSounds = [note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11, note12];
	    game.stage.backgroundColor = converToHex(colors[5]);
	}
}