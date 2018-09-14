import * as Phaser from 'phaser-ce';

export class Mario extends Phaser.Sprite {

  cursors: any;

  constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number) {
    super(game, x, y, key, frame);
    game.world.add(this);
    this.anchor.setTo(0.0, 0.0);
    this.animations.add('walk', [28,29,30], 6, true); //marche
    this.animations.add('jump', [31], 6, true);
    this.animations.add('idle', [28], 3, true);
    this.animations.add('lower', [32], 3, true); //ce baisse
    // this.animations.add('run', [29,30], 3, true);
    game.physics.arcade.enable(this);
    this.body.setSize(28, 28, 0, 0);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    if(this.game.debug.dirty === true) {

    } else {
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
        this.scale.x = 1;
      } else if (this.cursors.right.isDown) {
        // face right
        this.scale.x = -1;
      }
    }


  }
}
