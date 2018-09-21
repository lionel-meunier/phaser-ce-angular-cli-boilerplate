import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';

export class ItemDefaultModel extends Phaser.Sprite {

  constructor(private level: LevelModel, x: number, y: number, key?: string, frame: string) {
    if (!key) {
      key = 'backgrounds-objects';
    }
    if (!frame) {
      frame = 'box-empty';
    }
    super(level.game, x, y, key, frame);
  }

  update() {
  }

  collideWithPlayer() {
  }
}
