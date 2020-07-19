//window.onload = start;
document.addEventListener("deviceready", start, false);

function start(){
    WIDTH = 720; 
    HEIGHT = 1274; 
    
    colors = [0x10a5e3, 0x8dd7bf, 0xff96c5, 0xff5768, 0xffbf65, 0xfc6238,
	0xffd872, 0xf2d4cc, 0xe77577, 0x6c88c4, 0xff828b, 0x10b0ba, 0x10cdac];

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "container");  

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    
    game.state.add("Flasher", flasher);
    game.state.add("Buttons", buttons);
    game.state.add("Shaker", shaker);
    game.state.add("Visher", visher);
    game.state.add("Visualizer", visualizer);
    game.state.add("Riddles", riddles);
    
    game.state.start("Boot");  
}

var boot = function(game){};
  
boot.prototype = {
    create: function(){
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(false, true);
        }
        
        game.state.start("Preloader"); 
    }
};