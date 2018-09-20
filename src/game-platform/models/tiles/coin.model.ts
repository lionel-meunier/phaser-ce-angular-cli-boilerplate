import * as Phaser from 'phaser-ce';

export class CoinModel extends Phaser.Sprite {

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'backgrounds-objects', 'coin');

    // this.animations.add('idle', Phaser.Animation.generateFrameNames('box-interogation', 1, 4), 6, true);
  }

  update() {
    // this.play('idle');
  }
}
