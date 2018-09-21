import * as Phaser from 'phaser-ce';
import {LevelModel} from '../../core/level.model';
import {CoinModel} from '../tiles/coin.model';

export class InterogationBoxModel extends Phaser.Sprite {

  coins: Array<CoinModel> = [];

  constructor(private level: LevelModel, x: number, y: number) {
    super(level.game, x, y, 'backgrounds-objects', 'box-interogation1');
    this.anchor.setTo(0.5, 0.0);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('box-interogation', 1, 4), 6, true);
    this.animations.add('empty', ['box-empty'], 6, true);
    this.coins.push(new CoinModel(level, x, y - 8));
    this.coins.push(new CoinModel(level, x, y - 8));
    this.coins.push(new CoinModel(level, x, y - 8));
    this.coins.push(new CoinModel(level, x, y - 8));
    this.coins.push(new CoinModel(level, x, y - 8));
  }

  update() {
    if (this.coins.length > 0) {
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
        if (this.coins.length > 0) {
          this.level.parentGame.addPoint(100);
          let first = this.coins[0];
          this.game.world.add(first);
          first.getCoin();
          this.coins.shift();
        }


        this.level.add.tween(this).to({
          y: this.y + 10
        }, 100, 'Expo.easeOut', true);
      });
    }
  }
}
