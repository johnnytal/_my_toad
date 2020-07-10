function create(){
	_this = this;
		
	btn_n = 3;
	logoBtns = [];
	logos = [];
	
	huHaReset = true;
	
	MIN_ACCEL_F = 0.9;
	MIN_ACCEL_B = 0.4;
	lastAction = '';
	lastAccel = 0;
	
	VISHER_ON = true;
	SHAKER_ON = true;
	
    colors = [0xFDEC9E, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];
    colorsHex = ['#FDEC9E', '#E9A43C', '#B77A29', '#BEAF18', '#799D31', '#799D31', '#118800'];

	debug_text = this.add.text(100, 50, 'debug').setFont('32px Impact').setColor('#ff0000').setAlign('center');

    var oneTouch = [
    	this.sound.add('note1'),
    	this.sound.add('note2'),
    	this.sound.add('note3')
    ];
    
    huSound = this.sound.add('hu');
    haSound = this.sound.add('ha');
    
    frontSfx = this.sound.add('front');
    backSfx = this.sound.add('back');
	
	for (x = 0; x < btn_n; x++){
		logo = this.add.sprite(130 + x*225, HEIGHT / 2 - 350, 'logo').setInteractive();
		logo.setScale(.2, .2);
		logo.tint = colors[x];
		logos.push(logo);
		
	 	logo.on('pointerdown', function (pointer) {
			_this.cameras.main.setBackgroundColor(colorsHex[logos.indexOf(this)]);
	    });
		
    	var logo_btn = this.add.sprite(130 + x*225, HEIGHT / 2 - 100, 'logo_spritesheet').setInteractive();
    	logo_btn.setScale(.8, .8);
    	logoBtns.push(logo_btn);
	    	
	 	logo_btn.on('pointerdown', function (pointer) {
 		    oneTouch[logoBtns.indexOf(this)].play();
	       	this.tint = colors[x];
	    });
        logo_btn.on('pointerup', function (pointer) {
        	this.clearTint();
		});
    }
    
    var vibration_btn = this.add.sprite(200, 950, 'vibrateBtn').setInteractive();
    vibration_btn.setScale(0.75, 0.75);
    
    var flash_btn = this.add.sprite(500, 950, 'lightBtn').setInteractive();
    flash_btn.setScale(0.8, 0.8);
    
    flash_btn.tint = 0xff00ff;

 	vibration_btn.on('pointerdown', function (pointer) {
       	this.tint = colors[4];
       	try{
       		navigator.vibrate(120000);
       	}
       	catch(e){}
    });
    
    vibration_btn.on('pointerup', function (pointer) {
        this.clearTint();
       	try{
       		navigator.vibrate(0);
       	}
       	catch(e){}
    });
    
 	flash_btn.on('pointerdown', function (pointer) {
       	this.tint = colors[1];
       	
       	try{
       		if (!window.plugins.flashlight.isSwitchedOn()){
	       		window.plugins.flashlight.switchOn(
			      function() {}, // success callback
			      function() {}, // error callback
			      {} // intensity
			    );
	       	}
       	}
   		catch(e){}
    });
    
    flash_btn.on('pointerup', function (pointer) {
        this.tint = 0xff00ff;
       	try{
       		window.plugins.flashlight.switchOff();
       	}
       	catch(e){}
    });

    plugIns();
	window.addEventListener("devicemotion", readVisherAccel, true);	
}

function readVisherAccel(event){
	
	// VISHER
	
	var gravity = event.accelerationIncludingGravity.x;

	logoBtns[1].angle = gravity * 3;
	
	if (gravity < -5 && huHaReset){
		if (!huSound.isPlaying){
			huSound.play();
			huHaReset = false;
		}
	}
	else if (gravity > 5 && huHaReset){
		if (!haSound.isPlaying){
			haSound.play();
			huHaReset = false;
		}
	}

	if (gravity < 2.5 && gravity > -2.5){
		huHaReset = true;
	}
	
	// SHAKER
	
	var aveAccel = (
		event.accelerationIncludingGravity.x + 
		event.accelerationIncludingGravity.y +
		event.accelerationIncludingGravity.z
	) / 3;
	
	if (!frontSfx.isPlaying && !backSfx.isPlaying){
		if (Math.abs(lastAccel - aveAccel) > MIN_ACCEL_F){ 
			if (lastAction != 'FRONT'){
				frontSfx.play();
				lastAction = 'FRONT';
			}
		}
		
		else if(Math.abs(lastAccel - aveAccel) > MIN_ACCEL_B){	
			if (lastAction != 'BACK'){
				backSfx.play();
				lastAction = 'BACK';
			}
		}
	}
	
	lastAccel = aveAccel;
	
	debug_text.text = 'visher: ' + Math.round(gravity * 100) / 100 + ' | shaker: ' + Math.round(aveAccel * 100) / 100;
}

function plugIns(){
	try{
		window.plugins.insomnia.keepAwake();
	} catch(e){}
	try{
	    StatusBar.hide();
	} catch(e){} 
}