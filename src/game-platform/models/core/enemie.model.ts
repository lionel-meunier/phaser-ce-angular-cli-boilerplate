import * as Phaser from 'phaser-ce';
import {GameModel} from './game.model';

export class EnemieModel extends Phaser.Sprite {

  cursors: any;

  constructor(public parentGame: GameModel, x: number, y: number, key: string, frame?: number) {
    super(parentGame.phaserGame, x, y, key, frame);
    parentGame.phaserGame.world.add(this);
    this.anchor.setTo(0.5, 0.0);
    parentGame.phaserGame.physics.arcade.enable(this);
    this.cursors = parentGame.phaserGame.input.keyboard.createCursorKeys();
  }

  update() {
  }
}
