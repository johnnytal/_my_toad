function create(){
	btn_n = 3;
	logoBtns = [];
	
	var debug_text = this.add.text(100, 900, 'debug').setFont('32px Impact').setColor('#ff0000').setAlign('center');

    var oneTouch = [
    	this.sound.add('note1'),
    	this.sound.add('note2'),
    	this.sound.add('note3')
    ];
	
	for (x = 0; x < btn_n; x++){
    	var logo_btn = this.add.sprite(130 + x*225, HEIGHT / 2, 'logo_spritesheet').setInteractive();
    	logo_btn.setScale(.8, .8);
    	logo_btn.setFrame(x * 4);
    	logoBtns.push(logo_btn);
	    	
	 	logo_btn.on('pointerdown', function (pointer) {
 		    oneTouch[logoBtns.indexOf(this)].play();
	       	this.tint = colors[x];
	    });
        logo_btn.on('pointerup', function (pointer) {
        	this.clearTint();
		});
    }
    
    var vibration_btn = this.add.sprite(200, 200, 'vibrateBtn').setInteractive();
    
    var flash_btn = this.add.sprite(500, 200, 'lightBtn').setInteractive();
    flash_btn.tint = 0xff00ff;

    colors = [0xFDEC9E, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];

 	vibration_btn.on('pointerdown', function (pointer) {
       	this.tint = colors[4];
       	try{
       		navigator.vibrate(60000);
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
			      function() {}, // optional success callback
			      function() {}, // optional error callback
			      {intensity: 0.3} // optional as well
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
	debug_text.text = Math.round(event.accelerationIncludingGravity.x * 100) / 100;
	//logoBtns[1].angle = event.accelerationIncludingGravity.x * 3;
}

function plugIns(){
	try{
		window.plugins.insomnia.keepAwake();
	} catch(e){}
	try{
	    StatusBar.hide();
	} catch(e){} 
}