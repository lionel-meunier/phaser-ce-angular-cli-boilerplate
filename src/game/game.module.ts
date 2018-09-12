import 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {GameComponent} from './game.component';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [GameComponent],
  providers: [],
  bootstrap: [GameComponent]
})
export class GameModule {
}
