let player;
let cursor;

class Stage_0 extends Phaser.Scene {

    constructor () {
        super('Stage_0');
    }

    preload () {
        this.load.image('player', 'assets/test/player.png');
    }

    create () {
        cursor = this.input.keyboard.createCursorKeys();

        player = this.physics.add.image(32, 32, 'player');
        player.setCollideWorldBounds(true);
        // player.setGravityY(2000);
    }

    update () {
        // Player Control
        // 左右移動
        if (cursor.right.isDown) {
            player.setVelocityX(300);
        }
        else if (cursor.left.isDown) {
            player.setVelocityX(-300);
        }
        else {
            player.setVelocityX(0);
        }

        // 跳躍
        if (cursor.up.isDown && player.body.onFloor()) {
            player.setVelocityY(-600);
        }

        // 快速落地
        if (cursor.down.isDown && cursor.up.isUp && !player.body.onFloor()) {
            player.setVelocityY(500);
        }
    }
}
