import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {CoinModel} from '../tiles/coin.model';
import {ItemDefaultModel} from '../../core/item-default.model';
import {element} from 'protractor';

export class InterogationBoxModel extends ItemDefaultModel {

  contents: Array<any> = [];

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    this.key = 'backgrounds-objects';
    this.frameName = 'box-interogation1';
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('box-interogation', 1, 4), 6, true);
    this.animations.add('empty', ['box-empty'], 6, true);
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
    if (this.contents.length > 0) {
      this.play('idle');
    } else {
      this.play('empty');
    }
  }

  getItemBy(player) {
    if (player.body.touching.up && this.body.touching.down) {
      let tween = this.level.add.tween(this).to({
        y: this.y - 10
      }, 100, 'Expo.easeOut', true);

      tween.onComplete.add(() => {
        if (this.contents.length > 0) {
          this.level.parentGame.addPoint(100);
          let first = this.contents[0];
          this.game.world.add(first);
          first.addInWorldBy(this, player);
          // first.getItemBy(player);
          this.contents.shift();
        }

        this.level.add.tween(this).to({
          y: this.y + 10
        }, 100, 'Expo.easeOut', true);
      });
    }
  }
}
