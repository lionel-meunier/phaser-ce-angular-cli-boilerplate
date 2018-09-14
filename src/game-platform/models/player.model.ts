import * as Phaser from 'phaser-ce';

export class Player extends Phaser.Sprite {

  cursors: any;

  constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number) {
    super(game, x, y, key, frame);
    game.world.add(this);

    this.anchor.setTo(0.5, 0.0);
    this.animations.add('walk', [8, 9, 10, 11], 6, true);
    this.animations.add('jump', [4, 5], 6, true);
    this.animations.add('idle', [0, 1, 2], 4, true);
    game.physics.arcade.enable(this);
    this.body.setSize(86.39996337890625, 85.96431732177734, 46.800018310546875, 109.2168960571289);
    this.cursors = this.game.input.keyboard.createCursorKeys();

  }

  update() {
    //player move
    if (this.cursors.left.isDown) {
      // move to the left
      this.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      // move to the right
      this.body.velocity.x = 200;
    } else {
      // dont move in the horizontal
      this.body.velocity.x = 0;
    }


    // update the facing of the player
    if (this.cursors.left.isDown) {
      // face left
      this.scale.x = -1;
    } else if (this.cursors.right.isDown) {
      // face right
      this.scale.x = 1;
    }

  }
}
