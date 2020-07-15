var flasher = function(game){
	btn_keys = ['btn_Flasher', 'btn_Visualizer', 'btn_Buttons', 'btn_Shaker', 'btn_Visher', 'btn_Riddles'];
	CHOSEN_TINT = 0xff00ff;
	state = btn_keys[0].slice(4);
	
	flash_on = false;
	flicker_on = false;
	
	flickingRate = 500;
	MAX_RATE = 3000;
	MIN_RATE = 100;
	
	syncing_vib = false;
	
	flicker_interval = null;
};

flasher.prototype = {
    create: function(){  
    	createButtons();
    	
    	game.stage.backgroundColor = '#f7f7f7';
		
		btn_light = game.add.sprite(300, 200, 'lightBtn');
	    btn_light.inputEnabled = true;
	    btn_light.events.onInputDown.add(flash, this);
		    
		btn_vibrate = game.add.sprite(300, 700, 'vibrateBtn');
		btn_vibrate.inputEnabled = true;
		btn_vibrate.events.onInputDown.add(vibrator, this);
		btn_vibrate.events.onInputUp.add(function(){
			stopVibrate();
		}, this);
		    
		syncVibBtn = game.add.sprite(btn_vibrate.x - 250, 700, 'syncVib');
		syncVibBtn.inputEnabled = true;
		syncVibBtn.events.onInputDown.add(syncVibrator, this);
		
		flickerBtn = game.add.sprite(100, 200, 'flickerBtn');
		flickerBtn.inputEnabled = true;
		flickerBtn.events.onInputDown.add(flicker, this);

		rateText = game.add.text(flickerBtn.x + 45, flickerBtn.y + 185, flickingRate, {
            font: '28px', fill: 'blue', fontWeight: 'bold', align: 'center'
        });
  		    
		btn_ms_up = game.add.sprite(flickerBtn.x + 40, flickerBtn.y + 105, 'blue_sliderUp');
		btn_ms_up.inputEnabled = true;
		btn_ms_up.scale.set(1.75, 1.75);
		btn_ms_up.events.onInputDown.add(change_flicker, this);
		btn_ms_up.events.onInputUp.add(function(){
			btn_ms_up.tint = 0xffffff;
		}, this);
		
		btn_ms_down = game.add.sprite(flickerBtn.x + 40,  flickerBtn.y + 225, 'blue_sliderDown');
		btn_ms_down.inputEnabled = true;
		btn_ms_down.scale.set(1.75, 1.75);
		btn_ms_down.events.onInputDown.add(change_flicker, this);
		btn_ms_down.events.onInputUp.add(function(){
			btn_ms_down.tint = 0xffffff;
		}, this);
    }
};

function syncVibrator(_this){
	if (!syncing_vib){
		_this.tint = CHOSEN_TINT;
		syncing_vib = true;
	}
	else{
		_this.tint = 0xffffff;
		syncing_vib = false;
	}
}

function change_flicker(_this){
	if (_this.key == 'blue_sliderUp'){
		if (flickingRate < MAX_RATE) flickingRate += MIN_RATE;
		else{ flickingRate = MIN_RATE; }
	}
	else{
		if (flickingRate > MIN_RATE) flickingRate -= MIN_RATE;
		else{ flickingRate = MAX_RATE; }
	}

	rateText.text = flickingRate;
	_this.tint = CHOSEN_TINT;
	
	start_flicking();
}

function flash(_this){
	if (!flash_on){
		_this.tint = CHOSEN_TINT;

		if (isMobile()){
			window.plugins.flashlight.switchOn();
		}
		
		flash_on = true;
		
		if (flicker_on) start_flicking();
	}
	else{
		_this.tint = 0xffffff;

		if (isMobile()){
			window.plugins.flashlight.switchOff();
		}
		
		flash_on = false;
		
		if (flicker_on) resetFlickerTimer();
	}
}

function flicker(_this){
	if (!flicker_on){
		_this.tint = CHOSEN_TINT;
		flicker_on = true;
	}
	else{
		_this.tint = 0xffffff;
		flicker_on = false;		
		
		resetFlickerTimer();
	}
	
	if (flash_on && flicker_on){
		start_flicking();
	}
}

function start_flicking(){
	resetFlickerTimer();
	
	flicker_interval = setInterval(function(){
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
			if (syncing_vib) navigator.vibrate(0);
		}
		else{
			window.plugins.flashlight.switchOn();
			if (syncing_vib) navigator.vibrate(flickingRate);
		}
	}, flickingRate);
}

function vibrator(_this){
	_this.tint = CHOSEN_TINT;	
	
	if (!syncing_vib){
		navigator.vibrate(120000);
	}
}

function stopVibrate(){
	btn_vibrate.tint = 0xffffff;
	navigator.vibrate(0);	
}

function resetFlickerTimer(){
	if (flicker_interval != null){
		clearInterval(flicker_interval);
		flicker_interval = null;
	}
}

function createButtons(){
    buttons = game.add.group();
    
    for (n = 0; n < btn_keys.length; n++){
    	btn = buttons.create(n % 3 * WIDTH / 3, 0, btn_keys[n]);
    	if (n > 2) btn.y = btn.height;
    	
        btn.inputEnabled = true;
	    btn.events.onInputDown.add(goToState, this);
 
	    if (btn_keys[n].slice(4) == state){
	    	btn.tint = CHOSEN_TINT;
	    }
    }
}

function goToState(_this){
	state = _this.key.slice(4);
    game.state.start(state);
}

function isMobile(){
    return /Mobi|Android/i.test(navigator.userAgent);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // change device media volume to maximum
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}