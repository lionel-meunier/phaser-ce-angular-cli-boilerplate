import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {ItemDefaultModel} from './item-default.model';
import {PhaserInteractionHelperService} from '../../services/phaser-interaction-helper.service';

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
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fPlayer, (enemie, element) => {
      enemie.touchPlayer(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fDecor, (enemie, element) => {
      enemie.touchDecor(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fEnemies, (enemie, element) => {
      enemie.touchEnemie(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fItems, (enemie, element) => {
      enemie.touchItem(element);
    });
  }

  touchPlayer(player) {
    if (player.body.touching.down && this.body.touching.up) {
    } else {
      player.setCurrentLife(player.getCurrentLife() - 1);
    }
  }

  touchDecor(element) {

  }

  touchEnemie(enemie) {

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
