import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {ItemDefaultModel} from './item-default.model';

export class EnemieModel extends ItemDefaultModel {

  cursors: any;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    level.game.world.add(this);
    this.anchor.setTo(0.5, 0.0);
    level.game.physics.arcade.enable(this);
    this.cursors = level.game.input.keyboard.createCursorKeys();
  }

  update() {
  }

  touchItem(item) {

  }

  kill() {
    if (this.alive === true) {
      this.level.parentGame.addPoint(100);
    }
    return super.kill();
  }
}
