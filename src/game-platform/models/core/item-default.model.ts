import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';

export class ItemDefaultModel extends Phaser.Sprite {

  constructor(public level: LevelModel, data: any) {
    super(level.game, data.x, data.y, data.key ? data.key : 'backgrounds-objects', data.frame ? data.frame : 'box-empty');
    this.anchor.setTo(0.5, 0.0);
  }

  update() {
  }

  collideWithPlayer() {

  }

  getItem() {

  }
}
