import * as Phaser from 'phaser-ce';
import {GameModel} from './game.model';

export class PlayerModel extends Phaser.Sprite {

  cursors: any;

  constructor(public parentGame: GameModel, x: number, y: number, key: string, frame?: number) {
    super(parentGame.phaserGame, x, y, key, frame);
    parentGame.phaserGame.world.add(this);
    this.anchor.setTo(0.5, 0.0);
    parentGame.phaserGame.physics.arcade.enable(this);
    this.cursors = parentGame.phaserGame.input.keyboard.createCursorKeys();
  }

  update() {
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
