import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {CoinModel} from '../tiles/coin.model';
import {ItemDefaultModel} from '../../core/item-default.model';
import {element} from 'protractor';

export class BlockModel extends ItemDefaultModel {

  contents: Array<any> = [];

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.key = 'backgrounds-objects';
    this.frameName = 'block1';
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('block', 1, 4), 6, true);
    if (Array.isArray(data.content)) {
      data.content.forEach((element) => {
        const dataElement = {
          x: data.x,
          y: data.y - this.body.height,
          type: element
        };
        let newElement = level.createElement(dataElement);
        this.contents.push(newElement);
      });

    } else {
      console.error('intergation bow not have content');
    }
  }

  update() {
    super.update();
    this.play('idle');
  }

  getItemBy(player) {
    if (player.body.touching.up && this.body.touching.down && player.state !== 'small') {
      let tween = this.level.add.tween(this).to({
        y: this.y - 10
      }, 100, 'Expo.easeOut', true);
      //
      tween.onComplete.add(() => {
        //TODO add explosion
        this.kill();
      });
    }
  }
}
