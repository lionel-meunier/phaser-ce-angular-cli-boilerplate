import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GameModule} from '../game/game.module';
import {GamePlatformModule} from '../game-platform/game-platform.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    GamePlatformModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
