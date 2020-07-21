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
        game.load.image('fun', 'assets/mytoad/images/fun.png');
        game.load.image('toad', 'assets/mytoad/images/toad.png');
        
        game.load.image('bg', 'assets/mytoad/images/bg.png');
        game.load.image('logoSprite', 'assets/mytoad/images/logoSprite.png');
        game.load.image('logo', 'assets/mytoad/images/logo.png');
        game.load.image('bigLogo', 'assets/mytoad/images/bigLogo.png');
        game.load.image('light_web', 'assets/mytoad/images/light_web.png');
        game.load.image('drop', 'assets/mytoad/images/raemi-Drop.png');
        
        game.load.image('blue_sliderDown', 'assets/mytoad/images/blue_sliderDown.png');
        game.load.image('blue_sliderUp', 'assets/mytoad/images/blue_sliderUp.png');
        game.load.image('seperator', 'assets/mytoad/images/slider.png');
        
        game.load.image('btn_sampler', 'assets/mytoad/images/btn_sampler.png');
        game.load.image('btn_pattern', 'assets/mytoad/images/patternBtn.png');

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
        
        game.load.audio('C4', 'assets/mytoad/audio/notes/C4.mp3');
        game.load.audio('Db4', 'assets/mytoad/audio/notes/Db4.mp3');
        game.load.audio('D4', 'assets/mytoad/audio/notes/D4.mp3');
        game.load.audio('Eb4', 'assets/mytoad/audio/notes/Eb4.mp3');
        game.load.audio('E4', 'assets/mytoad/audio/notes/E4.mp3');
        game.load.audio('F4', 'assets/mytoad/audio/notes/F4.mp3');
        game.load.audio('Gb4', 'assets/mytoad/audio/notes/Gb4.mp3');
        game.load.audio('G4', 'assets/mytoad/audio/notes/G4.mp3');
        game.load.audio('Ab4', 'assets/mytoad/audio/notes/Ab4.mp3');
        game.load.audio('A4', 'assets/mytoad/audio/notes/A4.mp3');
        game.load.audio('Bb4', 'assets/mytoad/audio/notes/Bb4.mp3');
        game.load.audio('B4', 'assets/mytoad/audio/notes/B4.mp3');

        game.load.audio('back', 'assets/mytoad/audio/back.mp3');
        game.load.audio('front', 'assets/mytoad/audio/front.mp3');
        game.load.audio('g', 'assets/mytoad/audio/g.mp3');
        game.load.audio('c', 'assets/mytoad/audio/c.mp3');
        
        game.load.audio('hu', 'assets/mytoad/audio/hu.mp3');
        game.load.audio('ha', 'assets/mytoad/audio/ha.mp3');
        
        game.load.spritesheet("cont", "assets/mytoad/images/cont.png", 325/2, 102);
        game.load.spritesheet("noteBtn", "assets/mytoad/images/note.png", 325/2, 102);
    },
    
    create: function(){
    	loadSounds();
    	initPlugIns();
        this.game.state.start("Flasher"); 
    }
};