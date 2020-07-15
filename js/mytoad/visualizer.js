var visualizer = function(game){

};

visualizer.prototype = {
    create: function(){      
	    createButtons();
	    
    	game.stage.backgroundColor = '#22566f';
    	
    	createColorBtns();
    },
    
    update: function(){
    
    }
};

function createColorBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (220 * b), 200, 'bigLogo');
    	soundButtons[b].scale.set(.5, .5);
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(changeColor, this);  
    }
}

function changeColor(){
	game.stage.backgroundColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
