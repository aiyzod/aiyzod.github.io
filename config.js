let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#222222',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                y: 0
            }
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Stage_0]
};

let game = new Phaser.Game(config);
