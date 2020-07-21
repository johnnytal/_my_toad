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
		
		bg.visible = false;
			
		fun = game.add.image(-250, 300, 'fun');
		toad = game.add.image(WIDTH + 250, 300, 'toad');
		
		bgHot.alpha = 0.5;
		bgCold.alpha = 0.5;
		
    	game.input.addPointer();
    	game.input.addPointer();

		wiper = game.add.sprite(0, 0, 'bigLogo');
		wiper.enableBody = true;
		wiper.physicsBodyType = Phaser.Physics.ARCADE;
		wiper.scale.set(1.3, 1.3);

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = game.world.centerX;
        wiper.anchor.set(.5, 1);

        debug_text_visher = game.add.text(250, 850, 
    	"Pan device right and left,\nTap to create Rain!", {font: '36px', fill: 'white', align: 'center'});
        debug_text_visher.anchor.set(.5, .5);
        debug_text_visher.x = game.world.centerX;

    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
    
    update: function(){
        if (game.input.activePointer.isDown){
            duration = game.input.activePointer.duration;

            yAxis = game.input.activePointer.y;
            xAxis = game.input.activePointer.x;
            
            drawRipple(xAxis, yAxis);
        }
			
			
    	if (wiper.angle < -GO_ANGLE && !HU_STATE){ // converToHex(game.stage.backgroundColor) != converToHex(colors[9]
			haSfx.play();
			flashVisher();	
			
			game.add.tween(toad).to({x: 500}, 350, "Cubic", true);	
			game.add.tween(fun).to({x: -250}, 350, "Cubic", true);

			HA_STATE = false;
			HU_STATE = true;
		}
    	
    	else if (wiper.angle > GO_ANGLE && !HA_STATE){    		
			huSfx.play();
			flashVisher();
			
			game.add.tween(toad).to({x: WIDTH + 250}, 350, "Cubic", true);	
			game.add.tween(fun).to({x: 50}, 350, "Cubic", true);

			HA_STATE = true;
			HU_STATE = false;
		}	
    }
};

function drawRipple(_xAxis, _yAxis){
    ripplesGroup = game.add.group();
	    
    ripple = ripplesGroup.create(_xAxis, _yAxis, 'drop');
    ripple.anchor.setTo(0.5);
    ripple.tint = colors[game.rnd.integerInRange(0, colors.length-1)];
    ripple.alpha = game.rnd.integerInRange(0, 10) / 10;

	game.physics.enable(ripple, Phaser.Physics.ARCADE);
	ripple.body.velocity.y = duration / 9;

    game.add.tween(ripple.scale).to({x: duration / 350, y: duration / 350}, Math.cos(duration) * 16000, "Cubic", true);
    game.add.tween(ripple).to({alpha: 0}, Math.cos(duration) * 16000, "Cubic", true).onComplete.add(function(ripple){   
        ripple.destroy();  
    },this);
    
    if (debug_text_visher.alpha == 1){
    	game.add.tween(debug_text_visher).to({alpha: 0}, 2000, "Cubic", true);
    }
}

function readVisherAccel(event){
	if (game.state.getCurrentState().key == 'Visher'){
		var AccelX = event.accelerationIncludingGravity.x;
		
		wiper.angle = AccelX * 3;
		
		var alphaVal = (AccelX + 10) / 20;
		if (alphaVal < 0) alphaVal = 0;
		else if (alphaVal > 1) alphaVal = 1;
		
		bgHot.alpha = alphaVal;
		bgCold.alpha = 1 - alphaVal;
		
		try{
		    ripplesGroup.forEach(function(item) {
				item.body.velocity.x = -AccelX * 24;
				item.angle = AccelX * 10;
		    });
		}catch(e){}
	}
}

function flashVisher(){
	window.plugins.flashlight.switchOn(); //flash
	navigator.vibrate(40); //vibrate

	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}