let zero;
let cursor;
let emitter;
let particles;
const speed_run = 300;
const speed_dash = 500;
const speed_jump = -600;
const speed_fall = 500;

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

        // Afterimage Dash Effect
        particles = this.add.particles('zero_dash');
        emitter = particles.createEmitter({
            frame: 'dash_03',
            on: false,
            speed: 0,
            lifespan: 30,
            frequency: 15,
            tint: [0xf08080],
            blendMode: 'ADD',
            scaleX: {
                onEmit: function() {
                    return zero.flipX ? -1 : 1;
                }
            }
        });

        zero = this.physics.add.sprite(0, 720, 'zero_stand');
        zero.setCollideWorldBounds(true);
        zero.setGravityY(2000);

        emitter.startFollow(zero);
        // emitter.setFrame('dash_02');

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
                end: 6,
                zeroPad: 2
            })
        });
    }

    update() {
        // Player Control

        // Dash
        if (cursor.shift.isDown) {
            if (cursor.shift.getDuration() > 520 && zero.body.onFloor()) {
                emitter.on = false;
            } else {
                emitter.on = true
            }
        } else {
            emitter.on = false;
        }

        // Wall Jump & Wall Slide
        if (zero.body.onWall() && !zero.body.onFloor()) {
            if (zero.body.velocity.y > 0) {
                zero.setVelocityY(cursor.up.isDown ? speed_jump : 100);
            }
            emitter.on = false;
        }

        if (cursor.right.isDown) {
            if (!cursor.left.isDown) {
                zero.setFlipX(false);
                zero.setVelocityX(emitter.on ? speed_dash : speed_run);
            }
        } else if (cursor.left.isDown) {
            zero.setFlipX(true);
            zero.setVelocityX(emitter.on ? speed_dash * -1 : speed_run * -1);
        } else {
            if (emitter.on) {
                zero.setVelocityX(zero.flipX ? speed_dash * -1 : speed_dash);
            } else {
                zero.setVelocityX(0);
            }
        }

        // Jump
        if (cursor.up.isDown && zero.body.onFloor()) {
            zero.setVelocityY(speed_jump);
        }

        /* Land
        if (cursor.down.isDown && cursor.up.isUp && !zero.body.onFloor()) {
            zero.setVelocityY(speed_fall);
        } */

        // Play Anims
        if (zero.body.onFloor()) {
            if (zero.body.velocity.y < 0) {
                zero.anims.play('zero_jump', true);
            } else if (zero.body.velocity.x === 0) {
                zero.anims.play('zero_stand', true);
            } else {
                if (Math.abs(zero.body.velocity.x) === speed_dash) {
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
