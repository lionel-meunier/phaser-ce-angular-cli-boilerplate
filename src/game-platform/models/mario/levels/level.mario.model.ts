import {LevelModel} from '../../core/level.model';
import {GameModel} from '../../core/game.model';
import {Mario} from '../players/mario.model';
import {InterogationBoxModel} from '../items/interogation-box.model';
import {CoinModel} from '../tiles/coin.model';
import {Goomba} from '../enemies/goomba';
import {MushroomModel} from '../tiles/mushroom.model';
import {StarModel} from '../tiles/star.model';
import {FlowerModel} from '../tiles/flower.model';
import {BlockModel} from '../items/block.model';
import {Turtle} from '../enemies/turtle';

export class LevelMarioModel extends LevelModel {

  game: Phaser.Game;

  constructor(name: string, parentGame: GameModel, data: any) {
    super(name, parentGame, data);
  }

  init() {
    super.init();
    this.typePlayers.push(Mario);
    //decor interaction
    this.typeElements.push(InterogationBoxModel);
    this.typeElements.push(BlockModel);

    //enemies
    this.typeElements.push(Goomba);
    this.typeElements.push(Turtle);

    //items getted by player
    this.typeElements.push(CoinModel);
    this.typeElements.push(MushroomModel);
    this.typeElements.push(StarModel);
    this.typeElements.push(FlowerModel);


  }
}
