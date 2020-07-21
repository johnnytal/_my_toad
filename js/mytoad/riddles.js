var riddles = function(game){
	riddles_solved = 0;
	
	riddle_instructions = [
		"Tap anywhere",
		"Tap the toad", 
		"Tilt Left",
		"Don't tap anywhere",
		"Turn off the lights",
		"PLACEHOLDER",
		"Volume up",
		"4 fingers"
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
    }
};

function readRiddlesAccel(){
	if (game.state.getCurrentState().key == 'Riddles'){
		if (riddles_solved == 2 && event.accelerationIncludingGravity.x > 9){
			levelUp();
		}
	}
}

function levelUp(){
	toad = game.add.image(70 + (80 * (riddles_solved%6)), 360 + (Math.floor(riddles_solved/6) * 200), 'logoSprite');
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
    
    if (riddles_solved == 4){
	    window.plugin.lightsensor.watchReadings(function success(reading){
        	luminosity = parseInt(reading.intensity);
        	if (luminosity == 0){
        		levelUp();
     			window.plugin.lightsensor.stop();
        	}
     	});
    }
}