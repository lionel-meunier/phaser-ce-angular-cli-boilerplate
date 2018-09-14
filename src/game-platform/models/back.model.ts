import * as Phaser from 'phaser-ce';

export class Back extends Phaser.Group {

  constructor(game: Phaser.Game) {
    super(game);
    game.world.add(this);
  }

}
