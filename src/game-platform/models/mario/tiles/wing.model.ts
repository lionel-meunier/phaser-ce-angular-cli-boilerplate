import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {ItemDefaultModel} from '../../core/item-default.model';

export class WingModel extends ItemDefaultModel {

  getted: boolean = false;
  point: number = 100;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.loadTexture('backgrounds-objects', 'star');
    this.anchor.setTo(0.5, 1.0);
    level.game.physics.arcade.enable(this);
  }

  update() {
    super.update();
    // if (this.touchingBy.decor || this.touchingBy.enemie || this.touchingBy.item) {
    //   if (this.body.touching.down) {
    //     if (this.scale.x > 0) { // to left
    //       this.body.velocity.x = -50;
    //     } else {
    //       this.body.velocity.x = 50;
    //     }
    //   }
    //   if (this.body.touching.left) {
    //     this.scale.x = -1;
    //   } else if (this.body.touching.right) {
    //     this.scale.x = 1;
    //   }
    // }

  }

  getItemBy(player) {
    // if (this.getted === false) {
    //   this.level.parentGame.addPoint(this.point);
    //   player.setState('standard');
    //   this.getted = true;
    //   this.kill();
    // }
  }
}
