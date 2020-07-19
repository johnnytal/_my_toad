var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.image('btn_Buttons', 'assets/mytoad/images/btn_buttons.png');
        game.load.image('btn_Flasher', 'assets/mytoad/images/btn_flash.png');
        game.load.image('btn_Riddles', 'assets/mytoad/images/btn_riddles.png');
        game.load.image('btn_Shaker', 'assets/mytoad/images/btn_shake.png');
        game.load.image('btn_Visher', 'assets/mytoad/images/btn_visher.png');
        game.load.image('btn_Visualizer', 'assets/mytoad/images/btn_visu.png');
       
        game.load.image('lightBtn', 'assets/mytoad/images/lightBtn.png');
        game.load.image('vibrateBtn', 'assets/mytoad/images/vibrateBtn.png');
        
        game.load.image('gradientHot', 'assets/mytoad/images/color-gradient-background.jpg');
        game.load.image('gradientCold', 'assets/mytoad/images/color-gradient-background_cold.jpg');
        
        game.load.image('bg', 'assets/mytoad/images/bg.png');
        game.load.image('logoSprite', 'assets/mytoad/images/logoSprite.png');
        game.load.image('logo', 'assets/mytoad/images/logo.png');
        game.load.image('bigLogo', 'assets/mytoad/images/bigLogo.png');
        game.load.image('light_web', 'assets/mytoad/images/light_web.png');
        
        game.load.image('blue_sliderDown', 'assets/mytoad/images/blue_sliderDown.png');
        game.load.image('blue_sliderUp', 'assets/mytoad/images/blue_sliderUp.png');
        game.load.image('seperator', 'assets/mytoad/images/slider.png');
        
        
        game.load.image('syncVib', 'assets/mytoad/images/syncVib.png');
        game.load.image('flickerBtn', 'assets/mytoad/images/flickerBtn.png');
        
        game.load.audio('bd', 'assets/mytoad/audio/percz/bd.mp3');
        game.load.audio('clanck', 'assets/mytoad/audio/percz/clanck.mp3');
        game.load.audio('clap', 'assets/mytoad/audio/percz/clap.mp3');
        game.load.audio('cymble', 'assets/mytoad/audio/percz/cymble.mp3');
        game.load.audio('hh', 'assets/mytoad/audio/percz/hh.mp3');
        game.load.audio('pluck', 'assets/mytoad/audio/percz/pluck.mp3');
        game.load.audio('scrape', 'assets/mytoad/audio/percz/scrape.mp3');
        game.load.audio('snap', 'assets/mytoad/audio/percz/snap.mp3');
        game.load.audio('snr', 'assets/mytoad/audio/percz/snr.mp3');
        game.load.audio('vox1', 'assets/mytoad/audio/percz/vox1.mp3');
        game.load.audio('vox2', 'assets/mytoad/audio/percz/vox2.mp3');
        game.load.audio('vox3', 'assets/mytoad/audio/percz/vox3.mp3');

        game.load.audio('back', 'assets/mytoad/audio/back.mp3');
        game.load.audio('front', 'assets/mytoad/audio/front.mp3');
        game.load.audio('hu', 'assets/mytoad/audio/hu.mp3');
        game.load.audio('ha', 'assets/mytoad/audio/ha.mp3');
        
        game.load.spritesheet("cont", "assets/mytoad/images/cont.png", 325/2, 102);
    },
    
    create: function(){
    	loadSounds();
    	initPlugIns();
        this.game.state.start("Flasher"); 
    }
};