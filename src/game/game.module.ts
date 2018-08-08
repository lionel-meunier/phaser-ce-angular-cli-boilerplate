import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {GameComponent} from "./game.component";

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
