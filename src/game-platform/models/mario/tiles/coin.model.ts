import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {ItemDefaultModel} from '../../core/item-default.model';

export class CoinModel extends ItemDefaultModel {

  getted: boolean = false;
  point: number = 100;

  constructor(private level: LevelModel, data: any) {
    data.key = 'backgrounds-objects';
    data.frame = 'coin3';
    super(level, data);
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('flip', Phaser.Animation.generateFrameNames('coin', 1, 4), 12, true);
    // this.animations.add('flip', ['coin1'], 6, true);
  }

  update() {
  }

  getItem() {
    if (this.getted === false) {
      this.play('flip');
      this.level.add.tween(this).to({
        y: this.y - 20
      }, 500, 'Expo.easeOut', true);

      this.level.add.tween(this).to({
        alpha: 0.2
      }, 500, 'Linear', true).onComplete.add(this.kill, this);

      this.level.parentGame.addPoint(this.point);
      this.getted = true;
    }
  }
}
