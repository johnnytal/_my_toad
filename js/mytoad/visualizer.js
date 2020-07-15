var visualizer = function(game){
	backgroundColors = [0xff0000, 0x10ff00, 0x1000ff];
};

visualizer.prototype = {
    create: function(){      
	    createButtons();
    	game.stage.backgroundColor = '#22566f';
    	
		logo = game.add.image(0, 0, 'bigLogo');
        logo.x = WIDTH / 2 - logo.width / 2;
        logo.y =  HEIGHT / 2 - logo.height / 2;
    	
    	createColorBtns();
    }
};

function createColorBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 200, 'logo');
    	soundButtons[b].inputEnabled = true;
    	soundButtons[b].name = b;
    	soundButtons[b].tint = backgroundColors[b];

		soundButtons[b].events.onInputDown.add(changeColor, this);  
    }
}

function changeColor(_this){
	var color = (backgroundColors[_this.name]).toString(16);
	game.stage.backgroundColor = color;
}
