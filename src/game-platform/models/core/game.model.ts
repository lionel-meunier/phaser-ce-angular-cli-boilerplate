import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';

export class GameModel {

  levels: Array<LevelModel>;
  phaserGame: Phaser.Game;
  currentPoint: number = 0;

  constructor(width, height, element) {
    this.phaserGame = new Phaser.Game(width, height, Phaser.CANVAS, element);
    this.levels = [];
  }

  addLevel(level: LevelModel) {
    this.levels.push(level);
    this.phaserGame.state.add(level.name, level);
  }

  start(index?: number) {
    if (!index) {
      index = 0;
    }
    if (this.levels[index]) {
      this.phaserGame.state.start(this.levels[index].name);
    } else {
      console.error('level index ' + index + ' not exist');
    }
  }

  nextLevel() {
    const currenLevel = this.phaserGame.state.current;
    const indexCurrentLevel = this.levels.findIndex((level) => {
      return level.name === currenLevel;
    });
    const nextLevel = this.levels[indexCurrentLevel + 1];
    if (nextLevel) {
      this.phaserGame.state.start(nextLevel.name);
    } else {
      console.log('END GAME');
    }
  }

  addPoint(point: number) {
    this.currentPoint += point;
    console.log('currentPoint', this.currentPoint);
  }

  lose() {
    console.log('YOUR LOSER');
    this.currentPoint = 0;
    this.phaserGame.state.start(this.levels[0].name);
  }
}
