var flasher = function(game){
	btn_keys = ['btn_Flasher', 'btn_Visualizer', 'btn_Buttons', 'btn_Shaker', 'btn_Visher', 'btn_Riddles'];
	CHOSEN_TINT = colors[1];
	state = null;
	
	flash_on = false;
	flicker_on = false;
	
	flickingRate = 500;
	MAX_RATE = 3000;
	MIN_RATE = 100;
	
	syncing_vib = false;
	
	flicker_interval = null;
	
	chosenPattern = null;
	patternNote = 0;
	
	patterns = [
		pattern1 = [500, 500, 250, 250, 500, 250, 250, 250, 500, 250, 500],
		pattern2 = [300, 900, 300, 900, 300, 300, 300, 300, 300, 900, 150, 150,
		 900, 150, 150, 300, 600, 150, 150, 300, 300, 300, 300, 900],
		pattern3 = [200, 600, 200, 600, 200, 200, 200, 200, 200, 600]
	];
};

flasher.prototype = {
    create: function(){ 
    	state = btn_keys[0].slice(4); 
    	sound_logo.play();
    	
    	initState(converToHex(colors[6]));
    	
    	game.add.image(0,  HEIGHT / 2 + 35, 'seperator').scale.set(4, 2);
    	
    	patternBtns = game.add.group();
    	
    	for(x = 0; x < 3; x++){
    		btnPattern = patternBtns.create(335 + x * 132, 25, 'btn_pattern');
    		btnPattern.scale.set(.67, .67);
	    	btnPattern.name = x;
		    btnPattern.inputEnabled = true;
	    	btnPattern.events.onInputDown.add(changePattern, this);	
	    	
	        var btn_text = game.add.text(0, 0, btnPattern.name + 1, {font: '38px', fill: 'white'});
	        btn_text.anchor.set(.5, .5);
	        btn_text.x = btnPattern.x + btnPattern.width / 2;
	        btn_text.y = btnPattern.y + btnPattern.height / 2 + 2;
		}
		
		btn_light = game.add.sprite(400, 310, 'lightBtn');
	    btn_light.inputEnabled = true;
	    btn_light.events.onInputDown.add(flash, this);
		    
		btn_vibrate = game.add.sprite(400, 730, 'vibrateBtn');
		btn_vibrate.inputEnabled = true;
		btn_vibrate.events.onInputDown.add(vibrator, this);
		btn_vibrate.events.onInputUp.add(function(){
			stopVibrate();
		}, this);
		    
		syncVibBtn = game.add.sprite(btn_vibrate.x - 375, 800, 'syncVib');
		syncVibBtn.scale.set(1.2, 1.2);
		syncVibBtn.inputEnabled = true;
		syncVibBtn.events.onInputDown.add(syncVibrator, this);
		
		flickerBtn = game.add.sprite(420, 200, 'flickerBtn');
		flickerBtn.scale.set(1.6, 1.4);
		flickerBtn.inputEnabled = true;
		flickerBtn.events.onInputDown.add(flicker, this);

		rateText = game.add.text(100, 400, 'Rate: ' + flickingRate + 'ms', {
            font: '37px', fill: 'blue', fontWeight: 'bold', align: 'center'
        });
  		    
		btn_ms_up = game.add.sprite(rateText.x + 40, rateText.y - 155, 'blue_sliderUp');
		btn_ms_up.inputEnabled = true;
		btn_ms_up.scale.set(3.2, 3.2);
		btn_ms_up.events.onInputDown.add(change_flicker, this);
		btn_ms_up.events.onInputUp.add(function(){
			btn_ms_up.tint = 0xffffff;
		}, this);
		
		btn_ms_down = game.add.sprite(rateText.x + 40,  rateText.y + 65, 'blue_sliderDown');
		btn_ms_down.inputEnabled = true;
		btn_ms_down.scale.set(3.2, 3.2);
		btn_ms_down.events.onInputDown.add(change_flicker, this);
		btn_ms_down.events.onInputUp.add(function(){
			btn_ms_down.tint = 0xffffff;
		}, this);	
		
		    
    	btn_keys[0].slice(4).tint = CHOSEN_TINT;
	    
    }
};

function change_flicker(_this){
	if (_this.key == 'blue_sliderUp'){
		if (flickingRate < MAX_RATE) flickingRate += MIN_RATE;
		else{ flickingRate = MIN_RATE; }
	}
	else{
		if (flickingRate > MIN_RATE) flickingRate -= MIN_RATE;
		else{ flickingRate = MAX_RATE; }
	}

	rateText.text = "Rate: " + flickingRate + 'ms';
	_this.tint = CHOSEN_TINT;

	start_flicking();
	
	click1.play();
}

function flash(_this){
	if (!flash_on){
		_this.tint = CHOSEN_TINT;

		if (isMobile()){
			window.plugins.flashlight.switchOn();
		}
		
		flash_on = true;
		
		start_flicking();
	}
	else{
		if (isMobile()){
			window.plugins.flashlight.switchOff();
		}

		if (flicker_on) resetFlickerTimer();
	
		_this.tint = 0xffffff;
		flickerBtn.tint = 0xffffff;
		
		flash_on = false;
		flicker_on = false;
	}
	
	click2.play();
}

function flicker(_this){
	if (!flicker_on){
		_this.tint = CHOSEN_TINT;
		
		flash_on = true;
		btn_light.tint = CHOSEN_TINT;
		start_flicking();
		
		flicker_on = true;
	}
	else{
		_this.tint = 0xffffff;

		flicker_on = false;		
		
		resetFlickerTimer();
	}
	
	start_flicking();
	click2.play();
}

