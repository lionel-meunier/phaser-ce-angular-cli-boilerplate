import 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {GamePlatformComponent} from './components/game-platform.component';

@NgModule({
  declarations: [
    GamePlatformComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    GamePlatformComponent
  ],
  providers: [
  ],
})
export class GamePlatformModule {
}
