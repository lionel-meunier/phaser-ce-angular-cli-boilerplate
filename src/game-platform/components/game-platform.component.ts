import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as Phaser from 'phaser-ce';
import {Level} from '../models/level.model';
import {LevelLoadService} from '../services/level-load.service';

@Component({
  selector: 'app-platform-game',
  templateUrl: './game-platform.component.html',
  styleUrls: ['./game-platform.component.scss']
})
export class GamePlatformComponent implements AfterViewInit {
  game: Phaser.Game;

  constructor(private elRef: ElementRef, private levelLoadService: LevelLoadService) {
  }

  ngAfterViewInit() {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, this.elRef.nativeElement.querySelector('#content'));
    this.game.state.add('Level', Level);
    this.game.state.start('Level');
    this.levelLoadService.loadLevel('level1').then((levelData) => {
      console.log(levelData);
    });
  }
}
