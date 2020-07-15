var riddles = function(game){

};

riddles.prototype = {
    create: function(){      
		createButtons();
		game.stage.backgroundColor = '#557744';
		
        debug_text = game.add.text(250, 300, "Tap the screen", {font: '32px', fill: 'white'});
    },
    
    update: function(){
    
    }
};
