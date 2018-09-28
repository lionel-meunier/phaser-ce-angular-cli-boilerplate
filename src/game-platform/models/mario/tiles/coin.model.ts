import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {ItemDefaultModel} from '../../core/item-default.model';
import {PlayerModel} from '../../core/player.model';

export class CoinModel extends ItemDefaultModel {

  getted: boolean = false;
  point: number = 100;
  overlapOnly: boolean = true;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.loadTexture('backgrounds-objects', 'coin3');
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('flip', Phaser.Animation.generateFrameNames('coin', 1, 4), 6, true);
    this.play('flip');
  }

  update() {
    super.update();
  }

  getItemBy(player) {
    if (this.getted === false) {
      if (this.body) {
        this.body.enable = false;
      }

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

  touchPlayer(player) {
    // console.log('player touched', player);
  }

  touchItem(item) {
    // console.log('item touched', item);
    // this.body.stop();
  }

  addInWorldBy(element: any, elementInteraction: any) {
    if (elementInteraction instanceof PlayerModel) {
      this.getItemBy(elementInteraction);
    }
  }
}
