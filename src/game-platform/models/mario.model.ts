import * as Phaser from 'phaser-ce';

export class Mario extends Phaser.Sprite {

  cursors: any;

  constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number) {
    super(game, x, y, key, frame);
    game.world.add(this);
    this.anchor.setTo(0.5, 0.0);

    this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 2), 6, true); //marche
    this.animations.add('jump', ['jump'], 6, true);
    this.animations.add('idle', ['idle'], 3, true);
    this.animations.add('lower', ['lower'], 3, true); // ce baisse
    game.physics.arcade.enable(this);
    this.body.setSize(14, 28, 0, 0);
    // this.body.bounce.set(1);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //player move
    if (this.cursors.left.isDown && this.x > 0) {
      // move to the left
      this.body.velocity.x = -200;
    } else if (this.cursors.right.isDown && this.x < this.game.world.width) {
      // move to the right
      this.body.velocity.x = 200;
    } else {
      // dont move in the horizontal
      this.body.velocity.x = 0;
    }


    // update the facing of the player
    if (this.cursors.left.isDown) {
      // face left
      this.scale.x = 1;
    } else if (this.cursors.right.isDown) {
      // face right
      this.scale.x = -1;
    }
  }

  play(name, frameRate?, loop?, killOnComplete?) {


    if (name === 'lower' && this.body.height > 20) {
      this.body.height = 20;
    } else if (name !== 'lower' && this.body.height === 20) {
      this.y -= 8;
      this.body.height = 28;
    }


    if (this.animations) {
      return this.animations.play(name, frameRate, loop, killOnComplete);
    }

  }
}
