import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';

export class GroupModel extends Phaser.Group {

  constructor(public level: LevelModel, data: any) {
    super(level.game, null, null, null, true, Phaser.Physics.ARCADE);
  }
}
