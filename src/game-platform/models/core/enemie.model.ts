import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {ItemDefaultModel} from './item-default.model';
import {PhaserInteractionHelperService} from '../../services/phaser-interaction-helper.service';

export class EnemieModel extends ItemDefaultModel {

  private currentLife: number;

  constructor(public level: LevelModel, data: any) {
    super(level, data);
    level.game.world.add(this);
    this.anchor.setTo(0.5, 0.5);
    level.game.physics.arcade.enable(this);
  }

  update() {
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fPlayer, (enemie, element) => {
      enemie.touchPlayer(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fDecor, (enemie, element) => {
      enemie.touchDecor(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fEnemies, (enemie, element) => {
      enemie.touchEnemie(element, true);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fItems, (enemie, element) => {
      enemie.touchItem(element);
    });
    if (this.inWorld === false) {
      this.kill();
    }
  }

  touchPlayer(player) {
    if (player.body.touching.down && this.body.touching.up) {
    } else {
      player.setCurrentLife(player.getCurrentLife() - 1);
    }
  }

  touchDecor(element) {

  }

  touchEnemie(enemie, dispatch?) {
    if (dispatch === true) {
      enemie.touchEnemie(this, false);
    }
  }

  touchItem(item) {

  }

  getCurrentLife() {
    return this.currentLife;
  }

  setCurrentLife(value) {
    this.currentLife = value;
    if (this.currentLife <= 0) {
      this.kill();
    }
  }

  kill() {
    if (this.alive === true && this.inWorld === true) {
      this.level.parentGame.addPoint(100);
    }
    return super.kill();
  }

  killedBy(enemie) {

  }
}
