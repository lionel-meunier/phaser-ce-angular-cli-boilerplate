import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GameLoadService {

  constructor(private http: HttpClient) {
  }

  loadLevel(name) {
    return this.http.get('assets/levels/' + name + '.json').toPromise();
  }

  load(nameGame: string) {
    return this.http.get('assets/games/' + nameGame + '.json').toPromise().then((gameData: any) => {
      // load all level data
      let preload = [];
      gameData.data.forEach((item) => {
        if (item.type === 'level') {
          let httpPromise = this.http.get(item.url).toPromise();
          httpPromise.then((levelData) => {
            gameData.levels = gameData.levels || [];
            gameData.levels.push(levelData);
          });
          preload.push(httpPromise);
        }
      });

      return Promise.all(preload).then(() => {
        return gameData;
      });
    });
  }

}
