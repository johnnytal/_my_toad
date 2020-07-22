var riddles = function(game){
	riddles_solved = 0;
	
	riddle_instructions = [
		"Tap anywhere",
		"Tap the toad", 
		"Tilt Left",
		"Don't tap anywhere",
		"Turn on the lights",
		"Three fingers",
		"Upside Down",
		"You Win!"
	];
	
	rndBck = 0;
};

riddles.prototype = {
    create: function(){    
    	riddles_solved = 0;
    	
    	rndBck = game.rnd.integerInRange(0, colors.length-1);
		initState(converToHex(colors[rndBck]));

        riddleText = game.add.text(250, 250, riddle_instructions[riddles_solved], {font: '36px', fill: 'black'});
        riddleText.anchor.set(.5, .5);
        riddleText.x = game.world.centerX;

    	window.addEventListener("devicemotion", readRiddlesAccel, true);
    },
    
    update: function(){
        if (riddles_solved == 0 && game.input.activePointer.isDown){
            levelUp();
        }
	    if (riddles_solved == 5 && game.input.pointer1.isDown && game.input.pointer2.isDown && game.input.pointer3.isDown){
			levelUp();
	    }
    }
};

function readRiddlesAccel(){
	if (game.state.getCurrentState().key == 'Riddles'){
		if (riddles_solved == 2 && event.accelerationIncludingGravity.x > 9){
			levelUp();
		}
		else if (riddles_solved == 6 && event.accelerationIncludingGravity.y < -8){
			levelUp();
		}
	}
}

function levelUp(){
	toad = game.add.image(70 + (80 * (riddles_solved % 7)), 360 + (Math.floor(riddles_solved / 7) * 200), 'logoSprite');
	toad.scale.set(1.5, 1.5);
	toad.inputEnabled = true;
	toad.events.onInputDown.add(function(){
		if (riddles_solved == 1){
			levelUp();
		}
	}, this);
	
	riddles_solved++;
    riddleText.text = riddle_instructions[riddles_solved];
    
    rndBck = (rndBck + 1) % 11;
    game.stage.backgroundColor = converToHex(colors[rndBck]);

	if (riddles_solved == 3){
		riddleTimer = setTimeout(function(){
			levelUp();
		}, 5000);
    }
    
    else if (riddles_solved == 4){
    	var first_lum = -1;
    	var luminosity = -1;
	    
	    window.plugin.lightsensor.watchReadings(function success(reading){
        	luminosity = parseInt(reading.intensity);
        	
        	if (first_lum < 0) first_lum = luminosity;
        	
        	if (first_lum > -1 && luminosity > first_lum + 1000){
        		levelUp();
     			window.plugin.lightsensor.stop();
        	}	
     	});
    }
    
    else if (riddles_solved == 5){
	    game.input.addPointer();
	    game.input.addPointer();
	    game.input.addPointer();
    }
    
    else if (riddles_solved == 6){
		riddleText.angle = 180;
    }
    
    else if (riddles_solved == 7){
		riddleText.angle = 0;
		sound_logo.play();
    }  
}