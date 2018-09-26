import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {PhaserInteractionHelperService} from '../../services/phaser-interaction-helper.service';

export class ItemDefaultModel extends Phaser.Sprite {

  constructor(public level: LevelModel, data: any) {
    super(level.game, data.x, data.y, data.key ? data.key : 'backgrounds-objects', data.frame ? data.frame : 'box-empty');
    this.anchor.setTo(0.5, 0.0);
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

  }

  touchDecor(element) {

  }

  touchEnemie(enemie) {

  }

  touchItem(item) {

  }

  getItemBy(player: any) {

  }
}
