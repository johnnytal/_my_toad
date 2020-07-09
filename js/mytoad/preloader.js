function preload (){  
	progressBar(this);  
	
    this.load.image("button_blank", "assets/mytoad/images/button_blank.png");
    this.load.image("lightBtn", "assets/mytoad/images/lightBtn.png");
    this.load.image("vibrateBtn", "assets/mytoad/images/vibrateBtn.png");
    
    this.load.image("logo", "assets/mytoad/images/logo.png");
    
    this.load.spritesheet('logo_spritesheet', 'assets/mytoad/images/logoSprite.png', { frameWidth: 10368 / 36, frameHeight: 384});

    this.load.audio('note1', 'assets/mytoad/audio/note1.mp3');
    this.load.audio('note2', 'assets/mytoad/audio/note2.mp3');
    this.load.audio('note3', 'assets/mytoad/audio/note3.mp3');
}

function progressBar(_this){
	var progressBar = _this.add.graphics();
    var progressBox = _this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    
    var loadingText = _this.make.text({
        x: WIDTH / 2,
        y: HEIGHT / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = _this.make.text({
        x: WIDTH / 2,
        y: HEIGHT / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = _this.make.text({
        x: WIDTH / 2,
        y: HEIGHT / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
            }
        });
 
        assetText.setOrigin(0.5, 0.5);
            
        _this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    _this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });
 
    _this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}