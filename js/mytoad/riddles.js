var riddles = function(game){
	riddles_solved = 0;
	
	riddle_instructions = [
		"Tap anywhere",
		"Tap the toad", 
		"Tilt Left",
		"Don't tap anywhere",
		"PLACEHOLDER"
	];
};

riddles.prototype = {
    create: function(){      
		initState(converToHex(colors[7]));

        riddleText = game.add.text(250, 300, riddle_instructions[riddles_solved], {font: '32px', fill: 'black'});
        
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
	toad = game.add.image(70 + (80 * (riddles_solved%3)), 360 + (Math.floor(riddles_solved/3) * 200), 'logoSprite');
	toad.scale.set(1.5, 1.5);
	toad.inputEnabled = true;
	toad.events.onInputDown.add(function(){
		if (riddles_solved == 1){
			levelUp();
		}
	}, this);
	
	riddles_solved++;
    riddleText.text = riddle_instructions[riddles_solved];

	if (riddles_solved == 3){
		setTimeout(function(){
			levelUp();
		}, 5000);
    }
}