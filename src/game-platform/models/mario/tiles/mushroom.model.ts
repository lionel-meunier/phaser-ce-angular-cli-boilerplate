import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {ItemDefaultModel} from '../../core/item-default.model';

export class MushroomModel extends ItemDefaultModel {

  getted: boolean = false;
  point: number = 100;

  constructor(private level: LevelModel, data: any) {
    data.key = 'backgrounds-objects';
    data.frame = 'mushroom';
    super(level, data);
    this.anchor.setTo(0.5, 0.0);
    level.game.physics.arcade.enable(this);


  }

  update() {
    // this.level.physics.arcade.collide(this.level.fPlayer, this, () => {
    //   this.level.fPlayer.setState('standard');
    // });
    // this.level.physics.arcade.collide(this.level.fItems, this, () => {
    // });
    // this.level.physics.arcade.collide(this.level.fBack, this, () => {
    // });

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

  getItem() {
    console.log('getItem ');
    if (this.getted === false) {
      this.level.parentGame.addPoint(this.point);
      this.getted = true;
    }
  }

  touchItem() {
    console.log('touchItem');
  }
}
