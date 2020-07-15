var riddles = function(game){
	riddles_solved = 0;
	
	riddle_instructions = [
		"Tap the screen",
		"Tap the toad",
		"Tilt Right"
	];
};

riddles.prototype = {
    create: function(){      
		createButtons();
		game.stage.backgroundColor = '#557744';
		
        riddleText = game.add.text(250, 300, riddle_instructions[riddles_solved], {font: '32px', fill: 'white'});
    },
    
    update: function(){
        if (riddles_solved == 0 && game.input.activePointer.isDown){
            levelUp();
        }
    }
};

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