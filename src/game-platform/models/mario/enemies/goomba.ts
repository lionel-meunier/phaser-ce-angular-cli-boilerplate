import {GameModel} from './game.model';
import {EnemieModel} from '../../core/enemie.model';

export class Goomba extends EnemieModel {

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
