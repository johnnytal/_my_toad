var visher = function(game){
	GO_ANGLE = 25; // Visher angle that makes the sounds trigger
	
	HU_COLOR = converToHex(colors[9]);
	HA_COLOR = converToHex(colors[11]);
};

visher.prototype = {
    create: function(){      
		initState(converToHex(colors[2]));

		wiper = game.add.sprite(0, 0, 'bigLogo');
		wiper.enableBody = true;
		wiper.physicsBodyType = Phaser.Physics.ARCADE;
		wiper.scale.set(1.3, 1.3);

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = game.world.centerX;
        wiper.anchor.set(.5, 1);

        debug_text_visher = game.add.text(250, 850, "Vish it!", {font: '32px', fill: 'white'});

    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
    
    update: function(){
    	if (wiper.angle < -GO_ANGLE && converToHex(game.stage.backgroundColor) != converToHex(colors[9])){
			haSfx.play();
			flashVisher(HU_COLOR);	
			debug_text_visher.text = 'HU!';
		}
    	
    	else if (wiper.angle > GO_ANGLE && converToHex(game.stage.backgroundColor) != converToHex(colors[11])){    		
			huSfx.play();
			flashVisher(HA_COLOR);
			debug_text_visher.text = 'HA!';
		}	
    }
};

function readVisherAccel(event){
	if (game.state.getCurrentState().key == 'Visher'){
		var AccelX = event.accelerationIncludingGravity.x;
		
		wiper.angle = AccelX * 3;
		debug_text_visher.text = roundIt(AccelX);
	}
}

function flashVisher(_color){
	window.plugins.flashlight.switchOn(); //flash
	navigator.vibrate(40); //vibrate
	game.stage.backgroundColor = _color; //change color

	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}
