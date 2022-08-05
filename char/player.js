class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setPostion(x, y);
    }
}
