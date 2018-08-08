import * as Phaser from "phaser-ce/build/custom/phaser-split";

export class BackgroundModel extends Phaser.TileSprite {
  tilePosition: any;

  constructor(public game: Phaser.Game) {
    super(game, 0, 0, game.width, game.height, "background");
    this.game.world.add(this);
  }

  update() {
    this.tilePosition.x -= 2;
  }

}
