// Spaceship prefab
class Ghost2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.Speed2 = game.settings.ghostSpeed;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.Speed2;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    
    reset() {
        this.x = game.config.width;
    }
}