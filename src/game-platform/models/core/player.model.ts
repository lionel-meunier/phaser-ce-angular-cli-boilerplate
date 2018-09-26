import * as Phaser from 'phaser-ce';
import {LevelModel} from './level.model';
import {PhaserInteractionHelperService} from '../../services/phaser-interaction-helper.service';

export class PlayerModel extends Phaser.Sprite {

  cursors: any;
  private currentLife: number;
  invincible: boolean;

  constructor(public level: LevelModel, x: number, y: number, key: string, frame?: number) {
    super(level.game, x, y, key, frame);
    level.game.world.add(this);
    this.anchor.setTo(0.5, 0.0);
    level.game.physics.arcade.enable(this);
    this.cursors = level.game.input.keyboard.createCursorKeys();
    this.currentLife = 1;
    this.invincible = false;
  }

  update() {
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fDecor, (player, element) => {
      player.touchDecor(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fEnemies, (player, element) => {
      player.touchEnemie(element);
    });
    PhaserInteractionHelperService.collideOneTorecursiveGroup(this, this.level.fItems, (player, element) => {
      player.touchItem(element);
    });
  }

  touchDecor(element) {

  }

  touchEnemie(enemie) {

  }

  touchItem(item) {

  }

  getCurrentLife() {
    return this.currentLife;
  }

  setCurrentLife(value) {
    if (this.invincible === false) {
      this.currentLife = value;
      this.startInvincibility();
      if (this.currentLife <= 0) {
        this.kill();
      }
    }
  }

  startInvincibility() {
    this.invincible = true;
    setTimeout(() => {
      this.invincible = false;
    }, 500);
  }

  kill() {
    this.level.parentGame.lose();
    return super.kill();
  }
}
