import * as Phaser from 'phaser-ce';

export class Background extends Phaser.TileSprite {

  scale: Phaser.Point;

  constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, key: string, frame?) {
    super(game, x, y, width, height, key, frame);
    this.scale.setTo(1.1289946683730876, 1.0275188997398834);
    this.fixedToCamera = true;
    game.world.add(this);
  }

}
