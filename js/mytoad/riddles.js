var riddles = function(game){
	riddles_solved = 0;
	
	riddle_instructions = [
		"Tap anywhere",
		"Tap the toad", 
		"Tilt Left",
		"Flash!"
	];
};

riddles.prototype = {
    create: function(){      
		initState('#557744');

        riddleText = game.add.text(250, 300, riddle_instructions[riddles_solved], {font: '32px', fill: 'white'});
        
    	window.addEventListener("devicemotion", readRiddlesAccel, true);
    },
    
    update: function(){
        if (riddles_solved == 0 && game.input.activePointer.isDown){
            levelUp();
        }
        else if (riddles_solved == 3){
        	if(window.plugins.flashlight.isSwitchedOn()){
        		levelUp();
        		setTimeout(function(){
        			window.plugins.flashlight.switchOff();
        		}, 1000);
        	}
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
	toad = game.add.image(0, 120, 'logoSprite');
	toad.scale.set(1.5, 1.5);
	toad.x = riddles_solved * toad.width;
	toad.inputEnabled = true;
	toad.events.onInputDown.add(function(){
		if (riddles_solved == 1){
			levelUp();
		}
	}, this);

    riddles_solved++;
    riddleText.text = riddle_instructions[riddles_solved];
}