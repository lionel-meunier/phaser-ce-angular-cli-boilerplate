import * as Phaser from 'phaser-ce/build/custom/phaser-split';
import {PlayerModel} from "./player.model";

export class BulletsModel extends Phaser.Group {
  bulletTime: number = 0;
  enableBody: boolean;
  physicsBodyType: any;
  fireButton: any;

  constructor(public game: Phaser.Game, public player: PlayerModel) {
    super(game);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(30, 'bullets');
    this.setAll('anchor.x', -2);
    this.setAll('anchor.y', 1.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    if (this.player.alive) {
      if (this.fireButton.isDown) {
        this.fireBullet();
      }
    }
  }

  fireBullet() {
    if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      let bullet = this.getFirstExists(false);

      if (bullet) {
        //  And fire it
        bullet.reset(this.player.x, this.player.y + 8);
        bullet.body.velocity.x = 400;
        this.bulletTime = this.game.time.now + 200;
      }
    }
  }


}
