let zero;
let cursor;
let emitter;
let particles;

class Stage_0 extends Phaser.Scene {

    constructor() {
        super('Stage_0');
    }

    preload() {
        // this.load.image('player', 'assets/test/player.png');
        this.load.atlas('zero_stand', 'assets/char/zero/stand.png', 'assets/char/zero/stand.json');
        this.load.atlas('zero_run', 'assets/char/zero/run.png', 'assets/char/zero/run.json');
        this.load.atlas('zero_jump', 'assets/char/zero/jump.png', 'assets/char/zero/jump.json');
        this.load.atlas('zero_fall', 'assets/char/zero/fall.png', 'assets/char/zero/fall.json');
        this.load.atlas('zero_dash', 'assets/char/zero/dash.png', 'assets/char/zero/dash.json');
    }

    create() {
        cursor = this.input.keyboard.createCursorKeys();

        zero = this.physics.add.sprite(0, 720, 'zero_stand');
        zero.setCollideWorldBounds(true);
        zero.setGravityY(2000);

        // Afterimage Dash Effect
        particles = this.add.particles('zero_dash');
        emitter = particles.createEmitter({
            on: false,
            speed: 0,
            lifespan: 77,
            tint: [0xf08080],
            blendMode: 'COPY',
            scaleX: {
                onEmit: function() {
                    return zero.flipX ? -1 : 1;
                }
            }
        });
        emitter.startFollow(zero);

        this.anims.create({
            key: 'zero_stand',
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNames('zero_stand', {
                prefix: 'stand_',
                end: 5,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'zero_run',
            frameRate: 13,
            repeat: -1,
            frames: this.anims.generateFrameNames('zero_run', {
                prefix: 'run_',
                end: 10,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'zero_jump',
            frameRate: 16,
            frames: this.anims.generateFrameNames('zero_jump', {
                prefix: 'jump_',
                end: 5,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'zero_fall',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNames('zero_fall', {
                prefix: 'fall_',
                end: 2,
                zeroPad: 2
            })
        });

        this.anims.create({
            key: 'zero_dash',
            frameRate: 12,
            frames: this.anims.generateFrameNames('zero_dash', {
                prefix: 'dash_',
                end: 5,
                zeroPad: 2
            })
        });
    }

    update() {
        // Player Control
        emitter.on = cursor.shift.isUp ? false : true;

        if (cursor.right.isDown) {
            if (!cursor.left.isDown) {
                zero.setFlipX(false);
                zero.setVelocityX(cursor.shift.isDown ? 500 : 300);
            }
        } else if (cursor.left.isDown) {
            zero.setFlipX(true);
            zero.setVelocityX(cursor.shift.isDown ? -500 : -300);
        } else {
            if (cursor.shift.isDown) {
                zero.setVelocityX(zero.flipX ? -500 : 500);
            } else {
                zero.setVelocityX(0);
            }
        }

        // Jump
        if (cursor.up.isDown && zero.body.onFloor()) {
            zero.setVelocityY(-600);
        }

        /* Land
        if (cursor.down.isDown && cursor.up.isUp && !zero.body.onFloor()) {
            zero.setVelocityY(500);
        } */

        // Play Anims
        if (zero.body.onFloor()) {
            if (zero.body.velocity.y < 0) {
                zero.anims.play('zero_jump', true);
            } else if (zero.body.velocity.x === 0) {
                zero.anims.play('zero_stand', true);
            } else {
                if (Math.abs(zero.body.velocity.x) === 500) {
                    zero.anims.play('zero_dash', true);
                } else {
                    zero.anims.play('zero_run', true);
                }
            }
        } else {
            if (zero.body.velocity.y > 200) {
                zero.anims.play('zero_fall', true);
            }
        }
    }
}
