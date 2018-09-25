import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {CoinModel} from '../tiles/coin.model';
import {ItemDefaultModel} from '../../core/item-default.model';
import {element} from 'protractor';

export class InterogationBoxModel extends ItemDefaultModel {

  contents: Array<ItemDefaultModel> = [];

  constructor(private level: LevelModel, data: any) {
    data.key = 'backgrounds-objects';
    data.frame = 'box-interogation1';
    super(level, data);
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('box-interogation', 1, 4), 6, true);
    this.animations.add('empty', ['box-empty'], 6, true);
    if(Array.isArray(data.content)) {
      data.content.forEach((element) => {
        const dataElement = {
          x : data.x,
          y : data.y - 16,
          type : element
        };
        let newElement = level.createElement(dataElement);
        this.contents.push(newElement);
      });

    } else {
      const dataCoin = {
        x : data.x,
        y : data.y - 8
      };
      this.contents.push(new CoinModel(level, dataCoin));
      this.contents.push(new CoinModel(level, dataCoin));
      this.contents.push(new CoinModel(level, dataCoin));
      this.contents.push(new CoinModel(level, dataCoin));
      this.contents.push(new CoinModel(level, dataCoin));
    }

  }

  update() {
    if (this.contents.length > 0) {
      this.play('idle');
    } else {
      this.play('empty');
    }
  }


  collideWithPlayer(player) {
    if (player.body.touching.up && this.body.touching.down) {
      let tween = this.level.add.tween(this).to({
        y: this.y - 10
      }, 100, 'Expo.easeOut', true);

      tween.onComplete.add(() => {
        if (this.contents.length > 0) {
          this.level.parentGame.addPoint(100);
          let first = this.contents[0];
          console.log(first);
          this.game.world.add(first);
          first.getItem();
          this.contents.shift();
        }


        this.level.add.tween(this).to({
          y: this.y + 10
        }, 100, 'Expo.easeOut', true);
      });
    }
  }
}
