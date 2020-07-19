var visher = function(game){
	GO_ANGLE = 25; // Visher angle that makes the sounds trigger
	
	HU_STATE = false;
	HA_STATE = false;
};

visher.prototype = {
    create: function(){      
		bgHot = game.add.image(0, 0, 'gradientHot');
		bgCold = game.add.image(0, 0, 'gradientCold');
		
		initState('#ffffff');

		bgHot.alpha = 0.5;
		bgCold.alpha = 0.5;

		wiper = game.add.sprite(0, 0, 'bigLogo');
		wiper.enableBody = true;
		wiper.physicsBodyType = Phaser.Physics.ARCADE;
		wiper.scale.set(1.3, 1.3);

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = game.world.centerX;
        wiper.anchor.set(.5, 1);

        debug_text_visher = game.add.text(250, 850, "Pan device right and left!", {font: '32px', fill: 'white'});
        debug_text_visher.anchor.set(.5, .5);
        debug_text_visher.x = game.world.centerX;

    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
    
    update: function(){
    	if (wiper.angle < -GO_ANGLE && !HU_STATE){ // converToHex(game.stage.backgroundColor) != converToHex(colors[9]
			haSfx.play();
			flashVisher();	
			
			HA_STATE = false;
			HU_STATE = true;
		}
    	
    	else if (wiper.angle > GO_ANGLE && !HA_STATE){    		
			huSfx.play();
			flashVisher();
			
			HA_STATE = true;
			HU_STATE = false;
		}	
    }
};

function readVisherAccel(event){
	if (game.state.getCurrentState().key == 'Visher'){
		var AccelX = event.accelerationIncludingGravity.x;
		
		wiper.angle = AccelX * 3;
		bgHot.alpha = (10 - AccelX * 0.36) / 10;
		bgCold.alpha = -(10 - AccelX * 0.36) / 10;
		
		//debug_text_visher.text = roundIt(AccelX);
	}
}

function flashVisher(){
	window.plugins.flashlight.switchOn(); //flash
	navigator.vibrate(40); //vibrate

	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}