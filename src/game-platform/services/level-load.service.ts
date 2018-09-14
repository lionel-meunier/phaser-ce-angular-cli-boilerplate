import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LevelLoadService {

  constructor(private http: HttpClient) {
    console.log(this.http);
  }

  loadLevel(name) {
    return this.http.get('assets/levels/' + name + '.json').toPromise();
  }

}
