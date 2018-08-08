import {AfterViewInit, Component, ElementRef} from '@angular/core';
import 'phaser-ce/build/custom/pixi';
import 'phaser-ce/build/custom/p2';
import * as Phaser from 'phaser-ce/build/custom/phaser-split';
import {PlayerModel} from './models/player.model';
import {BackgroundModel} from './models/background.model';
import {BulletsModel} from './models/bullets.model';
import {EnemiesModel} from './models/enemies.model';

@Component({
  selector: 'app-lme-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  title = 'app';
  game: Phaser.Game;

  cursors: object;
  fireButton: object;
  bg: BackgroundModel;
  player: PlayerModel;
  bullets: BulletsModel;
  enemies: EnemiesModel;

  constructor(private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, this.elRef.nativeElement.querySelector('#content'), {
      preload: () => {
        this.preload();
      },
      create: () => {
        this.create();
      },
      update: () => {
        this.update();
      },
    });
  }

  preload() {
    this.game.load.image('background', 'assets/images/space.png');
    this.game.load.image('player', 'assets/images/ship.png');
    this.game.load.image('bullets', 'assets/images/bullets.png');
    this.game.load.image('invader', 'assets/images/invader.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add object to keyboard interaction
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // add infinite background
    this.bg = new BackgroundModel(this.game);
    // add player
    this.player = new PlayerModel(this.game, this.cursors);

    // add shoot
    this.bullets = new BulletsModel(this.game, this.player);

    this.enemies = new EnemiesModel(this.game);
  }

  update() {
    if(this.player.alive) {
      this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
    }
  }

  collisionHandler (bullet, enemy) {

    bullet.kill();
    enemy.kill();
    // TODO add animation explosion

    if (this.enemies.countLiving() == 0) {
      console.log('WINNNN');
    }
  }
}
