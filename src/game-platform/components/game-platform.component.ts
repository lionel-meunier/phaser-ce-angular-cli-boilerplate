import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {GameLoadService} from '../services/game-load.service';
import {DebugService} from '../services/debug.service';
import {GameModel} from '../models/core/game.model';
import {LevelMarioModel} from '../models/mario/levels/level.mario.model';

@Component({
  selector: 'app-platform-game',
  templateUrl: './game-platform.component.html',
  styleUrls: ['./game-platform.component.scss']
})
export class GamePlatformComponent implements AfterViewInit {
  game: GameModel;

  constructor(private elRef: ElementRef,
              private gameLoadService: GameLoadService,
              private  debugService: DebugService) {
  }

  ngAfterViewInit() {


    this.debugService.activated.subscribe((debug) => {
      if (debug) {
        console.log('load with debug');
        // this.game.debug.start();
      }
    });
    this.gameLoadService.load('mario').then((gameData) => {
      this.createGame(gameData);
    }, (reason) => {
      console.log(reason, 'on error');
    });
  }

  createGame(gameData: any) {
    this.game = new GameModel(800, 600, this.elRef.nativeElement.querySelector('#content'));
    gameData.levels.forEach((levelData) => {
      let level = new LevelMarioModel(levelData.key, this.game, levelData);
      this.game.addLevel(level);
    });
    this.game.start();
    // this.game = new Phaser.Game(800, 600, Phaser.CANVAS, this.elRef.nativeElement.querySelector('#content'));
    // let levelState = new Level(this.game, levelData, false);
    // this.game.state.add('level1', levelState);
    // this.game.state.add('LevelDefault', LevelDefault);
    // this.game.state.start('level1');
  }
}
