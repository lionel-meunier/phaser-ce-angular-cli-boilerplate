import 'phaser-ce/build/custom/pixi';
import 'phaser-ce/build/custom/p2';
import * as Phaser from 'phaser-ce/build/custom/phaser-split';

export class PlayerModel extends Phaser.Sprite {
  alive: boolean;
  body: any;
  anchor: any;
  x: number;
  y: number;

  constructor(public game: Phaser.Game, public cursors: any) {
    super(game, 100, 300, "player");
    game.world.add(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.body.collideWorldBounds = true;
  }

  update() {
    if (this.alive) {
      this.body.velocity.setTo(0, 0);
      if (this.cursors.up.isDown) {
        // this.player.y -= 8;
        this.body.velocity.y = -200;
      } else if (this.cursors.down.isDown) {
        // this.player.y += 8;
        this.body.velocity.y = 200;
      }

      if (this.cursors.left.isDown) {
        this.body.velocity.x = -200;
      } else if (this.cursors.right.isDown) {
        this.body.velocity.x = 200;
      }
    }
  }

}
