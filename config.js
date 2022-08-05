let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#EEEEEE',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 2000
            },
            debug: true
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Stage_0]
};

let game = new Phaser.Game(config);
