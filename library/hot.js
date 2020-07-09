var gameMain = function(game){
	notChosen = true;
	BUTTON_FACTOR = -135; // how far the user has to drag the orange choose_button to make a choice

	QUESTION = "What's your\nfavorite color?";
};

gameMain.prototype = {
    create: function(){	
    	game.stage.backgroundColor = '#000040';
    	
    	notChosen = true;
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;

        option1Img = this.add.image(0, 0, 'red');
        option1Img.anchor.set(.5,.5);
        option1Img.x = option1Img.width - 40;
    	option1Img.y = game.world.centerY - option1Img.height / 2 + 25;

        option2Img = this.add.image(0, 0, 'blue');
        option2Img.anchor.set(.5,.5);
        option2Img.x = WIDTH - option2Img.width + 40;
    	option2Img.y = game.world.centerY - option2Img.height / 2 + 25;

        choose_button = this.add.sprite(0, 0, 'button');
        choose_button.x = WIDTH / 2 - choose_button.width / 2;
        choose_button.y = HEIGHT / 2 + 15;

        choose_button.events.onInputDown.add(function(){
        	game.add.tween(drag).to( { alpha: 0 }, 800, "Linear", true);
        }, this);  
        choose_button.events.onInputUp.add(function(){
        	game.add.tween(drag).to( { alpha: 0.6 }, 800, "Linear", true);
        }, this);  

	    choose_button.inputEnabled = true;
	    choose_button.input.enableDrag();
	    choose_button.input.allowVerticalDrag = false;
	    game.physics.enable( choose_button, Phaser.Physics.ARCADE);
	    
	    drag = this.add.image(0, 0, 'drag');
	    drag.alpha = 0.6;
        drag.x = WIDTH / 2 - drag.width / 2;
        drag.y = choose_button.y + drag.height / 2;

	    swipe_r = this.add.image(0, 0, 'swipe_r');
        swipe_r.x = WIDTH / 2 - swipe_r.width / 2 + 175;
        swipe_r.y = choose_button.y + choose_button.height / 6;
        swipe_r.alpha = 0.5;

	    swipe_l = this.add.image(0, 0, 'swipe_l');
        swipe_l.x = WIDTH / 2 - swipe_r.width / 2 - 175;
        swipe_l.y = choose_button.y + choose_button.height / 6;
        swipe_l.alpha = 0.5;

        tweenL = game.add.tween(swipe_l).to( { alpha: 0.8 }, 800, "Linear", true, 0, -1);
    	tweenL.yoyo(true, 40);
        tweenR = game.add.tween(swipe_r).to( { alpha: 0.8 }, 800, "Linear", true, 0, -1);
    	tweenR.yoyo(true, 40);
    	
  		questionText = game.add.text(0, 0, QUESTION, {font: '32px', fill: 'yellow', align:'center', fontWeight:'bold'});
		questionText.x = game.world.centerX - questionText.width / 2;
		questionText.y = questionText.height / 2;

    	elements = [option1Img, option2Img, choose_button, drag, swipe_l, swipe_r];
    },
    update: function(){
    	if (notChosen){
	    	if (choose_button.x < -BUTTON_FACTOR){ // choose left
	    		choose(option1Img);	
	    	}
	    	else if (choose_button.x > (WIDTH - choose_button.width) + BUTTON_FACTOR){ // choose right
	    		choose(option2Img);
	    	}
	    	
	    	if (game.input.activePointer.isUp){ // user lift his finger before reaching the spot
	    		choose_button.x = WIDTH / 2 - choose_button.width / 2;
	    	}
    	}
    }
};

function choose(_what){
	if (game.state.getCurrentState().key == 'Hot'){
		notChosen = false;
		choose_button.inputEnabled = false;
		
		questionText.font = '22px';
		questionText.text = 'You chose ' +  _what.key + ',\nThanks for your vote!\n\nTap screen to try again';
		questionText.x = game.world.centerX - questionText.width / 2;
	
		setTimeout(function(){
			game.add.tween(_what.scale).to({ x: 8, y: 8}, 1000, "Linear", true);
			
			for(n=0; n<elements.length; n++){
				if (elements[n] != _what){
					FOtween = game.add.tween(elements[n]).to( { alpha: 0 }, 500, "Linear", true);
				}
			}
			
			tweenL.stop();
			tweenR.stop();
			
			FOtween.onComplete.add(function(){
				setTimeout(function(){
					_what.inputEnabled = true;
					_what.events.onInputDown.add(function(){
			        	game.state.start("Hot");
			        }, this);  
				}, 1000);
			}, this);
		}, 200);
	}
}