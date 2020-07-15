//window.onload = start;
document.addEventListener("deviceready", start, false);

function start(){
    WIDTH = 720; 
    HEIGHT = 1274; 

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