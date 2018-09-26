import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {ItemDefaultModel} from '../../core/item-default.model';

export class MushroomModel extends ItemDefaultModel {

  getted: boolean = false;
  point: number = 100;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.loadTexture('backgrounds-objects', 'mushroom');
    this.anchor.setTo(0.5, 0.0);
    level.game.physics.arcade.enable(this);
  }

  update() {
    super.update();

    if(this.body) {
      if (this.body.touching.down) {
        if (this.scale.x > 0) { // to left
          this.body.velocity.x = -50;
        } else {
          this.body.velocity.x = 50;
        }
      }
    }

  }

  collideWithPlayer() {
    console.log('collide with player');
  }

  getItemBy(player) {
    if (this.getted === false) {
      this.level.parentGame.addPoint(this.point);
      player.setState('standard');
      this.getted = true;
      this.kill();
    }
  }

  touchItem() {
    console.log('touchItem');
  }
}
