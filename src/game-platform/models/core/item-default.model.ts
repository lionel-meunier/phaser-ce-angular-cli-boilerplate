import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {PhaserInteractionHelperService} from '../../services/phaser-interaction-helper.service';

export class ItemDefaultModel extends Phaser.Sprite {

  overlapOnly: boolean = false;
  touchingBy: any;

  constructor(public level: LevelModel, data: any) {
    super(level.game, data.x, data.y, data.key ? data.key : 'backgrounds-objects', data.frame ? data.frame : 'box-empty');
    this.anchor.setTo(0.5, 0.0);
    this.level.game.physics.arcade.enable(this);
  }

  update() {
    this.touchingBy = {
      player: false,
      decor: false,
      enemie: false,
      item: false,
    };
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fPlayer, (item, element) => {
      this.touchingBy.player = true;
      item.touchPlayer(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fDecor, (item, element) => {
      this.touchingBy.decor = true;
      item.touchDecor(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fEnemies, (item, element) => {
      this.touchingBy.enemie = true;
      item.touchEnemie(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fItems, (item, element) => {
      if (!element.overlapOnly || !item.overlapOnly) {
        this.touchingBy.item = true;
      }
      item.touchItem(element);
    });
  }

  touchPlayer(player) {
    this.getItemBy(player);
  }

  touchDecor(element) {

  }

  touchEnemie(enemie) {

  }

  touchItem(item) {
  }

  getItemBy(player: any) {

  }

  addInWorldBy(element: any, elementInteraction: any) {

  }
}
