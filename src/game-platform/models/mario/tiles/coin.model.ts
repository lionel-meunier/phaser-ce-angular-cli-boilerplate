import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';

export class CoinModel extends Phaser.Sprite {

  getted: boolean = false;
  point: number = 100;

  constructor(private level: LevelModel, x: number, y: number) {
    super(level.game, x, y, 'backgrounds-objects', 'coin3');
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('flip', Phaser.Animation.generateFrameNames('coin', 1, 4), 12, true);
    // this.animations.add('flip', ['coin1'], 6, true);
  }

  update() {
  }

  getCoin() {
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