function start_flicking(){
	if (flash_on && flicker_on && isMobile()){
		resetFlickerTimer();
		
		flicker_interval = setInterval(function(){
			if (window.plugins.flashlight.isSwitchedOn()){
				window.plugins.flashlight.switchOff();
				if (syncing_vib) navigator.vibrate(0);
			}
			else{
				window.plugins.flashlight.switchOn();
				if (syncing_vib) navigator.vibrate(flickingRate);
				game.camera.flash(0xffffff, flickingRate);
			}
		}, flickingRate);
	}
}

function vibrator(_this){
	_this.tint = CHOSEN_TINT;	
	
	if (!syncing_vib){
		navigator.vibrate(120000);
	}
	
	click3.play();
}

function syncVibrator(_this){
	if (!syncing_vib){
		_this.tint = CHOSEN_TINT;
		syncing_vib = true;
		
		btn_vibrate.tint = 0x777777;
		btn_vibrate.inputEnabled = false;
	}
	else{
		_this.tint = 0xffffff;
		syncing_vib = false;
		
		btn_vibrate.tint = 0xffffff;
		btn_vibrate.inputEnabled = true;
	}
	
	click3.play();
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

function changePattern(_this){	
    patternBtns.forEach(function(item) {
		item.tint = 0xffffff;
    });
    
    _this.tint = CHOSEN_TINT;

	if (window.plugins.flashlight.isSwitchedOn()){
		window.plugins.flashlight.switchOff();
	}
	navigator.vibrate(0);
    resetFlickerTimer();
    
    chosenPattern = patterns[_this.name];
    patternNote = 0;

	playPattern();
}

function playPattern(){
	if (patternNote < chosenPattern.length){
		
		navigator.vibrate(chosenPattern[patternNote]);
		window.plugins.flashlight.switchOn();
		
		game.camera.flash(0xffffff, chosenPattern[patternNote] / 1.5);
		
		setTimeout(function(){
			window.plugins.flashlight.switchOff();
			
			setTimeout(function(){
				patternNote++;
				playPattern();
			}, chosenPattern[patternNote] / 1.5);
	
		}, chosenPattern[patternNote] / 1.5);
	}
	
	else{
	    patternBtns.forEach(function(item) {
			item.tint = 0xffffff;
	    });	
	}
}

/* general functions */

function loadSounds(){   
	sound_logo = game.add.audio('sound_logo');
	
	huSfx = game.add.audio('hu', 1);
	haSfx = game.add.audio('ha', 1);

	shakerFsfx = game.add.audio('front', 1);
	shakerBsfx = game.add.audio('back', 1);
	bellFsfx = game.add.audio('c', 1);
	bellBsfx = game.add.audio('g', 1);
	
    click1 = game.add.audio('clanck', 0.2);
    click2 = game.add.audio('clap', 0.2);
    click3 = game.add.audio('scrape', 0.2);
    click4 = game.add.audio('snap', 0.2);

    sfx1 = game.add.audio('bd', 1);
    sfx2 = game.add.audio('clanck', 1);
    sfx3 = game.add.audio('clap', 1);
    sfx4 = game.add.audio('cymble', 1);
    sfx5 = game.add.audio('hh', 1);
    sfx6 = game.add.audio('snr', 1);
    sfx7 = game.add.audio('pluck', 1);
    sfx8 = game.add.audio('scrape', 1);
    sfx9 = game.add.audio('snap', 1);
    sfx10 = game.add.audio('vox1', 1);
    sfx11 = game.add.audio('vox2', 1);
    sfx12 = game.add.audio('vox3', 1); 
    
    note1 = game.add.audio('C4');
    note2 = game.add.audio('Db4');
    note3 = game.add.audio('D4');
    note4 = game.add.audio('Eb4');
    note5 = game.add.audio('E4');
    note6 = game.add.audio('F4');
    note7 = game.add.audio('Gb4');
    note8 = game.add.audio('G4');
    note9 = game.add.audio('Ab4');
    note10 = game.add.audio('A4');
    note11 = game.add.audio('Bb4');
    note12 = game.add.audio('B4');
}

function initState(_color){    	
	bg = game.add.image(0, 0, 'bg');
	bg.alpha = 0.8;

	game.stage.backgroundColor = _color;
    	
    buttons = game.add.group();
    
    for (n = 0; n < btn_keys.length; n++){
    	btn = buttons.create(10 + (n % 3) * (WIDTH / 3), 800, btn_keys[n]);
    	if (n <= 2) btn.y = HEIGHT - btn.height * 2 - 70;
    	else { btn.y = HEIGHT - btn.height - 40; }
    	
    	btn.scale.set(1, 1.15);
    	
        btn.inputEnabled = true;
	    btn.events.onInputDown.add(goToState, this);
	    
	    if (btn_keys[n].slice(4) == state){
	    	btn.tint = CHOSEN_TINT;
	    }
    }
    
	game.add.image(0,  HEIGHT - btn.height - 160, 'seperator').scale.set(4, 1.5);
}

function goToState(_this){    
    click4.play();
    
	if (isMobile()){
		navigator.vibrate(0);

		if (game.state.getCurrentState().key == 'Flasher'){
			resetFlickerTimer();
			flash_on = false;
			flicker_on = false;
		}
		
		if (window.plugins.flashlight.isSwitchedOn()){
			window.plugins.flashlight.switchOff();
		}
	}
	
	if (game.state.getCurrentState().key == 'Shaker'){
		gui.destroy();
	}
	
	if (game.state.getCurrentState().key == 'Riddles'){
		try{clearTimeout(riddleTimer);} catch(e){};
	}

	state = _this.key.slice(4);
    game.state.start(state);
}

function converToHex(_color){
	return _color.toString(16);
}

function isMobile(){
    return /Mobi|Android/i.test(navigator.userAgent);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(50, false);} catch(e){} // change device media volume to maximum
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}