import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as Phaser from 'phaser-ce';
import {Level} from '../models/level.model';
import {LevelLoadService} from '../services/level-load.service';
import {LevelDefault} from '../models/level.default.model';
import {DebugService} from '../services/debug.service';

@Component({
  selector: 'app-platform-game',
  templateUrl: './game-platform.component.html',
  styleUrls: ['./game-platform.component.scss']
})
export class GamePlatformComponent implements AfterViewInit {
  game: Phaser.Game;

  constructor(private elRef: ElementRef,
              private levelLoadService: LevelLoadService,
              private  debugService: DebugService) {
  }

  ngAfterViewInit() {


    this.debugService.activated.subscribe((debug) => {
      if (debug) {
        console.log('load with debug');
        // this.game.debug.start();
      }
    });

    this.levelLoadService.loadLevel('level1').then((levelData) => {
      console.log(levelData);
      this.createGame(levelData);

    });
  }

  createGame(levelData: any) {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, this.elRef.nativeElement.querySelector('#content'));
    let levelState = new Level(this.game, levelData, false);
    this.game.state.add('level1', levelState);
    this.game.state.add('LevelDefault', LevelDefault);
    this.game.state.start('level1');
  }
}
