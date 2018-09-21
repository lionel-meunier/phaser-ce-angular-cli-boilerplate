import {LevelModel} from '../../core/level.model';
import {GameModel} from '../../core/game.model';
import {Mario} from '../players/mario.model';
import {InterogationBoxModel} from '../items/interogation-box.model';
import {CoinModel} from '../tiles/coin.model';

export class LevelMarioModel extends LevelModel {

  game: Phaser.Game;

  constructor(name: string, parentGame: GameModel, data: any) {
    super(name, parentGame, data);
  }

  init() {
    super.init();
    this.typePlayers.push(Mario);
    this.typeElements.push(InterogationBoxModel);
    this.typeElements.push(CoinModel);
  }
}
