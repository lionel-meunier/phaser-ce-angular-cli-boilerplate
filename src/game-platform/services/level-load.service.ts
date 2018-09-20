import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LevelLoadService {

  constructor(private http: HttpClient) {
  }

  loadLevel(name) {
    return this.http.get('assets/levels/' + name + '.json').toPromise();
  }

}
