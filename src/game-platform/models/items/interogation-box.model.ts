import * as Phaser from 'phaser-ce';

export class InterogationBoxModel extends Phaser.Sprite {

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'backgrounds-objects', 'box-interogation1');
    this.animations.add('idle', Phaser.Animation.generateFrameNames('box-interogation', 1, 4), 6, true);

  }

  update() {
    this.play('idle');
    // console.log('update box',this.body.touching.down);
  }
}
