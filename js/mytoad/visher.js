var visher = function(game){
	GO_ANGLE = 25; // the visher angle to make the sounds trigger
	
	HU_COLOR = '#ff00ff';
	HA_COLOR = '#f0ff0f';
};

visher.prototype = {
    create: function(){      
		createButtons();
		game.stage.backgroundColor = '#ff4502';

		wiper = game.add.sprite(0, 0, 'bigLogo'); // the wiper image is mostly for debugging purposses
		wiper.enableBody = true;
		wiper.physicsBodyType = Phaser.Physics.ARCADE;
		wiper.scale.set(1.3, 1.3);

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = WIDTH - wiper.width;
        wiper.anchor.set(.5, 1);

        debug_text = game.add.text(250, 800, "Vish it!", {font: '32px', fill: 'white'});
        
    	huSfx = game.add.audio('hu', 1);
		haSfx = game.add.audio('ha', 1);

    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
    
    update: function(){
    	if (wiper.angle < -GO_ANGLE && game.stage.backgroundColor != 16711935){
			haSfx.play();
			flashVisher(HU_COLOR);	
		}
    	
    	else if (wiper.angle > GO_ANGLE && game.stage.backgroundColor != 15793935){    		
			huSfx.play();
			flashVisher(HA_COLOR);
		}	
    }
};

function readVisherAccel(event){
	if (game.state.getCurrentState().key == 'Visher'){
		wiper.angle = event.accelerationIncludingGravity.x * 3;
		debug_text.text = Math.round(event.accelerationIncludingGravity.x * 100) / 100;
	}
}

function flashVisher(_color){
	window.plugins.flashlight.switchOn(); //flash
	navigator.vibrate(35); //vibrate
	game.stage.backgroundColor = _color; //change color
	
	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}
