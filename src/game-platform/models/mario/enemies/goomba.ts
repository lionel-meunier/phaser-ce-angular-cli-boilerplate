import {EnemieModel} from '../../core/enemie.model';
import {LevelModel} from '../../core/level.model';
import * as Phaser from 'phaser-ce';

export class Goomba extends EnemieModel {


  constructor(public level: LevelModel, data: any) {
    data.key = 'enemies';
    data.frame = 'goomba-walk1';
    super(level, data);
    level.game.world.add(this);
    this.anchor.setTo(0.5, 1.0);
    level.game.physics.arcade.enable(this);
    this.animations.add('walk', Phaser.Animation.generateFrameNames('goomba-walk', 1, 2), 6, true);
    this.animations.add('die', ['goomba-die'], 1, false);
  }

  update() {
    if (this.body.touching.down) {
      if (!this.body.touching.up) {
        this.play('walk');
      }
      if (this.scale.x > 0) { // to left
        this.body.velocity.x = -50;
      } else {
        this.body.velocity.x = 50;
      }

      if (this.body.touching.left) {
        this.scale.x = -1;
      } else if (this.body.touching.right) {
        this.scale.x = 1;
      }
    }

    if (this.body.touching.up) {
      this.play('die', 50, false, true);
    }
    // this.x -= 1;


  }

  touchItem(item) {
  }
}
